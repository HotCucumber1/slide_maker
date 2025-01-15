import {Point} from "../store/objects.ts"
import {
    useCallback,
    useEffect,
    useRef,
    useState
} from "react"
import {DEFAULT_SLIDE_GAP, SLIDE_HEIGHT} from "../store/default_data/defaultSlide.ts"
import {SLIDE_LIST_SCALE} from "../store/default_data/scale.ts"
import {useAppSelector} from "./useAppSelector.ts"
import {useAppActions} from "./useAppActions.ts"

function useSlideDragAndDrop(
    startIndex: number,
    slideRef,
    setPos: (value: Point) => void,

) {
    const slides = useAppSelector(editor => editor.presentation.slides)
    const { setSlidePosition } = useAppActions()

    const startPos = useRef<Point>({x: 0, y: 0})
    const currentPos = useRef<Point>(startPos.current)
    const yShift = useRef(0)

    const [isDragging, setIsDragging] = useState(false)

    const onMouseMove = useCallback((event) => {
        if (!startPos.current) {
            return
        }
        const yOffset = event.pageY - startPos.current.y - yShift.current
        currentPos.current = {
            x: startPos.current.x,
            y: yOffset
        }
        setPos(currentPos.current)
    }, [setPos])

    const drop = useCallback(() => {
        setIsDragging(false)
        let newIndex = Math.floor(currentPos.current.y / ((SLIDE_HEIGHT * SLIDE_LIST_SCALE) + DEFAULT_SLIDE_GAP))
        newIndex += startIndex

        if (newIndex !== startIndex) {
            if (startIndex && newIndex >= 0 && newIndex < slides.length) {
                setSlidePosition(newIndex)
            }
            else if (newIndex >= slides.length) {
                setSlidePosition(slides.length - 1)
            }
            else if (newIndex < 0) {
                setSlidePosition(0)
            }
        }
        document.removeEventListener("mousemove", onMouseMove)
        document.removeEventListener("mouseup", drop)
    }, [onMouseMove, setSlidePosition, slides.length, startIndex])

    const drag = useCallback((event) => {
        startPos.current = {
            x: slideRef.current.getBoundingClientRect().left,
            y: slideRef.current.getBoundingClientRect().top
        }
        yShift.current = event.pageY - slideRef.current.getBoundingClientRect().top
        setIsDragging(true)
        document.addEventListener("mousemove", onMouseMove)
        document.addEventListener("mouseup", drop)
    }, [drop, onMouseMove, slideRef])

    useEffect(() => {
        const slide = slideRef.current
        slide.addEventListener("mousedown", drag)

        return () => {
            slide.removeEventListener("mousedown", drag)
        }
    }, [drag, drop, onMouseMove, slideRef])

    return { isDragging }
}

export {
    useSlideDragAndDrop
}