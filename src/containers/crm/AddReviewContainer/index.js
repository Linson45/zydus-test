import React from 'react';
import { connect } from 'react-redux';
import ParentView from '../../../components/ParentView';
import SimpleDisplay from '../../../components/SimpleDisplay';

class CrmAddReviewContainer extends React.Component {
    static navigationOptions = {
      title: 'Review Application',
    };

    render() {
      const data = this.props.crmAddData;

      return (
        <ParentView>
          <SimpleDisplay
            data={data}
          />
        </ParentView>
      );
    }
}

const mapStateToProps = (state) => ({
  crmAddData: state.crmAddData,
});

export default connect(
  mapStateToProps,
  { }
)(CrmAddReviewContainer);
