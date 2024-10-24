import {ToolBar} from "./view/toolBar/ToolBar.tsx";
import {SlideList} from "./view/slideList/SlideList.tsx";
import WorkArea from "./view/workArea/WorkArea.tsx";

import styles from "./App.module.css";
import {Editor} from "./store/editor.ts";
import * as React from "react";


type AppProps = {
    editor: Editor,
}


export default function App({editor}: AppProps) {
    return (
        <>
            <ToolBar fileName={editor.presentation.title}></ToolBar>
            <div className={styles.slideArea}>
                <SlideList
                    slides={editor.presentation.slides}
                    selection={editor.selectedSlides}
                    objectSelection={editor.selectedObjects}
                >
                </SlideList>
                <WorkArea
                    activeSlide={editor.presentation.slides.filter(
                        slide => slide.id === editor.currentSlideId
                    )[0]}
                    objectSelection={editor.selectedObjects}
                >
                </WorkArea>
            </div>
        </>
    )
}