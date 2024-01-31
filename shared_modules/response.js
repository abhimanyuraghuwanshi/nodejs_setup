const generateTimestampWithOffset = require('./unixtime')

// class Response {
//     constructor(data, message, statusBool, statusCode = 200) {
//         this.status = statusBool;
//         this.statusCode = statusCode;
//         this.message = message;
//         this.data = data;
//     }
// }
// //  response = new Response("Success", true, { id:7698, mailto:"qwert@gmail.com" });

// module.exports = Response

function response(statuscode = 404, successBool = false,  message = "Oops, there was a hiccup.", dataValue = null) {
    return {
        success: successBool,
        status: statuscode,
        msg: message,
        epoch:generateTimestampWithOffset(),
        data: dataValue
    }
}
module.exports = response
