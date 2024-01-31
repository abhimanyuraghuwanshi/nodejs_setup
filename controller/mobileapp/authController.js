const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const requestIp = require("request-ip");
const uuid = require("uuid");
const CryptoJS = require("crypto-js");

const response = require("../../shared_modules/response");
const statusCode = require("../../shared_modules/statusCode.json");
const authModel = require("../../model/webapplication/authModel");
const {  verifyWalletAddress,} = require("../../shared_modules/verifywalletaddress");
const { config } = require("dotenv");

exports.applogin = async (req, res) => {
  try {
    /*  metamask signature => not used
    const verifyAddress = await verifyWalletAddress(
      req.body.address,
      req.body.signature
    );   */

    // Decrypt using CryptoJS
    const decrypted = CryptoJS.AES.decrypt(
      req.body.hash,
      process.env.LOGINKEY
    ).toString(CryptoJS.enc.Utf8);

    if (!decrypted) {
      return res.send(
        response(
          statusCode.Network_Authentication_Required,
          false,
          "Invalid login hash"
        )
      );
    } else {
      let getUsersEmail = await authModel.getUsersDetailsAddress(decrypted);
      if (getUsersEmail.length > 0) {
        if (getUsersEmail[0].is_active == 0) {
          return res.status(200).send({
            success: false,
            msg: "Your account is Deactivated, Please contact Admin.",
          });
        }
        // if (getUsersEmail[0].is_email_verify === 0) {
        //     return res.status(200).send({
        //         success: false,
        //         msg: "Please activate your account"
        //     });
        // } else {

        const timestampUUID = uuid.v1();
        // console.log("Timestamp UUID (v1):", timestampUUID);
        const jwtToken = jwt.sign(
          {
            email: getUsersEmail[0].email,
            id: getUsersEmail[0].id,
            bnb_address: getUsersEmail[0].bnb_address,
            jwtId: timestampUUID,
          },
          process.env.JWTSECRETKEY,
          { expiresIn: process.env.JWTSESSIONTIMEOUTFORAPP }
        );

        // Insert Activity
        let activityInserted = await authModel.insertActivity({
          user_id: getUsersEmail[0].id,
          activity_type: "Login",
          ip: requestIp.getClientIp(req),
        });
        if (activityInserted) {
          let jwtId = await authModel.insertJwtID(
            timestampUUID,
            getUsersEmail[0].id
          );
          if (jwtId) {
           
            return res.send(
              response(statusCode.Accepted, true, "Login Successful", {
                id: getUsersEmail[0].id,
                email: getUsersEmail[0].email,
                bnb_address: getUsersEmail[0].bnb_address,
                country: getUsersEmail[0].country_id,
                authToken: jwtToken,
              })
            );
          } else {
            return res.send(
              response(
                statusCode.Partial_Content,
                false,
                "Something went wrong!"
              )
            );
          }
        } else {
          return res.send(
            response(statusCode.Partial_Content, false, "Something went wrong!")
          );
        }
        // }
      } else {
        return res.send(
          response(
            statusCode.Unauthorized,
            false,
            "Please register before login."
          )
        );
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send(response());
  }
};

exports.appLoginWithEmail = async (req, res) => {
  try {
    let getUsersEmail = await authModel.getUsersFullDetails(req.body.email);
    if (getUsersEmail.length > 0) {

      let hash = CryptoJS.SHA256(req.body.password).toString(CryptoJS.enc.Hex);
      if (getUsersEmail[0].password === hash) {
        const timestampUUID = uuid.v1();
        // console.log("Timestamp UUID (v1):", timestampUUID);
        const jwtToken = jwt.sign(
          {
            email: getUsersEmail[0].email,
            id: getUsersEmail[0].id,
            jwtId: timestampUUID,
          },
          process.env.JWTSECRETKEY,
          { expiresIn: process.env.JWTSESSIONTIMEOUTFORAPP }
        );
        // Insert Activity
        let activityInserted = await authModel.insertActivity({
          user_id: getUsersEmail[0].id,
          activity_type: "Login",
          ip: requestIp.getClientIp(req),
        });
        if (activityInserted) {
          let jwtId = await authModel.insertJwtID(
            timestampUUID,
            getUsersEmail[0].id
          );
          if (jwtId) {
           
            return res.send(
              response(statusCode.Accepted, true, "Login Successful", {
                id: getUsersEmail[0].id,
                email: getUsersEmail[0].email,
                authToken: jwtToken,
              })
            );
          } else {
            return res.send(
              response(
                statusCode.Partial_Content,
                false,
                "Something went wrong.Please try again"
              )
            );
          }
        } else {
          return res.send(
            response(statusCode.Partial_Content, false, "Something went wrong.Please try again")
          );
        }
      } else {
        return res.send(
          response(statusCode.See_Other, false, "Password does not match")
        );
      }
    } else {
      return res.send(
        response(statusCode.Not_Acceptable, false, "Please registered before login")
      );
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send(response());
  }
};

exports.changePassword = async (req, res) => {
  try {
    if (req.body.password === req.body.confirm_password) {
      let hash = CryptoJS.SHA256(req.body.password).toString(CryptoJS.enc.Hex);
      const updated = await authModel.updatePassword(hash, req.user_id);
      if (updated) {
        return res.send(response(statusCode.OK, true, "success"));
      } else {
        return res.send(
          response(
            statusCode.Not_Modified,
            false,
            "Unable to update password.Try again later"
          )
        );
      }
    }
  } catch (error) {
    res.status(500).send(response());
  }
};

