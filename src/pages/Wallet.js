import React from 'react';
import Header from '../components/Header';
import SpendingForm from '../components/SpendingForm';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <SpendingForm />
      </>
    );
  }
}

export default Wallet;
