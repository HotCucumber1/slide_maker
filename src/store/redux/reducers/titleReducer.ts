import {EditorAction, ActionType} from "../actions.ts"

const titleReducer = (state = "Новая презентация", action: EditorAction): string => {
    if (action.type === ActionType.SET_PRESENTATION_TITLE)
    {
        return action.payload
    }
    return state
}

export {
    titleReducer,
}