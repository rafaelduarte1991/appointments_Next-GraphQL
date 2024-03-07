'use client'
import Link from 'next/link';
import QueryGetCustomers from '../graphql/customers/Query';
import { useRef, useState } from 'react';
import DatePicker from "react-datepicker";
import { CREATE_APPOINTMENT } from '../graphql/appointments/Mutations';
import { useMutation } from '@apollo/client';
import "react-datepicker/dist/react-datepicker.css";

interface Customers {
  name: String;
  phone: String;
  identificationNumber: string;
}

export default function CreateAppointment() {
  const [customerID, setCustomerID] = useState('');
  const [createNewAppointment, setCreateNewAppointment] = useState(false);
  const [customer, setCustomer] = useState<Customers | null>(null);
  const [searched, setSearched] = useState(false);
  const [isDateAfter, setIsDateAfter] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const customers = QueryGetCustomers();
  const [createAppointment] = useMutation(CREATE_APPOINTMENT);

  const startDateRef = useRef(new Date());
  const endDateRef = useRef(new Date());

  function customerSubmitCheck() {
    setSearched(true)
    return customer !== null
  }

  function dateSubmitCheck() {
    const isDateAfter = endDate > startDate;
    setIsDateAfter(isDateAfter)
    return isDateAfter
  }

  const handleAddAppointment = async () => {
    const isCustomerValid = customerSubmitCheck()
    const isDateValid = dateSubmitCheck()

    if (isCustomerValid && isDateValid) {
      try {
        // const response = await createAppointment({
        //   variables: {
        //     data: {
        //       startsAt: new Date(startDate),
        //       endsAt: new Date(endDate),
        //       customerId: customer?.identificationNumber,
        //     },
        //   },
        // });

        // if (response?.data) {
        //   console.log('Appointment created successfully:', response.data);
            setCreateNewAppointment(false)
            alert("appointment created")
            cleanData()
        // } else {
        //   console.error('Error creating appointment:', response.errors);
        // }
      } catch (error: any) {
        console.error('Error creating appointment:', error.message);
      }
    }
  };

  function checkCustomers() {
    const customerFound = customers?.find(customer => customer.identificationNumber === customerID)
    if(customerFound) {
      setCustomer(customerFound);
    } else {
      setCustomer(null);
    }
    setSearched(true);
  }

  function handleCancelAppointment() {
    setCreateNewAppointment(!createNewAppointment)
    cleanData()
  }

  function cleanData() {
    setCustomer(null)
    setSearched(false)
    setStartDate(new Date())
    setEndDate(new Date())
  }


  return (
    <div className="flex flex-col items-center self-center min-w-64 w-full lg:max-w-[700px] mb-4">
      <div className="text-2xl">
      {!createNewAppointment &&
          <button
            onClick={() => setCreateNewAppointment(!createNewAppointment)}
            className={`bg-blue-500 hover:bg-blue-700 btn max-w-64 w-full self-center transition-colors duration-300`}
          >
            Create New Appointment
          </button>
        }
      </div>
      {createNewAppointment &&
        <>
          <div className="flex flex-col sm:flex-row flex-wrap	w-full sm:max-w-[550px] self-center justify-between ">
            <div className="inputDiv">
              <label htmlFor="Name" className='my-auto'>CustomerID:</label>
              <input className='input self-center' type="text" placeholder="ID" onChange={(e) => setCustomerID(e.target.value)}/>
              <div className='flex flex-row justify-between w-60 self-center mt-1'>
                <button
                  onClick={checkCustomers}
                  className="bg-slate-500 hover:bg-slate-700 btn w-28 self-center"
                  >
                  Search
                </button>
                <button onClick={() => '/customers'} className="bg-blue-500 hover:bg-blue-700 btn w-28 self-center ml-2">
                  New
                </button>
              </div>
            </div>
            {searched && customer === null &&
                <div className="custSearchResponse text-red-600">
                  Customer: Not found
                </div>
              }
              {customer !== null && searched &&
                <div className="custSearchResponse">
                  Customer: {customer?.name.toString()}
                </div>
              }
            <div className='max-w-[350px] self-center sm:max-w-[600px] sm:flex sm:flex-row sm:w-full'>
              <div className="inputDiv sm:flex-wrap sm:justify-between">
                <label htmlFor="StartDate">Start Date:</label>
                <DatePicker
                  value={startDate.toLocaleDateString('en-US') + ' - ' +  startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric'})}
                  showTimeSelect
                  className='input'
                  selected={startDateRef.current}
                  onChange={(date:Date) => {
                    setStartDate(date);
                    startDateRef.current = date;
                  }}
                />
              </div>
              <div className="inputDiv sm:flex-wrap sm:justify-between">
                <label htmlFor="EndDate">End Date:</label>
                <DatePicker
                  value={endDate.toLocaleDateString('en-US') + ' - ' +  endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric'})}
                  showTimeSelect
                  className='input'
                  placeholderText='Select a date after the start date.'
                  selected={endDateRef.current}
                  onChange={(date:Date) => {
                    setEndDate(date);
                    endDateRef.current = date;
                  }}
                  />
                  <div className='sm:w-full sm:text-right'>
                    {isDateAfter === false && (
                      <span className='text-red-600'>Select a date after the start date.</span>
                    )}
                  </div>

              </div>
            </div>
          </div>
          <div className='w-full text-center mt-3'>
            <button onClick={handleAddAppointment} className="bg-blue-500 hover:bg-blue-700 btn max-w-64 w-full self-center">
              Create Appoinment
            </button>
          </div>
          <button onClick={handleCancelAppointment} className="bg-red-500 hover:bg-red-700 btn max-w-64 w-full self-center mt-3">
            Cancel
          </button>
        </>
        }
    </div>
  );
};
