import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from '../../components/Login';
import { IS_SYNCING_CALLS_MANUALLY, loginUser } from '../../actions';
import Toaster from '../../util/Toaster';
import Adapter from '../../util/Adapter';
import Firebase from '../../util/Firebase';
import { clearCache } from '../../local-storage/cache-util';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      password: ''
    };
  }

  async componentDidMount() {
    Adapter.set(IS_SYNCING_CALLS_MANUALLY, false);
    await clearCache();

    Firebase.pushEvent('login_page_view_event');
    const user = await Adapter.getUser();
    if (user) {
      this.setState({
        userId: user.user_id,
        password: user.password
      });
      this.login();
    }
  }

  // eslint-disable-next-line no-unused-vars
  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.auth !== this.props.auth) {
      const { error } = nextProps.auth;
      if (error) {
        Toaster.show(error);
        // Toaster.show('Net connectivity not available');
        return;
      }

      if (nextProps.auth.isLogin) {
        this.props.navigation.navigate('Dashboard');
        Adapter.setUser(nextProps.auth.data);
      }
    }
  }

  login() {
    const { userId, password } = this.state;
    if (userId && password) {
      this.props.loginUser({ userId, password });
    } else {
      Toaster.show('Enter Valid Username & password!');
    }
  }

  changeInput(type, text) {
    this.setState({
      [type]: text
    });
  }

  render() {
    const changeInput = this.changeInput.bind(this);
    const { userId, password } = this.state;
    return (
      <Login
        userId={userId}
        password={password}
        navigation={this.props.navigation}
        loading={this.props.auth.loading}
        onLogin={() => this.login()}
        changeInput={changeInput}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser }
)(LoginContainer);
