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
    issues: [{
            type: Schema.Types.ObjectId,
            ref: 'Issue'
        }],
    lead: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    issueOrder: {
        type: Array
    }
});
var Project = mongoose.model('Project', ProjectSchema);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Project;
