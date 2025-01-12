import {SlideView} from "../Slide/SlideView.tsx";
import styles from "./WorkArea.module.css";
import {WORK_AREA_SCALE} from "../../store/default_data/scale.ts";
import {useAppSelector} from "../../hooks/useAppSelector.ts"
import {useCallback, useEffect} from "react"
import {useAppActions} from "../../hooks/useAppActions.ts"
import {useNavigate} from "react-router"
import {SLIDE_WIDTH} from "../../store/default_data/defaultSlide.ts"

type WorkAreaProps = {
    isSlideShow: boolean,
}

const WorkArea = ({isSlideShow}: WorkAreaProps) => {

    const slides = useAppSelector((editor => editor.presentation.slides))
    const selected = useAppSelector((editor => editor.selectedSlides))

    const activeSlide = slides.filter(
        slide => slide.id === selected[0]
    )[0]

    const {setSlideSelection} = useAppActions()
    const navigate = useNavigate()

    const changeActiveSlide = useCallback((event) => {
        if (event.key === "ArrowRight") {
            const newSlideIndex = slides.indexOf(activeSlide) + 1
            if (newSlideIndex < slides.length) {
                setSlideSelection([slides[newSlideIndex].id])
            }
        }
        if (event.key === "ArrowLeft") {
            const newSlideIndex = slides.indexOf(activeSlide) - 1
            if (newSlideIndex >= 0) {
                setSlideSelection([slides[newSlideIndex].id])
            }
        }
        if (event.key === "Escape") {
            navigate("/")
        }
    }, [activeSlide, setSlideSelection, slides])

    useEffect(() => {
        document.addEventListener("keydown", changeActiveSlide)

        return () => {
            document.removeEventListener("keydown", changeActiveSlide)
        }
    }, [changeActiveSlide])

    return (
        <div
            className={isSlideShow
                ? styles.slideShow
                : styles.workArea
            }
            style={{
                pointerEvents: isSlideShow
                    ? 'none'
                    : 'auto'
            }}
        >
            <SlideView
                scale={isSlideShow
                    ? window.innerWidth / SLIDE_WIDTH
                    : WORK_AREA_SCALE}
                background={activeSlide.background}
                content={activeSlide.content}
            ></SlideView>
        </div>
    )
}

export {
    WorkArea,
}
