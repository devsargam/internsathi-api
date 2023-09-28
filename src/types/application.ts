import { Types } from 'mongoose';

export interface IApplication {
  internshipId: Types.ObjectId;
  userId: Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected';
  applicantName: string;
}
