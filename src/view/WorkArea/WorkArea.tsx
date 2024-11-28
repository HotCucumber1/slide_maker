import {SlideView} from "../Slide/SlideView.tsx";
import styles from "./WorkArea.module.css";
import {WORK_AREA_SCALE} from "../../store/default_data/scale.ts";
import {useAppSelector} from "../../hooks/useAppSelector.ts"


const WorkArea = () => {
    const editor = useAppSelector(state => state.editor)
    const activeSlide = editor.presentation.slides.filter(
        slide => slide.id === editor.selectedSlides[0]
    )[0]

    return (
        <div className={styles.workArea}>
            <SlideView
                scale={WORK_AREA_SCALE}
                background={activeSlide.background}
                content={activeSlide.content}
            >
            </SlideView>
        </div>
    )
}

export {
    WorkArea,
}
