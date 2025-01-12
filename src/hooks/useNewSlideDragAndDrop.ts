import {
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
) {
    const coordsRef = useRef<Point>(currentCoords)
    const slideRef = useRef<HTMLDivElement|null>(null)
    const startCoords = useRef<Point>(DEFAULT_SLIDE_COORDS)

    const [, setCoords] = useState<Point>(currentCoords)

    useEffect(() => {
        if (coordsRef.current.y !== currentCoords.y) {
            // setCoords(currentCoords)
            coordsRef.current = currentCoords
        }
    }, [currentCoords])

    const onMouseMove = useCallback((event) => {
        const newCoords = {
            x: startCoords.current.x,
            y: event.pageY - startCoords.current.y,
        }
        setCoords(newCoords)
        coordsRef.current = newCoords
    }, [])

    const onMouseUp = useCallback(() => {
        onCoordChange(coordsRef.current)
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
    }, [onCoordChange, onMouseMove])

    const onMouseDown = useCallback((event) => {
        startCoords.current = {
            x: coordsRef.current.x,
            y: event.pageY - coordsRef.current.y,
        }
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    }, [onMouseMove, onMouseUp])

    useEffect(() => {
        const dragableSlide = slideRef.current
        if (dragableSlide) {
            dragableSlide.addEventListener('mousedown', onMouseDown)
        }

        return () => {
            if (dragableSlide) {
                dragableSlide.removeEventListener('mousedown', onMouseDown)
            }
        }
    }, [onCoordChange, onMouseDown])

    return {
        slideRef,
        coordsRef,
    }
}

export {
    useNewSlideDragAndDrop,
}