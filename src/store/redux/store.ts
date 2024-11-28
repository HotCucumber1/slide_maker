import {createStore} from "redux"
import {rootReducer} from "./reducers/rootReducer.ts"

const store = createStore(rootReducer)

export {
    store,
}