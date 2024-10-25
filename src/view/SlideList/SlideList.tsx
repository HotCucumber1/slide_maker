import styles from "./SlideList.module.css";
import {SelectedObjects, SelectedSlides, Slide} from "../../store/objects.ts";
import SlideView from "../Slide/SlideView.tsx";
import {dispatch} from "../../store/editor.ts";
import {setActiveSlide} from "../../store/setActiveSlide.ts";
import {setSlideSelection} from "../../store/setSlideSelection.ts"
import * as React from "react";


const SLIDE_SCALE: number = 0.083;

type SlideListProps = {
    slides: Slide[],
    selection: SelectedSlides,
    objectSelection: SelectedObjects,
};


function SlideList({slides, selection, objectSelection}: SlideListProps)
{
    const onSlideClick: React.MouseEventHandler = event => {
        dispatch(setSlideSelection, [(event.target as HTMLDivElement).id])
        dispatch(setActiveSlide, (event.target as HTMLDivElement).id)
    }

    const slidesList = slides.map(slide => (
        <li key={slide.id}>
            <div
                className={styles.slidePreviewWrapper}
                id={slide.id}
                onClick={onSlideClick}
            >
                <SlideView
                    scale={SLIDE_SCALE}
                    background={slide.background}
                    content={slide.content}
                    extraStyles={{
                        borderRadius: 'var(--slide-preview-border-radius)',
                        pointerEvents: "none",
                    }}
                    isSelected={selection.includes(slide.id)}
                    objectSelection={objectSelection}
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

export {
    SlideList,
}
