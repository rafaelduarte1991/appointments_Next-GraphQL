import { useQuery } from "@apollo/client";
import gql from 'graphql-tag';

interface Customers {
  name: String;
  phone: String;
  identificationNumber: string;
}

interface ProductsFetchResponse {
  getCustomers: Customers[];
}

const GET_CUSTOMERS = gql`
  query Customers {
    getCustomers {
      name
      phone
      identificationNumber
    }
  }
`;

export default function QueryGetCustomers() {
  const { data, loading, error } = useQuery<ProductsFetchResponse>(GET_CUSTOMERS);

  if (loading) {
    return null;
  }

  if (error) {
    console.error('Error fetching customers:', error);
    return null;
  }

  return data?.getCustomers || [];
}
