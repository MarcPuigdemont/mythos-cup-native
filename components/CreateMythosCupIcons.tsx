import React from 'react';
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

interface Props {
  selected: number;
  onSelect: (index: number) => void;
}
const MythosListItemButtons = (props: Props) => {
  return (
    <View style={styles.container}>
      {
        ICONS.map((icon, index) => {
          const opacity = props.selected === index ? 1 : 0.4;
          return (
            <TouchableHighlight key={index} onPress={() => props.onSelect(index)} underlayColor={'#fff'}>
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