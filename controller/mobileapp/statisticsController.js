const response = require("../../shared_modules/response");
const statusCode = require("../../shared_modules/statusCode.json");

exports.stopApplicationFlag = async (req, res) => {
  try {
    
    res.send(response(statusCode.No_Content, false, "Application is stop by admin"));

  } catch (error) {
    res.send(response());
  }
};
