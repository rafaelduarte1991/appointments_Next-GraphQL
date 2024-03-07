import React from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import { FaPencilAlt } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_APPOINTMENT } from '../graphql/appointments/Mutations';

interface AppointmentActionsProps {
  appointmentId: String;
}

export function AppointmentActions({ appointmentId }: AppointmentActionsProps) {
  const [deleteAppointment] = useMutation(DELETE_APPOINTMENT);

  const handleRemoveAppointment = async () => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this appointment?');

      if (confirmed) {
        const response = await deleteAppointment({
          variables: {
            id: appointmentId,
          },
        });

        if (response?.data) {
          console.log('Appointment deleted successfully:', response.data);
        } else {
          console.error('Error deleting appointment:', response.errors);
        }
      }
    } catch (error:any) {
      console.error('Error deleting appointment:', error.message);
    }
  };

  return (
    <div className="flex space-x-2 sm:space-x-4 justify-center">
      <div>
        <button>
          <FaPencilAlt size={17} />
        </button>
      </div>
      <div>
        <button onClick={handleRemoveAppointment}>
          <HiOutlineTrash size={20} />
        </button>
      </div>
    </div>
  );
}

