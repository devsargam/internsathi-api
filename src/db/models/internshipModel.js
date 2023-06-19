import mongoose from 'mongoose';

// The internshipSchema is the blueprint for the Internship model.
// It should reflect on company's internship posting.
// It should be in relation with userSchema.
const internshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['open', 'closed'],
    default: 'open',
  },
  department: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
});

export const InternshipModel = mongoose.model('Internship', internshipSchema);
