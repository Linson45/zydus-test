import React, { Component } from 'react';
import {
  ImageBackground,
  ScrollView,
  Text,
  View,
  Dimensions,
  Alert,
  Image,
  TouchableHighlight,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { StackActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from '../../../styles/colorsStyles';
import CheckBox from 'react-native-check-box';
import { Dropdown } from 'react-native-material-dropdown';
import { Body, Icon, ListItem, Right, Button, Item, Input } from 'native-base';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-picker';
import styles from './styles';
import ParentView from '../../ParentView';
import Images from '../../../Constants/imageConstants';
import {
  getCurrentMonth,
  getCurrentYear,
  getFullMonthString,
} from '../../../util/dateTimeUtil';
import NetInfo from '@react-native-community/netinfo';
import { createRxSubmit,saveRxSubmit,deleteRxSave } from '../../../local-storage/helper/Rx/index'
// import { updateRxSubmit } from '../../../local-storage/helper/Rx/index'
import api from '../../../api';
import Urls from '../../../api/urls';
import { forEach } from 'lodash';
// import createRxUploadData from '../../../local-storage/helper/Rx/index';
// import { saveUploadRx } from '../../../actions/RxTrackerActions';
class IncompleteRxEditComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDoctorSelect: '',
      isSkuSelect: '',
      isRxUpload: null,
      isRxHintShow: false,
      isChemistSelected: '',
      isProofOfSupply: null,
      isProofOfSupplyArray: ['', '', '', '', ''],
      isChemistSelectedArray: ['', '', '', '', ''],
      isRxProofShow: [false, false, false, false, false],
      showPopup: false,
      showPopup_1: false,
      showPopup_2: false,
      showPopup_3: false,
      showPopup_4: false,
      showPopup_5: false,
      isSubmitProgress: false,
      quantity: [0, 0, 0, 0, 0],
      // chemistListCount: [0, 1, 2, 3, 4],
      totalQuantity: 0,
      chemist1: true,
      chemist2: false,
      chemist3: false,
      chemist4: false,
      chemist5: false,
      chemistListNumber: 1,
      chemistData: [],
      chemistSelectShow: []
    };
  }
  componentDidMount() {
    console.log('docData', this.props.docData)
    var docData = this.props.docData
    var doctor
    this.props.docList.map(doc => {
      if (doc.dr_code === docData.dr_code) {
        doctor = doc 
      }
    })
    this.setState({ isDoctorSelect: doctor })
    console.log('Doctor details Apsel', doctor, docData)

    var proofOfsupplyArrayTemp = []
    let quantityTemp = []
    var proofOfSupply = docData.proof_of_supply//
    proofOfSupply.map(proof => {
      proofOfsupplyArrayTemp.push(proof)
    })
    docData.qty.map(qty => {
      quantityTemp.push(qty)
    })
    this.setState({ isProofOfSupplyArray: proofOfsupplyArrayTemp })
    this.setState({ quantity: quantityTemp })

    var skuDataTemp = {
      product_code: docData.prd_code,
      product_name: docData.brand_name,
      brand_code: '0005000038',
    }

    this.setState({ isSkuSelect: skuDataTemp })

    var chemistWholeList = doctor.chemist_code
    this.setState({ chemistData: chemistWholeList })
    this.setState({ isRxUpload: docData.rx_upload })
    var chemistListArray = docData.selected_chemist
    var filteredChemistList = chemistWholeList.filter((elem) => chemistListArray.find((chemCode) => elem.chemist_code === chemCode));

    this.setState({ isChemistSelectedArray: filteredChemistList })
    this.setState({ chemistSelectShow: filteredChemistList })

    var chemistLength = filteredChemistList.length
    this.setState({ chemistListNumber: filteredChemistList.length })
    console.log('Other details Apsel', filteredChemistList, proofOfsupplyArrayTemp, chemistWholeList, chemistLength, quantityTemp, skuDataTemp, doctor)
    if (chemistLength === 2) {
      this.setState({ chemist2: true })
    }
    if (chemistLength === 3) {
      this.setState({ chemist2: true })
      this.setState({ chemist3: true })
    }
    if (chemistLength === 4) {
      this.setState({ chemist2: true })
      this.setState({ chemist3: true })
      this.setState({ chemist4: true })
    }
    if (chemistLength === 5) {
      this.setState({ chemist2: true })
      this.setState({ chemist3: true })
      this.setState({ chemist4: true })
      this.setState({ chemist5: true })
    }
  }
  async offlineSubmit(isIncomplete) {
    const { userData, goBack } = this.props;

    const company_code = userData.company_code;
    const { campaign_code, sbu_code, rep_code,
      mcr_no, dr_code, doc_name } = this.state.isDoctorSelect
    const prd_code = this.state.isSkuSelect.product_code
    const brand_code = '0005000038'
    const qty = []
    var rx_upload = ''
    if (this.state.isRxUpload) {
      if (this.state.isRxUpload.uri) {
        rx_upload = this.state.isRxUpload.uri
      } else {
        rx_upload = this.state.isRxUpload
      }
    }

    let chemists = [];
    let pos = []

    var d = new Date();
    const MONTHS = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ]
    var month = MONTHS[getCurrentMonth() - 1]
    var year = getCurrentYear() - 2000;
    let created_at = `${d.getDate()}-${month}-${year}`
    let brand_name = this.state.isSkuSelect.product_name
    const dataForSave = {
      campaign_code, company_code, rep_code,
      sbu_code, dr_code, mcr_no, prd_code, brand_code, doc_name, created_at, brand_name
    }
    const data = { campaign_code, company_code, rep_code,
      sbu_code, dr_code, mcr_no, prd_code, brand_code}

    this.state.isChemistSelectedArray.map(chem => {
      if (chem !== '' && chem) {
        chemists.push(chem.chemist_code)
      } else {
        chemists.push('')
      }
    })
    this.state.isProofOfSupplyArray.map(proof => {
      if (proof !== null && proof.uri !== undefined) {
        pos.push(proof.uri)
      }
      else if (proof !== null) {
        pos.push(proof)
      }
      else {
        pos.push('')
      }
    })
    this.state.quantity.map(qt => {
      if (qt) {
        qty.push(qt)
      } else {
        qty.push(0)
      }
    })
    //  var month=getCurrentMonth()
    //  var year=getCurrentYear()
    var status = 0
    if (isIncomplete) {
      status = -1
    }
    if(isIncomplete){
      console.log('Rx data', chemists, pos, rx_upload, qty, data, status)
    // deleteRxSave(rep_code,dr_code);
     saveRxSubmit(chemists, pos, rx_upload, qty, dataForSave, status)
    }else{
      console.log('Rx data', chemists, pos, rx_upload, qty, data, status)
      createRxSubmit(chemists, pos, rx_upload, qty, data, status)
    }
   
    this.setState({ isSubmitProgress: false });
    Alert.alert(
      'Rx Data saved',
      'Rx has been saved successfully!',
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.goBack();
          }, 
        },
      ],
      { cancelable: false },
    );
  }

  checkOffline(isIncomplete) {
    if (isIncomplete) {
      this.offlineSubmit(isIncomplete)
    } else {
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {
          this.submitData()
        }
        else {
          this.offlineSubmit()
        }
      })
    }
  }
  async submitData() {
    const { userData, goBack } = this.props;
    this.setState({ isSubmitProgress: true });
    const STORAGE_KEY = '@save_rx';
    const formData = new FormData();
    formData.append('campaign_code', this.state.isDoctorSelect.campaign_code);
    formData.append('company_code', userData.company_code);
    formData.append('sbu_code', this.state.isDoctorSelect.sbu_code);
    formData.append('rep_code', this.state.isDoctorSelect.rep_code);
    formData.append('mcr_no', this.state.isDoctorSelect.mcr_no);
    formData.append('dr_code', this.state.isDoctorSelect.dr_code);
    if (
      this.state.isChemistSelectedArray[0] !== '' &&
      this.state.isChemistSelectedArray[0]
    ) {
      formData.append(
        'chem_code_1',
        this.state.isChemistSelectedArray[0].chemist_code,
      );
    } else {
      formData.append('chem_code_1', '');
    }

    if (
      this.state.isChemistSelectedArray[1] !== '' &&
      this.state.isChemistSelectedArray[1]
    ) {
      formData.append(
        'chem_code_2',
        this.state.isChemistSelectedArray[1].chemist_code,
      );
    } else {
      formData.append('chem_code_2', '');
    }

    if (
      this.state.isChemistSelectedArray[2] !== '' &&
      this.state.isChemistSelectedArray[2]
    ) {
      formData.append(
        'chem_code_3',
        this.state.isChemistSelectedArray[2].chemist_code,
      );
    } else {
      formData.append('chem_code_3', '');
    }

    if (
      this.state.isChemistSelectedArray[3] !== '' &&
      this.state.isChemistSelectedArray[3]
    ) {
      formData.append(
        'chem_code_4',
        this.state.isChemistSelectedArray[3].chemist_code,
      );
    } else {
      formData.append('chem_code_4', '');
    }

    if (
      this.state.isChemistSelectedArray[4] !== '' &&
      this.state.isChemistSelectedArray[4]
    ) {
      formData.append(
        'chem_code_5',
        this.state.isChemistSelectedArray[4].chemist_code,
      );
    } else {
      formData.append('chem_code_5', '');
    }

    formData.append('month', getCurrentMonth());
    formData.append('year', getCurrentYear());
    formData.append('prd_code', this.state.isSkuSelect.product_code);
    formData.append('brand_code', '0005000038');

    if (
      this.state.isRxUpload != null &&
      this.state.isRxUpload.uri !== undefined
    ) {
      formData.append('file1', {
        uri: this.state.isRxUpload.uri,
        type: 'image/jpg',
        name: 'file1.jpg',
      });
    }

    if (
      this.state.isProofOfSupplyArray[0] != null &&
      this.state.isProofOfSupplyArray[0].uri !== undefined
    ) {
      formData.append('pos_1', {
        uri: this.state.isProofOfSupplyArray[0].uri,
        type: 'image/jpg',
        name: 'file2.jpg',
      });
    } else {
      formData.append('pos_1', '');
    }
    if (
      this.state.isProofOfSupplyArray[1] != null &&
      this.state.isProofOfSupplyArray[1].uri !== undefined
    ) {
      formData.append('pos_2', {
        uri: this.state.isProofOfSupplyArray[1].uri,
        type: 'image/jpg',
        name: 'file2.jpg',
      });
    } else {
      formData.append('pos_2', '');
    }
    if (
      this.state.isProofOfSupplyArray[2] != null &&
      this.state.isProofOfSupplyArray[2].uri !== undefined
    ) {
      formData.append('pos_3', {
        uri: this.state.isProofOfSupplyArray[2].uri,
        type: 'image/jpg',
        name: 'file2.jpg',
      });
    } else {
      formData.append('pos_3', '');
    }
    if (
      this.state.isProofOfSupplyArray[3] != null &&
      this.state.isProofOfSupplyArray[3].uri !== undefined
    ) {
      formData.append('pos_4', {
        uri: this.state.isProofOfSupplyArray[3].uri,
        type: 'image/jpg',
        name: 'file2.jpg',
      });
    } else {
      formData.append('pos_4', '');
    }
    if (
      this.state.isProofOfSupplyArray[4] != null &&
      this.state.isProofOfSupplyArray[4].uri !== undefined
    ) {
      formData.append('pos_5', {
        uri: this.state.isProofOfSupplyArray[4].uri,
        type: 'image/jpg',
        name: 'file2.jpg',
      });
    } else {
      formData.append('pos_5', '');
    }
    if (this.state.quantity[0]) {
      formData.append('qty_1', this.state.quantity[0]);
    } else {
      formData.append('qty_1', '');
    }
    if (this.state.quantity[1]) {
      formData.append('qty_2', this.state.quantity[1]);
    } else {
      formData.append('qty_2', '');
    }
    if (this.state.quantity[2]) {
      formData.append('qty_3', this.state.quantity[2]);
    } else {
      formData.append('qty_3', '');
    }
    if (this.state.quantity[3]) {
      formData.append('qty_4', this.state.quantity[3]);
    } else {
      formData.append('qty_4', '');
    }
    if (this.state.quantity[4]) {
      formData.append('qty_5', this.state.quantity[4]);
    } else {
      formData.append('qty_5', '');
    }
    console.log(
      'Submit stored data',
      this.state.quantity,
      this.state.isChemistSelectedArray,
    );
    console.log('Submitted data', formData);
    // For deleting saved Rx data
    deleteRxSave(this.state.isDoctorSelect.rep_code,this.state.isDoctorSelect.dr_code)
    this.props.submitDataAPI(formData)
  }
  async validationHandler() {
    const {
      isProofOfSupplyArray,
      chemistListNumber, 
      isChemistSelectedArray,
      isRxUpload,
      quantity,
    } = this.state;
    console.log('validation wwwww', isProofOfSupplyArray);

    console.log('validation enter', isChemistSelectedArray.length);
    if (!isRxUpload) {
      console.log('rx Array');
      Alert.alert(
        'Please upload RX',
        '',
        [
          {
            text: 'OK',
          },
        ],
        { cancelable: false },
      );
      return false;
    }
    var newArray = [];
    isChemistSelectedArray.map(value => {
      if (value && value != '') {
        if (newArray.includes(value) === false) {
          newArray.push(value)
        }
      }
    });
    console.log('chemist array length', newArray, chemistListNumber);

    if (newArray.length < chemistListNumber) {
      console.log('chemist Array');
      Alert.alert(
        'Do not repeat chemist',
        '',
        [
          {
            text: 'OK',
          },
        ],
        { cancelable: false },
      );
      return false;
    }
    if (newArray.length < 1) {
      console.log('chemist Array');
      Alert.alert(
        'Please select chemist',
        '',
        [
          {
            text: 'OK',
          },
        ],
        { cancelable: false },
      );
      return false;
    }
    var newArray2 = [];
    isProofOfSupplyArray.map(value => {
      if (value) {
        newArray2.push(value);
      }
    });
    if (newArray2.length < chemistListNumber) {
      console.log('prrof Array');
      Alert.alert(
        'Please upload all Proof of Supply',
        '',
        [
          {
            text: 'OK',
          },
        ],
        { cancelable: false },
      );
      return false;
    }

    var newArray3 = [];
    quantity.map(value => {
      if (value) {
        newArray3.push(value);
      }
    });
    if (newArray3.length < chemistListNumber) {
      console.log('prrof Array');
      Alert.alert(
        'Please enter all quantity',
        'Quality should be numeric',
        [
          {
            text: 'OK',
          },
        ],
        { cancelable: false },
      );
      return false;
    }
    // this.submitData();
    this.checkOffline();
  }
  saveHandler() {
    console.log('Save pressed')
  }
  renderBottomButton() {
    const {
      isProofOfSupplyArray,
      chemistListNumber,
      isChemistSelectedArray,
      isRxUpload,
      quantity,
    } = this.state;
    //save button disable
    var newArray2 = [];
    isProofOfSupplyArray.map(value => {
      if (value) {
        newArray2.push(value);
      }
    });
    var disableButton = false
    if (isRxUpload || newArray2.length > 0) {
      disableButton = false
    } else {
      disableButton = true
    }

    //Submit button disable
    var disableSubmit = false
    if (!isRxUpload) {
      disableSubmit = true;
    }
    var newArray = [];
    isChemistSelectedArray.map(value => {
      if (value && value != '') {
        newArray.push(value);
      }
    });
    if (newArray.length < chemistListNumber) {

      disableSubmit = true;
    }
    if (newArray.length < 1) {
      disableSubmit = true;
    }

    var newArray2 = [];
    isProofOfSupplyArray.map(value => {
      if (value) {
        newArray2.push(value);
      }
    });
    if (newArray2.length < chemistListNumber) {
      console.log('prrof Array');
      disableSubmit = true;
    }

    var newArray3 = [];
    quantity.map(value => {
      if (value) {
        newArray3.push(value);
      }
    });
    if (newArray3.length < chemistListNumber) {
      console.log('prrof Array');
      disableSubmit = true;
    }
    // disableButton=true
    return (
      <View style={styles.bottomView}>
        <Button
          title=''
          style={{
            width: 100,
            height: 35,
            // marginTop: 20,
            // padding: 10,
            backgroundColor: disableButton ? '#c4b4e4' : Colors.colorPrimary,
            borderRadius: 8,
            marginLeft: 20,
            // borderColor: '#482c80',
            borderColor: disableButton ? '#c4b4e4' : '#482c80',

            borderWidth: 1,
            textAlign: 'center',
          }}
          disabled={disableButton}
          onPress={() => {
            //this.saveHandler();
            this.checkOffline(true)
          }}>
          <Text style={{
            color: 'white',
            fontWeight: '500',
            textAlign: 'center',
            marginLeft: '30%',
          }}>SAVE</Text>
        </Button>
        <Button
          title=''
          style={{
            width: 100,
            height: 35,
            backgroundColor: disableSubmit ? '#c4b4e4' : Colors.colorPrimary,
            borderRadius: 8,
            marginLeft: 20,
            // borderColor: '#482c80',
            borderColor: disableSubmit ? '#c4b4e4' : '#482c80',

            borderWidth: 1,
            textAlign: 'center',
          }}
          onPress={() => {
            this.validationHandler();
          }}
          disabled={disableSubmit}>

          <Text style={{
            color: 'white',
            fontWeight: '500',
            textAlign: 'center',
            marginLeft: '25%',
          }}>SUBMIT</Text>
        </Button>
      </View>
    );
  }

  selectPhotoTapped(data) {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        if (data === 'image1') {
          this.setState({
            isRxUpload: source,
          });
        } else {
          var newArray = this.state.isProofOfSupplyArray;
          console.log('Apsel source', source);
          // newArray.splice(data, 1, source);
          newArray[data] = source;
          console.log('Array of proof of supply', newArray);
          this.setState({
            isProofOfSupplyArray: newArray,
          });
        }
      }
    });
  }

  removeImage(data) {
    if (data === 'image1') {
      this.setState({
        isRxUpload: null,
        isChemistSelected: null,
        isProofOfSupply: null,
      });
    } else {
      this.setState({
        isProofOfSupply: null,
      });
    }
  }
  removeProofOfSupply(index) {
    console.log('clicked remove');
    var newArray = this.state.isProofOfSupplyArray;
    console.log('New Array Apsel', newArray, index);
    newArray.splice(index, 1, '');
    console.log('New splice Apsel', newArray);

    this.setState({
      isProofOfSupplyArray: newArray,
    });
  }
  showHint(type) {
    if (type === 'show_1') {
      this.setState({
        isRxHintShow: true,
      });
    } else {
      this.setState({
        isRxHintShow: false,
      });
    }
  }
  proofHint(index, data) {
    if (data) {
      var newArray = this.state.isRxProofShow;
      newArray.splice(index, 1, data);
      this.setState({
        isRxProofShow: newArray,
      });
    } else {

      var newArray = this.state.isRxProofShow;
      newArray.splice(index, 1, data);
      this.setState({
        isRxProofShow: newArray,
      });
    }
  }

  showImage(type) {
    if (type === '1') {
      this.setState({
        showPopup: true,
      });
    } else {
      this.setState({
        showPopup: false,
      });
    }
  }

  showImage2(index, data) {
    if (data) {
      console.log('Apsel show image', index);
      this.renderModal2(index);
      this.setState({
        showPopup_1: true,
      });
    } else {
      this.setState({
        showPopup_1: false,
      });
    }
  }
  disableRemoveHandler() {
    console.log('diable came');
    var newArray = [];
    this.state.isChemistSelectedArray.map(value => {
      if (value && value != '') {
        newArray.push(value);
      }
    });
    if (newArray.length < 1) {
      console.log('diable came true');
      return true;
    } else {
      console.log('diable came false');
      return false;
    }
  }
  removeChemistHandler(index) {
    console.log(
      'Remvinging before values',
      this.state.isChemistSelectedArray,
      this.state.isProofOfSupplyArray,
      this.state.quantity,
      index,
    );
    var temp = this.state.chemistListNumber;
    temp = temp - 1;
    this.setState({ chemistListNumber: temp });
    console.log('Apsel Number', temp);
    if (index === 0) {
      this.setState({ chemist1: false });

    }
    if (index === 1) {
      this.setState({ chemist2: false });

    }
    if (index === 2) {
      this.setState({ chemist3: false });

    }
    if (index === 3) {
      this.setState({ chemist4: false });

    }
    if (index === 4) {
      this.setState({ chemist5: false });

    }

    var newArray = this.state.isProofOfSupplyArray;
    console.log('New Array Apsel', newArray, index);
    // newArray.delete[index];
    delete newArray[index];
    console.log('New splice Apsel', newArray);

    this.setState({
      isProofOfSupplyArray: newArray,
    });
    var newArray2 = this.state.quantity;
    console.log('New Array Apsel', newArray2, index);
    // newArray.delete[index];
    delete newArray2[index];
    console.log('New splice Apsel', newArray2);

    this.setState({
      quantity: newArray2,
    });
    var newArray3 = this.state.isChemistSelectedArray;
    console.log('New Array Apsel', newArray3, index);
    // newArray.delete[index];
    delete newArray3[index];
    console.log('New splice Apsel', newArray3);

    this.setState({
      isChemistSelectedArray: newArray3,
    });
    var newArray4 = this.state.chemistSelectShow
    delete newArray4[index];
    this.setState({ chemistSelectShow: newArray4 });
    console.log(
      'Remvinging values',
      this.state.isChemistSelectedArray,
      this.state.isProofOfSupplyArray,
      this.state.quantity,
      this.state.chemistData,
      this.state.chemistSelectShow,
      index,
    );
  }
  addChemistHandler() {
    console.log('clicked add');
    if (
      this.state.chemistListNumber <
      this.state.isDoctorSelect.chemist_code.length
    ) {
      if (this.state.chemistListNumber === 0) {
        this.setState({ chemist1: true });
        console.log('Temp Apsel1');
      }
      if (this.state.chemistListNumber === 1) {
        if (!this.state.chemist1) {
          this.setState({ chemist1: true });
        } else {
          this.setState({ chemist2: true });
        }

        console.log('Temp Apsel2');
      }
      if (this.state.chemistListNumber === 2) {
        if (!this.state.chemist1) {
          this.setState({ chemist1: true });
        } else if (!this.state.chemist2) {
          this.setState({ chemist2: true });
        } else {
          this.setState({ chemist3: true });
        }

        console.log('Temp Apsel3');
      }
      if (this.state.chemistListNumber === 3) {
        if (!this.state.chemist1) {
          this.setState({ chemist1: true });
        } else if (!this.state.chemist2) {
          this.setState({ chemist2: true });
        } else if (!this.state.chemist3) {
          this.setState({ chemist3: true });
        } else {
          this.setState({ chemist4: true });
        }

        console.log('Temp Apsel4');
      }
      if (this.state.chemistListNumber === 4) {
        if (!this.state.chemist1) {
          this.setState({ chemist1: true });
        } else if (!this.state.chemist2) {
          this.setState({ chemist2: true });
        } else if (!this.state.chemist3) {
          this.setState({ chemist3: true });
        } else if (!this.state.chemist4) {
          this.setState({ chemist4: true });
        } else {
          this.setState({ chemist5: true });
        }

        console.log('Temp Apsel5');
      }
      var temp = this.state.chemistListNumber;
      temp = temp + 1;
      this.setState({ chemistListNumber: temp });
      console.log('Add number', temp);
    }
  }
  renderModal() {
    const { showPopup } = this.state;
    console.log('Modal 1', this.state.isRxUpload, this.state.isRxUpload.uri);
    return (
      <Modal
        style={{
          height: Dimensions.get('window').height - 30,
          width: Dimensions.get('window').width - 80,
        }}
        onRequestClose={() => this.setState({ showPopup: true })}
        isVisible={showPopup}>
        <View style={styles.modalContent}>
          <Image
            source={{ uri: this.state.isRxUpload.uri||this.state.isRxUpload}}
            resizeMode="contain"
            style={{
              width: (Dimensions.get('window').width * 8) / 9,
              height: (Dimensions.get('window').height * 6) / 9,
            }}
          />
          <View
            style={{
              backgroundColor: Colors.blue_dark,
              width: '50%',
              justifyContent: 'center',
              alignSelf: 'center',
              margin: 20,
            }}>
            <Text style={{ fontSize: 15, margin: 5, color: 'white' }}>
              RxUpload
              {'\n'}
              Please check the following
              {'\n'}- Date Validation
              {'\n'}- CrossCheck the Product
              {'\n'}- Check if the Doctor's Name is correct
            </Text>
          </View>

          <Icon
            name="closecircle"
            type="AntDesign"
            onPress={() => {
              this.setState({ showPopup: false });
            }}
            style={{
              fontSize: 25,
              position: 'absolute',
              right: 5,
              color: 'red',
              top: 5,
            }}
          />
        </View>
      </Modal>
    );
  }
  proofOfSupplyModal(index) {
    if (index === 0) {
      this.renderModal0(index);
      this.setState({ showPopup_1: true });
    }
    if (index === 1) {
      this.renderModal2(index);
      this.setState({ showPopup_2: true });
    }
    if (index === 2) {
      this.renderModal3(index);
      this.setState({ showPopup_3: true });
    }
    if (index === 3) {
      this.renderModal4(index);
      this.setState({ showPopup_4: true });
    }
    if (index === 4) {
      this.renderModal5(index);
      this.setState({ showPopup_5: true });
    }
  }
  renderModal0(index) {
    const { showPopup_1 } = this.state;
    console.log('Model 2', this.state.isProofOfSupplyArray[0], this.state.isProofOfSupplyArray[0].uri)
    return (
      <Modal
        style={{
          height: Dimensions.get('window').height - 30,
          width: Dimensions.get('window').width - 80,
        }}
        onRequestClose={() => this.setState({ showPopup_1: true })}
        isVisible={showPopup_1}>
        <View style={styles.modalContent}>
          <Image
            source={{ uri: this.state.isProofOfSupplyArray[0].uri||this.state.isProofOfSupplyArray[0] }}
            style={{
              width: (Dimensions.get('window').width * 8) / 9,
              height: (Dimensions.get('window').height * 6) / 9,
            }}
          />
          <View
            style={{
              backgroundColor: Colors.blue_dark,
              width: '50%',
              justifyContent: 'center',
              alignSelf: 'center',
              margin: 20,
            }}>
            <Text style={{ fontSize: 15, margin: 5, color: 'white' }}>
              Proof of Supply
              {'\n'}
              Please check the following
              {'\n'}- Date Validation
              {'\n'}- CrossCheck the Product
              {'\n'}- Check if the Doctor's Name is correct
            </Text>
          </View>

          <Icon
            name="closecircle"
            type="AntDesign"
            onPress={() => {
              this.setState({ showPopup_1: false });
            }}
            style={{
              fontSize: 25,
              position: 'absolute',
              right: 5,
              color: 'red',
              top: 5,
            }}
          />
        </View>
      </Modal>
    );
  }

  renderModal2(index) {
    const { showPopup_2 } = this.state;
    console.log(
      'Apsel render image',
      index,
      this.state.isProofOfSupplyArray[1]
    );
    return (
      <Modal
        style={{
          height: Dimensions.get('window').height - 30,
          width: Dimensions.get('window').width - 80,
        }}
        onRequestClose={() => this.setState({ showPopup_2: true })}
        isVisible={showPopup_2}>
        <View style={styles.modalContent}>
          <Image
            source={{ uri: this.state.isProofOfSupplyArray[1].uri||this.state.isProofOfSupplyArray[1] }}
            style={{
              width: (Dimensions.get('window').width * 8) / 9,
              height: (Dimensions.get('window').height * 6) / 9,
            }}
          />
          <View
            style={{
              backgroundColor: Colors.blue_dark,
              width: '50%',
              justifyContent: 'center',
              alignSelf: 'center',
              margin: 20,
            }}>
            <Text style={{ fontSize: 15, margin: 5, color: 'white' }}>
              Proof of Supply
              {'\n'}
              Please check the following
              {'\n'}- Date Validation
              {'\n'}- CrossCheck the Product
              {'\n'}- Check if the Doctor's Name is correct
            </Text>
          </View>

          <Icon
            name="closecircle"
            type="AntDesign"
            onPress={() => {
              this.setState({ showPopup_2: false });
            }}
            style={{
              fontSize: 25,
              position: 'absolute',
              right: 5,
              color: 'red',
              top: 5,
            }}
          />
        </View>
      </Modal>
    );
  }

  renderModal3(index) {
    const { showPopup_3 } = this.state;
    console.log(
      'Apsel render image',
      index,
      this.state.isProofOfSupplyArray[2]
    );
    return (
      <Modal
        style={{
          height: Dimensions.get('window').height - 30,
          width: Dimensions.get('window').width - 80,
        }}
        onRequestClose={() => this.setState({ showPopup_3: true })}
        isVisible={showPopup_3}>
        <View style={styles.modalContent}>
          <Image
            source={{ uri: this.state.isProofOfSupplyArray[2].uri|| this.state.isProofOfSupplyArray[2]}}
            style={{
              width: (Dimensions.get('window').width * 8) / 9,
              height: (Dimensions.get('window').height * 6) / 9,
            }}
          />
          <View
            style={{
              backgroundColor: Colors.blue_dark,
              width: '50%',
              justifyContent: 'center',
              alignSelf: 'center',
              margin: 20,
            }}>
            <Text style={{ fontSize: 15, margin: 5, color: 'white' }}>
              Proof of Supply
              {'\n'}
              Please check the following
              {'\n'}- Date Validation
              {'\n'}- CrossCheck the Product
              {'\n'}- Check if the Doctor's Name is correct
            </Text>
          </View>

          <Icon
            name="closecircle"
            type="AntDesign"
            onPress={() => {
              this.setState({ showPopup_3: false });
            }}
            style={{
              fontSize: 25,
              position: 'absolute',
              right: 5,
              color: 'red',
              top: 5,
            }}
          />
        </View>
      </Modal>
    );
  }

  renderModal4(index) {
    const { showPopup_4 } = this.state;
    console.log(
      'Apsel render image',
      index,
      this.state.isProofOfSupplyArray[3]
    );
    return (
      <Modal
        style={{
          height: Dimensions.get('window').height - 30,
          width: Dimensions.get('window').width - 80,
        }}
        onRequestClose={() => this.setState({ showPopup_4: true })}
        isVisible={showPopup_4}>
        <View style={styles.modalContent}>
          <Image
            source={{ uri: this.state.isProofOfSupplyArray[3].uri|| this.state.isProofOfSupplyArray[3] }}
            style={{
              width: (Dimensions.get('window').width * 8) / 9,
              height: (Dimensions.get('window').height * 6) / 9,
            }}
          />
          <View
            style={{
              backgroundColor: Colors.blue_dark,
              width: '50%',
              justifyContent: 'center',
              alignSelf: 'center',
              margin: 20,
            }}>
            <Text style={{ fontSize: 15, margin: 5, color: 'white' }}>
              Proof of Supply
              {'\n'}
              Please check the following
              {'\n'}- Date Validation
              {'\n'}- CrossCheck the Product
              {'\n'}- Check if the Doctor's Name is correct
            </Text>
          </View>

          <Icon
            name="closecircle"
            type="AntDesign"
            onPress={() => {
              this.setState({ showPopup_4: false });
            }}
            style={{
              fontSize: 25,
              position: 'absolute',
              right: 5,
              color: 'red',
              top: 5,
            }}
          />
        </View>
      </Modal>
    );
  }

  renderModal5(index) {
    const { showPopup_5 } = this.state;
    console.log(
      'Apsel render image',
      index,
      this.state.isProofOfSupplyArray[4]
    );
    return (
      <Modal
        style={{
          height: Dimensions.get('window').height - 30,
          width: Dimensions.get('window').width - 80,
        }}
        onRequestClose={() => this.setState({ showPopup_5: true })}
        isVisible={showPopup_5}>
        <View style={styles.modalContent}>
          <Image
            source={{ uri: this.state.isProofOfSupplyArray[4].uri|| this.state.isProofOfSupplyArray[4]}}
            style={{
              width: (Dimensions.get('window').width * 8) / 9,
              height: (Dimensions.get('window').height * 6) / 9,
            }}
          />
          <View
            style={{
              backgroundColor: Colors.blue_dark,
              width: '50%',
              justifyContent: 'center',
              alignSelf: 'center',
              margin: 20,
            }}>
            <Text style={{ fontSize: 15, margin: 5, color: 'white' }}>
              Proof of Supply
              {'\n'}
              Please check the following
              {'\n'}- Date Validation
              {'\n'}- CrossCheck the Product
              {'\n'}- Check if the Doctor's Name is correct
            </Text>
          </View>

          <Icon
            name="closecircle"
            type="AntDesign"
            onPress={() => {
              this.setState({ showPopup_5: false });
            }}
            style={{
              fontSize: 25,
              position: 'absolute',
              right: 5,
              color: 'red',
              top: 5,
            }}
          />
        </View>
      </Modal>
    );
  }
  proofOfsupplyList(selectPhotoTapped, index) {
    const { chemist1, chemist2, chemist3, chemist4, chemist5 } = this.state;
    var numberIndex = index + 1;
    if (index === 0) {
      numberIndex = 1;
    }
    if (index === 1) {
      if (!chemist1) {
        numberIndex = 1;
      }
    }
    if (index === 2) {
      if (!chemist2) {
        if (!chemist1) {
          numberIndex = 1;
        } else {
          numberIndex = 2;
        }
      } else {
        if (!chemist1) {
          numberIndex = 2;
        } else {
          numberIndex = 3;
        }
      }
    }
    if (index === 3) {
      if (!chemist3) {
        if (!chemist2) {
          if (!chemist1) {
            numberIndex = 1;
          } else {
            numberIndex = 2;
          }
        } else {
          numberIndex = 3;
        }
      } else {
        if (!chemist2) {
          if (!chemist1) {
            numberIndex = 2;
          } else {
            numberIndex = 3;
          }
        } else {
          if (!chemist1) {
            numberIndex = 5;
          } else {
            numberIndex = 4;
          }
        }
      }
    }
    if (index === 4) {
      if (!chemist4) {
        if (!chemist3) {
          if (!chemist2) {
            if (!chemist1) {
              numberIndex = 1;
            } else {
              numberIndex = 2;
            }
          } else {
            if (!chemist1) {
              numberIndex = 2;
            } else {
              numberIndex = 1;
            }
          }
        } else {
          if (!chemist2) {
            if (!chemist1) {
              numberIndex = 2;
            } else {
              numberIndex = 3;
            }
          } else {
            if (!chemist1) {
              numberIndex = 3;
            } else {
              numberIndex = 4;
            }
          }
        }
      } else {
        if (!chemist3) {
          if (!chemist2) {
            if (!chemist1) {
              numberIndex = 2;
            } else {
              numberIndex = 3;
            }
          } else {
            if (!chemist1) {
              numberIndex = 3;
            } else {
              numberIndex = 4;
            }
          }
        } else {
          if (!chemist2) {
            if (!chemist1) {
              numberIndex = 3;
            } else {
              numberIndex = 4;
            }
          } else {
            if (!chemist1) {
              numberIndex = 4;
            } else {
              numberIndex = 5;
            }
          }
        }
      }
    }
    const { isChemistSelectedArray, chemistData, isDoctorSelect } = this.state
    if (chemistData) {
      var isChemistSelectedArrayTemp = []
      isChemistSelectedArray.map(elem => {
        if (elem) {
          isChemistSelectedArrayTemp.push(elem)
          console.log('Element,elem')
        }
      })
      var filterChemistData = chemistData.filter((elem => !isChemistSelectedArrayTemp.find(({ chemist_code }) => chemist_code === elem.chemist_code)))
    }
    console.log('Filtered Chemist List', filterChemistData, chemistData, isChemistSelectedArrayTemp, isChemistSelectedArray)
    // var docData = this.props.docData
    var chemistList = this.state.chemistSelectShow
    var chemistName = "Select Chemist"
    if (chemistList.length === 1) {
      if (index === 0) {
        if (chemistList[0]) {
          chemistName = `${chemistList[0].chemist_name} (${chemistList[0].chemist_code})`
        }
      }
    }
    if (chemistList.length === 2) {
      if (index === 0) {
        if (chemistList[0]) {
          chemistName = `${chemistList[0].chemist_name} (${chemistList[0].chemist_code})`
        }
      }
      if (index === 1) {
        if (chemistList[1]) {
          chemistName = `${chemistList[1].chemist_name} (${chemistList[1].chemist_code})`
        }
      }
    }
    if (chemistList.length === 3) {
      if (index === 0) {
        if (chemistList[0]) {
          chemistName = `${chemistList[0].chemist_name} (${chemistList[0].chemist_code})`
        }
      }
      if (index === 1) {
        if (chemistList[1]) {
          chemistName = `${chemistList[1].chemist_name} (${chemistList[1].chemist_code})`
        }
      }
      if (index === 2) {
        if (chemistList[2]) {
          chemistName = `${chemistList[2].chemist_name} (${chemistList[2].chemist_code})`
        }
      }
    }
    if (chemistList.length === 4) {
      if (index === 0) {
        if (chemistList[0]) {
          chemistName = `${chemistList[0].chemist_name} (${chemistList[0].chemist_code})`
        }
      }
      if (index === 1) {
        if (chemistList[1]) {
          chemistName = `${chemistList[1].chemist_name} (${chemistList[1].chemist_code})`
        }
      }
      if (index === 2) {
        if (chemistList[2]) {
          chemistName = `${chemistList[2].chemist_name} (${chemistList[2].chemist_code})`
        }
      }
      if (index === 3) {
        if (chemistList[3]) {
          chemistName = `${chemistList[3].chemist_name} (${chemistList[3].chemist_code})`
        }
      }
    }
    if (chemistList.length === 5) {
      if (index === 0) {
        if (chemistList[0]) {
          chemistName = `${chemistList[0].chemist_name} (${chemistList[0].chemist_code})`
        }
      }
      if (index === 1) {
        if (chemistList[1]) {
          chemistName = `${chemistList[1].chemist_name} (${chemistList[1].chemist_code})`
        }
      }
      if (index === 2) {
        if (chemistList[2]) {
          chemistName = `${chemistList[2].chemist_name} (${chemistList[2].chemist_code})`
        }
      }
      if (index === 3) {
        if (chemistList[3]) {

          chemistName = `${chemistList[3].chemist_name} (${chemistList[3].chemist_code})`

        }
      }
      if (index === 4) {
        if (chemistList[4]) {
          if (chemistList[4]) {
            chemistName = `${chemistList[4].chemist_name} (${chemistList[4].chemist_code})`
          }
        }
      }
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignContent: 'flex-start',
        }}>
        <Text style={{ marginTop: 23, marginLeft: 75, marginRight: 10 }}>
          {numberIndex}.
        </Text>
        <Dropdown
          value={chemistName}
          containerStyle={styles.chemistDropDown}
          data={filterChemistData}
          valueExtractor={({ chemist_code, chemist_name }) => `${chemist_name} (${chemist_code})`}
          labelExtractor={({ chemist_code, chemist_name }) => `${chemist_name} (${chemist_code})`}
          onChangeText={(value, item, data) => {
            var newArray = this.state.isChemistSelectedArray;
            // newArray.push(data[index]);
            newArray[index] = data[item];
            console.log('Chemist drop is selected', this.state.isChemistSelectedArray, newArray);
            this.setState({ isChemistSelectedArray: newArray });
            var newArray2 = this.state.chemistSelectShow
            // delete newArray2[index];
            // this.setState({ chemistSelectShow: newArray2 });
            console.log('Chemist drop 2', newArray, newArray2);
          }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            marginLeft: 20,
          }}>
          <TextInput
            style={styles.quantityInput}
            keyboardType={'numeric'}
            value={this.state.quantity[index] ? this.state.quantity[index].toString() : ''}
            onChangeText={value => {
              var newArray = this.state.quantity;
              // newArray.splice(index, 1, value);
              var integer = parseInt(value, 10);

              newArray[index] = integer;

              this.setState({ quantity: newArray });
              // var quantitySum = this.state.totalQuantity;
              // this.state.quantity.map(a => {
              //   quantitySum = quantitySum + a;
              // });
              // this.setState({totalQuantity: quantitySum});
            }}
          />
        </View>
        <View>
          <Text
            style={{
              marginRight: 20,
              marginTop: 30,
              marginLeft: -20,
            }}>
            Proof Of Supply :
          </Text>
        </View>
        {console.log('Apsel is prrof', this.state.isProofOfSupplyArray[index])}
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <TouchableHighlight
            style={styles.uploadRemoveButton}
            onPress={() => {
              this.state.isProofOfSupplyArray[index]
                ? this.proofOfSupplyModal(index)
                : selectPhotoTapped(index);
            }}>
            <Text style={styles.submitText}>
              {this.state.isProofOfSupplyArray[index] ? 'VIEW' : 'UPLOAD'}
            </Text>
          </TouchableHighlight>
          {this.state.isProofOfSupplyArray[index] ? (
            <Icon
              name="closecircle"
              type="AntDesign"
              onPress={() => {
                this.removeProofOfSupply(index);
              }}
              style={{
                fontSize: 20,
                position: 'absolute',
                // left: 150,
                right: 0,
                top: 5,
                bottom: 0,
              }}
            />
          ) : (
            <Icon
              name="info-with-circle"
              type="Entypo"
              onPress={() => {
                this.proofHint(index, true);
              }}
              style={{
                fontSize: 20,
                position: 'absolute',
                // left: 150,
                right: 0,
                top: 5,
                bottom: 0,
              }}
            />
          )}

          {this.state.isRxProofShow[index] ? (
            <View style={{}}>
              <View
                style={{
                  position: 'absolute',
                  right: -25,
                  bottom: 2,
                  marginBottom: 15,
                  padding: 0,
                  borderRadius: 5,
                  borderWidth: 1,
                  height: 110,
                  alignContent: 'flex-start',
                  alignSelf: 'flex-start',
                  justifyContent: 'flex-start',
                  backgroundColor: 'white',
                }}>
                <Text style={{ fontSize: 14, margin: 5 }}>
                  Proof of Supply
                  {'\n'}
                  Please check the following
                  {'\n'}- Date Validation
                  {'\n'}- CrossCheck the Product
                  {'\n'}- Check if the doctor name is correct
                </Text>
                <Icon
                  name="closecircle"
                  type="AntDesign"
                  onPress={() => {
                    this.proofHint(index, false);
                  }}
                  style={{
                    fontSize: 18,
                    alignSelf: 'flex-end',
                    marginTop: 2,
                    position: 'absolute',
                    margin: 8,
                    right: -18,
                    top: -23
                  }}
                />
              </View>

            </View>
          ) : null}
        </View>
        {this.state.isProofOfSupplyArray[0] !== '' &&
          this.state.isProofOfSupplyArray[0]
          ? this.renderModal0(index)
          : null}
        {this.state.isProofOfSupplyArray[1] !== '' &&
          this.state.isProofOfSupplyArray[1]
          ? this.renderModal2(index)
          : null}
        {this.state.isProofOfSupplyArray[2] !== '' &&
          this.state.isProofOfSupplyArray[2]
          ? this.renderModal3(index)
          : null}
        {this.state.isProofOfSupplyArray[3] !== '' &&
          this.state.isProofOfSupplyArray[3]
          ? this.renderModal4(index)
          : null}
        {this.state.isProofOfSupplyArray[4] !== '' &&
          this.state.isProofOfSupplyArray[4]
          ? this.renderModal5(index)
          : null}
        <TouchableHighlight
          style={styles.removeButton}
          disabled={this.state.chemistListNumber < 2}
          onPress={() => {
            this.removeChemistHandler(index);
          }}>
          <Text style={styles.remove}>REMOVE</Text>
        </TouchableHighlight>
      </View>
      // );
      //   })}
      // </View>
    );
  }
  chemistListShow(selectPhotoTapped) {
    return (
      <View>
        {this.state.chemist1
          ? this.proofOfsupplyList(selectPhotoTapped, 0)
          : null}
        {this.state.chemist2
          ? this.proofOfsupplyList(selectPhotoTapped, 1)
          : null}
        {this.state.chemist3
          ? this.proofOfsupplyList(selectPhotoTapped, 2)
          : null}
        {this.state.chemist4
          ? this.proofOfsupplyList(selectPhotoTapped, 3)
          : null}
        {this.state.chemist5
          ? this.proofOfsupplyList(selectPhotoTapped, 4)
          : null}
      </View>
    );
  }
  totalCalculatorHandler() {
    console.log('total came', this.state.chemistListNumber);
    var sumOfquantity = 0;
    this.state.quantity.map(value => {
      sumOfquantity = sumOfquantity + value
    });
    return <Text style={{
      fontWeight: '500', textAlign: 'center', borderColor: 'black', borderWidth: 1, height: 35, paddingTop: 10,
      width: 65,
    }}> {sumOfquantity}</Text>;
  }
  renderData(user, selectPhotoTapped) {
    var docData = this.props.docData
    // this.setState({ isDoctorSelect: this.props.docData })

    var docName = `${docData.doc_name} (${docData.dr_code})`
    // var skuData = docData.brand_name
    var dataForDoctor = []
    dataForDoctor.push(docData)
    const skuData = [
      {
        product_code: '5030634',
        product_name: 'PANTODAC 40 TABLETS 15X2X15T SALE DOM',
        brand_code: '0005000038',
      },
      {
        product_code: '5023522',
        product_name: 'PANTODAC DSR CAPSULES 25X15C SALE DOM',
        brand_code: '0005000038',
      },
    ];
    // var filterSku = []
    // skuData.map(sku => {
    //   if (sku.product_name === docData.brand_name && docData.brand_name) {
    //     filterSku.push(sku)
    //   }
    // })
    // var finalSku = []
    // filterSku.map(sku => {
    //   if (sku) {
    //     finalSku.push(sku)
    //   }
    // })
    // this.setState({ isSkuSelect: docData.brand_name });
    // skuData.push(docData.brand_name)
    var finalSku = this.state.isSkuSelect.product_name

    return (
      <View style={styles.container}>
        <ImageBackground
          source={Images.ChemistSelectionBanner}
          resizeMode="stretch"
          style={styles.bannerStyle}>
          <View style={styles.bannerContent}>
            <Text style={styles.month}>Month</Text>
            <Text style={styles.year}>
              {getFullMonthString(getCurrentMonth())} {getCurrentYear()}
            </Text>
          </View>
        </ImageBackground>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignSelf: 'flex-start',
              marginTop: 38,
            }}>
            <Text style={{ alignSelf: 'center' }}>DOCTOR</Text>
            <Text style={{ marginLeft: 25 }}>:</Text>
          </View>

          <Dropdown
            value={docName}
            // data={filterSku}
            containerStyle={styles.dropdownDesign}
            valueExtractor={({ dr_code }) => dr_code}
            labelExtractor={({ doc_name, dr_code }) => `${doc_name} (${dr_code})`}
          />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: 20,
            }}>
            <Text>SKU</Text>
            <Text style={{ marginLeft: 55 }}>:</Text>
          </View>
          <Dropdown
            value={finalSku}
            containerStyle={styles.dropdownDesign}
            // data={skuData}
            valueExtractor={({ product_code }) => product_code}
            labelExtractor={({ product_name }) => product_name}
          />
        </View>



        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
          <View style={{ marginRight: 10, marginTop: 10 }}>
            <Text>RX UPLOAD :</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <TouchableHighlight
                style={styles.submitRX}
                onPress={() => {
                  // eslint-disable-next-line no-unused-expressions
                  this.state.isRxUpload
                    ? this.showImage('1')
                    : selectPhotoTapped('image1');
                }}>
                <Text style={styles.submitText}>
                  {this.state.isRxUpload != null ? 'VIEW' : 'UPLOAD'}
                </Text>
              </TouchableHighlight>
              {this.state.isRxUpload !== null ? (
                <Icon
                  name="closecircle"
                  type="AntDesign"
                  onPress={() => {
                    this.removeImage('image1');
                  }}
                  style={{
                    fontSize: 20,
                    position: 'absolute',
                    left: 150,
                    right: 0,
                    top: 5,
                    bottom: 0,
                  }}
                />
              ) : (
                <Icon
                  name="info-with-circle"
                  type="Entypo"
                  onPress={() => {
                    this.showHint('show_1');
                  }}
                  style={{
                    fontSize: 20,
                    position: 'absolute',
                    left: 150,
                    right: 0,
                    top: 5,
                    bottom: 0,
                  }}
                />
              )}
              {this.state.isRxHintShow ? (
                <View style={{}}>
                  <View
                    style={{
                      position: 'absolute',
                      left: 80,
                      bottom: 2,
                      padding: 0,
                      borderRadius: 5,
                      borderWidth: 1,
                      alignContent: 'flex-start',
                      alignSelf: 'flex-start',
                      justifyContent: 'flex-start',
                      backgroundColor: '#ffffff',
                      height: 110,
                    }}>
                    <Text style={{ fontSize: 14, margin: 5 }}>
                      RxUpload
                        {'\n'} Please check the following
                        {'\n'} - Date Validation
                        {'\n'}- CrossCheck the Product
                        {'\n'}- Check if the doctor name is correct
                      </Text>
                    <Icon
                      name="closecircle"
                      type="AntDesign"
                      onPress={() => {
                        this.showHint('show_2');
                      }}
                      style={{
                        fontSize: 18,
                        alignSelf: 'flex-end',
                        marginTop: 2,
                        position: 'absolute',
                        top: -20,
                        right: -15
                      }}
                    />
                  </View>

                </View>
              ) : null}
            </View>
          </View>
        </View>


        <Text style={styles.quantityText}>Quantity (Strips)</Text>


        {this.chemistListShow(selectPhotoTapped)}

        <View>
          <View style={styles.horizontalLine} />
          <View style={styles.totalQuantity}>
            <Text style={{ fontWeight: '500', marginTop: 10, fontSize: 20 }}>Total : </Text>

            <View style={{

            }}>
              {this.totalCalculatorHandler()}
            </View>
          </View>
        </View>
        {  this.state.isDoctorSelect ? (
          this.state.chemistListNumber <
            this.state.isDoctorSelect.chemist_code.length ?
            <TouchableHighlight
              style={styles.add}
              onPress={() => {
                this.addChemistHandler();
              }}>
              <Text style={styles.submitText}>ADD</Text>
            </TouchableHighlight> : null) : null
        }
      </View>
    );
  }

  render() {
    const { connected, loading, user } = this.props;
    const selectPhotoTapped = this.selectPhotoTapped.bind(this);

    return (
      <ParentView
        loading={loading}
        connected={connected}
        style={styles.container}>
        {this.state.isSubmitProgress ? (
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" />
          </View>
        ) : null}
        <ScrollView
          style={{
            paddingHorizontal: 15,
            flex: 1,
          }}>
          {this.renderData(user, selectPhotoTapped)}
          {this.state.isRxUpload !== null ? this.renderModal() : null}
        </ScrollView>
        {this.renderBottomButton()}
      </ParentView>
    );
  }
}

export default IncompleteRxEditComponent;
