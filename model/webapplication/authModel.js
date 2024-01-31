const promisePool = require('../../config/databaseconnection')

exports.checkIfExist = async (email) => {
    let sql = `select id from registration where email = ?  `;
    const [result] = await promisePool.query(sql,[email]);
    return result;
}

exports.insertUser = async (body) => {
    let sql = `INSERT INTO registration (first_name, last_name, email, password, profile_pic) VALUES ( ?, ?, ?, ?, 'defaultProfile.png') `;
    const [result] = await promisePool.query(sql,[body.first_name,body.last_name,body.email,body.password]);
    return result;
}

exports.getUsersProfile = async (id) => {
    let sql = `select id,first_name,last_name,bio,email,password,profile_pic,jwt_id,created_at from registration where id = ?`;
    const [result] = await promisePool.query(sql,[id]);
    return result;
}


///////////////////////////////////////////////////////////////////////////
exports.getCountryList = async () => {
    let sql = `Select id, name from country order by (case when name ='India' then 0 else 1 end),trim(name)  asc  `;
    const [result] = await promisePool.query(sql);
    return result;
}

exports.insertActivity = async (activityData) => {
    let sql = `INSERT INTO activity(activity_type, user_id, ip) VALUES( ? ,? ,? ) `;
    const [result] = await promisePool.query(sql,[activityData.activity_type,activityData.user_id,activityData.ip]);
    return result.insertId;
}
exports.insertJwtID = async (jwt,user_id) => {
    let sql = `UPDATE registration SET jwt_id = ? WHERE id = ? `;
    const [result] = await promisePool.query(sql,[jwt,user_id]);
    return result.affectedRows;
}

exports.getUsersDetails = async (email, bnb_address) => {
    let sql = `SELECT is_active, jwt_id FROM registration where email = ?`;
    const [result] = await promisePool.query(sql,[email]);
    return result;
}
exports.getUsersDetailsAddress = async (bnb_address) => {
    let sql = `SELECT * FROM registration where bnb_address = ?`;
    const [result] = await promisePool.query(sql,[bnb_address]);
    return result;
}

exports.contactUsForm = async (body) => {
    let sql = `INSERT INTO sContactUs (name, email, phone, text_message, subject, mobile_type,mobile_detail,image,video) VALUES ( ? ,? ,? ,? ,? ,? ,?,?,? ) `;
    const [result] = await promisePool.query(sql,[body.name, body.email, body.phone,body.text,body.subject, body.mobile_type ,body.mobile_detail,body.imageName,body.videoName]);
    return result;
}
exports.profileUpdate = async (body,user_id) => {
    let sql = `UPDATE registration SET first_name = ?,  last_name = ?,  bio = ?  WHERE id = ? `;
    const [result] = await promisePool.query(sql,[body.first_name,body.last_name,body.bio, user_id]);
    return result;
}

exports.getUserDetailForEmail = async (user_id) => {
    let sql = `select coalesce(first_name," ") as first_name,coalesce(last_name, " ") as last_name, coalesce(email, "NA") as email from registration where id = ?`;
    const [result] = await promisePool.query(sql,[ user_id]);
    return result;
}

exports.getUserCountryTime = async (user_id) => {
    let sql = `select GetCountryGMT(?) as gmt`;
    const [result] = await promisePool.query(sql,[ user_id]);
    return result;
}

exports.getUsersFullDetails = async (email) => {
    let sql = `select id,first_name,last_name,bio,email,password,profile_pic,jwt_id,created_at from registration where email= ?`;
    const [result] = await promisePool.query(sql,[email]);
    return result;
}
exports. updatePassword = async (hash, user_id) => {
    let sql = `UPDATE registration SET password = ? WHERE id = ? `;
    const [result] = await promisePool.query(sql,[ hash,user_id]);
    return result.affectedRows;
}