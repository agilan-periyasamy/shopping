import Sequelize from "sequelize";
const OrderSchema = {
  orderId: {
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
  addressId: {
    type: Sequelize.INTEGER,
    unique: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: 'addresses',
      key: 'addressId'
    }
  },
  totalAmount: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0,
  },
  status: {
    type: Sequelize.ENUM('1', '2', '3', '4', '5'),
    defaultValue: 1,
    comment: "	1 - Open 2 - Dispatched 3 - Shipping 4 - Delivered 5 - Cancelled	" 
  }
};

export default OrderSchema;
