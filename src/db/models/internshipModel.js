import mongoose from 'mongoose';

// The internshipSchema is the blueprint for the Internship model.
// It should reflect on company's internship posting.
// It should be in relation with companySchema.
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
  qualifaication: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
});

export const InternshipModel = mongoose.model('Internship', internshipSchema);
