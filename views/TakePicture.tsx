import React, { useEffect, useState } from 'react';
import { useMappedState } from 'redux-react-hook';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Text } from 'react-native-elements';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions'
import { Ionicons } from '@expo/vector-icons';
import { CapturedPicture } from 'expo-camera/build/Camera.types';
import { dirPicutures, moveAttachment } from '../utils/storageManager';
import { ICup } from '../interfaces';

const saveImage = (filePath, cupId) => {
  const newImageName = `${Math.floor(Math.random() * 200)}.jpg`;
  const newFileDir = `${dirPicutures}/${cupId}`;
  console.log(newImageName, newFileDir, newImageName);
  return moveAttachment(filePath, newFileDir, newImageName);
};

const takePicture = (camera: Camera) => {
  return camera
    .takePictureAsync()
    .catch(err => {
      console.error('capture picture error', err);
    });
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  button: {
    backgroundColor: 'transparent',
    padding: 5,
    marginHorizontal: 20
  },
});

interface Props {
  navigation: any;
};
const TakePicture = (props: Props) => {
  const { navigation } = props;
  const cup: ICup = useMappedState(state => state.currentCup) || {};
  const [ hasCameraPermission, setCameraPermission ] = useState(false);
  useEffect(() => {
    Permissions.askAsync(Permissions.CAMERA).then((result) => {
      setCameraPermission(result.status === 'granted');
    });
  },[]);
  let camera: Camera = null;

  if (hasCameraPermission === null) {
    return <View />;
  } else if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" translucent />
        <Camera
          type={Camera.Constants.Type.back}
          ref={cam => { camera = cam; }}
          style={styles.container}
        >
          <View
            style={ styles.buttonContainer }
          >
            <TouchableOpacity
              onPress={() => 
                takePicture(camera)
                  .then((data: CapturedPicture) => saveImage(data.uri, cup.id))
                  .then(() => navigation.goBack())
              }
              style={ styles.button }
            >
              <Ionicons name={'ios-camera'} size={40} color={'#673ab7'} />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
};
TakePicture.navigationOptions = { title: 'Take a picture' };

export default TakePicture;