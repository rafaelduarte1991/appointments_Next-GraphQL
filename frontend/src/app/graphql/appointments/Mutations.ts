import { gql } from '@apollo/client';

export const DELETE_APPOINTMENT = gql`
  mutation DeleteAppointment($id: String!) {
    deleteAppointment(id: $id)
  }
`;