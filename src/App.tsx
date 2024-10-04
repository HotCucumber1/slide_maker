import ToolBar from "./view/toolBar/ToolBar.tsx";
import SlideList from "./view/slideList/SlideList.tsx";
import {Presentation, Slide} from "./store/objects.ts";
import styles from "./App.module.css";

import WorkArea from "./view/workArea/WorkArea.tsx";
import {addImageToSlide, addTextToSlide} from "./store/functions.ts";
import {v4 as uuidv4} from "uuid";



export default function App() {
    const slides: Slide[] = [];
    slides.push();

    for (let i = 0; i < 8; i++)
    {
        const slide: Slide = {
            id: uuidv4(),
            background: {
                colors: [
                    {value: "white", type: "color"},
                    {value: "green", type: "color"},
                ],
                angle: 45,
                type: "gradient",
            },
            content: [],
        };
        if (i % 2 == 0)
        {
            slides.push(
                addTextToSlide(
                    slide,
                    {
                        x: 100,
                        y: 100
                    },
                    40,
                    "Arial",
                    ["italic"]
                )
            );
        }
        else
        {
            slides.push(
                addImageToSlide(
                    slide,
                    {x: 100, y: 100},
                    {width: 500, height: 500},
                    "../public/image/earth.gif",
                )
            );
        }
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
                <WorkArea activeSlide={slides[0]}></WorkArea>
            </div>
        </>
    )
}