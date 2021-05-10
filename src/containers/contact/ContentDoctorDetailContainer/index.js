import React from 'react';
import ContactDoctorDetailComponent from '../../../components/contact/ContactDoctorDetailComponent';

class ContentDoctorDetailContainer extends React.Component {
    static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;
      const { doctor } = params;
      return {
        headerTitle: doctor.doc_name,
      };
    };

    render() {
      const { doctor } = this.props.navigation.state.params;
      return (
        <ContactDoctorDetailComponent
          doctor={doctor}
        />
      );
    }
}

export default ContentDoctorDetailContainer;
