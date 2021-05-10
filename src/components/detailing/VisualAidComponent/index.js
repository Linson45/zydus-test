import React, { Component } from 'react';
import { Icon } from 'native-base';
import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import ImageLoad from 'react-native-image-placeholder';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import ParentView from '../../ParentView';

export default class VisualAidComponent extends Component {
  renderThumbNails() {
    const {
      edit,
      config,
      folderVAPath,
      modifyConfig
    } = this.props;

    if (config && config.length > 0) {
      const imageWidth = 150; const
        imageHeight = 150;
      const screenWidth = Dimensions.get('screen').width;
      let maxThumbNailInARow = Math.floor(screenWidth / imageWidth);
      const paddingAreaInARow = screenWidth % imageWidth;

      if (paddingAreaInARow < (5 * maxThumbNailInARow)) {
        maxThumbNailInARow--;
      }
      let totalSlideToBeShown = 0;
      const finalConfig = [];
      config.forEach((slide) => {
        if (edit) {
          totalSlideToBeShown++;
          finalConfig.push(slide);
        } else if (slide.has_to_be_shown) {
          totalSlideToBeShown++;
          finalConfig.push(slide);
        }
      });

      const numberOfRows = Math.ceil(totalSlideToBeShown / maxThumbNailInARow);

      let row = 1;
      let column = 1;
      const images = [];
      while (row <= numberOfRows) {
        let position = column - 1;
        const maxColumn = maxThumbNailInARow * row;
        const rowImage = [];
        while (position < maxColumn && position < finalConfig.length) {
          const slide = finalConfig[position];
          const imagePath = [
            'file:/',
            folderVAPath,
            slide.thumbnail
          ].join('/');
          const pos = column - 1;
          rowImage.push(
            <View style={[styles.imageContainer]} key={column}>
              {edit
                ? (
                  <>
                    <ImageBackground
                      source={{ uri: imagePath }}
                      style={[{ width: imageWidth, height: imageHeight }, styles.image]}
                    >
                      {
                                            slide.is_mandatory ? (
                                              <View style={styles.iconButtonStyle}>
                                                <Icon
                                                  name="lock"
                                                  type="FontAwesome"
                                                  style={styles.lockIcon}
                                                />
                                              </View>
                                            ) : (
                                              slide.has_to_be_shown ? (
                                                <TouchableOpacity onPress={() => modifyConfig(pos, false)} style={styles.iconButtonStyle}>
                                                  <Icon
                                                    name="times-circle-o"
                                                    type="FontAwesome"
                                                    style={styles.deleteIcon}
                                                  />
                                                </TouchableOpacity>
                                              ) : (
                                                <TouchableOpacity onPress={() => modifyConfig(pos, true)} style={styles.iconButtonStyle}>
                                                  <Icon
                                                    name="plus"
                                                    type="FontAwesome"
                                                    style={styles.addIcon}
                                                  />
                                                </TouchableOpacity>
                                              )
                                            )
                                        }
                    </ImageBackground>
                    <Text style={{ textAlign: 'center', padding: 5 }}>
                      {slide.name ? slide.name : `Slide ${column}`}
                    </Text>
                  </>
                ) : (
                  <>
                    {slide.has_to_be_shown ? (
                      <>
                        <ImageLoad
                          loadingStyle={{ size: 'large', color: 'blue' }}
                          source={{ uri: imagePath }}
                          style={{ width: imageWidth, height: imageHeight }}
                        />
                        <Text style={{ textAlign: 'center', padding: 5 }}>
                          {slide.name ? slide.name : `Slide ${column}`}
                        </Text>
                      </>
                    ) : null}
                  </>
                )}

            </View>
          );
          position++;
          column++;
        }
        row++;
        images.push(
          <View
            style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'flex-start' }}
            key={`key${row}`}
          >
            {rowImage}
          </View>
        );
      }
      return (
        <ScrollView>
          {images}
        </ScrollView>
      );
    }
    return null;
  }

  renderName() {
    const {
      VA, edit, setTitle, title
    } = this.props;
    const { name } = VA;
    if (edit) {
      return (
        <KeyboardAvoidingView>
          <Text style={styles.titleInputHeading}>File Title</Text>
          <TextInput
            style={styles.titleInput}
            onChangeText={(text) => {
              setTitle(text);
            }}
            value={title}
          />
        </KeyboardAvoidingView>
      );
    }
    return (
      <Text style={styles.title}>
        File Title:
        {name}
      </Text>
    );
  }

  render() {
    const {
      loading,
      connected,
      saveShowcase
    } = this.props;
    return (
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
        <ParentView
          loading={loading}
          connected={connected}
        >
          <View style={styles.container}>
            {this.renderThumbNails()}
            <View style={styles.bottomView}>
              {this.renderName()}
              <View style={styles.bottomButtons}>
                <TouchableOpacity style={styles.startButton} onPress={() => saveShowcase()}>
                  <Text style={styles.startButton.text}>Save to showcase sequence</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ParentView>
      </KeyboardAwareScrollView>
    );
  }
}
