import {ToolBar} from "./view/ToolBar/ToolBar.tsx"
import {SlideList} from "./view/SlideList/SlideList.tsx"
import {WorkArea} from "./view/WorkArea/WorkArea.tsx"
import styles from "./App.module.css"


export default function App() {
    return (
        <>
            <ToolBar></ToolBar>
            <div className={styles.slideArea}>
                <SlideList></SlideList>
                <WorkArea></WorkArea>
            </div>
        </>
    )
}