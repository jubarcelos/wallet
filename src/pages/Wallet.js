import React from 'react';
import Header from '../components/Header';
import SpendForm from '../components/SpendForm';
import TableExpenses from '../components/TableExpenses';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <SpendForm />
        <TableExpenses />
      </>
    );
  }
}

export default Wallet;
