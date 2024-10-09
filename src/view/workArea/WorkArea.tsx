import SlideView from "../../components/slide/SlideView.tsx";
import {Slide} from "../../store/objects.ts";
import styles from "./WorkArea.module.css";

type WorkAreaProps = {
    activeSlide?: Slide,
}


export default function WorkArea({activeSlide}: WorkAreaProps)
{
    const SCALE: number = 1;
    if (activeSlide === undefined)
    {
        return;
    }
    return (
        <div className={styles.workArea}>
            <SlideView
                scale={SCALE}
                background={activeSlide.background}
                content={activeSlide.content}>
            </SlideView>
        </div>
    )
}