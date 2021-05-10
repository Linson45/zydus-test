import React from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {
  resetSubmit, loadCrmBoDocPastEngagement, loadCrmEngagementType, crmAddPastEngagement
} from '../../../actions';
import Adapter from '../../../util/Adapter';
import AddSelectDetailComponent from '../../../components/crm/AddSelectDetailComponent';

class CrmAddSelectDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true
    };
  }

  componentDidMount() {
    NetInfo.isConnected.fetch()
      .then((isConnected) => {
        this.setState({ isInternetConnected: isConnected }, () => {
          if (isConnected) {
            if (!this.props.crmAddData.is_review) {
              this.props.resetSubmit();
            }
          }
        });
      });
  }

    onRefresh = () => {
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              if (!this.props.crmAddData.is_review) {
                this.props.resetSubmit();
              }
            }
          });
        });
    };

    static navigationOptions = {
      title: 'Select Doctor',
    };

    goToSelectAbm() {
      const { user } = this.props.navigation.state.params;
      this.props.navigation.navigate('CrmAbmSelection', { user });
    }

    goToSelectBo() {
      const { abm } = this.props.crmAddData;
      if (!abm) {
        alert('Select ABM First');
        return;
      }
      const { user } = this.props.navigation.state.params;
      this.props.navigation.navigate('CrmBoSelection', { user, abm });
    }

    goToSelectDoctor() {
      const { bo, abm } = this.props.crmAddData;
      if (!bo) {
        alert('Select BO First');
        return;
      }
      const { user } = this.props.navigation.state.params;
      this.props.navigation.navigate('CrmDoctorSelection', { user, bo, abm });
    }

    async openEngagementModal() {
      const user = await Adapter.getUser;
      const {
        rep_code, company_code, sbu_code, user_type
      } = user;
      const data = {
        rep_code,
        company_code,
        sbu_code,
        group_code: user_type
      };
      this.props.loadCrmEngagementType(data);
    }

    addPastEngagement() {
      this.props.crmAddPastEngagement({
        id: '1',
        type: 'CA',
        marketing_efforts: 15000,
        date: '24-Nov-1995'
      });
    }

    next() {
      const { abm, bo, doctor } = this.props.crmAddData;
      if (abm && bo && doctor) {
        const { user } = this.props.navigation.state.params;
        this.props.navigation.navigate('CrmAddDoctorMetric', { user });
      }
    }

    render() {
      const {
        abm, bo, doctor, engagement, past_engagements
      } = this.props.crmAddData;
      const { crmEngagementType } = this.props;
      const goToSelectAbm = this.goToSelectAbm.bind(this);
      const goToSelectBo = this.goToSelectBo.bind(this);
      const goToSelectDoctor = this.goToSelectDoctor.bind(this);
      const openEngagementModal = this.openEngagementModal.bind(this);
      const addPastEngagement = this.addPastEngagement.bind(this);
      const next = this.next.bind(this);

      return (
        <AddSelectDetailComponent
          abm={abm}
          bo={bo}
          doctor={doctor}
          crmEngagementType={crmEngagementType}
          goToSelectAbm={goToSelectAbm}
          goToSelectBo={goToSelectBo}
          goToSelectDoctor={goToSelectDoctor}
          engagement={engagement}
          past_engagements={past_engagements}
          openEngagementModal={openEngagementModal}
          addPastEngagement={addPastEngagement}
          next={next}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  crmAddData: state.crmAddData,
  crmEngagementType: state.crmEngagementType,
});

export default connect(
  mapStateToProps,
  {
    resetSubmit, loadCrmBoDocPastEngagement, loadCrmEngagementType, crmAddPastEngagement
  }
)(CrmAddSelectDetailContainer);
