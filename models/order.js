module.exports = function(sequelize, DataTypes) {
  const Order = sequelize.define("Order", {
    total: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    discount: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    tax: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    shipping: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true
    },
    payment_status: {
      type: DataTypes.STRING,
      defaultValue: "Pending",
      allowNull: true
    }
  });

  Order.associate = function(models) {
    Order.hasOne(models.Payment);
    //};

    //Order.associate = function(models) {
    Order.belongsTo(models.Customer);

    Order.belongsToMany(models.Product, { through: models.Order_detail });
  };
  return Order;
};
