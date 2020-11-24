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
    }
  });

  Order.associate = function(models) {
    // Associating Customer with Order
    // When an Customer is deleted, also delete any associated Order
    Order.hasMany(models.Payment, {
      onDelete: "cascade"
    });
  };

  Order.associate = function(models) {
    Order.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Order.associate = function(models) {
    Order.hasMany(models.Order_detail, {
      onDelete: "cascade"
    });
  };

  return Order;
};
