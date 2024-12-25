import {legacy_createStore as createStore, applyMiddleware} from "redux"
import { thunk } from "redux-thunk"
import {getDocumentState, saveDocumentState} from "../storage.ts"
import {editorReducer} from "./editorReducer.ts"
import {defaultEditor} from "../default_data/defaultEditor.ts"

const documentState = getDocumentState() || defaultEditor
const store = createStore(
    editorReducer,
    documentState,
    applyMiddleware(thunk)
)

store.subscribe(() => {
    saveDocumentState(store.getState())
})

export {
    store,
}