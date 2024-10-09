import styles from "./SlideList.module.css";
import {SelectedSlides, Slide} from "../../store/objects.ts";
import SlideView from "../../components/slide/SlideView.tsx";

type SlideListProps = {
    slides?: Slide[],
    // selection: SelectedSlides,
};


export default function SlideList({slides}: SlideListProps)
{
    const SLIDE_SCALE: number = 0.13;

    if (slides === undefined)
    {
        return;
    }

    // TODO: засунуть pointer-events: none; в отдельный className, который дополнительно добавить к SlideView
    // TODO: сам слайд обернуть в div, на который уже и надо вешать onClick

    // TODO: добавить фигуры
    // TODO: добавить получение презентации в каждую фукнкцию
    const slidesList = slides.map(slide => {
        return (
            <li key={slide.id}>
                <div className={styles.slidePreviewWrapper}>
                    <SlideView
                        scale={SLIDE_SCALE}
                        background={slide.background}
                        content={slide.content}
                        key={slide.id}
                        style={{borderRadius: 'var(--slide-preview-border-radius)'}}
                    >
                    </SlideView>
                </div>
            </li>
        )
    });
    return (
        <ol className={styles.slideList}>
            {slidesList}
        </ol>
    )
}
