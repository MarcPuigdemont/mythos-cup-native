/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow, mount } from 'enzyme';
import TokenPlay from '../components/TokenPlay';

describe('TokenPlay', () => {
  const props = {
    token: {
      name: 'clue',
      image: 'clue',
    },
    size: 20
  };

  it('renders correctly', () => {
    const wrapper = shallow(
      <TokenPlay token={props.token} size={props.size} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('source is undefined with invalid image', () => {
    const token = {
      name: 'Invalid image',
      image: 'invalid-image',
    }
    const wrapper = mount(
      <TokenPlay token={token} size={props.size} />
    );
    expect(wrapper.find('Image').first().props().source).toBeUndefined();
  });
  it('should match default props value', () => {
    const wrapper = mount(
      <TokenPlay token={props.token} size={props.size} />
    );
    expect(wrapper.find('View').first().props().style).toMatchObject({ marginLeft: 0 });
    expect(wrapper.find('Image').first().props().style).toMatchObject({ width: 20, height: 20, opacity: 1 });
  });
  it('should match all props when defined', () => {
    const opacity = 0.4;
    const marginLeft = 10;
    const wrapper = mount(
      <TokenPlay token={props.token} size={props.size} opacity={opacity} marginLeft={marginLeft} />
    );
    expect(wrapper.find('View').first().props().style).toMatchObject({ marginLeft });
    expect(wrapper.find('Image').first().props().style).toMatchObject({ width: 20, height: 20, opacity });
  });
})