import {
    MutableRefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react"
import {Point} from "../store/objects.ts"
import {DEFAULT_SLIDE_COORDS} from "../store/default_data/defaultSlide.ts"


function useNewSlideDragAndDrop(
    currentCoords: Point,
    onCoordChange: (position: Point) => void
): {
    coords: Point,
    slideRef: MutableRefObject<HTMLDivElement | null>
} {
    const slideRef = useRef<HTMLDivElement | null>(null)
    const startCoords = useRef<Point>(DEFAULT_SLIDE_COORDS)
    const [coords, setCoords] = useState<Point>(currentCoords)

    // useEffect(() => {
    //     if (coords.y !== currentCoords.y || coords.x !== currentCoords.x) {
    //         setCoords(currentCoords)
    //         console.log(coords)
    //     }
    // }, [coords, currentCoords])

    const onMouseMove = useCallback((event: MouseEvent) => {
        const newCoords = {
            x: startCoords.current.x,
            y: event.pageY - startCoords.current.y,
        }
        setCoords(newCoords)
    }, [coords])

    const onMouseUp = useCallback(() => {
        onCoordChange(coords)
        document.removeEventListener("mousemove", onMouseMove)
        document.removeEventListener("mouseup", onMouseUp)
    }, [onCoordChange, coords, onMouseMove])

    const onMouseDown = useCallback((event: MouseEvent) => {
        startCoords.current = {
            x: coords.x,
            y: event.pageY - coords.y,
        }
        document.addEventListener("mousemove", onMouseMove)
        document.addEventListener("mouseup", onMouseUp)
    }, [coords, onMouseMove, onMouseUp])

    useEffect(() => {
        const dragableSlide = slideRef.current;
        if (dragableSlide) {
            dragableSlide.addEventListener("mousedown", onMouseDown);
        }
        return () => {
            if (dragableSlide) {
                dragableSlide.removeEventListener("mousedown", onMouseDown);
            }
        }
    }, [onMouseDown])

    return {
        slideRef,
        coords,
    }
}


export {
    useNewSlideDragAndDrop,
}