import {
    useEffect,
    useRef,
    useState
} from "react"
import {Point, Size} from "../store/objects.ts"

const useResize = (handleRef, startPos, startSize) => {
    const [pos, setPos] = useState<Point>(startPos)
    const [size, setSize] = useState<Size>(startSize)

    const startPosition = useRef<Point|null>(null)
    const handleType = useRef<string|null>(null)

    const handleMouseDown = (event) => {
        startPosition.current = {
            x: event.pageX,
            y: event.pageY,
        }
    }

    useEffect(() => {
        const handle = handleRef.current

        handle.addEventListener("mousedown", handleMouseDown)
        return () => {
            handle.removeEventListener("mousedown", handleMouseDown)
        }
    })
}

export {
    useResize,
}