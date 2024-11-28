import {combineReducers} from "redux"
import {textReducer} from "./textReducer.ts"
import {titleReducer} from "./titleReducer.ts"
import {slideReducer} from "./slideReducer.ts"
import {figureReducer} from "./figureReducer.ts"
import {slideObjectReducer} from "./objectReducer.ts"
import {slideSelectionReducer} from "./slideSelectionReducer.ts"
import {objectSelectionReducer} from "./objectSelectionReducer.ts"
import {editorReducer} from "./editorReducer.ts"

const rootReducer = combineReducers({
    titleEditor: titleReducer,
    slidesEditor: slideReducer,
    objectEditor: slideObjectReducer,
    textEditor: textReducer,
    figureEditor: figureReducer,
    slideSelectionEditor: slideSelectionReducer,
    objectSelectionEditor: objectSelectionReducer,
    editor: editorReducer,
})

export {
    rootReducer,
}