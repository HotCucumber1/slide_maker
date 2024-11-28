import styles from "./SlideList.module.css"
import {SlideView} from "../Slide/SlideView.tsx"
import {SlideListElement} from "./SlideListElement.tsx"
import {SLIDE_LIST_SCALE} from "../../store/default_data/scale.ts"
import {useAppSelector} from "../../hooks/useAppSelector.ts"


function SlideList()
{
    const editor = useAppSelector((editor => editor))
    const slides = editor.presentation.slides
    const selection = editor.selectedSlides

    const slidesList = slides.map((slide, index) => (
        <li key={slide.id}>
            <SlideListElement
                startPosition={index}
                className={styles.slidePreviewWrapper}
                id={slide.id}
                isSelected={selection.includes(slide.id)}
            >
                <SlideView
                    scale={SLIDE_LIST_SCALE}
                    background={slide.background}
                    content={slide.content}
                    extraStyles={{
                        borderRadius: 'var(--slide-preview-border-radius)',
                        pointerEvents: "none",
                        clipPath: "inset(0 round var(--slide-preview-border-radius))",
                    }}
                >
                </SlideView>
            </SlideListElement>
        </li>
    ));

    return (
        <ol className={styles.slideList}>
            {slidesList}
        </ol>
    )
}

export {
    SlideList
}
