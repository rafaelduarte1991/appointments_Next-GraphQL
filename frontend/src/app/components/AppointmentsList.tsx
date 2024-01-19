'use client'
import { useState } from "react";
import QueryGetAppointments from "../graphql/appointments/Query";
import QueryGetCustomers from "../graphql/customers/Query";
import DatePicker from "react-datepicker";
import { AppointmentActions } from "./AppointmentActions";
import "react-datepicker/dist/react-datepicker.css";

interface Appointment {
  _id: String,
  startsAt: Date;
  endsAt: Date;
  customerId: String;
}

export default function AppointmentsList() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [filteredData, setFilteredData] = useState<Appointment[]>([]);
  const data: Appointment[] | null = QueryGetAppointments();
  const customers = QueryGetCustomers();

  const handleSelect = () => {
    const filteredAppointments = data?.filter((item) => {
      const startDate = new Date(item.startsAt);

      return (
        startDate.getDate() === selectedDate.getDate() &&
        startDate.getMonth() === selectedDate.getMonth() &&
        startDate.getFullYear() === selectedDate.getFullYear()
      );
    });

    if (filteredAppointments) setFilteredData(filteredAppointments);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="mt-5 mb-4 flex justify-center flex-wrap w-full">
        <label className="mr-1 mb-2">Select Date</label>
        <DatePicker
          className="mx-3 mb-2"
          selected={selectedDate}
          onChange={(date: Date) => setSelectedDate(date)}
        />
        <button className="bg-slate-500 hover:bg-slate-700 btn" onClick={handleSelect}>Select</button>
      </div>
      <div className="overflow-x-auto w-90">
        <table className="w-full min-w-[800px] text-center rounded overflow-hidden border border-solid divide-gray-900">
          <thead className="bg-zinc-300">
            <tr>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0
              ? filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {new Date(item.startsAt).toLocaleDateString("en-US") +
                        " - " +
                        new Date(item.startsAt).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                        })}
                    </td>
                    <td>
                      {new Date(item.endsAt).toLocaleDateString("en-US") +
                        " - " +
                        new Date(item.endsAt).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                        })}
                    </td>
                    <td>
                      {customers?.find(
                        (customer) => customer.identificationNumber === item.customerId
                      )?.name}
                    </td>
                    <td>
                      {customers?.find(
                        (customer) => customer.identificationNumber === item.customerId
                      )?.phone}
                    </td>
                    <td>
                      <AppointmentActions appointmentId={item._id}/>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
