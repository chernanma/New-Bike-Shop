module.exports = function(sequelize, DataTypes) {
  const Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    msrp: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    model: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 4]
      }
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  Product.associate = function(models) {
    // We're saying that a Product should belong to a Brand, Category and Product_type
    // A Product can't be created without a Brand, Category and Product_type due to the foreign key constraint
    Product.belongsTo(models.Brand, {
      foreignKey: {
        allowNull: false
      }
    });
    Product.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });
    Product.belongsTo(models.Product_type, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Product.associate = function(models) {
    Product.hasMany(models.Order_detail, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Product;
};
