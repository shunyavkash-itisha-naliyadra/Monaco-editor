import mongoose from 'mongoose';

const readmeSchema = new mongoose.Schema({
  description: String,
  type: {
    type: String,
    default: 'javaScript'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const readme = mongoose.model('readme', readmeSchema);

export default readme;
