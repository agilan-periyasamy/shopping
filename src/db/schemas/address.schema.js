import Sequelize from "sequelize";
const AddressSchema = {
  addressId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    unique: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: 'users',
      key: 'userId'
    }

  },
  fullName: {
    type: Sequelize.STRING,
    defaultValue: ""
  },
  address1: {
    type: Sequelize.STRING,
    defaultValue: ""
  },
  address2: {
    type: Sequelize.STRING,
    defaultValue: ""
  },
  city: {
    type: Sequelize.STRING,
    defaultValue: ""
  },
  state: {
    type: Sequelize.STRING,
    defaultValue: ""
  },
  postalCode: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: Sequelize.BIGINT(11),
    allowNull: false
  }, 
  locationType: {
    type: Sequelize.ENUM('1', '2'),
    defaultValue: 1,
    comment: "1 - Home 2 - Workplace" 
  },
  status: {
    type: Sequelize.ENUM('1', '2'),
    defaultValue: 1,
    comment: "1 - Active 2 - Inactive" 
  }
};

export default AddressSchema;
