import ToolBar from "./view/toolBar/ToolBar.tsx";
import SlideList from "./view/slideList/SlideList.tsx";
import WorkArea from "./view/workArea/WorkArea.tsx";

import {Presentation} from "./store/objects.ts";
import styles from "./App.module.css";
import {maxSlides} from "./store/testData.ts";

import {Editor, dispatch} from "./store/editor.ts";
import {setText} from "./store/functions.ts";


type AppProps = {
    editor: Editor,
}


export default function App({editor}: AppProps) {
    const newPresentation: Presentation = {
        title: "Cамая новая презентация",
        slides: maxSlides,
        // slides: minSlides,
        // slide: [],
    };

    return (
        <>
            <ToolBar
                fileName={newPresentation.title}
            ></ToolBar>
            <div className={styles.slideArea}>
                <SlideList
                    slides={newPresentation.slides}
                    // selection={}
                >
                </SlideList>
                <WorkArea activeSlide={newPresentation.slides[2]}></WorkArea>
            </div>
        </>
    )
}