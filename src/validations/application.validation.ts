import { z } from 'zod';

export const GetApplicationsValidation = z.object({
    id: z.string().optional() 
  });

export const PostApplicationsValidation = z.object({
  internshipId: z.number(),
  applicantName: z
    .string()
    .min(2, {
      message: 'Applicant Name must be at least 3 characters long',
    })
    .max(20, { message: 'Applicant Name cannot exceed 20 characters' })
    .trim(),
});
