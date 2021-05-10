import React, { Component } from 'react';
import { connect } from 'react-redux';
import HelpComponent from '../../../components/help/HelpComponent';
import { addQuery, loadAddTicketData, loadPastQueries } from '../../../actions';
import Adapter from '../../../util/Adapter';

class HelpContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

    static navigationOptions = {
      title: 'Help & Support',
    };

    componentDidMount() {
      this.props.loadAddTicketData();
      this.props.loadPastQueries();
    }

    onSubmit = async () => {
      const me = await Adapter.getUser();
      const { company_code, sbu_code, rep_code } = me;
      const { query, category, priority } = this.state;
      if (query && category && priority) {
        const data = {
          query,
          category,
          priority,
          type: 'internal',
          company_code,
          sbu_code,
          rep_code,
        };
        this.setState({ loading: true });
        let response = await addQuery(data);
        if (response) {
          if (typeof (response) !== 'string') {
            response = JSON.stringify(response);
          }
          response = response.trim();
          if (response === 'Query uploaded') {
            alert('Query Added');
            await this.setState({ query: '', category: null, priority: null });
          } else {
            alert('Query failed. Please retry');
          }
        }
        this.setState({ loading: false });
        this.props.loadPastQueries();
      }
    };

    setStateValue = (key, value) => {
      const newState = {};
      newState[key] = value;
      this.setState(newState);
    };

    render() {
      const { loading, data } = this.props.helpAddData;
      const { query, category, priority } = this.state;
      const historyData = this.props.helpQueries;

      return (
        <HelpComponent
          hoverLoading={this.state.loading}
          loading={loading}
          data={data}
          onSubmit={this.onSubmit}
          setStateValue={this.setStateValue}
          query={query}
          category={category}
          priority={priority}
          historyData={historyData}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  helpAddData: state.helpAddData,
  helpQueries: state.helpQueries,
});

export default connect(
  mapStateToProps,
  { loadAddTicketData, loadPastQueries }
)(HelpContainer);
