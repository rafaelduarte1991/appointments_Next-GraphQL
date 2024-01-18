'use client'
import useAppointments from "../hooks/useAppointments";
import useCustomers from "../hooks/useCustomers";

export default function AppointmentsList() {
  const data = useAppointments();
  const customers = useCustomers();

  return (
    <div className="h-screen flex flex-col">
      <div className="mt-8 mb-4">
        <label className="mr-1">Select Date</label>
        <input type="text"/>
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
            {data && data.map((item, index) => (
              <tr key={index}>
                <td>{new Date(item.startsAt).toLocaleDateString('en-US') + ' - ' +  new Date(item.startsAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric'})}</td>
                <td>{new Date(item.endsAt).toLocaleDateString('en-US') + ' - ' +  new Date(item.endsAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric'})}</td>
                <td>{customers?.find(customer => customer._id === item.customerId)?.name}</td>
                <td>{customers?.find(customer => customer._id === item.customerId)?.phone}</td>
                <td>{'actions'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
