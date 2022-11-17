const Order = (sequelize, Sequelize) => {
  const Order = sequelize.define('order', {
    customer_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    customer_email: { type: Sequelize.STRING, allowNull: false },
    customer_phone: { type: Sequelize.STRING, allowNull: false },
    customer_address: { type: Sequelize.STRING, allowNull: false },
    ammount: { type: Sequelize.INTEGER, allowNull: false },
    product_name: { type: Sequelize.STRING, allowNull: false },
    product_description: { type: Sequelize.STRING, allowNull: false },
  });

  return Order;
};

export default Order;
