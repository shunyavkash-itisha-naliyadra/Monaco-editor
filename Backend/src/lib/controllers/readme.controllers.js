import SendResponse from '../../utils/sendResponse.js';
import ReadMe from '../readme.model.js';
// Create ReadMe
export const createReadme = async (req, res) => {
  try {
    const { description, type } = req.body;
    console.log(type, '----------');

    const savedReadMe = await ReadMe.updateOne(
      {
        type: type
      },
      { description, type },
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
    const type = req.params.type;
    const readme = await ReadMe.findOne({ type: type });
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
