import { FC, useState } from 'react';

interface Invoice {
  customer_name: string;
  customer_address: string;
  customer_email: string;
  customer_phone: string;
  ammount: number;
  product_name: string;
  product_description: string;
}

const initialInvoice = {
  customer_name: '',
  customer_email: '',
  customer_phone: '',
  customer_address: '',
  ammount: 0,
  products_name: '',
  products_description: '',
};

const AddInvoiceForm: FC = () => {
  const [addInvoiceForm, setAddInvoiceForm] = useState(false);
  const [invoice, setInvoice] = useState(initialInvoice);

  const toggleAddInvoiceForm = () => {
    setAddInvoiceForm(!addInvoiceForm);
    console.log('addInvoiceForm', addInvoiceForm);
  };

  const handleChange = (e: any) => {
    setInvoice({
      ...invoice,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(invoice);
  };

  return (
    <div className="add-invoice-container">
      <button
        className="button add-invoice-button"
        onClick={toggleAddInvoiceForm}
      >
        {addInvoiceForm ? 'Cancel' : 'Create Invoice'}
      </button>
      {addInvoiceForm ? (
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
            <input type="text" name="customer_adress" onChange={handleChange} />
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

export default AddInvoiceForm;
