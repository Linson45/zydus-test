import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addOpenTokData, MESSAGE_READ, openTokToggles, SEND_SIGNAL
} from '../../../actions';
import ChatComponent from '../../../components/detailing/ChatComponent';

class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  componentDidMount() {
    this.props.openTokToggles(MESSAGE_READ);
  }

  componentWillUnmount() {
    this.props.openTokToggles(MESSAGE_READ);
  }

  sendMessage = () => {
    if (this.state.text) {
      this.props.openTokToggles(MESSAGE_READ);
      this.props.addOpenTokData(SEND_SIGNAL, {
        type: '',
        data: this.state.text,
      });
      this.setState({
        text: '',
      });
    }
  }

    setMessage = (text) => {
      this.props.openTokToggles(MESSAGE_READ);
      this.setState({ text });
    };

    goBack = () => {
      this.props.openTokToggles(MESSAGE_READ);
      this.props.navigation.goBack();
    }

    render() {
      const { messages } = this.props.chat;
      const { text } = this.state;
      return (
        <ChatComponent
          messages={messages}
          setMessage={this.setMessage}
          sendMessage={this.sendMessage}
          goBack={this.goBack}
          text={text}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  chat: state.openTokScreen.chat,
  show: state.openTokScreen.chatModal
});

export default connect(
  mapStateToProps,
  {
    addOpenTokData,
    openTokToggles
  }
)(ChatContainer);
