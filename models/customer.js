module.exports = function(sequelize, DataTypes) {
  const Customer = sequelize.define("Customer", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
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
    address_billing: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zip_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Customer.associate = function(models) {
    // Associating Customer with Order
    // When an Customer is deleted, also delete any associated Order
    Customer.hasMany(models.Order, {
      onDelete: "cascade"
    });
  };

  return Customer;
};
