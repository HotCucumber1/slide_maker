import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react"
import {WORK_AREA_SCALE} from "../store/default_data/scale.ts"
import {Point, Size} from "../store/objects.ts"
import {useAppActions} from "./useAppActions.ts"

type ResizeHandle = "top-left" | "top" | "top-right" | "right" | "bottom-right" | "bottom" | "bottom-left" | "left"


function useResize(initialSize: Size, objectRef, setCurrentSize) {
    const [isResizing, setIsResizing] = useState(false)
    const [resizeStart, setResizeStart] = useState<Point|null>(null)
    const [resizeHandle, setResizeHandle] = useState<ResizeHandle|null>(null)

    const currentSize = useRef<Size>(initialSize)

    const {
        setObjectSize,
        setObjectPosition
    } = useAppActions()

    const onResizeStart = useCallback((event, handlePoint: ResizeHandle) => {
        event.preventDefault()
        setResizeStart({
            x: event.clientX,
            y: event.clientY
        })
        setResizeHandle(handlePoint)
        setIsResizing(true)
    }, [])

    const onResize = useCallback(event => {
        if (!isResizing || !resizeStart) {
            return
        }

        const dx = event.clientX - resizeStart.x
        const dy = event.clientY - resizeStart.y

        let newWidth = currentSize.current.width
        let newHeight = currentSize.current.height

        if (resizeHandle?.includes("right")) {
            newWidth += dx;
        }
        if (resizeHandle?.includes("bottom")) {
            newHeight += dy;
        }
        if (resizeHandle?.includes("left")) {
            newWidth += dx;
        }
        if (resizeHandle?.includes("top")) {
            newHeight += dy;
        }
        currentSize.current = {
            width: Math.max(newWidth, 10),
            height: Math.max(newHeight, 10),
        }
        setCurrentSize(currentSize.current)

        }, [isResizing, resizeStart, resizeHandle, setCurrentSize])

    const onResizeEnd = useCallback(() => {
        setIsResizing(false)
        setResizeStart(null)
        setResizeHandle(null)
        setObjectSize(currentSize.current)
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
    }, [isResizing, onResize, onResizeEnd])

    return { onResizeStart }
}

export {
    useResize,
}