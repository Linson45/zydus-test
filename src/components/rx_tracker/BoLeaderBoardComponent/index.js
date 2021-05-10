import React, { Component } from 'react';
import { Container, Icon, Text, ListItem, Body } from 'native-base';
import {
  ScrollView,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import MonthYearSelectionComponent from '../../Modal/MonthYearSelection';
import ParentView from '../../ParentView';
import styles from './styles';
import TabStyles from '../../../styles/tabStyles';
import Images from '../../../Constants/imageConstants';

class BoLeaderBoardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderTopThree(data) {
    if (data !== null && data !== '') {
      return data.slice(0, 3).map((item, index) => {
        const { score, name } = item;

        return (
          <ListItem
            key={index}
            ini
            style={{
              marginLeft: 0,
            }}>
            <Body>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-evenly',
                  flexDirection: 'row',
                  alignContent: 'center',
                  marginTop: 5,
                }}>
                <View
                  style={{
                    minHeight: 160,
                    width: 140,
                    flexDirection: 'column',
                    borderRadius: 20,
                    borderWidth: 1,
                    borderBottomColor: '#000000',
                    alignSelf: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View style={{ marginTop: 10 }}>
                    <View
                      style={{
                        width: 65,
                        height: 65,
                        alignSelf: 'center',
                        borderRadius: 65 / 2,
                        top: 5,
                        bottom: 0,
                        position: 'absolute',
                        backgroundColor:
                          'radial-gradient(circle, hsla(253, 45%, 64%, 1) 20%, hsla(247, 60%, 21%, 1) 100%)',
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 60,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      {index + 1}
                    </Text>
                  </View>
                  <Text
                    style={{ fontWeight: 'bold', fontSize: 14, marginTop: 15 }}>
                    {name}
                  </Text>
                  <Text>SCORE :{score}</Text>
                </View>
              </View>
            </Body>
          </ListItem>
        );
      });
    }
    return null;
  }

  renderRXHeader() {
    return (
      <View style={{ flexDirection: 'column' }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
            flexDirection: 'row',
            alignContent: 'center',
            marginTop: 50,
          }}>
          <View
            style={{
              alignSelf: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ fontWeight: 'bold' }}>RANK</Text>
          </View>
          <View
            style={{
              alignSelf: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ fontWeight: 'bold' }}>SCORE</Text>
          </View>
          <View
            style={{
              alignSelf: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ fontWeight: 'bold' }}>NAME</Text>
          </View>
          <View
            style={{
              alignSelf: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ fontWeight: 'bold' }}>DIVISION</Text>
          </View>
        </View>
        <ImageBackground
          source={Images.ic_tool_bar_bg}
          style={{
            resizeMode: 'stretch',
            padding: 10,
            margin: 20,
            height: 3,
          }}
        />
      </View>
    );
  }

  renderRedemptionList() {
    const data = [
      {
        rank: '1',
        point_earned: '3456',
        name: 'B Vignesh',
        pount_redeemed: '600',
        balanced_points: '3197',
      },
      {
        rank: '2',
        point_earned: '3456',
        name: 'B Vignesh',
        pount_redeemed: '600',
        balanced_points: '3197',
      },
    ];
    if (data != null) {
      return data.map((item, index) => {
        const {
          rank,
          point_earned,
          name,
          pount_redeemed,
          balanced_points,
        } = item;

        return (
          <ListItem
            key={index}
            bordered
            style={{
              marginLeft: 0,
            }}>
            <Body>
              <View style={{ flexDirection: 'column', flex: 1 }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'space-evenly',
                    flexDirection: 'row',
                    alignContent: 'center',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      alignSelf: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        justifyContent: 'center',
                        flex: 1,
                      }}>
                      {rank}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignSelf: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        justifyContent: 'center',
                        flex: 1,
                      }}>
                      {name}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignSelf: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        justifyContent: 'center',
                        flex: 1,
                      }}>
                      {point_earned}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignSelf: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        justifyContent: 'center',
                        flex: 1,
                      }}>
                      {pount_redeemed}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignSelf: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        justifyContent: 'center',
                        flex: 1,
                      }}>
                      {balanced_points}
                    </Text>
                  </View>
                </View>
              </View>
            </Body>
          </ListItem>
        );
      });
    }
    return null;
  }

  renderList(data) {
    if (data != null) {
      return data.map((item, index) => {
        const { score, name, headquarters } = item;

        return (
          <ListItem
            key={index}
            bordered
            style={{
              marginLeft: 0,
            }}>
            <Body>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                  alignContent: 'center',
                }}>
                <View
                  style={{
                    alignSelf: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      justifyContent: 'center',
                      flex: 1,
                    }}>
                    {index + 1}
                  </Text>
                </View>
                <View
                  style={{
                    alignSelf: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      justifyContent: 'center',
                      flex: 1,
                    }}>
                    {score}
                  </Text>
                </View>
                <View
                  style={{
                    alignSelf: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      justifyContent: 'center',
                      flex: 1,
                    }}>
                    {name}
                  </Text>
                </View>
                <View
                  style={{
                    alignSelf: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      justifyContent: 'center',
                      flex: 1,
                    }}>
                    {headquarters}
                  </Text>
                </View>
              </View>
            </Body>
          </ListItem>
        );
      });
    }
    return null;
  }

  renderRedemptionHeader() {
    return (
      <View>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            alignContent: 'center',
            marginTop: 10,
          }}>
          <View
            style={{
              flex: 1,
              alignSelf: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{ fontWeight: 'bold', justifyContent: 'center', flex: 1 }}>
              RANK
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignSelf: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{ fontWeight: 'bold', justifyContent: 'center', flex: 1 }}>
              NAME
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignSelf: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{ fontWeight: 'bold', justifyContent: 'center', flex: 1 }}>
              POINTS EARNED
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignSelf: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{ fontWeight: 'bold', justifyContent: 'center', flex: 1 }}>
              POINTS REDEEMED
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignSelf: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{ fontWeight: 'bold', justifyContent: 'center', flex: 1 }}>
              BALANCED POINTS
            </Text>
          </View>
        </View>
        <ImageBackground
          source={Images.ic_tool_bar_bg}
          style={{
            resizeMode: 'stretch',
            padding: 10,
            margin: 20,
            height: 3,
          }}
        />
      </View>
    );
  }

  renderTabs(data) {
    const leaderboard = 'LEADERBOARD';
    const redemption = 'REDEMPTION';
    const {
      selectDate,
      monthString,
      month,
      year,
      showMonthSelectModal,
      hideMonthSelectModal,
      isVisibleMonthSelectModal,
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <ScrollableTabView
          tabBarBackgroundColor={TabStyles.tabStyle.backgroundColor}
          tabBarUnderlineStyle={TabStyles.tabBarUnderlineStyle}
          tabBarInactiveTextColor={TabStyles.textStyle.color}
          tabBarActiveTextColor={TabStyles.activeTextStyle.color}
          initialPage={0}
          onChangeTab={({ i }) => {
            // if (i === 0) this.setState({ isTab: false });
            // else this.setState({ isTab: true });
          }}
          renderTabBar={() => <ScrollableTabBar />}>
          <View tabLabel={leaderboard} style={{ flex: 1 }}>
            <ScrollView ref={scrollView => (this._scrollView = scrollView)}>
              <View>
                <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                  <View style={{ flexDirection: 'row-reverse', padding: 10 }}>
                    <TouchableOpacity onPress={showMonthSelectModal}>
                      <Icon
                        name="calendar"
                        style={{
                          color: '#000',
                          width: 25,
                          height: 30,
                          marginRight: 5,
                        }}
                      />
                    </TouchableOpacity>
                    <MonthYearSelectionComponent
                      month={month}
                      year={year}
                      closeModal={hideMonthSelectModal}
                      changeQuery={selectDate}
                      lastMonths={12}
                      isVisible={isVisibleMonthSelectModal}
                    />
                  </View>

                  <Text
                    style={{ color: '#000', paddingTop: 15, marginRight: 20 }}>
                    {monthString}
                  </Text>
                </View>
                <ScrollView
                  contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'space-evenly',
                    alignContent: 'center',
                  }}
                  horizontal>
                  {this.renderTopThree(data)}
                </ScrollView>
              </View>
              {this.renderRXHeader()}
              {this.renderList(data)}
            </ScrollView>
          </View>
          <View tabLabel={redemption} style={{ flex: 1 }}>
            <ScrollView ref={scrollView => (this._scrollView = scrollView)}>
              {this.renderRedemptionHeader()}
              {this.renderRedemptionList()}
            </ScrollView>
          </View>
        </ScrollableTabView>
      </View>
    );
    // }
    // return null;
  }

  // render() {
  //   const { data, loading } = this.props;
  //   return (
  //     <ParentView loading={loading} connected style={styles.container}>
  //       <Container>{this.renderTabs(data)}</Container>
  //     </ParentView>
  //   );
  // }
  render(){
    return(
      <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
      <Text style={{fontSize:20}}>The Game is on!</Text>
      <Text style={{fontSize:20}}>Watch this space for more</Text>
      </View>
    )
  }

}
export default BoLeaderBoardComponent;
