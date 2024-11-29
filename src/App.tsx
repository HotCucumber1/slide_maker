import {ToolBar} from "./view/ToolBar/ToolBar.tsx"
import {SlideList} from "./view/SlideList/SlideList.tsx"
import {WorkArea} from "./view/WorkArea/WorkArea.tsx"
import styles from "./App.module.css"
import {History} from "./service/history.ts"
import {HistoryContext} from "./hooks/historyContext.ts"


type AppHooks = {
    history: History,
}

export default function App({history}: AppHooks) {
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