import Sequelize from "sequelize";
const CategorySchema = {
  categoryId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  categoryName: {
    type: Sequelize.STRING,
    defaultValue: ""
  },
  status: {
    type: Sequelize.ENUM('1', '2'),
    defaultValue: 1,
    comment: "1 - Active 2 - Inactive" 
  } 
};

export default CategorySchema;
