"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    group_id: {
        type: Number,
        required: true
    },
    issues: [{
            type: Schema.Types.ObjectId,
            ref: 'Issue'
        }]
});
var Project = mongoose.model('Project', ProjectSchema);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Project;
