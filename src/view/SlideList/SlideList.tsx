import styles from "./SlideList.module.css";
import {SelectedObjects, SelectedSlides, Slide} from "../../store/objects.ts";
import {SlideView} from "../Slide/SlideView.tsx";
import * as React from "react";
import {SlideListElement} from "./SlideListElement.tsx";
import {SLIDE_LIST_SCALE} from "../../store/default_data/scale.ts";


type SlideListProps = {
    slides: Slide[],
    selection: SelectedSlides,
    objectSelection: SelectedObjects,
};


function SlideList({slides, selection, objectSelection}: SlideListProps)
{
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
                    objectSelection={objectSelection}
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
