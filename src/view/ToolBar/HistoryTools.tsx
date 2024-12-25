import {MenuButton} from "../../components/MenuButton/MenuButton.tsx"
import * as ButtonData from "./toolBarButtonsData.ts"
import React from "react"
import {HistoryContext} from "../../hooks/historyContext.ts"
import {useAppActions} from "../../hooks/useAppActions.ts"

function HistoryTools() {

    const history = React.useContext(HistoryContext)
    const { setEditor, } = useAppActions()
    const onUndo = () => {
        const newEditor = history.undo()
        if (newEditor) {
            setEditor(newEditor)
        }
    }

    const onRedo = () => {
        const newEditor = history.redo()
        if (newEditor) {
            setEditor(newEditor)
        }
    }

    return (
        <>
            <MenuButton
                content={ButtonData.undoActionButtonContent}
                onClick={onUndo}
            />
            <MenuButton
                content={ButtonData.redoActionButtonContent}
                onClick={onRedo}
            />
        </>
    )
}

export {
    HistoryTools,
}