import { Reducer } from 'redux';
import { UPDATE_GENERAL } from './actions'
import { IActionGeneralReducer, IStateGeneralReducer } from './interfaces'

const generalReducer: Reducer<IStateGeneralReducer, IActionGeneralReducer> = (
  stateGeneral = {
    name: "",
    displayName: "",
  },
  actionGeneral
) => {
  switch (actionGeneral.type) {
    case UPDATE_GENERAL: {
      //stateGeneral
      // ES6
      const newStateGeneral = {
        //Saco el estado anterior y lo coloco en la variable
        ...stateGeneral,
        // Sobreescribo los valores con el nuevo estado
        ...actionGeneral.payload
      }
      return newStateGeneral
    }
    default:
      return stateGeneral
  }
}

export default generalReducer;
