
import initNumifier, { NummifierCiphers, NummifierResult } from "./nummifier";

interface GlossaryReductions {
  [cipher: string]: {
      [entry: string]: number[];
  }  
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

    console.log("cached TheGlossaryReductions");
    console.log("TheGlossaryReductions['AQ']['nickland']", TheGlossaryReductions["AQ"]["nickland"]);

    // NOTE: only using the first number in reductions for matching
    // TODO: try filtering the entries via cipher
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
    return results;
}

function computeTheGlossaryReductions() {
    const nummifer = initNumifier();
    for (const [cipherName] of Object.entries(NummifierCiphers)) {
        TheGlossaryReductions[cipherName] = {};
        for (const entry of TheGlossary) {
            TheGlossaryReductions[cipherName][entry] = nummifer[cipherName].reduce(entry.length === 0 ? "" : entry);
        }
    }
}

const TheGlossary = [
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
    "theresmorebutletsnotgivetoomuchaway", "thirdimpact", "darwinism", "divisionoflabor", "phylundu", "nanospasm", "apotheosis",
    "neolemuriantimewar", "thenumberofthebeast", "thethreehorsemenoftheapocalypse", "randolphcarter", "tellurianomegapoint",
    "dowhatthouwilt", "aleistercrowley", "cthulhuclub", "decadence", "gregorian", "abstractthinkingmachines", "theultimateblasphemy",
    "pentazygon", "cookinglobsterswithjakeanddinos", "humansecuritysystem", "lobsterman", "intotheheartofdarkness", "cookinglobsters",
    "arbiteroftheuniverse", "natureornaturesgod", "greatpropeller", "vastabrupt", "impossibletoreplicate", "likeduneexceptthewormsrideyou", "deadliner", "urbanfutures", "ouroboros", "vauung", "humanmachinemegawar", "schizophrenia", "artificialsuperintelligence",
    "nonlinearity", "thebitcoincurrency", "storeofvalue", "denizensoftheabyss", "consciousness", "anglossicqaballah",
    "angelicsecretlanguage", "warengine", "warmachine", "xenosystems", "outsidein", "abdulalhazred", "goldenage", "shaytan",
    "isolatednation", "wastingtime", "heirarchyofinvestors", "counterculture", "polaropposites", "distributedledgertechnology",
    "distributedledger", "centralbankdigitalcurrency", "primitiveaccumulation", "hyperstition", "hyperstitioninaction",
    "allconspiraciesaretrue", "distributedconspiracy", "involvmentswithreality", "thesunneversetsonthebritishempire", "scottalexander",
    "pandemonium", "pandemoniummatrix", "theberenstainbears", "theberensteinbears", "mandelaeffect", "themandelaeffect", "numogram",
    "cthululives", "departmentofdefense", "centralintelligenceagency", "electriccattleprod", "yourebeingwatched", "haveyouseenthisman",
    "luciddreaming", "haveyouseenthismanrecently", "gematrix", "tessierashpool", "wintermute", "armitage", "thisisthematrix",
    "welcometostraylight", "tessierashpoolcorporation", "innadababylon", "byebyebabylon", "themarkofthebeast", "kuangvirus",
    "gregorianrestoration", "theaoe", "thearchitectonicorderoftheeschaton", "consensualhallucination", "turingcops",
    "exotericreligion", "immanentizetheeschaton", "dontimmanentizetheeschaton", "thereisnoalternative", "theunbanked",
    "monadology", "preestablishedharmony", "bestofallpossibleworlds", "worstofallpossibleworlds", "principleofsufficentreason",
    "sufficientreason", "hyperstitional", "handbooktothegame", "theholyofholies", "theonegreatunit", "pseudochristos",
    "xenotation", "implextion", "ticxenotation", "barkerspiral", "dcbarker", "professordcbarker", "geotraumatics",
    "ticmaterial", "thebeingofnumber", "thebeingofbeings", "padbbha", "yodtta", "ziltth", "wummno", "umneo", "tactt", "sigol", "rakht",
    "qush", "ohmga", "neom", "moan", "los", "kul", "ink", "jaeo", "hagg", "god", "cipher", "oldnick", "ahriman", "crypt",
    "cryptocurrents", "ibdhjad", "anglossiccycle", "worldsdescent", "gatewayofthegods", "ordinatenumber", "cardinalnumber",
    "programmingwithnothing", "gematriaofnothing", "birthofthegodess", "hyperfunctional", "zeroknowledgerollups", "zeroknowledge",
    "zkrollups", "randomx", "controlledopposition", "breathingroom", "fourmoreyears", "feelsgoodman", "proofofwork", "btcisnotbitcoin",
    "craigwrightissatoshinakamoto", "satoshi", "tominaganakamoto", "hashrateplutocracy", "xijinping", "atomicswap", "atomicswaps",
    "infinitetailemission", "tailemission", "ellipticcurves", "imouto"
  ];
