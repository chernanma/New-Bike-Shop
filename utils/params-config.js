const { v4: uuidv4 } = require("uuid");
const params = fileName => {
  const myFile = fileName.originalname.split(".");
  const fileType = myFile[myFile.length - 1];

  const imageParams = {
    Bucket: "user-images-4e329895-18bb-4fbe-90ac-b43fcb4a0c33",
    Key: `${uuidv4()}.${fileType}`,
    Body: fileName.buffer,
    ACL: "public-read" // allow read access to this file
  };

  return imageParams;
};

module.exports = params;
