const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const requestIp = require("request-ip");
const generateTimestampWithOffset = require("../../shared_modules/unixtime");
const statusCode = require("../../shared_modules/statusCode.json");
const response = require("../../shared_modules/response");
const {  verifyWalletAddress} = require("../../shared_modules/verifywalletaddress");
const authModel = require("../../model/webapplication/authModel");
const CryptoJS = require("crypto-js");
const  config  = require('../../config/config');

exports.userRegistration = async (req, res) => {
try {
  const check = await authModel.checkIfExist( req.body.email);
  if(check.length==0){
    if (req.body.password === req.body.confirm_password) {
      req.body.password= CryptoJS.SHA256(req.body.password).toString(CryptoJS.enc.Hex);
      const register = await authModel.insertUser( req.body);
      console.log(register)
      if (register.insertId) {
        return res.send(response(statusCode.OK, true, "Registration successfull"));
      } else {
        return res.send(response(statusCode.Bad_Request, false, "Unable to register.Try again"));
      }
    } else {
      return res.send(response(statusCode.Conflict, false, "Password and confirm password should be same."));
    }
  }else{
    return res.send(response(statusCode.Already_Reported, false, "Email already registered."));
  }

} catch (error) {
  console.log(error)
  res.send(response());
}
}
exports.weblogin = async (req, res) => {
  try {
    const verifyAddress = await verifyWalletAddress(
      req.body.address,
      req.body.signature
    );
    if (!verifyAddress.status) {
      return res.send(response(200, false, verifyAddress.message));
    } else {
      let getUsersEmail = await authModel.getUsersDetailsAddress(
        req.body.address
      );
      if (getUsersEmail.length > 0) {
        if (getUsersEmail[0].is_active == 0) {
          return res.status(200).send({
            success: false,
            msg: "Your account is Deactivated, Please contact Admin.",
          });
        }
        const jwtToken = jwt.sign(
          {
            email: getUsersEmail[0].email,
            id: getUsersEmail[0].id,
            bnb_address: getUsersEmail[0].bnb_address,
          },
          process.env.JWTSECRETKEY,
          { expiresIn: process.env.JWTSESSIONTIMEOUT }
        );

        // Insert Activity
        let activityInserted = await authModel.insertActivity({
          user_id: getUsersEmail[0].id,
          activity_type: "Login",
          ip: requestIp.getClientIp(req),
        });
        if (activityInserted) {
          return res.send(
            response(200, true, "Login Successful", {
              id: getUsersEmail[0].id,
              email: getUsersEmail[0].email,
              bnb_address: getUsersEmail[0].bnb_address,
              authToken: jwtToken,
            })
          );
        } else {
          return res.send(response(200, false, "Something went wrong!"));
        }
      } else {
        return res.send(response(200, false, "Please register before login."));
      }
    }
  } catch (error) {
    res.status(500).send(response());
  }
};

exports.userProfile = async (req, res) => {
  try {
    let profile = await authModel.getUsersProfile(req.user_id);
    if (profile.length > 0) {
      profile[0].profile_pic= `${config.ImageUrl}${profile[0].profile_pic}`
      res.send(response(200, true, "Success", profile[0]));
    } else {
      res.send(response(200, false, "Unable to fetch data"));
    }
  } catch (error) {
    res.send(response());
  }
};

exports.contactUS = async (req, res) => {
  try {
    const { image, video } = req.files;
    // Access uploaded image and video details in req.files object
    req.body.imageName = ( image==undefined?'none':image[0].filename);
    req.body.videoName = ( video==undefined?'none':video[0].filename);
 
    if(req.body.mobile_type==undefined){
      req.body.mobile_type= "none"
    }
    if(req.body.mobile_detail==undefined){
      req.body.mobile_detail= "none"
    }
    // console.log(req.body)
    
    let data = await authModel.contactUsForm(req.body);
    if (data.insertId) {
      res.send(
        response(200, true, "We've got your query. We'll reply shortly!")
      );
    } else {
      res.send(
        response(200, false, "Uh-oh! It didn't work. Give it another shot.")
      );
    }
  } catch (error) {
    res.send(response());
  }
};
