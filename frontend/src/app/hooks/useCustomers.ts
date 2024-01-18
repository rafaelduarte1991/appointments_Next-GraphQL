import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";

interface Customers {
  name: String
  phone: String
  _id: String
  identificationNumber:string
}
interface ProductsFetchResponse {
  data: {
    getCustomers: Customers[]
  }
}

const fetcher = ():AxiosPromise<ProductsFetchResponse> => {
  return axios.post('http://localhost:4000/',
  {
    query: `
    query Customers {
      getCustomers {
        name
        phone
        _id
        identificationNumber
      }
    }
  `
  })
}
export default function useCustomers() {
  const data = useQuery({
    queryFn: fetcher,
    queryKey: ['Customers']
  })
  if(data) {
    return data.data?.data?.data?.getCustomers || []
  } else {
    return null;
  }
}