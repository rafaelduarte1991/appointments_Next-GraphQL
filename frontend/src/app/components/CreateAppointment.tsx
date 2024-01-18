'use client'
import Link from 'next/link';

export default function CreateAppointment() {

  const customer = null;

  return (
    <div className="mb-4">
      <div className="mb-5 text-2xl">New Appointment</div>
      <div className="flex flex-row flex-wrap	w-10/12 justify-between">
        <div className="space-x-1">
          <label htmlFor="StartDate">Start Date:</label>
          <input type="text" placeholder="Start Date"/>
        </div>
        <div className="space-x-1">
          <label htmlFor="EndDate">End Date:</label>
          <input type="text" placeholder="End Date"/>
        </div>
        <div className="space-x-1">
          <label htmlFor="Name">CustomerID:</label>
          <input type="text" placeholder="ID"/>
          <button className="bg-slate-500 hover:bg-slate-700 btn">Search</button>
        </div>
      </div>
      <div className="flex flex-row w-2/3 my-5">
        <div className="space-x-1">
          {customer !== null ?
          (
            <div className="flex flex-row">
              <div className="mr-4">Customer: {customer}</div>
              <button className="bg-red-400 hover:bg-red-700 btn">
                Clean
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
