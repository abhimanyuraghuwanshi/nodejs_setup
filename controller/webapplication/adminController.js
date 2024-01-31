const adminModel = require('../../model/webapplication/adminModel');
const response = require("../../shared_modules/response");
const statusCode = require("../../shared_modules/statusCode.json");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const requestIp = require("request-ip");


exports.adminLogin = async (req, res) => {
    try {
      let result = await adminModel.getAdminInfo(req.body);
      if (result.length > 0) {
        let hash = CryptoJS.SHA256(req.body.password).toString(CryptoJS.enc.Hex);
        if (result[0].password === hash) {
          const jwtToken = jwt.sign(
            {
              email: req.body.username,
              id: result[0].id,
              role: "cpadmin",
            },
            process.env.JWTSECRETKEYADMIN,
            {
              expiresIn: process.env.JWTSESSIONTIMEOUT,
            }
          );
  
          // Insert Activity
          await adminModel.insertActivity({
            user_id: result[0].id,
            activity_type: "Admin Login",
            ip: requestIp.getClientIp(req),
          });
  
          res.send(response(statusCode.OK, false, "Login Successfully",{
            id: result[0].id,
            username: result[0].username,
            authToken: jwtToken,
            role: result[0].user_role,
          }));
        } else {
          res.send(response(statusCode.Not_Modified, false, "Password does not match"));
        }
      } else {
        res.send(response(statusCode.Not_Modified, false, "No data found"));
      }
    } catch (error) {
      res.send(response());
    }
};

exports.getLoginActivities = async (req, res) => {
    try {
      let statistics = await adminModel.getLoginActivity();
      if (statistics.length > 0) {
        res.send(response(statusCode.OK, true, "Success", statistics ) );
      } else {
        res.send(response(statusCode.Not_Modified, false, "No records available"));
      }
    } catch (error) {
      res.send(response());
    }
}; 

exports.getAllUsers = async (req, res) => {
  try {
    let statistics = await adminModel.getAllUsers();
    if (statistics.length > 0) {
      res.send(response(statusCode.OK, true, "Success", statistics ) );
    } else {
      res.send(response(statusCode.Not_Modified, false, "No records available"));
    }
  } catch (error) {
    res.send(response());
  }
}; 