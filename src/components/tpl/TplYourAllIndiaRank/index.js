import React from 'react';
import {
  FlatList, Image, ImageBackground, Text, TouchableOpacity, View
} from 'react-native';
import Images from '../../../Constants/imageConstants';
import ParentView from '../../ParentView';
import styles from './styles';
import SelectFilterByTplComponent from '../SelectFilterByTplComponent';

export default class TplYourAllIndiaRank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'Month'
    };
  }

  renderButton({ active, orientation, label }) {
    return (
      <TouchableOpacity onPress={() => {
        this.setState({ selected: label });
      }}
      >
        {active ? (
          <ImageBackground source={Images[orientation]} style={styles.button}>
            <Text style={styles.whiteText}>{label}</Text>
          </ImageBackground>
        ) : (
          <View
            style={[styles.inActiveButton, orientation === 'LeftButton' ? styles.LeftButtonDynamic : styles.RightButtonDynamic]}
          >
            <Text style={styles.blackText}>{label}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  renderHeader() {
    return (
      <>
        <View style={styles.tableHeader}>
          <Text style={styles.RankHeader}>Rank</Text>
          <Text style={styles.ScoreHeader}>Score</Text>
          <Text style={styles.NameHeader}>Name</Text>
          <Text style={styles.DivisionHeader}>Division</Text>
        </View>
        <View style={styles.line} />
      </>
    );
  }

  renderRow({ item }) {
    return (
      <View key={item.rank}>
        <View style={styles.row}>
          <Text style={styles.RankRow}>{item.rank}</Text>
          <Text style={styles.ScoreRow}>{item.score}</Text>
          <Text style={styles.NameRow}>{item.name}</Text>
          <Text style={styles.DivisionRow}>{item.division}</Text>
        </View>
        <View style={styles.line} />
      </View>
    );
  }

  renderData() {
    const { rankSubTitle, openModal } = this.props;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.innerContainer}>
          <ImageBackground source={Images.i_rank} style={styles.bannerImage}>
            <View style={styles.textMainContainer}>
              <View style={styles.textInnerContainer}>
                <Text style={styles.title}>Individual</Text>
                <Text style={styles.subTitle}>{rankSubTitle}</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.buttonContainer}>
          {this.renderButton({
            active: this.state.selected === 'Month',
            orientation: 'LeftButton',
            label: 'Month'
          })}
          {this.renderButton({
            active: this.state.selected === 'Quarterly',
            orientation: 'RightButton',
            label: 'Quarterly'
          })}
          <TouchableOpacity opacity={1} onPress={openModal} style={{ marginLeft: 10 }}>
            <Image source={Images.FilterIcon} style={styles.FilterIcons} />
          </TouchableOpacity>
        </View>
        <View style={styles.tableContainer}>
          {this.renderHeader()}
          {(this.state.selected === 'Month' && this.props.data.monthly.length > 0) || (this.state.selected !== 'Month' && this.props.data.quarterly.length > 0)
            ? (
              <FlatList
                data={this.state.selected === 'Month' ? this.props.data.monthly : this.props.data.quarterly}
                renderItem={this.renderRow}
                keyExtractor={(item) => item.id}
              />
            ) : (
              <View style={{ alignItems: 'center', margin: 10 }}>
                <Text>No Data Available</Text>
              </View>
            )}
        </View>
      </View>
    );
  }

  renderModel() {
    const {
      showModal, divisions, changeTime, changeDivision, changeUserType, month, year, sbu_code, user_type,
      reloadData, closeModal, loadData, rank_type, changeSbuGroupCode, sbu_grp_code, sbus
    } = this.props;

    return (
      <SelectFilterByTplComponent
        sbus={sbus}
        sbu_grp_code={sbu_grp_code}
        rank_type={rank_type}
        isVisible={showModal}
        loadData={loadData}
        closeModal={closeModal}
        reloadData={reloadData}
        divisions={divisions}
        changeTime={changeTime}
        changeSbuGroupCode={changeSbuGroupCode}
        changeDivision={changeDivision}
        changeUserType={changeUserType}
        month={month}
        year={year}
        sbu_code={sbu_code}
        user_type={user_type}
      />
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
        {data ? this.renderModel() : null}
      </ParentView>
    );
  }
}
