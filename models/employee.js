// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");
// Creating our Employee model
module.exports = function(sequelize, DataTypes) {
  const Employee = sequelize.define("Employee", {
    first_name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    job_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  Employee.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // // In this case, before a User is created, we will automatically hash their password
  Employee.addHook("beforeCreate", employee => {
    employee.password = bcrypt.hashSync(
      employee.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return Employee;
};
