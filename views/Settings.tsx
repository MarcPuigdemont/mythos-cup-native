import React, { useState } from 'react';
import { StyleSheet, View  } from 'react-native';
import { ListItem, Button, Overlay, Text } from 'react-native-elements';
import { useDispatch } from 'redux-react-hook';

import defaultCups from '../utils/defaultCups';

import { setCups } from '../actions/cups';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    padding: 20,
    backgroundColor: '#fff',
  },
  list: {
    flex: 1,
    alignItems: 'stretch',
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  alertButton: {
    minWidth: 100,
    backgroundColor: 'red',
  },
  okButton: {
    marginRight: 20,
    minWidth: 100,
    backgroundColor: 'green',
  },
  overlayContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 250,
  },
  overlayText: {
    marginBottom: 10,
    marginHorizontal: 20,
    fontSize: 20,
  },
  overlayButtonsContainer: {
    flexDirection: 'row',
    marginTop: 40,
  },
});

const Settings = () => {
  const dispatch = useDispatch();
  const clear = () => dispatch(setCups([]));
  const restore = () => dispatch(setCups(defaultCups));
  const [ currentAction, setCurrentAction ] = useState(() => () => {});
  const [ overlayVisible, setOverlayVisible ] = useState(false);
  const displayOverlayWithAction = (action: () => void) => {
    setCurrentAction(() => action);
    setOverlayVisible(true);
  };
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <ListItem
          title={"Clear all Cups"}
          rightElement={(
            <Button
              title={"Clear"}
              buttonStyle={styles.alertButton}
              onPress={() => displayOverlayWithAction(clear)}/>
          )}
        />
        <ListItem
          title={"Restore default Cups"}
          rightElement={(
            <Button
              title={"Restore"}
              buttonStyle={styles.alertButton}
              onPress={() => displayOverlayWithAction(restore)}/>
          )}
        />
      </View>
      <Overlay
        isVisible={overlayVisible}
        windowBackgroundColor="rgba(0, 0, 0, .75)"
        overlayBackgroundColor="white"
        width="auto"
        height="auto"
        onBackdropPress={() => setOverlayVisible(false)}
      >
        <View style={styles.overlayContainer}>
          <Text style={styles.overlayText}>This action cannot be undone!</Text>
          <Text style={styles.overlayText}>Are you sure?</Text>
          <View style={styles.overlayButtonsContainer}>
            <Button 
              title={"Ok"}
              buttonStyle={styles.okButton}
              onPress={() => { currentAction(); setOverlayVisible(false); }}
            />
            <Button
              title={"Cancel"}
              buttonStyle={styles.alertButton}
              onPress={() => setOverlayVisible(false)}
            />
          </View>
        </View>
      </Overlay>
    </View>
  );
};
Settings.navigationOptions = { title: 'Settings' };

export default Settings;