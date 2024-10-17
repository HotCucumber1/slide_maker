import ToolBar from "./view/toolBar/ToolBar.tsx";
import SlideList from "./view/slideList/SlideList.tsx";
import WorkArea from "./view/workArea/WorkArea.tsx";

import styles from "./App.module.css";
import {Editor} from "./store/editor.ts";


type AppProps = {
    editor: Editor,
}


export default function App({editor}: AppProps) {

    return (
        <>
            <ToolBar
                fileName={editor.presentation.title}
            ></ToolBar>
            <div className={styles.slideArea}>
                <SlideList
                    slides={editor.presentation.slides}
                    // selection={}
                >
                </SlideList>
                <WorkArea activeSlide={editor.presentation.slides[0]}></WorkArea>
            </div>
        </>
    )
}