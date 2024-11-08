import SlideView from "..//Slide/SlideView.tsx";
import styles from "./WorkArea.module.css";

import {SelectedObjects, Slide} from "../../store/objects.ts";


const SLIDE_SCALE: number = 0.625;

type WorkAreaProps = {
    activeSlide?: Slide,
    objectSelection: SelectedObjects,
}

export default function WorkArea({activeSlide, objectSelection}: WorkAreaProps)
{
    if (activeSlide === undefined)
    {
        return;
    }
    return (
        <div className={styles.workArea}>
            <SlideView
                scale={SLIDE_SCALE}
                background={activeSlide.background}
                content={activeSlide.content}
                objectSelection={objectSelection}
            >
            </SlideView>
        </div>
    )
}