'use client'
import Link from 'next/link';
import useCustomers from '../hooks/useCustomers';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateAppointment() {
  const [customerID, setCustomerID] = useState('');
  const [customer, setCustomer] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const customers = useCustomers();

  function checkCustomers() {
    const customerFound = customers?.find(customer => customer.identificationNumber === customerID)
    console.log(customerFound)
    if(customerFound) setCustomer(customerFound.name.toString())
  }

  return (
    <div className="mb-4">
      <div className="mb-5 text-2xl">New Appointment</div>
      <div className="flex flex-row flex-wrap	w-10/12 justify-between">
        <div className="space-x-1">
          <label htmlFor="StartDate">Start Date:</label>
          <DatePicker
            value={startDate.toLocaleDateString('en-US') + ' - ' +  startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric'})}
            showTimeSelect
            onChange={(date:Date) => setStartDate(date)}
          />
        </div>
        <div className="space-x-1">
          <label htmlFor="EndDate">End Date:</label>
          <DatePicker
            value={endDate > startDate ? endDate.toLocaleDateString('en-US') + ' - ' +  endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric'}) : ('End date < Start date')}
            showTimeSelect
            onChange={(date:Date) => setEndDate(date)}
            />
        </div>
        <div className="space-x-1">
          <label htmlFor="Name">CustomerID:</label>
          <input type="text" placeholder="ID" onChange={(e) => setCustomerID(e.target.value)}/>
          <button onClick={checkCustomers} className="bg-slate-500 hover:bg-slate-700 btn">Search</button>
        </div>
      </div>
      <div className="flex flex-row w-2/3 my-5">
        <div className="space-x-1">
          {customer !== '' ?
          (
            <div className="flex flex-row">
              <div className="mr-4">Customer: {customer}</div>
              <button onClick={() => setCustomer('')} className="bg-red-400 hover:bg-red-700 btn">
                Clear
              </button>
            </div>
          )
          :
          (
          <div>
            <Link href="/customers">
              <button onClick={() => '/customers'} className="bg-blue-500 hover:bg-blue-700 btn">
                New Customer
              </button>
            </Link>
          </div>
          )}
        </div>
      </div>
      <div>
          <button className="bg-blue-500 hover:bg-blue-700 btn">
            Add Appoinment
          </button>
        </div>
    </div>
  );
};
