import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useMappedState } from 'redux-react-hook';
import { Button, Image } from 'react-native-elements';

import CupHeader from '../components/CupHeader';
import { ICup } from '../interfaces';



import ICONS from '../utils/icons';



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
    backgroundColor: '#fff',
    marginRight: 10,
    maxWidth: 64,
    maxHeight: 64,
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

interface Props {
  navigation: { navigate: Function };
}
const PicturesGallery = (props: Props) => {
  const cup: ICup = useMappedState(state => state.currentCup) || {};
  const { navigate } = props.navigation;
  return (
    <View style={styles.container}>
      <CupHeader cup={cup} />
      <View style={styles.picutresContainer}>
        {
          // onPress={navigate to image gallery for this cup with this selected picture }
          [1,2,3,4].map((i)=> <Image source={ICONS[i]} style={styles.thumbnail} key={i} />)
        }
      </View>
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