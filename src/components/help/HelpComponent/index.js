import React from 'react';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import {
  ActivityIndicator, FlatList, ScrollView, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import styles from './styles';
import TabStyles from '../../../styles/contentTabStyles';
import Colors from '../../../styles/colorsStyles';
import ParentView from '../../ParentView';

export default class HelpComponent extends React.Component {
  renderTabs() {
    return (
      <ScrollableTabView
        tabBarBackgroundColor={TabStyles.tabStyle.backgroundColor}
        tabBarUnderlineStyle={TabStyles.tabBarUnderlineStyle}
        tabBarInactiveTextColor={Colors.secondaryText}
        tabBarActiveTextColor={Colors.contentBlue}
        tabBarTextStyle={TabStyles.textStyle}
        initialPage={0}
        renderTabBar={() => <DefaultTabBar />}
      >
        <View tabLabel="New Ticket">
          {this.renderAddForm()}
        </View>
        <View tabLabel="History">
          {this.renderHistory()}
        </View>
      </ScrollableTabView>
    );
  }

  renderAddForm() {
    const {
      data, onSubmit, setStateValue, category, priority, query
    } = this.props;
    if (data) {
      const { categories, priorities } = data;

      return (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.categoryRow}>
            <View>
              <Text style={styles.pickerHeading}>Category</Text>
              <RNPickerSelect
                value={category}
                placeholder={{
                  label: 'Select category',
                  value: null,
                  color: Colors.dividerColor,
                }}
                style={styles.picker}
                onValueChange={(category) => {
                  setStateValue('category', category);
                }}
                items={categories.map((item) => ({ label: item, value: item }))}
              />
            </View>

            <View>
              <Text style={styles.pickerHeading}>Priority</Text>
              <RNPickerSelect
                value={priority}
                placeholder={{
                  label: 'Select priority',
                  value: null,
                  color: Colors.dividerColor,
                }}
                style={styles.picker}
                onValueChange={(priority) => {
                  setStateValue('priority', priority);
                }}
                items={priorities.map((item) => ({ label: item, value: item }))}
              />
            </View>
          </View>

          <Text style={styles.queryHeading}>Query Description</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Your query description here..."
            onChangeText={(query) => setStateValue('query', query)}
            multiline
            value={query}
          />

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
              <Text style={styles.submitButtonText}>Submit Query</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }
    return null;
  }

  renderHistory() {
    const { historyData } = this.props;
    if (historyData) {
      const { loading, data } = historyData;
      if (loading) {
        return (
          <ActivityIndicator color={Colors.gray} style={styles.loader} />
        );
      }
      return (
        <FlatList
          data={data}
          renderItem={({ item }) => {
            const {
              query, category, priority, created_at, status
            } = item;
            return (
              <View style={styles.queryRow}>
                <Text style={styles.queryTitle}>{query}</Text>
                <View style={styles.queryRowContainer}>
                  <View style={styles.queryRowSubContainer}>
                    <Text style={styles.category}>
                      Category:
                      { category || '-'}
                    </Text>
                    <Text style={styles.category}>
                      Priority:
                      { priority || '-'}
                    </Text>
                    <Text style={styles.date}>
                      Date:
                      { created_at ? created_at.split(' ')[0] : '-'}
                    </Text>
                  </View>
                  <View style={styles.queryRowSubContainer}>
                    <Text style={styles.status}>
                      Status:
                      {status}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
          keyExtractor={(query) => query.query_id}
        />
      );
    }
    return null;
  }

  render() {
    const { loading, hoverLoading } = this.props;

    return (
      <ParentView
        hoverLoading={hoverLoading}
        connected
        loading={loading}
      >
        {this.renderTabs()}
      </ParentView>
    );
  }
}
