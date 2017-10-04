"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var IssueSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    group_id: {
        type: Number
    },
    assigned_to: {
        type: String,
    },
    created_by: {
        type: String,
    },
    date_created: {
        type: Date,
    },
    due_date: {
        type: String
    },
    links: {
        type: String
    },
    status: {
        type: String,
        enum: {
            values: ['open', 'priority', 'on hold', 'client feedback', 'complete'],
        },
        default: 'open'
    },
    date_completed: {
        type: Date
    }
});
IssueSchema.method('setStatus', function (status) {
    this.status = status;
});
var Issue = mongoose.model('Issue', IssueSchema);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Issue;
