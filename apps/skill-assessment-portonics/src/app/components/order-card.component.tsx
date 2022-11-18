import { useState } from 'react';

const OrderCard = ({ order }: any) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <li className="order-card" key={order.id}>
      <div className="top">
        <p>{order.customer_name}</p>
        <p>{order.status}</p>
        <button
          className="button "
          onClick={() => setExpanded(!expanded)}
          style={{
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          &#9660;
        </button>
      </div>
      <div className={`bottom ${expanded ? 'expanded' : 'collapsed'}`}>
        <p>Order ID: {order.id}</p>
        <p>Order Date: {order.customer_address}</p>
        <p>Order Amount: {order.customer_phone}</p>
      </div>
    </li>
  );
};

export default OrderCard;
