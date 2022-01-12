import React from 'react';
import Header from '../components/Header';
import SpendForm from '../components/SpendForm';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <SpendForm />
      </>
    );
  }
}

export default Wallet;
