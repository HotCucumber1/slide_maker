import styles from "./SlideList.module.css";
import {Slide} from "../../store/objects.ts";
import SlideView from "../../components/slide/SlideView.tsx";

type SlideListProps = {
    slides: Slide[],
};


export default function SlideList(props: SlideListProps)
{
    const slides = props.slides.map(slide => {
        return (
            <SlideView
                type={"listElement"}
                background={slide.background}
                content={slide.content}
                key={slide.id}
            >
            </SlideView>
        )
    });
    return (
        <div className={styles.slideList}>
            {slides}
        </div>
    )
}
