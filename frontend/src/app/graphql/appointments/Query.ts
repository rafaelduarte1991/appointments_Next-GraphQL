import { useQuery } from "@apollo/client";
import gql from 'graphql-tag';

interface Appointments {
  _id: String,
  startsAt: Date;
  endsAt: Date;
  customerId: String;
}

interface ProductsFetchResponse {
  getAppointments: Appointments[];
}

const GET_APPOINTMENTS = gql`
  query Appointments {
    getAppointments {
      _id
      endsAt
      startsAt
      customerId
    }
  }
`;

export default function QueryGetAppointments() {
  const { data, loading, error } = useQuery<ProductsFetchResponse>(GET_APPOINTMENTS);

  if (loading) {
    return null;
  }

  if (error) {
    console.error('Error fetching appointments:', error);
    return null;
  }

  return data?.getAppointments || [];
}
