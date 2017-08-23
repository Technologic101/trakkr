import * as mongoose from 'mongoose';
import * as Issue from './issue';

let Schema = mongoose.Schema;

let ProjectSchema = new Schema({
  name: {
    type:String,
    required: true
  },
  description: {
    type:String
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

let Project = mongoose.model('Project', ProjectSchema);

export default Project;
