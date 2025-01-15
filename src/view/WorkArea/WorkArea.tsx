import {SlideView} from "../Slide/SlideView.tsx";
import styles from "./WorkArea.module.css";
import {WORK_AREA_SCALE} from "../../store/default_data/scale.ts";
import {useAppSelector} from "../../hooks/useAppSelector.ts"
import {useCallback, useEffect} from "react"
import {useAppActions} from "../../hooks/useAppActions.ts"
import {useNavigate} from "react-router"
import {SLIDE_WIDTH} from "../../store/default_data/defaultSlide.ts"
import {useGetActiveSlide} from "../../hooks/useGetActiveSlide.ts"

type WorkAreaProps = {
    isSlideShow: boolean,
}

const WorkArea = ({isSlideShow}: WorkAreaProps) => {

    const slides = useAppSelector(editor => editor.presentation.slides)
    const selectedObjects = useAppSelector(editor => editor.selectedObjects)

    const activeSlide = useGetActiveSlide()

    const { setSlideSelection } = useAppActions()
    const navigate = useNavigate()

    const changeActiveSlide = useCallback((event) => {
        if (selectedObjects.length > 0) {
            return
        }
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
    }, [activeSlide, setSlideSelection, slides])

    const onFullscreenChange = useCallback(() => {
        if (!document.fullscreenElement) {
            navigate("/")
        }
    }, [navigate])

    useEffect(() => {
        document.addEventListener("keydown", changeActiveSlide)
        document.addEventListener('fullscreenchange', onFullscreenChange)

        return () => {
            document.removeEventListener("keydown", changeActiveSlide)
            document.addEventListener('fullscreenchange', onFullscreenChange)
        }
    }, [changeActiveSlide, onFullscreenChange])

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
                    : WORK_AREA_SCALE
                }
                background={activeSlide.background}
                content={activeSlide.content}
                extraStyles={
                    document.fullscreenElement
                    ? {
                        overflow: "hidden",
                    }
                    : {
                        border: "1px solid var(--light-gray-color)",
                        borderRadius: "var(--slide-border-radius)"
                    }
                }
            ></SlideView>
        </div>
    )
}

export {
    WorkArea,
}
