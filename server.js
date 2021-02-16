// server.js

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

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// const cors = require("cors");
// app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

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
  promise.then(function (db) {
    GlossaryEntry.deleteMany({}, function () {
      console.log("Glossary collection removed...");
    });
  });
}

/*
 * Middleware
 */
const jsonParser = express.json(); // for parsing application/json
const urlencodedParser = express.urlencoded({ extended: true }); // for parsing application/x-www-form-urlencoded

/*
 * Endpoints
 */
app.get("/gematria/hello", function (req, res) {
    res.json({ message: "hello, 140" });
});

// gets an array of words from the glossary, by gematric number
// usage: [base url]/gematria/:num
// where num is a string of comma seperated values
const findWordsByNummifiers = function (number, done) {
    GlossaryEntry.find({ reductions: { $in: [number] } }, function (
        err,
        wordsFound
    ) {
        if (err) return done(err, null);
        done(null, wordsFound);
    });
};

/**
 * GET /gematria/num
 */
app.get("/gematria/:num", urlencodedParser, function (req, res) {
    // 1. Get url request parameters
    const numbersArr = req.params.num.split(",");
    console.log("GET:");
    console.log(numbersArr);

    // 2. Find all entries that have the num parameter in their reductions array
    //    Sort the matches by their 'hits' value
    findWordsByNummifiers(numbersArr[0], function (err, entriesFound) {
        if (err) {
            return console.error(err);
        }
        if (!entriesFound) {
          console.log("No prior entries found.");
          return res.json({ success: true, matches: [] });
        }
        console.log("ENTRIES FOUND:");
        console.log(entriesFound);

        res.json({ success: true, matches: entriesFound });
    });
});

/**
 * Searches the GlossaryEntry collection for the word param
 * @param {string} word
 * @param {function} done - callback function
 * @throws mongodb connection errors
 */
const findWordBySignifier = function(word, done) {
    GlossaryEntry.findOne({ word: word }, (err, wordFound) => {
        if (err) return done(err, null);
        done(null, wordFound);
    });
};

// adds a word to the glossary
// usage: [base url]/gematria
// body: { word: 'katta', reductions: '98, 17, ...'}
app.post("/gematria", jsonParser, function (req, res) {
    // 1. Extract body parameters
    console.log("POST, /gematria, req.body= ");
    console.log(req.body);
    let word = req.body.word;
    let reductionsArr = req.body.reductions.split(",");
    console.log("(word : reductionsArr)=");
    console.log("(" + word + " : " + reductionsArr + ")");
    if (word === null || word === undefined || word.length === 0) {
        res.json({ success: false });
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
            // return;
        }
        console.log("ENTRY FOUND:");
        console.log(entryFound);
        priorEntry = entryFound;
        priorEntryFound = entryFound === null ? false : true;	// TODO: find out what happens if an empty object is found
        
        // 3. if prior entry found update it
		//    else, save a new entry
		if (priorEntryFound) {
			GlossaryEntry.findOneAndUpdate(
				{ word: word },
				{ $inc: { hits: 1 } },
				(err) => {
					if (err) return console.error(err);
					console.log("UPDATE:");
					res.json({ success: true, savedWord: priorEntry });
				}
			);
		} else {
			console.log("SAVING ");
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

// listen for requests :)
var listener = app.listen(port, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
