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

export default class BoContentComponent extends React.Component {
  renderTopHeader() {
    const {
      changeQuery, showMonthSelectModal, loadSalesTrend
    } = this.props;
    let {
      period
    } = this.props;

    let ytdContainerStyle; let mtdContainerStyle; let qtdContainerStyle; let ytdTextStyle; let mtdTextStyle; let
      qtdTextStyle;
    ytdContainerStyle = mtdContainerStyle = qtdContainerStyle = styles.tdContainer;
    ytdTextStyle = mtdTextStyle = qtdTextStyle = styles.tdText;
    if (!period) {
      period = '';
    }

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
          {this.renderGspPlanned()}
          {this.renderRcpa()}
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
            {this.renderGspPlanned()}
            {this.renderRcpa()}
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

  renderGspPlanned() {
    const { sales } = this.props;
    const { sales_planned } = sales;
    return (
      <View style={styles.gspSalesContainer}>
        <Text style={styles.salesHeading}>GSP Planned</Text>
        <View style={styles.salesNumberContainer}>
          <Text style={[styles.salesRs, styles.salesGspText]}>₹</Text>
          <Text style={[styles.salesNumber, styles.salesGspText]}>{numberTransformerNoSymbol(sales_planned.total_sales)}</Text>
        </View>
        <Text style={styles.salesTarget}>
          {addPercentageSign(sales_planned.target_achieved)}
          {' '}
          of GSP Target
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

  renderRcpa() {
    const { sales, goToRcpa } = this.props;
    const { rcpa_sales } = sales;
    return (
      <TouchableOpacity style={styles.rcpaSalesContainer} onPress={goToRcpa}>
        <Text style={styles.salesHeading}>RCPA Sales</Text>
        <View style={styles.salesNumberContainer}>
          <Text style={[styles.salesRs, styles.salesRcpaText]}>₹</Text>
          <Text style={[styles.salesNumber, styles.salesRcpaText]}>{numberTransformerNoSymbol(rcpa_sales.total_sales)}</Text>
        </View>
        <Text style={styles.salesTarget} />

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
          {this.renderDoctorRcpa()}
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
            {this.renderDoctorRcpa()}
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
    const { efforts, isBiologics } = this.props;
    return (
      <View style={styles.tcfaContainer}>
        <ProgressCircle
          percent={efforts.multivisit_compliance}
          radius={styles.radius}
          borderWidth={styles.circleWidth}
          color={styles.tcfa}
          shadowColor={styles.shadowColor}
          bgColor={styles.white}
        >
          <Text style={styles.tcfaText}>{addPercentageSign(efforts.multivisit_compliance)}</Text>
        </ProgressCircle>
        <Text style={styles.effortText}>{isBiologics ? 'Multi-visit coverage' : 'TCFA'}</Text>
      </View>
    );
  }

  renderDoctorRcpa() {
    const { efforts } = this.props;
    return (
      <View style={styles.rcpaContainer}>
        <ProgressCircle
          percent={efforts.docs_rcpa}
          radius={styles.radius}
          borderWidth={styles.circleWidth}
          color={styles.rcpa}
          shadowColor={styles.shadowColor}
          bgColor={styles.white}
        >
          <Text style={styles.rcpaText}>{addPercentageSign(efforts.docs_rcpa)}</Text>
        </ProgressCircle>
        <Text style={styles.effortText}>Docs RCPAed</Text>
      </View>
    );
  }

  renderCallAverage() {
    const { efforts } = this.props;
    return (
      <View style={styles.callAverageContainer}>
        <Image source={Images.icon_call_avg} style={styles.callAverageImage} resizeMode="stretch" />
        <Text style={styles.callAverageText}>{efforts.call_average}</Text>
        <Text style={styles.effortText}>Call Average</Text>
      </View>
    );
  }

  renderDetailingData() {
    const { myEffort } = this.props;
    if (myEffort) {
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
    const { e_detailing_calls, v_detailing_calls, physical_detailing_calls } = this.props.myEffort;
    return (
      <View style={styles.totalCallsContainer}>
        <Text style={styles.subHeading}>Total Calls</Text>
        <ChartView
          originWhitelist={['']}
          style={styles.totalCalls}
          config={getTotalCallsChartData({ e_detailing_calls, v_detailing_calls, physical_detailing_calls })}
          options={getChartConfig()}
        />
      </View>
    );
  }

  renderAverageTimeSpent() {
    const { avg_edetail_time, avg_virtual_detail_time } = this.props.myEffort;
    return (
      <View style={styles.avgTimeSpentContainer}>
        <Text style={styles.subHeading}>Avg. Time Spent</Text>
        <View style={styles.avgTimeSpentView}>
          <View style={styles.avgTimeSpentSubView}>
            <View style={styles.row}>
              <Text style={styles.avgTimeSpentEDetailing}>{avg_edetail_time ? (+avg_edetail_time / 60).toFixed(1) : '0.0'}</Text>
              <Text style={styles.avgTimeSpentMin}>min</Text>
            </View>
            <View style={styles.eDetailignRow} />
            <Text style={styles.avgTimeSpentValue}>E-detailing Appts.</Text>
          </View>

          <View style={styles.avgTimeSpentSubView}>
            <View style={styles.row}>
              <Text style={styles.avgTimeSpentVirtualDetailing}>{avg_virtual_detail_time ? (+avg_virtual_detail_time / 60).toFixed(1) : '0.0'}</Text>
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
    const { detailing_compliance, isBiologics } = this.props.myEffort;
    if (isBiologics) {
      return (
        <View style={styles.detailingComplianceContainer}>
          <Text style={styles.subHeading}>Detailing Compliance</Text>
          <Text style={styles.detailingCompliance}>{detailing_compliance}</Text>
        </View>
      );
    }
    return null;
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
    const { myBrandEffort } = this.props;
    if (myBrandEffort && myBrandEffort.brands) {
      return (
        <ChartView
          originWhitelist={['']}
          style={styles.brandWiseDetailingChart}
          config={getBrandWiseDetailingChartUtil(myBrandEffort ? myBrandEffort.brands : [])}
          options={getChartConfig()}
        />
      );
    }
    return null;
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
      const {
        showSalesTrend, hideSalesTrend, salesTrend, effortSummary
      } = this.props;
      return (
        <SalesTrendComponent
          isVisible={showSalesTrend}
          salesTrend={salesTrend}
          hideSalesTrend={hideSalesTrend}
          effortSummary={effortSummary}
        />
      );
    }

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
            {this.renderHeading('Efforts')}
            {DeviceInfo.isTablet() ? this.renderTabletEfforts() : this.renderMobileEfforts()}
            {this.renderDetailingData()}
            {this.renderBrandWiseDetailingHeader()}
            {this.renderBrandWiseDetailing()}
            {this.renderSpecialityActionSheet()}
            {this.renderSalesTrendModal()}
          </ScrollView>

        </ParentView>
      );
    }
}
