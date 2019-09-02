import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'react-native-elements';

import { ITokenPlay } from '../interfaces';

import TOKENS from '../utils/tokens';

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  icon: {
    margin: 5,
  },
});

interface Props {
  token: ITokenPlay;
  size: number;
  opacity?: number;
  marginLeft?: number;
}
const TokenPlay = (props: Props) => {
  const { token, size } = props;
  const opacity = props.opacity || 1.0;
  const marginLeft = props.marginLeft || 0;
  const containerStyle = { ...styles.container, ...{ marginLeft } };
  const tokenStyle = { ...styles.icon, ...{ width: size, height: size, opacity } };
  return (
    <View style={containerStyle}>
      <Image
        source={TOKENS[token.image]}
        style={tokenStyle}
      />
    </View>
  );
}

export default TokenPlay;