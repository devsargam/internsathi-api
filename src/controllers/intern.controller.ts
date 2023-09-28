import { Request, Response } from 'express';
import { InternshipModel, UserModel } from '../db/models';

export const getInternships = async (req: Request, res: Response) => {
  const queryObject = {
    createdBy: res.locals.user._id,
  };

  let result = InternshipModel.find(queryObject);
  // Implementing pagination
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const startIndex = (page - 1) * limit;
  const total = await InternshipModel.countDocuments(result);
  result = result.skip(startIndex).limit(limit);
  const internships = await result;
  const nomOfPages = Math.ceil(total / limit);
  return res.status(200).json({
    internships,
    totalPages: nomOfPages,
    currentPage: page,
  });
};

export const getInternship = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const internship = await InternshipModel.findById(id);
    res.status(200).json(internship);
  } catch (error) {
    res.status(404).json({
      message: (error as Error).message,
    });
  }
};

export const postInternship = async (req: Request, res: Response) => {
  const internship = req.body;
  const userFromDb = await UserModel.findOne({
    email: res.locals.user.email,
  });
  if (!userFromDb) {
    return res.status(404).json({ message: 'User not found.' });
  }
  internship.createdBy = userFromDb._id;
  const newInternship = new InternshipModel(internship);
  console.log(newInternship);
  try {
    await newInternship.save();
    res.status(201).json(newInternship);
  } catch (error) {
    res.status(409).json({
      message: (error as Error).message,
    });
  }
};

export const deleteInternship = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const internship = await InternshipModel.findById(id);
    if (!internship) {
      return res.status(404).json({
        message: 'Internship not found.',
      });
    }
    if (internship.createdBy.toString() !== res.locals.user._id) {
      return res.status(401).json({
        message: 'No permission to delete this internship',
      });
    }
    await InternshipModel.findByIdAndRemove(id);
    res.json({
      message: 'Internship deleted successfully.',
    });
  } catch (error) {
    res.status(409).json({
      message: (error as Error).message,
    });
  }
};

export const updateInternship = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const internship = req.body;
  try {
    if (internship.createdBy != res.locals.user._id.toString()) {
      return res.status(401).json({
        message: 'No permission to update this internship',
      });
    }
    await InternshipModel.findByIdAndUpdate(id, internship);
    res.status(202).json({
      message: 'Internship updated successfully.',
    });
  } catch (error) {
    res.status(409).json({
      message: (error as Error).message,
    });
  }
};
