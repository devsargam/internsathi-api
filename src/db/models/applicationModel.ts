import { Schema, Types, model } from 'mongoose';

interface IApplication {
  internshipId: Types.ObjectId;
  userId: Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected';
  applicantName: string;
}

const applicationSchema = new Schema<IApplication>({
  internshipId: {
    type: Schema.Types.ObjectId,
    ref: 'Internship',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
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

export const ApplicationModel = model<IApplication>(
  'Application',
  applicationSchema
);
