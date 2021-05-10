import React, { Component } from 'react';
import {
  FlatList, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view';
import styles from './styles';

class ChatComponent extends Component {
  renderHeader() {
    const { goBack } = this.props;
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Chats</Text>
        <TouchableOpacity style={styles.headerClose} onPress={goBack}>
          <Text style={styles.headerCloseText}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderMessages() {
    const { messages } = this.props;
    return (
      <FlatList
        style={styles.messages}
        data={messages}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        ref={(ref) => this.flatList = ref}
        onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
        onLayout={() => this.flatList.scrollToEnd({ animated: true })}
      />
    );
  }

  _keyExtractor = (item, index) => `${index}`;

  _renderItem = ({ item }) => {
    const {
      text, self, name, time
    } = item;
    return (
      <View style={[styles.message, self ? styles.self : {}]}>
        <Text>
          <Text style={styles.name}>{self ? 'You' : name}</Text>
          <Text style={styles.text}>{`:   ${text}`}</Text>
          <Text style={styles.time}>{`        ${time}`}</Text>
        </Text>
      </View>
    );
  };

  renderBottom() {
    const { setMessage, text, sendMessage } = this.props;
    return (
      <View style={styles.bottomView}>
        <TextInput
          blurOnSubmit={false}
          onChangeText={(text) => {
            setMessage(text);
          }}
          value={text}
          style={styles.textInput}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <KeyboardAwareView
        contentContainerStyle={{ flex: 1 }}
        animated
      >
        {this.renderHeader()}
        {this.renderMessages()}
        {this.renderBottom()}
      </KeyboardAwareView>
    );
  }
}

export default ChatComponent;
