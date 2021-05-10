import React from 'react';
import {
  Text, View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../Constants/colorConstants';
import colorsStyles from '../../styles/colorsStyles';
import { addPercentageSignWithDecimal, numberTransformer } from '../../util/NumberTrasformer';
import topSwiperStyles from './topSwiperStyles';

export class TopSwiper extends React.PureComponent {
    renderPagination = (index, total, that) => {
      if (that.state.total <= 1) return null;
      const dots = [];
      const ActiveDot = that.props.activeDot || (
      <View style={[{
        backgroundColor: that.props.activeDotColor || '#007aff',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
      }, that.props.activeDotStyle]}
      />
      );
      const Dot = that.props.dot || (
      <View style={[{
        backgroundColor: that.props.dotColor || 'rgba(0,0,0,.2)',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
      }, that.props.dotStyle]}
      />
      );
      for (let i = 0; i < that.state.total; i++) {
        dots.push(i === that.state.index
          ? React.cloneElement(ActiveDot, { key: i })
          : React.cloneElement(Dot, { key: i }));
      }
      return (
        <View
          pointerEvents="none"
          style={[{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent'
          }, that.props.paginationStyle]}
        >
          {dots}
        </View>
      );
    };

    render() {
      const { dashboardSales } = this.props;
      const sales = dashboardSales.data;
      const salesAchieved = (sales && sales.sales_achieved_value > 0 ? sales.sales_achieved_value : 0) / (sales && sales.target ? sales.target : 1) * 100;
      const net_sales_9 = (sales && sales.net_sales_9 > 0 ? sales.net_sales_9 : 0) / (sales && sales.target ? sales.target : 1) * 100;
      const net_sales_18 = (sales && sales.net_sales_18 > 0 ? sales.net_sales_18 : 0) / (sales && sales.target ? sales.target : 1) * 100;
      const net_sales_24 = (sales && sales.net_sales_24 > 0 ? sales.net_sales_24 : 0) / (sales && sales.target ? sales.target : 1) * 100;

      return (
        <>
          <View style={[{ alignItems: 'center', justifyContent: 'center' }]}>
            <View style={topSwiperStyles.sliderCard}>
              <View style={topSwiperStyles.sliderCardHeadingContainer}>
                <Text style={topSwiperStyles.sliderCardHeading}>Sales Performance</Text>
              </View>
              <View style={topSwiperStyles.sliderInternalContainer}>
                <View style={{ alignSelf: 'center', flex: 0.3, paddingHorizontal: 10 }}>
                  <LinearGradient
                    locations={[(salesAchieved / 100), (salesAchieved / 100)]}
                    colors={[Colors.CircleFillColor, colorsStyles.dashboardCircle]}
                    useAngle
                    angle={0}
                    angleCenter={{ x: 0.1, y: 0.5 }}
                    style={topSwiperStyles.linearGradient}
                  >
                    <View style={topSwiperStyles.centerCircle}>
                      <Text
                        style={topSwiperStyles.centerCircleText}
                      >
                        {addPercentageSignWithDecimal(salesAchieved)}
                      </Text>
                      <Text style={topSwiperStyles.centerCircleText}>Achievement</Text>
                    </View>
                  </LinearGradient>
                </View>
                <View style={topSwiperStyles.barContainer}>
                  <View style={topSwiperStyles.sliderBar}>
                    <Text style={topSwiperStyles.rankText}>9th</Text>
                    <View style={topSwiperStyles.barBackground}>
                      <View
                        style={[topSwiperStyles.barFill, { width: addPercentageSignWithDecimal(net_sales_9) }]}
                      />
                    </View>
                    <Text
                      style={topSwiperStyles.rankDetailText}
                    >
                      {addPercentageSignWithDecimal(net_sales_9)}
                    </Text>
                  </View>
                  <View style={topSwiperStyles.sliderBar}>
                    <Text style={topSwiperStyles.rankText}>18th</Text>
                    <View style={topSwiperStyles.barBackground}>
                      <View
                        style={[topSwiperStyles.barFill, { width: addPercentageSignWithDecimal(net_sales_18) }]}
                      />
                    </View>
                    <Text
                      style={topSwiperStyles.rankDetailText}
                    >
                      {addPercentageSignWithDecimal(net_sales_18)}
                    </Text>
                  </View>
                  <View style={topSwiperStyles.sliderBar}>
                    <Text style={topSwiperStyles.rankText}>24th</Text>
                    <View style={topSwiperStyles.barBackground}>
                      <View
                        style={[topSwiperStyles.barFill, { width: addPercentageSignWithDecimal(net_sales_24) }]}
                      />
                    </View>
                    <Text
                      style={topSwiperStyles.rankDetailText}
                    >
                      {addPercentageSignWithDecimal(net_sales_24)}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={topSwiperStyles.bottomTextContainer}>
                <Text style={topSwiperStyles.leftText}>
                  {numberTransformer(sales && sales.sales_achieved_value > 0 ? sales.sales_achieved_value : 0)}
                  /
                  {numberTransformer(sales && sales.target ? sales.target : 1)}
                </Text>
                <Text style={topSwiperStyles.rightText}>Milestone</Text>
              </View>
            </View>
          </View>
          {/* <Swiper */}
          {/*    renderPagination={this.renderPagination} */}
          {/*    loop={false}> */}
          {/*    <View style={styles.sliderCard}> */}
          {/*        <View style={styles.sliderCardHeadingContainer}> */}
          {/*            <Text style={styles.sliderCardHeading}>Sales Performance</Text> */}
          {/*        </View> */}
          {/*        <View style={styles.sliderInternalContainer}> */}
          {/*            <LinearGradient */}
          {/*                locations={[(salesAchieved / 100), (salesAchieved / 100)]} */}
          {/*                colors={[Colors.CircleFillColor, colorsStyles.dashboardCircle]} */}
          {/*                useAngle={true} */}
          {/*                angle={0} */}
          {/*                angleCenter={{x: 0.1, y: 0.5}} */}
          {/*                style={styles.linearGradient}> */}
          {/*                <View style={styles.centerCircle}> */}
          {/*                    <Text */}
          {/*                        style={styles.centerCircleText}>{addPercentageSignWithDecimal(salesAchieved)}</Text> */}
          {/*                    <Text style={styles.centerCircleText}>Achievement</Text> */}
          {/*                </View> */}
          {/*            </LinearGradient> */}
          {/*            <View style={styles.barContainer}> */}
          {/*                <View style={styles.sliderBar}> */}
          {/*                    <Text style={styles.rankText}>9th</Text> */}
          {/*                    <View style={styles.barBackground}> */}
          {/*                        <View */}
          {/*                            style={[styles.barFill, {width: addPercentageSignWithDecimal(net_sales_9)}]}></View> */}
          {/*                    </View> */}
          {/*                    <Text */}
          {/*                        style={styles.rankDetailText}>{addPercentageSignWithDecimal(net_sales_9)}</Text> */}
          {/*                </View> */}
          {/*                <View style={styles.sliderBar}> */}
          {/*                    <Text style={styles.rankText}>18th</Text> */}
          {/*                    <View style={styles.barBackground}> */}
          {/*                        <View */}
          {/*                            style={[styles.barFill, {width: addPercentageSignWithDecimal(net_sales_18)}]}></View> */}
          {/*                    </View> */}
          {/*                    <Text */}
          {/*                        style={styles.rankDetailText}>{addPercentageSignWithDecimal(net_sales_18)}</Text> */}
          {/*                </View> */}
          {/*                <View style={styles.sliderBar}> */}
          {/*                    <Text style={styles.rankText}>24th</Text> */}
          {/*                    <View style={styles.barBackground}> */}
          {/*                        <View */}
          {/*                            style={[styles.barFill, {width: addPercentageSignWithDecimal(net_sales_24)}]}></View> */}
          {/*                    </View> */}
          {/*                    <Text */}
          {/*                        style={styles.rankDetailText}>{addPercentageSignWithDecimal(net_sales_24)}</Text> */}
          {/*                </View> */}
          {/*            </View> */}
          {/*        </View> */}
          {/*        <View style={styles.bottomTextContainer}> */}
          {/*            <Text */}
          {/*                style={styles.leftText}>{numberTransformer(sales && sales['sales_achieved_value'] > 0 ? sales['sales_achieved_value'] : 0)}/{numberTransformer(sales && sales['target'] ? sales['target'] : 1)}</Text> */}
          {/*            <Text style={styles.rightText}>Milestone</Text> */}
          {/*        </View> */}
          {/*    </View> */}

          {/*    <TouchableOpacity style={styles.sliderCard} onPress={() => openTpl()}> */}
          {/*        <ImageBackground source={Images.card_bg_db} style={{width: '100%', height: '100%'}} */}
          {/*                         imageStyle={{borderRadius: 10}} resizeMode={'stretch'}> */}
          {/*            <View style={[layoutStyles.columnRev]}> */}
          {/*                <View style={[layoutStyles.topRow, {padding: 5}]}> */}
          {/*                    <View style={[layoutStyles.col4, styles.leftScore]}> */}
          {/*                        <Text */}
          {/*                            style={[{ */}
          {/*                                textAlign: 'center', */}
          {/*                                opacity: 1 */}
          {/*                            }, layoutStyles.whiteText]}>Your */}
          {/*                            Division Ranking</Text> */}
          {/*                        <Text style={[{textAlign: 'center'}, layoutStyles.whiteText]}> */}
          {/*                            {dashboardScore && dashboardScore['data'] && dashboardScore['data']['division'] ? dashboardScore['data']['division']['rank'] : '0'}/{dashboardScore && dashboardScore['data'] && dashboardScore['data']['division'] ? dashboardScore['data']['division']['total'] : '0'} */}
          {/*                        </Text> */}
          {/*                    </View> */}
          {/*                    <View style={[layoutStyles.col2]}> */}
          {/*                    </View> */}
          {/*                    <View style={[layoutStyles.col4, styles.leftScore]}> */}
          {/*                        <Text */}
          {/*                            style={[{ */}
          {/*                                textAlign: 'center', */}
          {/*                                opacity: 1 */}
          {/*                            }, layoutStyles.whiteText]}>Your */}
          {/*                            Score ({moment().format('MMMM')})</Text> */}
          {/*                        <Text style={[{textAlign: 'center'}, layoutStyles.whiteText]}> */}
          {/*                            {dashboardScore && dashboardScore['data'] && dashboardScore['data']['user'] ? dashboardScore['data']['user']['score'] : '0'}/{dashboardScore && dashboardScore['data'] && dashboardScore['data']['user'] ? dashboardScore['data']['user']['total'] : '0'} */}
          {/*                        </Text> */}
          {/*                    </View> */}
          {/*                </View> */}
          {/*            </View> */}
          {/*        </ImageBackground> */}
          {/*    </TouchableOpacity> */}
          {/* </Swiper> */}
        </>
      );
    }
}
