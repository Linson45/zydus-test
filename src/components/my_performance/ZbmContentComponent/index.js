import React from 'react';
import {
  Image, ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import ProgressCircle from 'react-native-progress-circle';
import ActionSheet from 'react-native-actionsheet';
import ParentView from '../../ParentView';
import styles from './styles';
import Images from '../../../Constants/imageConstants';
import MonthYearSelectionComponent from '../../Modal/MonthYearSelection';
import { addPercentageSign, numberTransformerNoSymbol } from '../../../util/NumberTrasformer';
import ChartView from '../../detailing/Chart';
import { getTotalCallsChartData } from '../TotalCallsChartUtil';
import { getChartConfig } from '../../../util/ChartUtil';
import { getBrandWiseDetailingChartUtil } from '../BrandwiseDetailingChartUtil';
import SalesTrendComponent from '../SalesTrendComponent';

export default class ZbmContentComponent extends React.Component {
  renderTopHeader() {
    const {
      period, changeQuery, showMonthSelectModal, loadSalesTrend
    } = this.props;

    let ytdContainerStyle; let mtdContainerStyle; let qtdContainerStyle; let ytdTextStyle; let mtdTextStyle; let
      qtdTextStyle;
    ytdContainerStyle = mtdContainerStyle = qtdContainerStyle = styles.tdContainer;
    ytdTextStyle = mtdTextStyle = qtdTextStyle = styles.tdText;

    if (period.toLowerCase() === 'ytd') {
      ytdContainerStyle = styles.tdContainerSelected;
      ytdTextStyle = styles.tdSelectedText;
    } else if (period.toLowerCase() === 'qtd') {
      qtdContainerStyle = styles.tdContainerSelected;
      qtdTextStyle = styles.tdSelectedText;
    } else if (period.toLowerCase() === 'mtd') {
      mtdContainerStyle = styles.tdContainerSelected;
      mtdTextStyle = styles.tdSelectedText;
    }

    return (
      <View style={styles.headerContainer}>
        <View>
          <TouchableOpacity style={styles.trendButton} onPress={loadSalesTrend}>
            <Image source={Images.trends} style={styles.trendIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.dateContainer}>
          <TouchableOpacity style={mtdContainerStyle} onPress={() => changeQuery('mtd')}>
            <Text style={mtdTextStyle}>MTD</Text>
          </TouchableOpacity>

          <TouchableOpacity style={qtdContainerStyle} onPress={() => changeQuery('qtd')}>
            <Text style={qtdTextStyle}>QTD</Text>
          </TouchableOpacity>

          <TouchableOpacity style={ytdContainerStyle} onPress={() => changeQuery('ytd')}>
            <Text style={ytdTextStyle}>YTD</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={showMonthSelectModal}>
            <Image source={Images.calendar} style={styles.calendar} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderCalendarModal() {
    const {
      changeQuery, month, year, hideMonthSelectModal, isVisibleMonthSelectModal
    } = this.props;

    return (
      <MonthYearSelectionComponent
        month={month}
        year={year}
        closeModal={hideMonthSelectModal}
        changeQuery={changeQuery}
        lastMonths={9}
        isVisible={isVisibleMonthSelectModal}
      />
    );
  }

  renderHeading(heading) {
    return (
      <Text style={styles.heading}>{heading}</Text>
    );
  }

  renderTabletSales() {
    const { sales } = this.props;
    if (sales) {
      return (
        <View style={styles.tabletSales}>
          {this.renderPrimarySales()}
          {this.renderSecondarySales()}
          {this.renderRcpa()}
          {this.renderPcpm()}
        </View>
      );
    }
    return null;
  }

  renderMobileSales() {
    const { sales } = this.props;
    if (sales) {
      return (
        <View>
          <View style={styles.mobileSales}>
            {this.renderPrimarySales()}
            {this.renderSecondarySales()}
          </View>

          <View style={styles.mobileSales}>
            {this.renderRcpa()}
            {this.renderPcpm()}
          </View>
        </View>
      );
    }
    return null;
  }

  renderPrimarySales() {
    const { sales, goToPrimarySales } = this.props;
    return (
      <TouchableOpacity style={styles.primarySalesContainer} onPress={goToPrimarySales}>
        <Text style={styles.salesHeading}>Primary Sales</Text>
        <View style={styles.salesNumberContainer}>
          <Text style={[styles.salesRs, styles.salesPrimaryText]}>₹</Text>
          <Text style={[styles.salesNumber, styles.salesPrimaryText]}>{numberTransformerNoSymbol(sales.primary_sales.total_sales)}</Text>
        </View>
        <Text style={styles.salesTarget}>
          Target
          {numberTransformerNoSymbol(sales.primary_sales.sales_target)}
        </Text>

        <View style={styles.primarySalesBottomContainer}>
          <View>
            <Text style={styles.primarySalesChange}>
              {addPercentageSign(sales.primary_sales.sales_growth)}
              {' '}
              gr
            </Text>
          </View>

          <View>
            <Text style={styles.primarySalesAch}>
              {addPercentageSign(sales.primary_sales.target_achieved)}
              {' '}
              Ach
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderSecondarySales() {
    const { sales, goToSecondarySales } = this.props;
    return (
      <TouchableOpacity style={styles.secondarySalesContainer} onPress={goToSecondarySales}>
        <Text style={styles.salesHeading}>Secondary Sales</Text>
        <View style={styles.salesNumberContainer}>
          <Text style={[styles.salesRs, styles.salesSecondaryText]}>₹</Text>
          <Text style={[styles.salesNumber, styles.salesSecondaryText]}>{numberTransformerNoSymbol(sales.secondary_sales.total_sales)}</Text>
        </View>
        <Text style={styles.salesTarget}>
          {addPercentageSign(sales.secondary_sales.target_achieved)}
          {' '}
          of Primary Sales
        </Text>

        <View style={styles.primarySalesBottomContainer}>
          <View>
            <Text style={styles.primarySalesChange} />
          </View>

          <View>
            <Text style={styles.primarySalesAch} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderRcpa() {
    const { sales } = this.props;
    const { rcpa_sales } = sales;
    return (
      <View style={styles.rcpaSalesContainer}>
        <Text style={styles.salesHeading}>RCPA</Text>
        <View style={styles.salesNumberContainer}>
          <Text style={[styles.salesRs, styles.salesRcpaText]}>₹</Text>
          <Text style={[styles.salesNumber, styles.salesRcpaText]}>{numberTransformerNoSymbol(rcpa_sales.total_sales)}</Text>
        </View>
        <Text style={styles.salesTarget}>
          {addPercentageSign(sales.rcpa_sales.target_achieved)}
          {' '}
          of Primary Sales
        </Text>

        <View style={styles.primarySalesBottomContainer}>
          <View>
            <Text style={styles.primarySalesChange} />
          </View>

          <View>
            <Text style={styles.primarySalesAch} />
          </View>
        </View>
      </View>
    );
  }

  renderPcpm() {
    const { sales, goToPcpm } = this.props;
    const { pcpm_sales } = sales;
    return (
      <TouchableOpacity style={styles.pcpmSalesContainer} onPress={goToPcpm}>
        <Text style={styles.salesHeading}>PCPM</Text>
        <View style={styles.salesNumberContainer}>
          <Text style={[styles.salesRs, styles.salesPcpmText]}>₹</Text>
          <Text style={[styles.salesNumber, styles.salesPcpmText]}>{numberTransformerNoSymbol(pcpm_sales.total_sales)}</Text>
        </View>
        <Text style={styles.salesTarget}>
          {addPercentageSign(pcpm_sales.pcpm_growth)}
          {' '}
          of gr
        </Text>

        <View style={styles.primarySalesBottomContainer}>
          <View>
            <Text style={styles.primarySalesChange} />
          </View>

          <View>
            <Text style={styles.primarySalesAch} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderTabletEfforts() {
    const { efforts } = this.props;
    if (efforts) {
      return (
        <View style={styles.tabletSales}>
          {this.renderMcrCoverage()}
          {this.renderTcfaCoverage()}
          {this.renderJfw()}
          {this.renderCallAverage()}
        </View>
      );
    }
    return null;
  }

  renderMobileEfforts() {
    const { efforts } = this.props;
    if (efforts) {
      return (
        <View>
          <View style={styles.mobileSales}>
            {this.renderMcrCoverage()}
            {this.renderTcfaCoverage()}
          </View>

          <View style={styles.mobileSales}>
            {this.renderJfw()}
            {this.renderCallAverage()}
          </View>
        </View>
      );
    }
    return null;
  }

  renderMcrCoverage() {
    const { efforts, goToMcrCoverage } = this.props;
    return (
      <TouchableOpacity style={styles.mcrContainer} onPress={goToMcrCoverage}>
        <ProgressCircle
          percent={efforts.total_coverage}
          radius={styles.radius}
          borderWidth={styles.circleWidth}
          color={styles.mcr}
          shadowColor={styles.shadowColor}
          bgColor={styles.white}
        >
          <Text style={styles.mcrText}>{addPercentageSign(efforts.total_coverage)}</Text>
        </ProgressCircle>
        <Text style={styles.effortText}>MCR Coverage</Text>
      </TouchableOpacity>
    );
  }

  renderTcfaCoverage() {
    const { efforts, goToJccCompliance } = this.props;
    return (
      <TouchableOpacity style={styles.tcfaContainer} onPress={goToJccCompliance}>
        <ProgressCircle
          percent={efforts.joint_call_compliance}
          radius={styles.radius}
          borderWidth={styles.circleWidth}
          color={styles.tcfa}
          shadowColor={styles.shadowColor}
          bgColor={styles.white}
        >
          <Text style={styles.tcfaText}>{addPercentageSign(efforts.joint_call_compliance)}</Text>
        </ProgressCircle>
        <Text style={styles.effortText}>JCC Compliance</Text>
      </TouchableOpacity>
    );
  }

  renderJfw() {
    const { efforts, goToJfwBoList } = this.props;
    return (
      <TouchableOpacity style={styles.rcpaContainer} onPress={goToJfwBoList}>
        <Text style={styles.effortValue}>{efforts.jfw_days}</Text>
        <Text style={styles.effortText}>No of JFW Days</Text>
      </TouchableOpacity>
    );
  }

  renderCallAverage() {
    const { efforts } = this.props;
    return (
      <View style={styles.callAverageContainer}>
        <Text style={styles.callAverageText}>{efforts.call_average}</Text>
        <Text style={styles.effortText}>Call Average</Text>
      </View>
    );
  }

  renderDetailingData() {
    const { efforts } = this.props;
    if (efforts) {
      return (
        <View style={styles.tabletSales}>
          {this.renderTotalCalls()}
          {this.renderAverageTimeSpent()}
          {this.renderDetailingCompliance()}
        </View>
      );
    }
    return null;
  }

  renderTotalCalls() {
    return (
      <View style={styles.totalCallsContainer}>
        <Text style={styles.subHeading}>Total Calls</Text>
        <ChartView
          originWhitelist={['']}
          style={styles.totalCalls}
          config={getTotalCallsChartData(null)}
          options={getChartConfig()}
        />
      </View>
    );
  }

  renderAverageTimeSpent() {
    return (
      <View style={styles.avgTimeSpentContainer}>
        <Text style={styles.subHeading}>Avg. Time Spent</Text>
        <View style={styles.avgTimeSpentView}>
          <View style={styles.avgTimeSpentSubView}>
            <View style={styles.row}>
              <Text style={styles.avgTimeSpentEDetailing}>2.5</Text>
              <Text style={styles.avgTimeSpentMin}>min</Text>
            </View>
            <View style={styles.eDetailignRow} />
            <Text style={styles.avgTimeSpentValue}>E-detailing Appts.</Text>
          </View>

          <View style={styles.avgTimeSpentSubView}>
            <View style={styles.row}>
              <Text style={styles.avgTimeSpentVirtualDetailing}>2.5</Text>
              <Text style={styles.avgTimeSpentMin}>min</Text>
            </View>
            <View style={styles.vDetailignRow} />
            <Text style={styles.avgTimeSpentValue}>Virtual Appts.</Text>
          </View>
        </View>
      </View>
    );
  }

  renderDetailingCompliance() {
    return (
      <View style={styles.detailingComplianceContainer}>
        <Text style={styles.subHeading}>Detailing Compliance</Text>
        <Text style={styles.detailingCompliance}>8.4</Text>
      </View>
    );
  }

  renderBrandWiseDetailingHeader() {
    const { selectedSpeciality } = this.props;
    return (
      <View style={styles.tabletSales}>
        <Text style={styles.brandWiseDetailingHeading}>Brand wise Detailing (min) - MTD</Text>
        <TouchableOpacity
          style={styles.specialityButton}
          onPress={() => {
            if (this.SpecialityActionSheet) {
              this.SpecialityActionSheet.show();
            }
          }}
        >
          <Text style={styles.specialityButtonText}>{selectedSpeciality ? selectedSpeciality.spec_name : 'All Speciality'}</Text>
          <Image style={styles.specialityButtonIcon} source={Images.DropDown} />
        </TouchableOpacity>
      </View>
    );
  }

  renderBrandWiseDetailing() {
    return (
      <ChartView
        originWhitelist={['']}
        style={styles.brandWiseDetailingChart}
        config={getBrandWiseDetailingChartUtil(null)}
        options={getChartConfig()}
      />
    );
  }

    renderSpecialityActionSheet = () => {
      const { specialities, setSpeciality } = this.props;
      if (specialities) {
        return (
          <ActionSheet
            ref={(o) => this.SpecialityActionSheet = o}
            title="Choose Speciality"
            options={specialities.map((spec) => spec.spec_name)}
            onPress={(index) => {
              setSpeciality(specialities[index]);
            }}
          />
        );
      }
      return null;
    };

    renderSalesTrendModal() {
      const { showSalesTrend, hideSalesTrend, salesTrend } = this.props;
      return (
        <SalesTrendComponent
          isVisible={showSalesTrend}
          salesTrend={salesTrend}
          hideSalesTrend={hideSalesTrend}
        />
      );
    }

    renderTabletAggregatedEfforts() {
      const { aggregatedEfforts } = this.props;
      if (aggregatedEfforts) {
        return (
          <View style={styles.tabletSales}>
            {this.renderAggregatedMcrCoverage()}
            {this.renderAggregatedTcfaCoverage()}
            {this.renderAggregatedDoctorRcpa()}
            {this.renderAggregatedCallAverage()}
          </View>
        );
      }
      return null;
    }

    renderMobileAggregatedEfforts() {
      const { aggregatedEfforts } = this.props;
      if (aggregatedEfforts) {
        return (
          <View>
            <View style={styles.mobileSales}>
              {this.renderAggregatedMcrCoverage()}
              {this.renderAggregatedTcfaCoverage()}
            </View>

            <View style={styles.mobileSales}>
              {this.renderAggregatedDoctorRcpa()}
              {this.renderAggregatedCallAverage()}
            </View>
          </View>
        );
      }
      return null;
    }

    renderAggregatedMcrCoverage() {
      const { aggregatedEfforts, goToMcrCoverageBOList } = this.props;
      return (
        <TouchableOpacity style={styles.mcrContainer} onPress={goToMcrCoverageBOList}>
          <ProgressCircle
            percent={aggregatedEfforts.total_coverage}
            radius={styles.radius}
            borderWidth={styles.circleWidth}
            color={styles.mcr}
            shadowColor={styles.shadowColor}
            bgColor={styles.white}
          >
            <Text style={styles.mcrText}>{addPercentageSign(aggregatedEfforts.total_coverage)}</Text>
          </ProgressCircle>
          <Text style={styles.effortText}>MCR Coverage</Text>
        </TouchableOpacity>
      );
    }

    renderAggregatedTcfaCoverage() {
      const { aggregatedEfforts, goToGspBOList } = this.props;
      return (
        <TouchableOpacity style={styles.tcfaContainer} onPress={goToGspBOList}>
          <ProgressCircle
            percent={aggregatedEfforts.multivisit_compliance}
            radius={styles.radius}
            borderWidth={styles.circleWidth}
            color={styles.tcfa}
            shadowColor={styles.shadowColor}
            bgColor={styles.white}
          >
            <Text style={styles.tcfaText}>{addPercentageSign(aggregatedEfforts.multivisit_compliance)}</Text>
          </ProgressCircle>
          <Text style={styles.effortText}>TCFA</Text>
        </TouchableOpacity>
      );
    }

    renderAggregatedDoctorRcpa() {
      const { aggregatedEfforts, goToRcpaBOList } = this.props;
      return (
        <TouchableOpacity style={styles.rcpaContainer} onPress={goToRcpaBOList}>
          <ProgressCircle
            percent={aggregatedEfforts.docs_rcpa}
            radius={styles.radius}
            borderWidth={styles.circleWidth}
            color={styles.rcpa}
            shadowColor={styles.shadowColor}
            bgColor={styles.white}
          >
            <Text style={styles.rcpaText}>{addPercentageSign(aggregatedEfforts.docs_rcpa)}</Text>
          </ProgressCircle>
          <Text style={styles.effortText}>Docs RCPAed</Text>
        </TouchableOpacity>
      );
    }

    renderAggregatedCallAverage() {
      const { aggregatedEfforts, goToCallAvgBOList } = this.props;
      return (
        <TouchableOpacity style={styles.callAverageContainer} onPress={goToCallAvgBOList}>
          <Text style={styles.callAverageText}>{aggregatedEfforts.call_average}</Text>
          <Text style={styles.effortText}>Call Average</Text>
        </TouchableOpacity>
      );
    }

    renderClmAggregatedHeader() {
      const { selectedBo } = this.props;
      return (
        <View style={styles.tabletSales}>
          <Text style={styles.brandWiseDetailingHeading}>CLM Aggregated Efforts</Text>
          <TouchableOpacity
            style={styles.specialityButton}
            onPress={() => {
              if (this.BoActionSheet) {
                this.BoActionSheet.show();
              }
            }}
          >
            <Text style={styles.specialityButtonText}>{selectedBo ? selectedBo.name : 'All BO Group'}</Text>
            <Image style={styles.specialityButtonIcon} source={Images.DropDown} />
          </TouchableOpacity>
        </View>
      );
    }

    renderBoActionSheet = () => {
      const { setSelectedBo, bos } = this.props;
      if (bos) {
        return (
          <ActionSheet
            ref={(o) => this.BoActionSheet = o}
            title="Choose BO"
            options={bos.map((spec) => spec.name)}
            onPress={(index) => {
              setSelectedBo(bos[index]);
            }}
          />
        );
      }
      return null;
    };

    renderAggregatedDetailingData() {
      const { efforts } = this.props;
      if (efforts) {
        return (
          <View style={styles.tabletSales}>
            {this.renderAggregatedTotalCalls()}
            {this.renderAggregatedAverageTimeSpent()}
            {this.renderAggregatedDetailingCompliance()}
          </View>
        );
      }
      return null;
    }

    renderAggregatedTotalCalls() {
      return (
        <View style={styles.totalCallsContainer}>
          <Text style={styles.subHeading}>Total Calls</Text>
          <ChartView
            originWhitelist={['']}
            style={styles.totalCalls}
            config={getTotalCallsChartData(null)}
            options={getChartConfig()}
          />
        </View>
      );
    }

    renderAggregatedAverageTimeSpent() {
      return (
        <View style={styles.avgTimeSpentContainer}>
          <Text style={styles.subHeading}>Avg. Time Spent</Text>
          <View style={styles.avgTimeSpentView}>
            <View style={styles.avgTimeSpentSubView}>
              <View style={styles.row}>
                <Text style={styles.avgTimeSpentEDetailing}>2.5</Text>
                <Text style={styles.avgTimeSpentMin}>min</Text>
              </View>
              <View style={styles.eDetailignRow} />
              <Text style={styles.avgTimeSpentValue}>E-detailing Appts.</Text>
            </View>

            <View style={styles.avgTimeSpentSubView}>
              <View style={styles.row}>
                <Text style={styles.avgTimeSpentVirtualDetailing}>2.5</Text>
                <Text style={styles.avgTimeSpentMin}>min</Text>
              </View>
              <View style={styles.vDetailignRow} />
              <Text style={styles.avgTimeSpentValue}>Virtual Appts.</Text>
            </View>
          </View>
        </View>
      );
    }

    renderAggregatedDetailingCompliance() {
      return (
        <View style={styles.detailingComplianceContainer}>
          <Text style={styles.subHeading}>Detailing Compliance</Text>
          <Text style={styles.detailingCompliance}>8.4</Text>
        </View>
      );
    }

    renderAggregatedBrandWiseDetailingHeader() {
      const { boSelectedSpeciality } = this.props;
      return (
        <View style={styles.tabletSales}>
          <Text style={styles.brandWiseDetailingHeading}>Brand wise Detailing (min) - MTD</Text>
          <TouchableOpacity
            style={styles.specialityButton}
            onPress={() => {
              if (this.BoSpecialityActionSheet) {
                this.BoSpecialityActionSheet.show();
              }
            }}
          >
            <Text style={styles.specialityButtonText}>{boSelectedSpeciality ? boSelectedSpeciality.spec_name : 'All Speciality'}</Text>
            <Image style={styles.specialityButtonIcon} source={Images.DropDown} />
          </TouchableOpacity>
        </View>
      );
    }

    renderAggregatedBrandWiseDetailing() {
      return (
        <ChartView
          originWhitelist={['']}
          style={styles.brandWiseDetailingChart}
          config={getBrandWiseDetailingChartUtil(null)}
          options={getChartConfig()}
        />
      );
    }

    renderAggregatedSpecialityActionSheet = () => {
      const { specialities, setBoSpeciality } = this.props;
      if (specialities) {
        return (
          <ActionSheet
            ref={(o) => this.BoSpecialityActionSheet = o}
            title="Choose Speciality"
            options={specialities.map((spec) => spec.spec_name)}
            onPress={(index) => {
              setBoSpeciality(specialities[index]);
            }}
          />
        );
      }
      return null;
    };

    render() {
      const { loading } = this.props;

      return (
        <ParentView
          loading={loading}
          connected
        >

          <ScrollView contentContainerStyle={styles.container}>
            {this.renderTopHeader()}
            {this.renderCalendarModal()}
            {this.renderHeading('Sales Summary')}
            {DeviceInfo.isTablet() ? this.renderTabletSales() : this.renderMobileSales()}
            {this.renderHeading('My Efforts')}
            {DeviceInfo.isTablet() ? this.renderTabletEfforts() : this.renderMobileEfforts()}
            {this.renderDetailingData()}
            {this.renderBrandWiseDetailingHeader()}
            {this.renderBrandWiseDetailing()}
            {this.renderSpecialityActionSheet()}
            {this.renderSalesTrendModal()}
            {this.renderHeading('Aggregated Efforts')}
            {DeviceInfo.isTablet() ? this.renderTabletAggregatedEfforts() : this.renderMobileAggregatedEfforts()}
            {this.renderClmAggregatedHeader()}
            {this.renderBoActionSheet()}
            {this.renderAggregatedDetailingData()}
            {this.renderAggregatedBrandWiseDetailingHeader()}
            {this.renderAggregatedBrandWiseDetailing()}
            {this.renderAggregatedSpecialityActionSheet()}
          </ScrollView>

        </ParentView>
      );
    }
}
