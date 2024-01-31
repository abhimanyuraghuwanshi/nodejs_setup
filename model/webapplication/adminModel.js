const promisePool = require('../../config/databaseconnection')


exports.getAdminInfo = async (data) => {
  let sql = `select id,username,password,user_role from admin where username = ?`;
  const [result] = await promisePool.query(sql,[data.username]);
  return result;
};

exports.insertActivity = async (activityData) => {
  let sql = `INSERT INTO activity(activity_type, user_id, ip) VALUES( ?,?,?) `;
  const [result] = await promisePool.query(sql,[activityData.activity_type  , activityData.user_id, activityData.ip]);
  return result.insertId;
};
exports.getLoginActivity = async () => {
  let sql = `select id,activity_type,user_id,ip,created_at from activity order by id desc`;
  const [result] = await promisePool.query(sql);
  return result;
};
exports.getAllUsers = async () => {
  let sql = `select id,first_name,last_name,bio,email,password,profile_pic,jwt_id,created_at from registration order by id desc`;
  const [result] = await promisePool.query(sql);
  return result;
};