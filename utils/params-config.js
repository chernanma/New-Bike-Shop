const { v4: uuidv4 } = require("uuid");

const params = fileName => {
  const myFile = fileName.originalname.split(".");
  const fileType = myFile[myFile.length - 1];

  const imageParams = {
    Bucket: "user-images-b3734e9a-a8d0-45ef-a826-61eaff0da74d",
    Key: `${uuidv4()}.${fileType}`,
    Body: fileName.buffer,
    ACL: "public-read" // allow read access to this file
  };

  return imageParams;
};

module.exports = params;
