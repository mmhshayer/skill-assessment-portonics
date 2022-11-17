import { FC, useState } from 'react';
import useAuth from '../../features/authentication';
import { toast } from 'react-toastify';

export interface Order {
  id?: number;
  customer_name: string;
  customer_address: string;
  customer_email: string;
  customer_phone: string;
  ammount: number;
  product_name: string;
  product_description: string;
}

const initialOrder: Order = {
  customer_name: '',
  customer_email: '',
  customer_phone: '',
  customer_address: '',
  ammount: 0,
  product_name: '',
  product_description: '',
};

const AddOrderForm: FC = () => {
  const { token } = useAuth();
  const [addOrderForm, setAddOrderForm] = useState(false);
  const [order, setOrder] = useState(initialOrder);

  const toggleAddOrderForm = () => {
    setAddOrderForm(!addOrderForm);
  };

  const handleChange = (e: any) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    }).then((res) => {
      if (res.status === 200) {
        toast.success('Order added successfully');
        setOrder(initialOrder);
        toggleAddOrderForm();
      }
    });
  };

  return (
    <div className="add-order-container">
      <button className="button add-order-button" onClick={toggleAddOrderForm}>
        {addOrderForm ? 'Cancel' : 'Create Order'}
      </button>
      {addOrderForm ? (
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Customer Name:
            <input type="text" name="customer_name" onChange={handleChange} />
          </label>
          <label>
            Customer Email:
            <input type="text" name="customer_email" onChange={handleChange} />
          </label>
          <label>
            Customer Phone:
            <input type="text" name="customer_phone" onChange={handleChange} />
          </label>
          <label>
            Customer Address:
            <input
              type="text"
              name="customer_address"
              onChange={handleChange}
            />
          </label>
          <label>
            Ammount:
            <input type="text" name="ammount" onChange={handleChange} />
          </label>
          <label>
            Product Name:
            <input type="text" name="product_name" onChange={handleChange} />
          </label>
          <label>
            Product Description:
            <input
              type="text"
              name="product_description"
              onChange={handleChange}
            />
          </label>
          <input
            type="submit"
            value="Submit"
            className="button"
            // disabled={!validateForm()}
          />
        </form>
      ) : null}
    </div>
  );
};

export default AddOrderForm;
