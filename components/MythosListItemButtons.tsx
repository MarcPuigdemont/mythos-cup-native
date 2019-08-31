import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';

const iconSize = 32;
const iconColor = '#aaa';
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'flex-end',
    },
    button: {
      marginLeft: 5,
    }
  });

const MythosListItemButtons = (props) => {
  return (
    <View style={styles.container}>
      <Icon
        name="edit"
        type='vector-icons'
        size={iconSize}
        color={iconColor}
        onPress={props.edit} />
      <Icon
        containerStyle={styles.button}
        name="videogame-asset"
        type='vector-icons'
        size={iconSize}
        color={iconColor}
        onPress={props.play} />
    </View>
  );
}

export default MythosListItemButtons;