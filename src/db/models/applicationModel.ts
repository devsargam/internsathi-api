import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  internshipId: {
    type: mongoose.Types.ObjectId,
    ref: 'Internship',
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  applicantName: {
    type: String,
    required: true,
  },
});

export const ApplicationModel = mongoose.model(
  'Application',
  applicationSchema
);
