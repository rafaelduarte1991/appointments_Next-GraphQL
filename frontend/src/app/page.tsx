'use client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Appointments from './components/Appointments';

export default function Home() {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <Appointments />
    </ApolloProvider>
  )
}
