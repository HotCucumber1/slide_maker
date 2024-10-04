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
            <li key={slide.id}>
                <SlideView
                    type={"listElement"}
                    background={slide.background}
                    content={slide.content}
                    key={slide.id}
                >
                </SlideView>
            </li>
        )
    });
    return (
        <ol className={styles.slideList}>
            {slides}
        </ol>
    )
}
