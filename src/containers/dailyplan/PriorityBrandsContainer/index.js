import React from 'react';
import PriorityBrandsComponent from '../../../components/dailyplan/PriorityBrandsComponent';

class PriorityBrandsContainer extends React.Component {
  render() {
    const { user, doctor, brands } = this.props.navigation.state.params;
    return (
      <PriorityBrandsComponent
        user={user}
        doctor={doctor}
        brands={brands}
      />
    );
  }
}

export default PriorityBrandsContainer;
