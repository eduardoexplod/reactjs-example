import { IInitialAppState } from './interfaces'

export const InitialAppState: IInitialAppState = {
  general: {
    name: "",
    displayName: "",
  }
}
export const loggerApp = (store: any) => (next: any) => (action: any) => {
  let result = next(action)
  return result
}
