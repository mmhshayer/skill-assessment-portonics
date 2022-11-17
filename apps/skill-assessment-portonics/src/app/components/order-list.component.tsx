import { useEffect, useState } from 'react';
import useAuth from '../../features/authentication';
import { Order } from './add-order-form.component';
import OrderCard from './order-card.component';

const OrderList = () => {
  const { token } = useAuth();
  const [list, setList] = useState<Order[]>([]);

  useEffect(() => {
    fetch('/api/order', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setList(data.orders));
  }, []);

  return (
    <ul className="order-list">
      {list.map((order) => (
        <OrderCard order={order} key={order.id} />
      ))}
    </ul>
  );
};

export default OrderList;
