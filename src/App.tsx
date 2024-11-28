import {ToolBar} from "./view/ToolBar/ToolBar.tsx";
import {SlideList} from "./view/SlideList/SlideList.tsx";
import WorkArea from "./view/WorkArea/WorkArea.tsx";
import styles from "./App.module.css";
import * as React from "react";


export default function App() {
    return (
        <>
            <ToolBar></ToolBar>
            <div className={styles.slideArea}>
                <SlideList
                    slides={editor.presentation.slides}
                    selection={editor.selectedSlides}
                    objectSelection={editor.selectedObjects}
                >
                </SlideList>
                <WorkArea
                    activeSlide={editor.presentation.slides.filter(
                        slide => slide.id === editor.selectedSlides[0]
                    )[0]}
                    objectSelection={editor.selectedObjects}
                >
                </WorkArea>
            </div>
        </>
    )
}