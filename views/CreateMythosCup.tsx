import React from 'react';

import { addCup } from '../actions/cups';
import MythosCupForm from '../components/MythosCupForm';

const CreateMythosCup = (props) => {
  return (
    <MythosCupForm action={addCup} {...props}/>
  );
};
CreateMythosCup.navigationOptions = { title: 'Create Mythos Cup' };

export default CreateMythosCup;