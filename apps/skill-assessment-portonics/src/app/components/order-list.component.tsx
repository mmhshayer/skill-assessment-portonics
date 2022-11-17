import { useEffect } from 'react';
import useAuth from '../../features/authentication';

const OrderList = () => {
  const { token } = useAuth();

  useEffect(() => {
    fetch('/api/order', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  });

  return <div>OrderList</div>;
};

export default OrderList;
