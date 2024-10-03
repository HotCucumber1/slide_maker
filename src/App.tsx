import ToolBar from "./view/toolBar/ToolBar.tsx";
import SlideList from "./view/slideList/SlideList.tsx";
import {Presentation, Slide} from "./store/objects.ts";
import styles from "./App.module.css";

import {v4 as uuidv4} from "uuid";



export default function App() {
    const slides: Slide[] = [];
    for (let i = 0; i < 20; i++)
    {
        slides.push(
            {
            id: uuidv4(),
            background: {
                value: "white",
                type: "color",
            },
            content: [],
        });
    }

    const newPresentation: Presentation = {
        title: "Новая презентация",
        slides: slides,
    };

    return (
        <>
            <ToolBar fileName={newPresentation.title}></ToolBar>
            <div className={styles.slideArea}>
                <SlideList slides={newPresentation.slides}></SlideList>
            </div>
        </>
    )
}