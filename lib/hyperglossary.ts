
import initNumifier, { NummifierCiphers, NummifierResult } from "./nummifier";

interface GlossaryReductions {
  [cipher: string]: {
      [entry: string]: number[];
  }  
};

interface ExportGlossary {
    [reduction: number]: string[];
};

// empty on start up, but is computed on the first call to matches
const TheGlossaryReductions: GlossaryReductions = {};

/**
 * gets all the entries in the glossary that match the reductions from the given cipher
 */
export default function glossaryMatches(reductions: number[], cipher: string): string[] {
    if (Object.keys(TheGlossaryReductions).length === 0) {
        computeTheGlossaryReductions();
    }

    // NOTE: only using the first number in reductions for matching
    const results = [];
    for (const [cipherName, entries] of Object.entries(TheGlossaryReductions)) {
        if (cipherName == cipher) {
            for (const [entryName, reductionArray] of Object.entries(entries)) {
                if (reductionArray[0] === reductions[0]) {
                    results.push(entryName);
                }
            }
        }
    }
    return results.sort();
}

export function cipherGlossary(cipher: string): ExportGlossary {
    if (Object.keys(TheGlossaryReductions).length === 0) {
        computeTheGlossaryReductions();
    }

    let map: ExportGlossary = {};
    for (const [cipherName, entries] of Object.entries(TheGlossaryReductions)) {
        if (cipherName === cipher) {
            for (const [entryName, reductionArray] of Object.entries(entries)) {
                if (map[reductionArray[0]] === undefined) {
                    map[reductionArray[0]] = [];
                }

                map[reductionArray[0]].push(entryName);
            }
        }
    }
    return map;
}

function computeTheGlossaryReductions() {
    const nummifer = initNumifier();
    for (const [cipherName] of Object.entries(NummifierCiphers)) {
        TheGlossaryReductions[cipherName] = {};
        for (const entry of TheGlossary) {
            TheGlossaryReductions[cipherName][entry.toUpperCase()] = nummifer[cipherName].reduce(entry.length === 0 ? "" : entry);
        }
    }
}

const TheGlossary = [
    "nick land", "ayn rand", "katajungle", "gnon", "dagonism", "axsys", "pythia", "sergey nazarov", "alphanumerics", "treacle well",
    "heart of darkness", "one one one", "doctor faustus", "chainlink", "qwertynomics", "new world order", "hollow earth theory", "empty internet theory",
    "few understand this", "pizzapizzagate", "atheognosticism", "instrumentality", "outsideness", "austrialian fingernail harvest",
    "grey goo", "panspermia", "rokos basilisk", "tree swastika", "quantum immortality", "deep ecology", "mbutipygmy", "rheology",
    "nyarlathotep", "pangalactic stripmining", "technoreclusion", "subtellurian recolonization", "archeofuturist patchwork",
    "machinic plague", "phantasmagoria", "market consciousness", "digicultism", "hypercommodification", "pirate seasteading",
    "shanghai corridor", "eurasianism", "light hearted friend", "echidna stillwell", "neoimperialism", "xenofeminism", "sinofuturism",
    "architectonic order of the eschaton", "liberosis", "anecdoche", "occhiolism", "will to power", "sonderism", "geidiprime", "trantor",
    "panopticon", "planned extinction", "efilism", "mirlcults", "falungong", "taiping heavenly kingdom", "the epoch times", "inunaki village",
    "lefant", "hermeneutics", "prison planets", "satoshi nakamoto", "prenatal recollection", "sophistry", "mad tea party", "tsuki project",
    "systemspace", "kali yuga", "yaldabaoth", "msn butterfly", "hybrid rpg", "bluelightexposure", "atlantis", "yes saying", "nay saying",
    "bicameralism", "soylent", "inorganic life", "francis fukuyama", "the end of history", "the last man", "thanatonics", "dasein speaks",
    "meatshowers", "pie reconstruction", "hyperborea", "azathoth", "kurtz gradient", "toxic femininity", "anarchocapitalism",
    "ghost in the shell", "xenosytem", "the fire rises", "rationalist movement", "slate star codex", "hex", "hyperhex", "initiation",
    "nick bostrom", "future of humanity institute", "transhumanism", "superintelligence", "singularity", "lesswrong", "qasm", "the great puzzle",
    "artificial general intelligence", "all too human", "secret garden", "libidinal materialism", "do what thou wilt shall be the whole of the law",
    "theres more but lets not give too much away", "third impact", "darwinism", "division of labor", "phylundu", "nanospasm", "apotheosis",
    "neolemurian timewar", "the number of the beast", "the three horsemen of the apocalypse", "randolph carter", "tellurian omegapoint",
    "do what thou wilt", "aleister crowley", "cthulhuclub", "decadence", "gregorian", "abstract thinking machines", "the ultimate blasphemy",
    "pentazygon", "cooking lobsters with jake and dinos", "human security system", "lobster man", "into the heart of darkness", "cooking lobsters",
    "arbiter of the universe", "nature or natures god", "great propeller", "vast abrupt", "impossible to replicate", "like dune except the worms ride you",
    "urban futures", "ouroboros", "vauung","human machine mega war", "schizophrenia", "artificial superintelligence", "old father william",
    "nonlinearity", "the bitcoin currency", "store of value", "denizens of the abyss", "consciousness", "anglossic qaballah", "serial experiments",
    "angelic secret language", "war engine", "a grin without a cat", "war machine", "xenosystems", "outside in", "abdul alhazred", "golden age", "shaytan",
    "isolated nation", "wasting time", "heirarchy of investors", "counterculture", "polar opposites","northanger", "distributed ledger technology",
    "distributed ledger", "central bank digital currency", "primitive accumulation", "hyperstition", "hyperstition in action", "the abyss",
    "all conspiracies are true", "distributed conspiracy", "involvements with reality", "the queen of hearts she made some tarts",
    "pandemonium", "pandemonium matrix", "the berenstain bears", "the berenstein bears", "mandela effect", "the mandela effect", "numogram",
    "cthulu lives", "department of defense", "central intelligence agency", "electric cattleprod", "youre being watched", "have you seen this man",
    "lucid dreaming", "have you seen this man recently","charles dodgson", "gematrix", "tessier ashpool", "wintermute", "armitage", "false sky",
    "welcome to straylight", "tessier ashpool corporation", "innadababylon", "bye bye babylon", "the mark of the beast", "kuang virus",
    "gregorian restoration", "your hair wants cutting", "the aoe", "the architectonic order of the eschaton", "consensual hallucination", "turing cops",
    "exoteric religion", "immanentize the eschaton", "no masters no gods", "dont immanentize the eschaton", "there is no alternative", "the unbanked",
    "monadology", "preestablished harmony", "best of all possible worlds", "worst of all possible worlds", "principle of sufficent reason",
    "sufficient reason", "abyss", "supernal triad", "hyperstitional", "handbook to the game", "the holy of holies", "the one great unit", "pseudo christos",
    "xenotation", "implextion", "ticxenotation", "barkerspiral", "dc barker", "professor dc barker", "geotraumatics", "mock turtle soup",
    "ticmaterial", "being of number", "being of beings", "padbbha", "yodtta", "ziltth", "wummno", "umneo", "tactt", "sigol", "rakht", "decimal labyrinth",
    "qush", "ohmega", "neom", "moan", "kul", "jaeo", "god", "choronzon", "inhumanity", "cipher", "old nick", "ahriman", "crypt", "satanism",
    "cryptocurrents", "ibdhjad", "anglossic cycle", "worlds descent", "gateway of the gods", "ordinate number", "cardinal number", "dispersion",
    "programming with nothing", "gematria of nothing", "cube machine", "birth of the goddess", "hyperfunctional", "zero knowledge rollups", "zero knowledge",
    "zk rollups", "randomx", "one eight nine zero", "controlled opposition", "breathing room", "four more years", "feels good man", "proof of work", "btc is not bitcoin",
    "craigwrightissatoshinakamoto", "satoshi", "tominaga nakamoto", "hash rate plutocracy", "cold rationalism", "unity", "listening to angels",
    "infinite tail emission", "zodh", "elliptic curves", "rift", "chasm", "cargo", "gnu", "blonde beast", "satan", "the apotheosis of the dance",
    "book of paths", "the silver key", "how is a raven like a writing desk", "polytics", "monkeys paw effect", "mine is a long and sad tale", "looking glass world",
    "null pointer dereferencing", "curiouser and curiouser", "Tchukululok", "worm behind the world", "fabled city of the worms", "the whisperer in the darkness",
    "you are being watched", "entry of the gods into valhalla", "lemuria", "alice liddell", "tarts are made of pepper", "sutter cane", "all cats can grin and most of them do",
    "eroica", "nothing human", "how doth the little crocodile improve his shining tail", "art has a right to defend itself", "decadology", "anglobal communications",
    "fig or pig", "murdering the time", "dark enlightenment", "tabysshe",  "thelema", "crossing the abyss", "coronzonic abyss", "binah", "keter", "hokhmah", "stellar dispersion",
    "zero philisophy", "inordinate prime", "nomos", "metatron", "lovecraft", "brownian motion", "jack the ripper", "desert of the real", "circuit city", "moon cake break",
    "wonderland", "puppies of his race", "moral sensibilities", "put nature on the the rack", "four lettered name", "zom the octopus", "running out of time", "our girl katak", "al crowley and crew",
    "our girl khatak", "luurgo", "royal road to science", "djynxx", "uttunul", "murrumur", "oddubb", "meat hook", "chilled meatstore", "mystical telos of the english language", "the cybernetic culture research unit",
    "we open gates of starry night for thee", "hell baked", "agency and intelligence are the same thing", "put nature to the the rack", "skynet", "opening the gates of hell", "only in the flesh", "lucifer", "english", "prayer",
    "alphabet", "agi safety", "agi safety is my top priority", "artificial selection", "crackup capitalism", "rent seeking", "monkeyworld deathstorm", "algorithmic intensity", "diplotriadic", "hexated decimal residuum", "tetraktys",
    "august barrow", "barrow boy", "barrows angels", "primitivization", "ancient numerical order", "decimalize", "the decimal basins", "categorical disagreement", "alphanomic significance", "zero is too big for us",
    "the nothing", "lemu ta novu meh novu nove", "exit the earth", "weighed down by gravity", "meds now", "the game continues", "department of war", "song of the night", "the agony of lewis carroll", "queen of hearts",
    "masonic cipher", "tragic upcommance", "song of the earth", "monkey frying monsters", "monkey panic", "storming of the bastille", "chattybot", "messenger of satan", "in communication with angels", "archangel gabriel", "pleroma",
    "archangel michael", "azrael", "pythia unbound", "pythia unbounded", "behold the lamb", "transhumanist project", "francis galton", "crispr method", "network spirituality", "the heavenly powers", "the ancient track",
    "Joseph Scruggs", "Robert Bolton", "James Frazer", "on earth as it is in heaven", "great gates of sleep", "king james version", "kjv", "angelic communication", "Quasi Autonomous Submerged Machines", "satanic gemtria",
    "paradise lost", "john milton", "John von Neumann", "abysmal nummification of the signifier", "bene gesserit", "reverend mother", "xenocosmography", "dasein", "being is not a being", "a cat without a grin",
    "anglotheosophical oblique escalation", "the book of common prayer", "bourgeois bold face", "book of common prayer", "factorization", "laws of nature", "natural law", "planetary nihilism process", "chatting with satan", "dream discipline",
    "she despised him in her heart", "leaping and dancing before the Lord", "charles darwin", "12 february 1809", "february", "primal scream", "guardian of the eight gate", "platonism", "esoteric platonism", "atlanticism", "vedic mysteries",
    "numogram hex", "basilisk hell", "the secret garden", "the song of the earth", "the meaning of the earth", "the tree of the knowledge of good and evil", "eloquent miracles", "it had to be this way", "natural selection", "trust the plan",
    "conflict with time", "death of god", "the death of god", "world war three", "world war iii", "world war 3", "secular history", "demented clown regime", "ministry of truth", "the lofty powers", "the fundamental theorem of arithmetic",
    "luminous qabballah", "solemn providence", "the insignificance of dreams and accidents", "im so profoundly ashamed of what ive been", "synx", "timaeus", "holy ghost", "one true god", "son of man", "the son of man", "plexenomy", "alphanomics",
    "the satanic tragedy", "angelic materialism", "tristan and isolde", "Tristan and Iseult", "english ordinal", "xenocosmic", "hyperintelligence", "morning star", "zionism", "hell", "they know not what they do",
    "why have you forsaken me", "maximum entropy", "sacred geometry", "as above so below"
  ];
