module.exports = function(sequelize, DataTypes) {
  const Order_detail = sequelize.define("Order_detail", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    sub_total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    }
  });

  // Order_detail.associate = function(models) {
  //   // We're saying that a Order_detail belong to a Order
  //   // A Order_detail can't be created without a Order due to the foreign key constraint
  //   Order_detail.belongsTo(models.Order, {
  //     foreignKey: "id",
  //     as: "order"
  //   });
  // };

  // Order_detail.associate = function(models) {
  //   // We're saying that a Order_detail belong to a Order
  //   // A Order_detail can't be created without a Order due to the foreign key constraint
  //   Order_detail.belongsTo(models.Product, {
  //     foreignKey: "id",
  //     as: "product"
  //   });
  // };
  return Order_detail;
};
