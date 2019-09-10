/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow, mount } from 'enzyme';
import MythosCupForm from '../components/MythosCupForm';
import defaultCups from '../utils/defaultCups';
import { act } from 'react-dom/test-utils';

const cup = defaultCups[0];
let mockNavigate = jest.fn();
const navigation = { navigate: mockNavigate };
let mockDispatch = jest.fn();
jest.mock('redux-react-hook', () => {
    return {
      useDispatch: () => mockDispatch
    };
});
jest.mock('../components/CreateMythosCupIcons', () => {
  const CreateMythosCupIconsMock = () => {
    return <div id="CreateMythosCupIcons"></div>;
  }
  return CreateMythosCupIconsMock;
});

describe('MythosCupForm', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
        <MythosCupForm cup={cup} navigation={navigation} action={() => {}} />
    );
    expect(wrapper).toMatchSnapshot();
    
  });
  it('should dispatch a valid cup and navigate', () => {
    mockDispatch = jest.fn();
    const action = jest.fn().mockImplementation((a) => a);
    const wrapper = mount(
        <MythosCupForm cup={null} navigation={navigation} action={action} />
    );
    expect(wrapper.find('Input')).toHaveLength(2);
    expect(wrapper.find('CreateMythosCupIconsMock')).toHaveLength(1);
    expect(wrapper.find('Button')).toHaveLength(1);

    act(() => {
      const inputValues = [ 'campaign 1', 'easy'];
      wrapper.find('Input').forEach((el, i) => el.props().onChangeText(inputValues[i]));
      wrapper.find('CreateMythosCupIconsMock').props().onSelect(4);
    });
    wrapper.update();
    act(() => {
      wrapper.find('Button').props().onPress();
    });
    wrapper.update();

    expect(action).toHaveBeenCalledWith({ campaign: 'campaign 1', difficulty: 'easy', icon: 4 });
    expect(mockDispatch).toHaveBeenCalledWith({ campaign: 'campaign 1', difficulty: 'easy', icon: 4 });
    expect(mockNavigate).toHaveBeenCalledWith('MythosCupsList');

    expect(wrapper.find('Input').map((el) => el.props().value)).toEqual(['', '']);
    expect(wrapper.find('CreateMythosCupIconsMock').props().selected).toEqual(0);
  });
})