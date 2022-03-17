const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const projectSchema = new Schema({
    title: String,
    image: String,
    author: String,
    summary: String,
    creator: { type: Schema.ObjectId, ref: "User" },
    version: Number,
    created_date: String,
    last_edited: String,
    old_id: Schema.ObjectId,
    chapters: [{ 
        _id: Schema.ObjectId, 
        order: Number, 
        name: String,
        characters: String,
        last_edited: String, 
        content: String 
    }],
    characters: [{ 
        _id: Schema.ObjectId, 
        image: String, 
        name: String,
        last_edited: String,  
        display_name: String, 
        DOB: String, 
        biography: String, 
        uniqueness: [String],
        inChapter: [{ chapter_id: Schema.ObjectId }],
        inTimelines: [{ timeline_id: Schema.ObjectId }],
        inMaps: [{ map_id: Schema.ObjectId }] 
    }],
    timelines: [{
         _id: Schema.ObjectId, 
         name: String,
         characters: String,
         last_edited: String,  
         box: [{ 
            _id: Schema.ObjectId,
            id: String,
            name: String,
            date: String,
            event: String,
            character: String,
            last_edited: String
        }] 
    }],
    maps: [{ 
        _id: Schema.ObjectId, 
        name: String,
        characters: String,
        last_edited: String,  
        content: String 
    }] 
})

module.exports = mongoose.model('Project', projectSchema);