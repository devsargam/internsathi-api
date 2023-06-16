import { ApplicationModel } from '../db/models/applicationModel.js';

export const getApplications = async (req, res) => {
  try {
    // find by internshipId
    if (req.query.id) {
      const applications = await ApplicationModel.find({
        internshipId: req.query.id,
      });
      return res.status(200).json({ applications });
    }
    return res.status(200).json({ error: 'missing internship id' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const application = await ApplicationModel.findById(id);
    res.status(200).json({ application });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const postApplication = async (req, res) => {
  const { internshipId, applicantName } = req.body;
  const reqUserId = req.user.id;
  try {
    const application = await ApplicationModel.create({
      internshipId,
      userId: reqUserId,
      applicantName,
    });
    res.status(201).json({ application });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteApplication = async (req, res) => {
  const { id } = req.params;
  try {
    // check if application even exists
    const application = await ApplicationModel.findById(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found.' });
    }
    // check if user is the owner of the application
    if (application.userId.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: 'No permission to delete this application' });
    }
    await ApplicationModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Application deleted successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
