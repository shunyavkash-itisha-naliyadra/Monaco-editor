import SendResponse from '../../utils/sendResponse.js';
import ReadMe from '../readme.model.js';
// Create ReadMe
export const createReadme = async (req, res) => {
  try {
    const { description } = req.body;

    const savedReadMe = await ReadMe.updateOne(
      {
        type: 'javaScript'
      },
      { description },
      { upsert: true }
    );
    return SendResponse(
      res,
      201,
      true,
      'ReadMe created successfully',
      savedReadMe
    );
  } catch (error) {
    return SendResponse(res, 400, false, error.message);
  }
};
// Get All readme
export const getAllReadMe = async (req, res) => {
  try {
    const readme = await ReadMe.find();
    return SendResponse(
      res,
      200,
      true,
      'All ReadMe fetched successfully',
      readme
    );
  } catch (error) {
    return SendResponse(res, 500, false, error.message);
  }
};
