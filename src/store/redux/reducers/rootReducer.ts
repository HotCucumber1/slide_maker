import {combineReducers} from "redux"
import {titleReducer} from "./titleReducer.ts"
import {slideReducer} from "./slideReducer.ts"
import {slideObjectReducer} from "./objectReducer.ts"
import {textReducer} from "./textReducer.ts"
import {figureReducer} from "./figureReducer.ts"

const rootReducer = combineReducers({
    title: titleReducer,
    slides: slideReducer,
    object: slideObjectReducer,
    text: textReducer,
    figure: figureReducer,
})

export {
    rootReducer,
}