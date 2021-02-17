const { getObjectId } = require("mongo-seeding");
const words = [
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

const entries = words.map(word => {
    word: word,
    reductions: 
    hits: 0,
    _id: getObjectId(word),
});

module.exports = entries;
