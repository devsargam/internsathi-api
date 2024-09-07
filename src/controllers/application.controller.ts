import { Request, Response } from 'express';
import { ApplicationModel, UserModel } from '../db/models';
import {
  GetApplicationsValidation,
  PostApplicationsValidation,
} from '../validations/application.validation';

export const getApplications = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = GetApplicationsValidation.parse(req.query);

    // find by internshipId
    if (id) {
      const applications = await ApplicationModel.find({
        internshipId: id,
      });
      return res.status(200).json({ applications });
    }
    return res.status(400).json({ error: 'Missing internship id' });
  } catch (error: unknown) {
    res
      .status(500)
      .json({ success: false, error: (error as Error).message });
  }
};

export const getApplication = async (req: Request, res: Response) => {
  const { id } = GetApplicationsValidation.parse(req.params);
  try {
    const application = await ApplicationModel.findById(id);
    res.status(200).json({ application });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: (error as Error).message });
  }
};

export const postApplication = async (
  req: Request,
  res: Response
) => {
  const parsedApplication = PostApplicationsValidation.parse(
    req.body
  );
  const { internshipId, applicantName } = parsedApplication;

  const user = await UserModel.findOne({
    email: res.locals.user.email,
  });
  if (!user) {
    return res
      .status(400)
      .json({ success: false, error: 'User not found' });
  }

  const reqUserId = user._id;
  try {
    const application = await ApplicationModel.create({
      internshipId,
      userId: reqUserId,
      applicantName,
    });
    res.status(201).json({
      success: true,
      application,
      message: 'Application created successfully',
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: (error as Error).message });
  }
};

export const deleteApplication = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    // check if application even exists
    const application = await ApplicationModel.findById(id);
    if (!application) {
      return res.status(404).json({
        message: 'Application not found.',
      });
    }
    const user = await UserModel.findOne({
      email: res.locals.user.email,
    });
    if (application.userId.toString() !== user?._id.toString()) {
      return res.status(401).json({
        message: 'No permission to delete this application',
      });
    }

    await ApplicationModel.findByIdAndDelete(id);
    res.status(200).json({
      message: 'Application deleted successfully.',
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: (error as Error).message });
  }
};
