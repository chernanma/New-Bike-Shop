module.exports = function(sequelize, DataTypes) {
  const Product_type = sequelize.define("Product_type", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    image: {
      type: DataTypes.BLOB('long'),
      allowNull: false
    }
  });

  Product_type.associate = function(models) {
    // Associating Product_type with Product
    Product_type.hasMany(models.Product, {
      onDelete: "cascade"
    });
  };
  return Product_type;
};
