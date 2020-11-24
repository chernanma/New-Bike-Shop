module.exports = function(sequelize, DataTypes) {
  const Brand = sequelize.define("Brand", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Brand.associate = function(models) {
    // Associating Product_type with Product
    Brand.hasMany(models.Product, {
      onDelete: "cascade"
    });
  };
  return Brand;
};
