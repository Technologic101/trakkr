import * as mongoose from 'mongoose';
import * as Project from './project';


let Schema = mongoose.Schema;

let IssueSchema = new Schema({
  name: {
    type:String,
    required: true
  },
  description: {
    type: String,
  },
  group_id: {
    type: Number
  },
  assigned_to: {
    type:String,
  },
  created_by: {
    type:String,
  },
  date_created: {
    type:Date,
  },
  due_date: {
    type:String
  },
  links: {
    type:String
  },
  status: {
    type: String,
    enum: {
      values: ['open', 'priority', 'on hold', 'client feedback', 'complete'],
    },
    default: 'open'
  },
  /*file_name: {
    type: ???
  },*/
  date_completed: {
    type:Date
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project'    
  }
});

IssueSchema.method('setStatus', function(status) {
  this.status = status;
});

let Issue = mongoose.model('Issue', IssueSchema);

export default Issue;
