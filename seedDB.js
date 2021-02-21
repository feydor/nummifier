const nummificate = require('./client/src/algorithims/gematria/nummifier.js');
const GlossaryEntry = require("./models/glossaryentry.js");

/**
 * @param (function) connection - a mongoose connection
 */
function seedDB(connection) {
  try {
    connection.then(function (db) {
      let seedData = [];
      for (let word of glossary) {
        let newEntry = {
          word: word,
          reductions: [...nummificate(word)["AQ"].reduce(), ...nummificate(word)["GoN1"].reduce()],
          hits: 0,
        };
        seedData.push(newEntry);
      }

      GlossaryEntry.insertMany(seedData, function(err, docs) {
        if (err) console.error(err);
        console.log("database seeded! :)");
      });
    });
  } catch (error) {
    console.error(error);
  }
}

// insert default glossary here
const glossary = [
  "nickland", "aynrand", "northanger", "katajungle", "gnon", "dagonism", "axsys", "pythia", "sergeynazarov", "alphanumerics",
  "heartofdarkness", "doctorfaustus", "chainlink", "qwertynomics", "newworldorder", "hallowearththeory", "emptyinternettheory",
  "fewunderstandthis", "pizzapizzagate", "atheognosticism", "bogdanovdump", "outsideness", "austrialianfingernailharvest",
  "greygoo", "panspermia", "rokosbasilisk", "treeswastika", "quantumimmortality", "deepecology", "mbutipygmy", "rheology",
  "nyarlathotep", "pangalacticstripmining", "technoreclusion", "subtellurianrecolonization", "archeofuturistpatchwork",
  "machinicplague", "phantasmagoria", "marketconsciousness", "digicultism", "hypercommodification", "pirateseasteading",
  "shanghaicorridor", "eurasianism", "reserverights", "neoimperialism", "xenofeminism", "sinofuturism",
  "architectonicorderoftheeschaton", "liberosis", "anecdoche", "occhiolism", "willtopower", "sonderism", "geidiprime", "trantor",
  "panopticon", "plannedextinction", "efilism", "mirlcults", "falungong", "taipingheavenlykingdom", "theepochtimes", "inunakivillage",
  "lefant", "hermeneutics", "prisonplanets", "satoshinakamoto", "prenatalrecollection", "sophistry", "tsukiproject",
  "systemspace", "kaliyuga", "yaldabaoth", "msnbutterfly", "hybridrpg", "bluelightexposure", "atlantis", "yessaying", "naysaying",
  "bicameralism", "soylent", "inorganiclife", "francisfukuyama", "theendofhistory", "thelastman", "thanatonics", "daseinspeaks",
  "meatshowers", "piereconsruction", "hyperborea", "azathoth", "kurtzgradient", "toxicfemininity", "anarchocapitalism",
  "ghostintheshell", "xenosytem", "thefirerises", "rationalistmovement", "slatestarcodex", "eliezeryudkowsky", "nickszabo",
  "nickbostrom", "futureofhumanityinstitute", "transhumanism", "superintelligence", "singularity", "lesswrong",
  "artificialgeneralintelligence", "alltoohuman", "secretgarden", "libidinalmaterialism", "dowhatthouwiltshallbethewholeofthelaw",
  "theresmorebutletsnotgivetoomuchaway"
];

module.exports = seedDB;
