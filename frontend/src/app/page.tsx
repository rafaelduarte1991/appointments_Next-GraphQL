'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Appointments from './components/Appointments';

export default function Home() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <Appointments/>
    </QueryClientProvider>
  )
}
