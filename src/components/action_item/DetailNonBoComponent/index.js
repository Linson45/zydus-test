import React, { Component } from 'react';
import {
  Body, Button, Card, CardItem, Icon
} from 'native-base';
import {
  Dimensions, ScrollView, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import styles from './styles';
import ParentView from '../../ParentView';
import Colors from '../../../styles/colorsStyles';

class DetailNonBoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      selectedStatus: null,
      comment: ''
    };
  }

  getStatusColor(status) {
    if (!status) status = '';
    status = status.toLowerCase();
    if (status === 'approved') return Colors.sky_blue;
    if (status === 'in progress') return Colors.sky_blue;
    if (status === 'delayed') return Colors.red;
    if (status === 'submitted') return Colors.colorPrimary;
    if (status === 'completed') return Colors.green;
    if (status === 'on track') return Colors.sky_blue;
    if (status === 'new') return Colors.sky_blue;
    return Colors.text_dark_gray;
  }

  renderTop() {
    const { data } = this.props;
    const { isEditing } = this.state;
    if (data) {
      const {
        actionPlan, id, problemDesc, rootCause, actionStatus, targetClosureDate, assignedBy, assignedTo, reviewdBy, statusMaster, overdueStatus
      } = data;
      return (
        <View style={styles.top}>
          <Text style={styles.id}>
            #
            {id}
          </Text>
          <Text style={styles.problemHeading}>Problem Description:</Text>
          <Text style={styles.problem}>{problemDesc}</Text>
          <Text style={styles.rootHeading}>Root Cause:</Text>
          <Text style={styles.root}>{rootCause}</Text>
          <Text style={styles.rootHeading}>Action Plan:</Text>
          <Text style={styles.root}>{actionPlan}</Text>
          <Text style={styles.overdueStatus}>
            Overdue Status:
            {overdueStatus}
          </Text>
          <View style={styles.statusView}>
            <Text>Status: </Text>
            {!isEditing ? (
              <Text style={{
                ...styles.status,
                color: this.getStatusColor(actionStatus)
              }}
              >
                {actionStatus}
              </Text>
            ) : null}
            {statusMaster.length ? this.renderEdit() : null}
          </View>
          <Text style={styles.deadline}>
            Target Closure Date:
            {targetClosureDate}
          </Text>

          <View style={{
            marginTop: 15,
            borderBottomColor: Colors.gray_light_1,
            borderBottomWidth: 0.3
          }}
          />

          <View style={styles.assignedTopView}>
            <View style={{ flex: 1, alignContent: 'center' }}>
              <Text style={styles.assignHeading}>Assigned by:</Text>
              <Text style={styles.assign}>
                {assignedBy.user}
                {' '}
                (
                {assignedBy.role}
                )
              </Text>
            </View>

            <View style={{ flex: 1, alignContent: 'center', marginLeft: 50 }}>
              <Text style={styles.assignHeading}>Assigned on:</Text>
              <Text style={styles.assign}>{assignedBy.date}</Text>
            </View>
          </View>
          <View style={styles.assignedTopView}>
            <View>
              <Text style={styles.assignHeading}>Assigned to:</Text>
              <Text style={styles.assign}>
                {assignedTo.user}
                {' '}
                (
                {assignedTo.role}
                )
              </Text>
            </View>
          </View>
          {reviewdBy && reviewdBy.role
            ? (
              <View>
                <View style={styles.assignedTopView}>
                  <View style={{ flex: 1, alignContent: 'center' }}>
                    <Text style={styles.assignHeading}>Reviewed by:</Text>
                    <Text style={styles.assign}>
                      {reviewdBy.user}
                      {' '}
                      (
                      {reviewdBy.role}
                      )
                    </Text>
                  </View>

                  <View style={{ flex: 1, alignContent: 'center', marginLeft: 50 }}>
                    <Text style={styles.assignHeading}>Reviewed on:</Text>
                    <Text style={styles.assign}>{reviewdBy.date}</Text>
                  </View>
                </View>
              </View>
            )
            : null}

        </View>
      );
    }
    return null;
  }

  renderEdit() {
    const { data, submit } = this.props;
    const { isEditing, comment, selectedStatus } = this.state;
    const { statusMaster } = data;
    if (isEditing) {
      return (
        <View>
          <Dropdown
            dropdownOffset={{ top: 0, left: 0 }}
            fontSize={14}
            containerStyle={{ width: 100, padding: 0, marginLeft: 15 }}
            animationDuration={0}
            data={statusMaster}
            valueExtractor={({ id }) => id}
            labelExtractor={({ name }) => name}
            onChangeText={(value) => {
              this.setState({ selectedStatus: value });
            }}
          />

          <TextInput
            style={{
              height: 80,
              borderColor: Colors.gray_light_1,
              borderWidth: 1,
              width: Dimensions.get('window').width * 2 / 3,
              padding: 10,
              borderRadius: 10,
              marginTop: 10
            }}
            placeholder="Add Comment"
            onChangeText={(comment) => this.setState({ comment })}
            multiline
            value={comment}
          />

          <View style={{ alignItems: 'center' }}>
            <Button style={styles.button} onPress={() => submit(selectedStatus, comment)}>
              <Text style={styles.buttonText}>Submit</Text>
            </Button>
          </View>
        </View>
      );
    }
    return (
      <TouchableOpacity onPress={() => {
        this.setState({ isEditing: true });
      }}
      >
        <Icon name="edit" type="AntDesign" style={styles.editButton} />
      </TouchableOpacity>
    );
  }

  rule() {
    return (
      <View style={{
        marginTop: 15,
        borderBottomColor: Colors.gray_light_1,
        borderBottomWidth: 0.3
      }}
      />
    );
  }

  renderComments() {
    const { data } = this.props;
    if (data) {
      const { comments } = data;
      return (
        <View style={{ backgroundColor: Colors.gray_coachmapdetails }}>
          <Card style={styles.comments}>
            <CardItem header bordered>
              <Text>Comments</Text>
            </CardItem>
            {
                            Array.isArray(comments) ? comments.map(({ addedBy, desc }, index) => (
                              <CardItem bordered key={index}>
                                <Body>
                                  <Text style={styles.commentDate}>{addedBy.date}</Text>
                                  <Text style={styles.commentStatus}>{desc}</Text>
                                  <Text style={styles.commentName}>
                                    -
                                    {addedBy.user}
                                    {' '}
                                    (
                                    {addedBy.role}
                                    )
                                  </Text>
                                </Body>
                              </CardItem>
                            )) : null
                        }
          </Card>
        </View>
      );
    }
    return null;
  }

  render() {
    const { loading, hoverLoading, connected } = this.props;
    return (
      <ParentView
        loading={loading}
        connected={connected}
        onRefresh={() => this.props.onRefresh()}
        hoverLoading={hoverLoading}
        style={styles.container}
      >
        <ScrollView>
          {this.renderTop()}
          {this.rule()}
          {this.renderComments()}
        </ScrollView>
      </ParentView>
    );
  }
}

export default DetailNonBoComponent;
