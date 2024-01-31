const response = require('../../../shared_modules/response')
const authModal =require('../../../model/webapplication/authModel')



exports.bussinessLogic = async (req, res) => {
    try {
      let getUserEmail = await authModal.getUserDetailForEmail(req.user_id);
      if(getUserEmail.length){
        res.send( response(200, true, "Dummy success") );
      }else{
        res.send( response(200, false, "Transaction failed!") );
      }
    } catch (error) {
      res.send(response());
    }
  };