import { Request, Response } from 'express';
import { InternshipModel, UserModel } from '../db/models';
import {
  InternshipValidation,
  GetInternshipsQuerySchema,
  InternshipIdParamSchema,
} from '../validations/internship.validation';

// Get a list of internships with pagination
export const getInternships = async (req: Request, res: Response) => {
  try {
    // Validate query parameters using Zod
    const queryParams = GetInternshipsQuerySchema.parse(req.query);

    const queryObject = {
      createdBy: res.locals.user._id,
    };

    let result = InternshipModel.find(queryObject);

    // Implement pagination
    const page = parseInt(queryParams.page || '1');
    const limit = parseInt(queryParams.limit || '10');
    const startIndex = (page - 1) * limit;
    const total = await InternshipModel.countDocuments(queryObject);

    result = result.skip(startIndex).limit(limit);
    const internships = await result;
    const numOfPages = Math.ceil(total / limit);

    return res.status(200).json({
      success: true,
      internships,
      totalPages: numOfPages,
      currentPage: page,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: (error as Error).message });
  }
};

// Get a single internship by ID
export const getInternship = async (req: Request, res: Response) => {
  try {
    // Validate URL params using Zod
    const params = InternshipIdParamSchema.parse(req.params);
    const internship = await InternshipModel.findById(params.id);
    if (!internship) {
      return res
        .status(404)
        .json({ success: false, message: 'Internship not found' });
    }
    return res.status(200).json({ success: true, internship });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: (error as Error).message });
  }
};

// Create a new internship
export const postInternship = async (req: Request, res: Response) => {
  try {
    // Validate request body using Zod
    const internshipData = InternshipValidation.parse(req.body);

    const userFromDb = await UserModel.findOne({
      email: res.locals.user.email,
    });
    if (!userFromDb) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    // Add createdBy field from authenticated user
    const newInternship = new InternshipModel({
      ...internshipData,
      createdBy: userFromDb._id,
    });
    await newInternship.save();

    res
      .status(201)
      .json({ success: true, internship: newInternship });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: (error as Error).message });
  }
};

// Delete an internship by ID
export const deleteInternship = async (
  req: Request,
  res: Response
) => {
  try {
    // Validate URL params using Zod
    const params = InternshipIdParamSchema.parse(req.params);

    const internship = await InternshipModel.findById(params.id);
    if (!internship) {
      return res
        .status(404)
        .json({ success: false, message: 'Internship not found' });
    }

    if (internship.createdBy.toString() !== res.locals.user._id) {
      return res.status(401).json({
        success: false,
        message: 'No permission to delete this internship',
      });
    }

    await InternshipModel.findByIdAndRemove(params.id);
    res.status(200).json({
      success: true,
      message: 'Internship deleted successfully',
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: (error as Error).message });
  }
};

// Update an internship by ID
export const updateInternship = async (
  req: Request,
  res: Response
) => {
  try {
    // Validate URL params using Zod
    const params = InternshipIdParamSchema.parse(req.params);

    // Validate request body using Zod
    const internshipData = InternshipValidation.parse(req.body);

    const internship = await InternshipModel.findById(params.id);
    if (!internship) {
      return res
        .status(404)
        .json({ success: false, message: 'Internship not found' });
    }

    if (internship.createdBy.toString() !== res.locals.user._id) {
      return res.status(401).json({
        success: false,
        message: 'No permission to update this internship',
      });
    }

    await InternshipModel.findByIdAndUpdate(
      params.id,
      internshipData
    );
    res.status(200).json({
      success: true,
      message: 'Internship updated successfully',
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: (error as Error).message });
  }
};
