import {ToolBar} from "./view/ToolBar/ToolBar.tsx"
import {SlideList} from "./view/SlideList/SlideList.tsx"
import {WorkArea} from "./view/WorkArea/WorkArea.tsx"
import styles from "./App.module.css"
import {HistoryType} from "./service/history.ts"
import {HistoryContext} from "./hooks/historyContext.ts"
import {useEffect} from "react"
import {useAppActions} from "./hooks/useAppActions.ts"
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router"
import {useAppSelector} from "./hooks/useAppSelector.ts"

type AppHooks = {
    history: HistoryType,
}

export default function App({history}: AppHooks) {
    const title = useAppSelector(editor => editor.presentation.title)
    const {setEditor} = useAppActions()

    useEffect(() => {
        document.title = title
        const onUndoKeyPressed = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.code === "KeyZ") {
                const newEditor = history.redo()
                if (newEditor) {
                    setEditor(newEditor)
                }
                return
            }

            if ((event.ctrlKey || event.metaKey) && event.code === "KeyZ") {
                const newEditor = history.undo()
                if (newEditor) {
                    setEditor(newEditor)
                }

            }
        }
        window.addEventListener("keydown", onUndoKeyPressed);
        return () => {
            window.removeEventListener("keydown", onUndoKeyPressed);
        }
    }, [title, history, setEditor])


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <HistoryContext.Provider value={history}>
                        <ToolBar></ToolBar>
                        <div className={styles.slideArea}>
                            <SlideList></SlideList>
                            <WorkArea isSlideShow={false}></WorkArea>
                        </div>
                    </HistoryContext.Provider>
                }/>
                <Route path={"/slide_show"} element={
                    <WorkArea isSlideShow={true}></WorkArea>
                }/>
            </Routes>
        </BrowserRouter>
    )
}