import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Image, Text } from 'react-native-elements';

import { IToken } from '../interfaces';

import TOKENS from '../utils/tokens';

const iconSize = 84;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 18,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    backgroundColor: '#fff',
    margin: 5,
    maxWidth: iconSize,
    maxHeight: iconSize,
  },
  button: {
    width: 35,
    height: 35,
  },
  counter: {
    textAlign: 'center',
    minWidth: 20,
    marginHorizontal: 5,
  }
});

interface Props {
  token: IToken;
  onChange: (value: number) => void;
}
const Token = (props: Props) => {
  const { token } = props;
  return (
    <View style={styles.container}>
      <Text>{token.name}</Text>
      <Image
        source={TOKENS[token.image]}
        style={styles.icon}
      />
      <View style={styles.controlsContainer}>
        <Button 
          title={'-'}
          buttonStyle={styles.button}
          onPress={() => props.onChange(token.count - 1)}
        />
        <Text style={styles.counter}>{token.count}</Text>
        <Button
          title={'+'}
          buttonStyle={styles.button}
          onPress={() => props.onChange(token.count + 1)}
        />
      </View>
    </View>
  );
}

export default Token;