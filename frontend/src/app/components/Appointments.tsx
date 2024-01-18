'use client'
import AppointmentsList from "./AppointmentsList";
import CreateAppointment from "./CreateAppointment";

export default function Appointments() {
  return (
    <div className="h-screen flex flex-col px-5 min-w-80 max-w-7xl mx-auto">
      <span className="text-4xl my-4 self-center font-bold">
        Appointments
      </span>
      <CreateAppointment/>
      <AppointmentsList/>
    </div>
  );
};
