import SlideView from "../../components/slide/SlideView.tsx";
import {Slide} from "../../store/objects.ts";
import styles from "./WorkArea.module.css";

type WorkAreaProps = {
    activeSlide: Slide,
}


export default function WorkArea(props: WorkAreaProps)
{
    if (props.activeSlide !== undefined)
    {
        return (
            <div className={styles.workArea}>
                <SlideView
                    type={"active"}
                    background={props.activeSlide.background}
                    content={props.activeSlide.content}>
                </SlideView>
            </div>
        )
    }
}