import {
    MutableRefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react"
import {WORK_AREA_SCALE} from "../store/default_data/scale.ts"
import {Point, Size} from "../store/objects.ts"
import {useAppActions} from "./useAppActions.ts"

type ResizeHandle = "top-left" | "top" | "top-right" | "right" | "bottom-right" | "bottom" | "bottom-left" | "left"


function useResize(
    initialSize: Size,
    objectRef,
    setCurrentSize: (s: Size) => void,
    setCurrentPos: (p: Point) => void,
) {
    const [isResizing, setIsResizing] = useState(false)
    const resizeStart = useRef<Point|null>(null)
    const [resizeHandle, setResizeHandle] = useState<ResizeHandle|null>(null)

    const currentSize = useRef(initialSize)

    const {
        setObjectSize,
        setObjectPosition
    } = useAppActions()

    const onResizeStart = useCallback((event, handlePoint: ResizeHandle) => {
        // event.preventDefault()
        resizeStart.current = {
            x: event.clientX,
            y: event.clientY
        }
        setResizeHandle(handlePoint)
        setIsResizing(true)
    }, [])

    const onResize = useCallback(event => {
        if (!isResizing || !resizeStart.current) {
            return
        }
        const dx = (event.clientX - resizeStart.current?.x)
        const dy = (event.clientY - resizeStart.current?.y)

        if (resizeHandle?.includes("right")) {
            currentSize.current.width += dx;
        }
        if (resizeHandle?.includes("bottom")) {
            currentSize.current.height += dy;
        }
        if (resizeHandle?.includes("left")) {
            currentSize.current.width -= dx;
        }
        if (resizeHandle?.includes("top")) {
            currentSize.current.height -= dy;
        }

        currentSize.current = {
            width: Math.max(currentSize.current.width, 10),
            height: Math.max(currentSize.current.height, 10),
        }
        setCurrentSize({
            width: currentSize.current.width / WORK_AREA_SCALE,
            height: currentSize.current.height / WORK_AREA_SCALE
        })
        resizeStart.current = {
            x: event.clientX,
            y: event.clientY
        }

        }, [isResizing, resizeStart, resizeHandle, setCurrentSize])

    const onResizeEnd = useCallback(() => {
        setIsResizing(false)
        resizeStart.current = null
        setResizeHandle(null)
        setObjectSize({
            width: currentSize.current.width / WORK_AREA_SCALE,
            height: currentSize.current.height / WORK_AREA_SCALE
        })
    }, [setObjectSize])

    useEffect(() => {
        if (isResizing) {
            document.addEventListener("mousemove", onResize)
            document.addEventListener("mouseup", onResizeEnd)
        }
        else {
            document.removeEventListener("mousemove", onResize)
            document.removeEventListener("mouseup", onResizeEnd)
        }

        return () => {
            document.removeEventListener("mousemove", onResize)
            document.removeEventListener("mouseup", onResizeEnd)
        }
    }, [isResizing, objectRef, onResize, onResizeEnd])

    return { isResizing, onResizeStart }
}

export {
    useResize,
}