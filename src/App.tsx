import {ToolBar} from "./view/ToolBar/ToolBar.tsx"
import {SlideList} from "./view/SlideList/SlideList.tsx"
import {WorkArea} from "./view/WorkArea/WorkArea.tsx"
import styles from "./App.module.css"
import {HistoryType} from "./service/history.ts"
import {HistoryContext} from "./hooks/historyContext.ts"
import {useEffect} from "react"
import {useAppActions} from "./hooks/useAppActions.ts"

type AppHooks = {
    history: HistoryType,
}

export default function App({history}: AppHooks) {

    const {setEditor} = useAppActions()

    useEffect(() => {
        const onUndoKeyPressed = (event) => {

            if ((event.ctrlKey || event.metaKey) && event.code === "KeyZ") {
                event.preventDefault()
                const newEditor = history.undo()
                if (newEditor) {
                    setEditor(newEditor)
                }
            }

            if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.code === "KeyZ") {
                const newEditor = history.redo()
                if (newEditor) {
                    setEditor(newEditor)
                }
            }
        }

        window.addEventListener("keydown", onUndoKeyPressed);
        return () => {
            window.removeEventListener("keydown", onUndoKeyPressed);
        }
    }, [history, setEditor])


    return (
        <HistoryContext.Provider value={history}>
            <ToolBar></ToolBar>
            <div className={styles.slideArea}>
                <SlideList></SlideList>
                <WorkArea></WorkArea>
            </div>
        </HistoryContext.Provider>
    )
}