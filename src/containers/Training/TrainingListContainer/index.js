import React, { Component } from 'react';
import {
  getTrainingByDate
} from '../../../local-storage/helper/detailing';
import { loadTrainingData } from '../../../util/startDeatiling';
import TrainingListComponent from '../../../components/training/TrainingListComponent';

class TrainingListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: [],
      originalBrands: [],
      maxPosition: 0
    };
  }

  // eslint-disable-next-line no-empty-pattern
    static navigationOptions = ({ }) => ({
      headerTitle: 'Training',
    });

    async componentDidMount() {
      this.loadVADetailsWithConfig().then().catch();
    }

    async loadVADetailsWithConfig() {
      const contents = await getTrainingByDate();
      let { brands } = this.state;
      if (!brands.length) {
        brands = await loadTrainingData('Training', contents);
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
        maxPosition
      });
    }

    gotoVA(VA) {
      this.loadVADetailsWithConfig().then(() => {
        const allVAS = [];
        allVAS.push(VA);
        this.props.navigation.navigate('TrainingWebView', {
          showcase: allVAS,
          allVAS,
        });
      });
    }

    render() {
      const gotoVA = this.gotoVA.bind(this);
      const { brands } = this.state;
      return (
        <TrainingListComponent
          brands={brands}
          gotoVA={gotoVA}
        />
      );
    }
}

export default TrainingListContainer;
