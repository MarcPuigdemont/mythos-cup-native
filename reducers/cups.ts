import { ADD_CUP, UPDATE_CUP, REMOVE_CUP, REMOVE_ALL, SET_CUPS } from '../actions';
import { ICup } from '../interfaces';

export default function(state: ICup[] = [], action: { type: string, cup: ICup, cups: ICup[] }) {
  const { type, cup, cups } = action;

  switch (type) {
    case ADD_CUP:
      return [
        ...state,
        {
          id: Math.random()
            .toString(36)
            .substring(2),
          ...cup
        }
      ];
    case UPDATE_CUP:
      return state.map(oldCup => {
        if (oldCup.id === cup.id) {
          return cup;
        } else {
          return oldCup;
        }
      });
    case REMOVE_CUP:
      return state.filter(i => i.id !== cup.id);
    case REMOVE_ALL:
      return [];
    case SET_CUPS:
      return cups;
    default:
      return state;
  }
}
