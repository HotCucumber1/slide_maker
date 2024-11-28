import {
    applyMiddleware,
    legacy_createStore as createStore,
    Middleware
} from "redux"
import {getDocumentState, saveDocumentState} from "../storage.ts"
import {editorReducer} from "./editorReducer.ts"
import {defaultEditor} from "../default_data/defaultEditor.ts"

const saveToLocalStorage: Middleware = (storeState) => (next) => (action) => {
    const result = next(action)
    const state = storeState.getState()
    saveDocumentState(state)

    return result
}

const documentState = getDocumentState() || defaultEditor;
const store = createStore(
    editorReducer,
    documentState,
    applyMiddleware(saveToLocalStorage)
)

export {
    store,
}