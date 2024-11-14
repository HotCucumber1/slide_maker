import {SlideView} from "..//Slide/SlideView.tsx";
import styles from "./WorkArea.module.css";

import {SelectedObjects, Slide} from "../../store/objects.ts";
import {WORK_AREA_SCALE} from "../../store/default_data/scale.ts";


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
                scale={WORK_AREA_SCALE}
                background={activeSlide.background}
                content={activeSlide.content}
                objectSelection={objectSelection}
            >
            </SlideView>
        </div>
    )
}
