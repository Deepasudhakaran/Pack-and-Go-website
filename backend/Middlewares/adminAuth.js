const jwt = require('jsonwebtoken');
const Admin = require('../Model/AdminModel')

require('dotenv').config();


module.exports = async (req, res, next) => {
  
  try{
    const authHeader = req.headers.authorization;
    console.log('Received auth token:', authHeader);

    const authToken = authHeader.replace(/^Bearer\s+/i, '');
    console.log(' Received Auth token:', authToken);

    if( !authToken)
    return res.status(401).json({
     message: 'No auth token',
    });

const decoded = jwt.verify(authToken, process.env.ADMIN_SECRET_KEY);
console.log("Decoded", decoded);

const admin = await Admin.findOne({_id: decoded.id});
console.log("Decoded", decoded);

if (!admin)
return res.status(401).json({
  message: "Unauthorized token",
});

req.admin = admin;
next();

  } catch (error) {
    return res.json({
      message: "Unauthorized access",
    });
  }
};










