import { Store } from "redux";
import { Editor } from "../store/editor.ts";

type History = {
    undo: () => Editor | undefined,
    redo: () => Editor | undefined,
}

function getLastItem(stack: Editor[]): Editor {
    return stack[stack.length - 1]
}


function initHistory(store: Store<Editor>): History
{
    const undoStack: Editor[] = []
    let redoStack: Editor[] = []

    let previousEditor = store.getState()

    store.subscribe(() => {
        const editor = store.getState()

        if (!undoStack.length || previousEditor.presentation !== editor.presentation) {
            if (editor === getLastItem(undoStack))
            {
                undoStack.pop()
                redoStack.push(previousEditor)
            }
            else if (editor === getLastItem(redoStack))
            {
                redoStack.pop()
                undoStack.push(previousEditor)
            }
            else
            {
                undoStack.push(previousEditor)
                redoStack = []
            }
        }
        previousEditor = editor
    })

    function undo() {
        return getLastItem(undoStack)
    }

    function redo() {
        return getLastItem(redoStack)
    }

    return {
        undo,
        redo,
    }
}

export {
    History,
    initHistory
}