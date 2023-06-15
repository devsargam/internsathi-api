import { InternshipModel } from '../db/models/internshipModel.js';

// TODO: Implement Internship Model
export const getInternships = async (req, res) => {
  try {
    const internships = await InternshipModel.find();
    res.status(200).json(internships);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getInternship = async (req, res) => {
  const { id } = req.params;
  try {
    const internship = await InternshipModel.findById(id);
    res.status(200).json(internship);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postInternship = async (req, res) => {
  const internship = req.body;
  const newInternship = new InternshipModel(internship);
  try {
    await newInternship.save();
    res.status(201).json(newInternship);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteInternship = async (req, res) => {
  const { id } = req.params;
  try {
    await InternshipModel.findByIdAndRemove(id);
    res.json({ message: 'Internship deleted successfully.' });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateInternship = async (req, res) => {
  const { id } = req.params;
  const internship = req.body;
  try {
    await InternshipModel.findByIdAndUpdate(id, internship);
    res.json({ message: 'Internship updated successfully.' });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
