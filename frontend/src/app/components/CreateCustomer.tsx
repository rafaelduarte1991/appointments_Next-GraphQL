'use client'

export default function CreateCustomer() {

  return (
    <div>
      <div>New Customer</div>
      <div>
        <label htmlFor="Name">Name:</label>
        <input type="text" placeholder="Name"/>
      </div>
      <div>
        <label htmlFor="Name">Identification Number:</label>
        <input type="text" placeholder="ID"/>
      </div>
      <div>
        <label htmlFor="Name">Address</label>
        <input type="text" placeholder="Address"/>
      </div>
      <div>
        <label htmlFor="Name">Phone Number:</label>
        <input type="text" placeholder="Phone"/>
      </div>
      <div>
        <button>Add Customer</button>
      </div>
    </div>
  );
};