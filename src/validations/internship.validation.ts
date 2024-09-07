import { z } from 'zod';

export const InternshipValidation = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  company: z.string().min(1, { message: "Company is required" }),
  salary: z.string().min(1, { message: "Salary is required" }),
  position: z.string().min(1, { message: "Position is required" }),
  qualification: z.string().min(1, { message: "Qualification is required" }),
  deadline: z.date(),
  status: z.enum(['open', 'closed']).optional(),
  department: z.string().min(1, { message: "Department is required" }),
  createdBy: z.date().optional(),
});


export const GetInternshipsQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
});

// Schema for URL parameters
export const InternshipIdParamSchema = z.object({
  id: z.string().length(24, "Invalid ID length"),
});
