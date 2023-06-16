import { InternshipModel } from '../db/models/internshipModel.js';

export const getInternships = async (req, res) => {
  const queryObject = {
    createdBy: req.user.id,
  };

  let result = InternshipModel.find(queryObject);
  // Implementing pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
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
  internship.createdBy = req.user.id;
  const newInternship = new InternshipModel(internship);
  console.log(newInternship);
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
    const internship = await InternshipModel.findById(id);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found.' });
    }
    if (internship.createdBy.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: 'No permission to delete this internship' });
    }
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
    if (internship.createdBy != req.user.id.toString()) {
      return res
        .status(401)
        .json({ message: 'No permission to update this internship' });
    }
    await InternshipModel.findByIdAndUpdate(id, internship);
    res.status(202).json({ message: 'Internship updated successfully.' });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
