import { IHomeState, IHomeAction } from "./interfaces";

const homeReducer: (state: IHomeState, { type, payload }: IHomeAction) => IHomeState = (state, { type, payload }) => {

  switch (type) {
    case 'dataService': {
      return {
        ...state,
        dataService: payload
      }
    }
    case 'roles': {
      return {
        ...state,
        roles: payload
      }
    }
    case 'genres': {
      return {
        ...state,
        genres: payload
      }
    }
  }
  return state
}

export default homeReducer