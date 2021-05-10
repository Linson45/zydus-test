import React from 'react';
import RxAbmSubmitApprovelsComponen from '../../../components/rx_tracker/RxAbmSubmitApprovelsComponent';
import {connect} from 'react-redux';
import {postABMUploadList} from '../../../actions';
class RxAbmSubmitApprovelsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      docList: {
        isInternetConnected: true,
      },
      list: [],
      searchQuery: null,
    };
  }

  static navigationOptions = {
    title: 'Rx',
  };
 
  render() {
    const user = this.props.navigation.state.params.docData;
    const userDetails = this.props.navigation.state.params.userDetails;
    const reasons = this.props.navigation.state.params.redirection;
    const boNameData = this.props.navigation.state.params.boNameData;

    return (
      <RxAbmSubmitApprovelsComponen
        user={user}
        userDetails={userDetails}
        reasons={reasons}
        boNameData={boNameData}

      />
    );
  } 
}

const mapStateToProps = state => ({
    SubmitRxUploadImage: state.SubmitRxUploadImage,
});

export default connect(
  mapStateToProps,
  {postABMUploadList},
)(RxAbmSubmitApprovelsContainer);
