var mongoose = require('mongoose');
const { Schema } = mongoose;

const glossarySchema = new Schema({
    word: { type: String, default: '' },
    reductions: { type: Array, default: [] },
    hits: { type: Number, default: 0 }
});

const glossaryEntryModel = mongoose.model('Glossary', glossarySchema);

module.exports = glossaryEntryModel;