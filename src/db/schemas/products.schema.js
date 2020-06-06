import Sequelize from "sequelize";
const ProductSchema = {
  productId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  categoryId: {
    type: Sequelize.INTEGER,
    unique: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: 'categories',
      key: 'categoryId'
    }
  },
  productName: {
    type: Sequelize.STRING,
    defaultValue: ""
  },
  description: {
    type: Sequelize.STRING,
    defaultValue: ""
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('1', '2'),
    defaultValue: 1,
    comment: "1 - Active 2 - Inactive" 
  }
};

export default ProductSchema;
