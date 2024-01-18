import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";

interface Appointments {
  startsAt: Date
  endsAt: Date
  customerId: String
}
interface ProductsFetchResponse {
  data: {
    getAppointments: Appointments[]
  }
}

const fetcher = ():AxiosPromise<ProductsFetchResponse> => {
  return axios.post('http://localhost:4000/',
  {
    query: `
    query Appointments {
      getAppointments {
        endsAt
        startsAt
        customerId
      }
    }
  `
  })
}
export default function useAppointments() {
  const data = useQuery({
    queryFn: fetcher,
    queryKey: ['Appointments']
  })

  if(data) {
    return data.data?.data?.data?.getAppointments || []
  } else {
    return null;
  }
}