import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import EDetailingBrandDrComponent from '../../../components/detailing/E-DetatilingBrandDrComponent';
import {
  createDetailingContentShowcase, deleteDailyShowCase, getContentsForSpec, getContentSpecialities, getSpecBrandMapping
} from '../../../local-storage/helper/detailing';
import { loadVADetailsWithConfig, readConfig } from '../../../util/startDeatiling';
import Images from '../../../Constants/imageConstants';
import styles from '../E-DetailingBrandDrContainer/styles';

class BrandEDetailingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true,
      loading: false,
      brands: [],
      originalBrands: [],
      doc_code: '',
      sortType: null,
      specialities: [],
      currentSpeciality: null,
      maxPosition: 0
    };
  }

    static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;
      let onSort = null;
      if (params) {
        onSort = params.onSort;
      }

      return {
        headerTitle: 'Brand Detailing Content',
        headerRight: (
          <TouchableOpacity onPress={() => {
            if (onSort) {
              onSort();
            }
          }}
          >
            <Image
              source={Images.ic_sort}
              style={styles.up}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ),
      };
    };

    onSort = () => {
      const { sortType } = this.state;
      if (!sortType) {
        this.setState({ sortType: 'asc' });
        return;
      }
      if (sortType === 'asc') {
        this.setState({ sortType: 'desc' });
        return;
      }
      this.setState({ sortType: 'asc' });
    };

    componentWillUnmount() {
      this.willFocus.remove();
    }

    async componentDidMount() {
      this.willFocus = this.props.navigation.addListener(
        'didFocus',
        () => {
          this.loadVADetailsWithConfig().then().catch();
        }
      );

      this.props.navigation.setParams({
        onSort: this.onSort
      });

      const specialities = await getContentSpecialities();
      this.setState({ specialities });
    }

    async loadVADetailsWithConfig() {
      const doc_code = 'BrandDetailing';
      const contents = await getContentsForSpec();
      let { brands } = this.state;
      if (!brands.length) {
        brands = await loadVADetailsWithConfig(doc_code, contents);
      }
      let maxPosition = 0;
      for (const brand of brands) {
        for (const position in brand.data) {
          if (brand.data.hasOwnProperty(position) && brand.data[position].in_showcase) {
            if (brand.data[position].vaPosition && maxPosition < brand.data[position].vaPosition) {
              maxPosition = brand.data[position].vaPosition;
            } else {
              maxPosition++;
            }
          }
        }
      }
      this.setState({
        brands,
        originalBrands: brands,
        doc_code,
        maxPosition
      });
    }

    gotoVA(VA) {
      let {
        maxPosition
      } = this.state;
      maxPosition++;
      this.props.navigation.navigate('VisualAid', { VA, maxPosition });
    }

    startShowCase() {
      this.loadVADetailsWithConfig().then(() => {
        const brandsCloned = [];
        const allVAS = [];
        for (const brand of this.state.brands) {
          for (const va of brand.data) {
            const {
              vaPosition,
              in_showcase,
            } = va;
            if (in_showcase) {
              if (vaPosition && !brandsCloned.hasOwnProperty(vaPosition)) {
                brandsCloned[vaPosition] = va;
              } else {
                brandsCloned.push(
                  va
                );
              }
            }
            allVAS.push(
              va,
            );
          }
        }
        if (brandsCloned.length > 0) {
          const finalVAS = [];
          for (const render of brandsCloned) {
            if (render) {
              finalVAS.push(
                render
              );
            }
          }
          this.props.navigation.navigate('EDetailingWebView', {
            showcase: finalVAS,
            allVAS,
            isBrandDetailing: true
          });
        } else {
          this.props.navigation.navigate('EDetailingWebView', {
            showcase: allVAS,
            allVAS,
            isBrandDetailing: true
          });
        }
      });
    }

    async toggleShowcase(brandName, position, addToShowCase) {
      const brandsCloned = [];
      let {
        maxPosition
      } = this.state;
      for (const brand of this.state.brands) {
        if (brandName === brand.name) {
          brand.data[position].in_showcase = addToShowCase;
          if (!addToShowCase) {
            brand.data[position].vaPosition = 0;
          } else {
            brand.data[position].vaPosition = ++maxPosition;
          }
          const VA = brand.data[position];
          const {
            doc_code,
            content_id,
            content_location
          } = VA;
          deleteDailyShowCase(
            doc_code,
            content_id
          );
          VA.in_showcase = addToShowCase;
          if (!addToShowCase) {
            VA.config = await readConfig(content_location, doc_code, content_id, VA, true);
            VA.name = VA.title;
          }
          createDetailingContentShowcase(
            doc_code,
            content_id,
            VA
          ).then().catch();
        }
        brandsCloned.push(
          brand
        );
      }

      const newBrands = brandsCloned.splice(0);
      this.setState({
        originalBrands: newBrands,
        brands: newBrands,
        maxPosition
      });
    }

    previewShowCase() {
      this.loadVADetailsWithConfig().then(() => {
        const brandsCloned = [];
        const allVAS = [];
        for (const brand of this.state.brands) {
          for (const va of brand.data) {
            const {
              vaPosition,
              in_showcase,
            } = va;
            if (in_showcase) {
              if (vaPosition && !brandsCloned.hasOwnProperty(vaPosition)) {
                brandsCloned[vaPosition] = va;
              } else {
                brandsCloned.push(
                  va
                );
              }
            }
            allVAS.push(
              va,
            );
          }
        }
        if (brandsCloned.length > 0) {
          const finalVAS = [];
          for (const render of brandsCloned) {
            if (render) {
              finalVAS.push(
                render
              );
            }
          }
          this.props.navigation.navigate('EDetailingWebView', {
            showcase: finalVAS,
            isBrandDetailing: true,
            allVAS,
            preview: true
          });
        } else {
          this.props.navigation.navigate('EDetailingWebView', {
            showcase: allVAS,
            allVAS,
            isBrandDetailing: true,
            preview: true
          });
        }
      });
    }

    setCurrentSpeciality = async (currentSpeciality) => {
      const { originalBrands } = this.state;
      const brandDict = {};
      originalBrands.forEach((brand) => {
        const brandCode = brand.data[0].brand;
        brandDict[brandCode] = brand;
      });

      const brandList = await getSpecBrandMapping(currentSpeciality.speciality);

      const newBrandsList = [];
      brandList.forEach((brand) => {
        const brandCode = brand.brand_code;
        const brandData = brandDict[brandCode];
        if (brandData) {
          newBrandsList.push(brandData);
          delete brandDict[brandCode];
        }
      });
      Object.keys(brandDict).forEach((key) => {
        newBrandsList.push(brandDict[key]);
      });

      this.setState({ brands: newBrandsList, currentSpeciality });
    };

    render() {
      const gotoVA = this.gotoVA.bind(this);
      const {
        isInternetConnected,
        loading,
        brands,
        sortType,
        specialities,
        currentSpeciality,
      } = this.state;
      const toggleShowcase = this.toggleShowcase.bind(this);
      const previewShowCase = this.previewShowCase.bind(this);
      const startShowCase = this.startShowCase.bind(this);
      const isSharedHistory = false;
      return (
        <EDetailingBrandDrComponent
          isToday
          loading={loading}
          brands={brands}
          gotoVA={gotoVA}
          toggleShowcase={toggleShowcase}
          startShowCase={startShowCase}
          previewShowCase={previewShowCase}
          connected={isInternetConnected}
          isDirect
          isSharedHistory={isSharedHistory}
          sortType={sortType}
          specialities={specialities}
          currentSpeciality={currentSpeciality}
          setCurrentSpeciality={this.setCurrentSpeciality}
        />
      );
    }
}

export default BrandEDetailingContainer;
