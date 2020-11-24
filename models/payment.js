module.exports = function(sequelize, DataTypes) {
  const Payment = sequelize.define("Payment", {
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Payment.associate = function(models) {
    Payment.belongsTo(models.Order, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Payment;
};
