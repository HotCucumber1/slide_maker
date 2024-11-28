import {Editor} from "../../editor.ts"
import {defaultEditor} from "../../default_data/defaultEditor.ts"

const editorReducer = (editor: Editor = defaultEditor): Editor => {
    return editor
}

export {
    editorReducer,
}