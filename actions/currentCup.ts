import { SET_CUP } from '.';

export function setCurrentCup(cup) {
  return {
    type: SET_CUP,
    cup
  };
}