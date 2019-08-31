import React, { useState } from 'react';
import { StyleSheet, View, TouchableHighlight  } from 'react-native';
import { Image } from 'react-native-elements';
import ICONS from '../utils/icons';

const iconSize = 36;
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'center',
      flexWrap: "wrap",
      marginBottom: 20,
    },
    icon: {
      backgroundColor: '#fff',
      margin: 5,
      maxWidth: iconSize,
      maxHeight: iconSize,
    }
  });

const MythosListItemButtons = (props) => {
  const [ selected, selectIcon ] = useState(0);
  return (
    <View style={styles.container}>
      {
        ICONS.map((icon, index) => {
          const opacity = selected === index ? 1 : 0.4;
          return (
            <TouchableHighlight key={index} onPress={() => selectIcon(index)} underlayColor={'#fff'}>
              <Image
                source={icon}
                style={{ ...styles.icon, ...{ opacity }}}
              />
            </TouchableHighlight>
          )
        })
      }
      
    </View>
  );
}

export default MythosListItemButtons;