import SlideView from "../../components/slide/SlideView.tsx";
import styles from "./WorkArea.module.css";

import {SelectedObjects, Slide} from "../../store/objects.ts";

type WorkAreaProps = {
    activeSlide?: Slide,
    objectSelection: SelectedObjects,
}


export default function WorkArea({activeSlide, objectSelection}: WorkAreaProps)
{
    const SLIDE_SCALE: number = 0.625;
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