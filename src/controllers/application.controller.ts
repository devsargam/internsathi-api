import { Request, Response } from 'express';
import { ApplicationModel } from '../db/models/applicationModel';

export const getApplications = async (req: Request, res: Response) => {
  try {
    // find by internshipId
    if (req.query.id) {
      const applications = await ApplicationModel.find({
        internshipId: req.query.id,
      });
      return res.status(200).json({ applications });
    }
    return res.status(200).json({ error: 'missing internship id' });
  } catch (error: unknown) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getApplication = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const application = await ApplicationModel.findById(id);
    res.status(200).json({ application });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const postApplication = async (req: Request, res: Response) => {
  const { internshipId, applicantName } = req.body;

  const reqUserId = res.locals.user._id;
  try {
    const application = await ApplicationModel.create({
      internshipId,
      userId: reqUserId,
      applicantName,
    });
    res.status(201).json({ application });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteApplication = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // check if application even exists
    const application = await ApplicationModel.findById(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found.' });
    }
    if (application.userId.toString() !== res.locals.user._id) {
      return res
        .status(401)
        .json({ message: 'No permission to delete this application' });
    }
    await ApplicationModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Application deleted successfully.' });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
