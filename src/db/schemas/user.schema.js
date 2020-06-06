import Sequelize from "sequelize";
// import { PASSWORD_MAX, PASSWORD_MIN } from "./config";
const UserSchema = {
  userId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    defaultValue: ""
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  mobile: {
    type: Sequelize.BIGINT(11),
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  role: {
    type: Sequelize.ENUM('1', '2', '3'),
    defaultValue: 1,
    comment: "1 - Customer 2 - Vendor 3 - Admin" 
  },
  status: {
    type: Sequelize.ENUM('1', '2'),
    defaultValue: 1,
    comment: "1 - Active 2 - Inactive" 
  } 
};

export default UserSchema;
