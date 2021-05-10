import React from 'react';
import {
  ImageBackground, ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import { Icon } from 'native-base';
import Images from '../../../Constants/imageConstants';
import ScoreCard from '../../ScoreCard';
import ParentView from '../../ParentView';
import styles from './styles';
import MonthYearSelectionComponent from '../../Modal/MonthYearSelection';
import { addPercentageSign } from '../../../util/NumberTrasformer';

export default class TplComponent extends React.Component {
  renderData() {
    const {
      data, selectDate, showDetails, showYourScoreDetails, openRankingDetail, openYourScore, openTplWinners,
      monthString, month, year, showMonthSelectModal, hideMonthSelectModal, isVisibleMonthSelectModal, user
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <ImageBackground source={Images.leaderboard_background} style={styles.topImage}>
            <View style={styles.innerTopContainer}>
              <View style={{ flex: 1, flexDirection: 'row-reverse' }}>

                <View style={{ flexDirection: 'row-reverse', padding: 10 }}>
                  <TouchableOpacity onPress={showMonthSelectModal}>
                    <Icon
                      name="calendar"
                      style={{
                        color: '#fff',
                        width: 25,
                        height: 25,
                        marginLeft: 5,
                        marginRight: 5
                      }}
                    />
                  </TouchableOpacity>
                  <MonthYearSelectionComponent
                    month={month}
                    year={year}
                    closeModal={hideMonthSelectModal}
                    changeQuery={selectDate}
                    lastMonths={8}
                    isVisible={isVisibleMonthSelectModal}
                  />
                </View>

                <Text style={{ color: '#fff', paddingTop: 20 }}>{monthString}</Text>
              </View>

              <View style={styles.headingContainer}>
                <Text style={styles.extraBoldText}>LEADERBOARD</Text>
                <Text
                  style={styles.iconLabel}
                >
                  {user.user_name}
                  {' '}
                  (
                  {user.user_type}
                  )
                </Text>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.remainingData}>
            <View style={styles.rankHeaderContainer}>
              <Text style={styles.rankHeader}>Your Ranking</Text>
            </View>
            <View style={styles.rankContainer}>
              <ScoreCard
                score={data.division ? data.division.rank : '---'}
                total={data.division ? data.division.total : '---'}
                division="DIVISION"
                onPress={() => openRankingDetail('DIV')}
              />
              <ScoreCard
                score={data.sbu ? data.sbu.rank : '---'}
                total={data.sbu ? data.sbu.total : '---'}
                division="CLUSTER"
                onPress={() => openRankingDetail('SBU')}
              />
              <ScoreCard
                score={data.country ? data.country.rank : '---'}
                total={data.country ? data.country.total : '---'}
                division="INDIA IFB (Qtr)"
                onPress={() => openRankingDetail('IND')}
              />
            </View>

            <TouchableOpacity style={styles.teamScoreContainer} onPress={() => openYourScore()}>
              <ImageBackground
                source={Images.your_score}
                style={[styles.teamScoreBgImage, styles.yourScoreBgImage]}
              >
                <Text style={styles.iconLabel}>
                  Your Score (
                  {monthString}
                  )
                </Text>
                <Text style={styles.iconLabel}>
                  <Text
                    style={styles.yellowText}
                  >
                    {data.user ? data.user.score : '---'}
                  </Text>
                  {data.user ? `/${data.user.total} (${addPercentageSign(((data.user.score ? data.user.score : 0) / (data.user.total ? data.user.total : 1)) * 100)})` : '---'}
                </Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={showYourScoreDetails}>
              <View style={styles.teamScoreContainer}>
                <ImageBackground source={Images.TeamScoreBg} style={styles.teamScoreBgImage}>
                  <Text style={styles.iconLabel}>Team Score</Text>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            {
                            (showDetails && data.team)
                              ? (
                                <View style={styles.scoreDetailsContainer}>
                                  <View style={styles.scoreDetailDiv}>
                                    <View
                                      style={{ alignItems: 'center', justifyContent: 'space-around', height: 50 }}
                                    >
                                      <Text style={styles.centerText}>Monthly Rank of Division</Text>
                                      <View style={styles.score}>
                                        <Text
                                          style={styles.yellowText}
                                        >
                                          {data.team.monthly.rank}
                                        </Text>
                                        <Text>
                                          /
                                          {data.team.monthly.total_rank}
                                        </Text>
                                      </View>
                                    </View>
                                    <View style={styles.scoreContainer}>
                                      <Text style={styles.iconLabel}>Score</Text>
                                      <Text
                                        style={styles.iconLabel}
                                      >
                                        {data.team.monthly.score}
                                      </Text>
                                      <Text
                                        style={styles.iconLabel}
                                      >
                                        /
                                        {data.team.monthly.total_score}
                                      </Text>
                                    </View>
                                  </View>
                                  <View style={styles.scoreDetailDiv}>
                                    <View
                                      style={{ alignItems: 'center', justifyContent: 'space-around', height: 50 }}
                                    >
                                      <Text style={styles.centerText}>Quarterly Rank of Division</Text>
                                      <View style={styles.score}>
                                        <Text
                                          style={styles.yellowText}
                                        >
                                          {data.team.quarterly.rank}
                                        </Text>
                                        <Text>
                                          /
                                          {data.team.quarterly.total_rank}
                                        </Text>
                                      </View>
                                    </View>
                                    <View style={styles.scoreContainer}>
                                      <Text style={styles.iconLabel}>Score</Text>
                                      <Text
                                        style={styles.iconLabel}
                                      >
                                        {data.team.quarterly.score}
                                      </Text>
                                      <Text
                                        style={styles.iconLabel}
                                      >
                                        /
                                        {data.team.quarterly.total_score}
                                      </Text>
                                    </View>
                                  </View>
                                  <View style={styles.scoreDetailDiv}>
                                    <View
                                      style={{ alignItems: 'center', justifyContent: 'space-around', height: 50 }}
                                    >
                                      <Text style={styles.centerText}>Cluster Rank in India</Text>
                                      <View style={styles.score}>
                                        <Text
                                          style={styles.yellowText}
                                        >
                                          {data.team.country.rank}
                                        </Text>
                                        <Text>
                                          /
                                          {data.team.country.total_rank}
                                        </Text>
                                      </View>
                                    </View>
                                    <View style={styles.scoreContainer}>
                                      <Text style={styles.iconLabel}>Score</Text>
                                      <Text
                                        style={styles.iconLabel}
                                      >
                                        {data.team.country.score}
                                      </Text>
                                      <Text
                                        style={styles.iconLabel}
                                      >
                                        /
                                        {data.team.country.total_score}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                              ) : null
                        }
            <TouchableOpacity
              style={[styles.teamScoreContainer, { marginBottom: 30 }]}
              onPress={() => openTplWinners()}
            >
              <ImageBackground
                source={Images.winners_bg}
                style={[styles.winnerBgImage, styles.yourScoreBgImage]}
              >
                <Text style={styles.iconLabel}>We Have Winners</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    );
  }

  render() {
    const { loading, data } = this.props;

    return (
      <ParentView
        loading={loading}
        connected={this.props.connected}
        onRefresh={() => this.props.onRefresh()}
        data={data}
        style={styles.container}
      >
        {data ? this.renderData() : null}
      </ParentView>
    );
  }
}
