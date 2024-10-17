import styles from "./SlideList.module.css";
import {Slide} from "../../store/objects.ts";
import SlideView from "../../components/slide/SlideView.tsx";

type SlideListProps = {
    slides?: Slide[],
    // selection: SelectedSlides,
};


export default function SlideList({slides}: SlideListProps)
{
    const SLIDE_SCALE: number = 0.083;

    if (slides === undefined)
    {
        return;
    }

    const slidesList = slides.map(slide => (
        <li key={slide.id}>
            <div className={styles.slidePreviewWrapper}>
                <SlideView
                    scale={SLIDE_SCALE}
                    background={slide.background}
                    content={slide.content}
                    extraStyles={{
                        borderRadius: 'var(--slide-preview-border-radius)',
                        pointerEvents: "none",
                    }}
                >
                </SlideView>
            </div>
        </li>
    ));

    return (
        <ol className={styles.slideList}>
            {slidesList}
        </ol>
    )
}
