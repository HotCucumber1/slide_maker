import SlideView from "../../components/slide/SlideView.tsx";
import {Slide} from "../../store/objects.ts";
import styles from "./WorkArea.module.css";

type WorkAreaProps = {
    activeSlide?: Slide,
}


export default function WorkArea(props: WorkAreaProps)
{
    const SCALE: number = 1;
    if (props.activeSlide === undefined)
    {
        return;
    }
    return (
        <div className={styles.workArea}>
            <SlideView
                scale={SCALE}
                background={props.activeSlide.background}
                content={props.activeSlide.content}>
            </SlideView>
        </div>
    )
}