import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useMappedState } from 'redux-react-hook';
import { Button, Image } from 'react-native-elements';
import { readDirectoryAsync } from 'expo-file-system';

import CupHeader from '../components/CupHeader';
import { ICup } from '../interfaces';
import { dirPicutures } from '../utils/storageManager';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  picutresContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  thumbnail: {
    margin: 10,
    width: 64,
    height: 64,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  controlsButton: {
    minWidth: 120,
  }
});

const getPictures = (cupId) => {
  if (cupId) {
    const dir = `${dirPicutures}/${cupId}`;
    return readDirectoryAsync(dir).then(pictures => pictures.map(p => `${dir}/${p}`));
  } else {
    return Promise.resolve([]);
  }
}

interface Props {
  navigation: { navigate: Function };
}
const PicturesGallery = (props: Props) => {
  const cup: ICup = useMappedState(state => state.currentCup) || {};
  const { navigate } = props.navigation;
  const [ pictures, setPictures ] = useState([]);
  useEffect(() => {
    getPictures(cup.id).then(pics => {
      setPictures(pics)
    })
  },[cup]);

  return (
    <View style={styles.container}>
      <CupHeader cup={cup} />
      <ScrollView>
        <View style={styles.picutresContainer}>
          {
            // onPress={navigate to image gallery for this cup with this selected picture }
            pictures.map((p,i)=> <Image source={{ uri: p }} style={styles.thumbnail} key={i} />)
          }
        </View>
      </ScrollView>
      <View style={styles.controlsContainer}>
        <Button 
          title={'Take Picture'}
          containerStyle={styles.controlsButton} 
          onPress={() => { navigate('TakePicture') }}
        />
      </View>
    </View>
  );
};
PicturesGallery.navigationOptions = { title: 'Game Pictures Gallery' };

export default PicturesGallery;