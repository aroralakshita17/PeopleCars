
import { ApolloClient, InMemoryCache,ApolloProvider } from '@apollo/client';
import './App.css';
import AddPerson from './components/forms/AddPerson'
import Title from './components/layouts/Title'
import Persons from './components/lists/Persons'
import AddCar from './components/forms/AddCar'
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})
const App = () => {
  return (
    
    <ApolloProvider client={client}>
    <div className='App'>
      <Title />
      <h2>Add Person</h2>
      <AddPerson />
      <h2>Add Car</h2>
        <AddCar />
        <h2>Records</h2>
        <Persons />
       
    </div>
  </ApolloProvider>
)
}

export default App
