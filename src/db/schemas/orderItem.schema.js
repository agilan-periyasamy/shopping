import Sequelize from "sequelize";
const OrderItemsSchema = {
  orderItemId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  orderId: {
    type: Sequelize.INTEGER,
    unique: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: 'orders',
      key: 'orderId'
    }
  },
  productId: {
    type: Sequelize.INTEGER,
    unique: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: 'products',
      key: 'productId'
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('1', '2', '3', '4', '5'),
    defaultValue: 1,
    comment: "	1 - Open 2 - Dispatched 3 - Shipping 4 - Delivered 5 - Cancelled	" 
  }
};

export default OrderItemsSchema;
