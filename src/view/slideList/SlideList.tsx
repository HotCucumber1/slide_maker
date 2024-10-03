import styles from "./SlideList.module.css";
import {Slide} from "../../store/objects.ts";

type SlideListProps = {
    slides: Slide[],
};


export default function SlideList(props: SlideListProps)
{
    const slides = props.slides.map(slide => {
        return (
            <div className={styles.slideList__slide} key={slide.id}>
            </div>
        )
    });
    return (
        <div className={styles.slideList}>
            {slides}
        </div>
    )
}
