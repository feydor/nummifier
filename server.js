/* server.js - RESTful api for gematria */

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;
const port = process.env.PORT || 3001;
var promise;

// import models
const GlossaryEntry = require("./models/glossaryentry.js");

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// connect to mongodb
promise = mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// wipe the mongodb collection during development
if (process.env.NODE_ENV !== "production") {
  /*
  const path = require('path');
  const { Seeder } = require('mongo-seeding');

  const config = {
    database: {
      name: 'Glossary',
    },
    dropDatabase: true,
  };
  const seeder = new Seeder(config);
  const collections = seeder.readCollectionsFromPath(
    path.resolve('./data-import'),
    {
      transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId],
    },
  );
  
  seeder
    .import(collections)
    .then(() => {
      console.log('Mongo-seeding: Success');
    })
    .catch(err => {
      console.log('Mongo-seeding: Error', err);
    });
  */

  promise.then(function (db) {
    GlossaryEntry.deleteMany({}, function () {
      console.log("Glossary collection removed...");
    });
  });
}

// create middleware references
const jsonParser = express.json(); // for parsing application/json
const urlencodedParser = express.urlencoded({ extended: true }); // for parsing application/x-www-form-urlencoded

/////////////////////////////////////////////////////////
// Endpoints
/////////////////////////

/**
 * GET /gematria/hello
 * a test endpoint
 */
app.get("/gematria/hello", function (req, res) {
  res.json({ message: "hello, 140" });
});


/**
 * GET /gematria/:reduction
 * Match reductions to words in the Glossary Collection
 * @param {string} reduction - a string of dash (-) seperated numbers 
 * @return {Array} glossary - an array of strings
 * @example /gematria/140-5
 */
app.get("/gematria/:reduction", urlencodedParser, function receiveReductions(req, res) {
  // 1. Get url request parameters
  if (!req.params) {
    return res.json({ status: 400, statusTxt: "Missing reduction parameter." });
  }
  const numbersArr = req.params.reduction.split("-");
  console.log("GET:", numbersArr);

  // 2. Find all entries that have the num parameter in their reductions array
  //    Sort the matches by their 'hits' value
  findWordsByNummifiers(numbersArr, function handleEntriesFound(err, entriesFound) {
    if (err) {
      return console.error(err);
    }
    if (!entriesFound) {
      console.log("No prior entries found.");
      return res.json({ success: true, matches: [] });
    }
    console.log("ENTRIES FOUND:", entriesFound);

    // 3. Create a glossary from each entry's word category
    let glossary = entriesFound.map(entry => entry.word);
    console.log("Returning: ", glossary);

    res.json({ success: true, glossary: glossary });
  });
});


/**
 * POST /gematria
 * adds a word to the glossary
 * @param body: { word, reductions[strings] }
 * @return { sucess:bool, savedWord:string (if saved) }
 */
app.post("/gematria", jsonParser, function (req, res) {
  // 1. Extract body parameters
  if (req.body.word.length === 0 || !req.body.word) {
    return res.json({ status: 400, statusTxt: "Missing parameter." });
  }
  console.log("POST, /gematria, req.body= ");
  console.log(req.body);
  let word = req.body.word;
  let reductionsArr = req.body.reductions.split(",");
  console.log("(word : reductionsArr)=");
  console.log("(" + word + " : " + reductionsArr + ")");
  if (word === null || word === undefined || word.length === 0) {
    return res.json({ status: 400, statusTxt: "Invalid input." });
  }

  // 2. search for pre-existing word in glossary model
  let priorEntryFound = false;
  let priorEntry = null;
  findWordBySignifier(word, function(err, entryFound) {
    if (err) {
      return console.error(err);
    }
    if (!entryFound) {
      console.log("Prior entry not found.")
    } else {
      console.log("ENTRY FOUND: ", entryFound);
      priorEntryFound = entryFound === null ? false : true; 
    }

    // 3. if prior entry found update it
    //    else, save a new entry
    if (priorEntryFound) {
      GlossaryEntry.findOneAndUpdate(
        { word: word },
        { $inc: { hits: 1 } },
        (err) => {
          if (err) return console.error(err);
          console.log("UPDATING:");
          res.json({ success: true, savedWord: priorEntry });
        }
      );
    } else {
      console.log("SAVING:");
      let newEntry = new GlossaryEntry({
        word: word,
        reductions: reductionsArr,
      });
      newEntry.save((err, savedWord) => {
        if (err) return console.error(err);
        res.json({ success: true, savedWord: savedWord });
      });
    }

  });

});

/////////////////////////////////////////////
// Collection searching functions
/////////////////////////////////

/**
 * gets an array of words from the glossary, by gematric number
 * @param {Array or number} number - can be just a number
 * @param {function} done - callback
 * @return if wordsFound, done(null, wordsFound)
 *         else done(err, null)
 * @throws mongodb connection errors
 */
const findWordsByNummifiers = function handleNummifiers(nummifiers, done) {
  if (!Array.isArray(nummifiers)) {
    nummifiers = [nummifiers]; // turn into an array
  }

  console.log("nummifiers: ", nummifiers);

  GlossaryEntry.find({ reductions: { $in: nummifiers } }, function (
    err,
    wordsFound
  ) {
    if (err) return done(err, null);
    done(null, wordsFound);
  });
};

/**
 * Searches the GlossaryEntry collection for the param 'word' 
 * @param {string} word
 * @param {function} done - callback function
 * @return if word exists (and is not null/undefined/empty), done(null, wordFound)
 *         else done(err, null)
 * @throws mongodb connection errors
 */
const findWordBySignifier = function handleSignifiers(word, done) {
  GlossaryEntry.findOne({ word: word }, (err, wordFound) => {
    if (err) return done(err, null);
    if (wordFound === null || wordFound === undefined || wordFound.length === 0 ||
      (Object.keys(wordFound).length === 0 && wordFound.constructor === Object)) {
      done(new Error("wordFound is null, undefined or an empty object."), null);
    }
    done(null, wordFound);
  });
};

// listen for requests :)
var listener = app.listen(port, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
