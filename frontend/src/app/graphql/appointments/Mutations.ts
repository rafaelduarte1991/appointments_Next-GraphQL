import { gql } from '@apollo/client';

export const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment($data: CreateAppointmentInput!) {
    createAppointment(data: $data) {
      startsAt
      endsAt
      customerId
    }
  }
`;

export const DELETE_APPOINTMENT = gql`
  mutation DeleteAppointment($id: String!) {
    deleteAppointment(id: $id)
  }
`;