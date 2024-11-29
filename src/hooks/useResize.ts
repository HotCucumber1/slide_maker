import {useEffect, useRef} from "react"
import {Point, Size} from "../store/objects.ts"
import {useAppActions} from "./useAppActions.ts"
import {WORK_AREA_SCALE} from "../store/default_data/scale.ts"

const useResize = (
    objectRef,
    setSize,
    setPos,
    onDragStart,
    onDragEnd,
) => {
    const {
        setObjectPosition,
        setObjectSize
    } = useAppActions()

    const resizingHandle = useRef(null)
    const currentPos = useRef<Point|null>(null)
    const currentSize = useRef<Size|null>(null)
    const startSize: Size = {
        width: objectRef.current?.width,
        height: objectRef.current?.height
    }

    // const rect = objectRef.current.getBoundingClientRect()
    // const parentRect = objectRef.current.parentElement.getBoundingClientRect()

    let updatedSize: Size = startSize

    useEffect(() => {
        const object = objectRef.current;
        object.addEventListener("mousedown", handleMouseDown)

        return () => {
            object.removeEventListener("mousedown", handleMouseDown)
        }
    }, [objectRef, setSize, setPos])

    const handleMouseDown = (event) => {
        const handle = event.target.dataset.handle
        if (!handle) {
            return
        }
        onDragStart()
        resizingHandle.current = handle
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    }

    const handleMouseMove = (event) => {
        if (!resizingHandle.current || !objectRef.current) {
            return
        }
        const slide = objectRef.current.parentElement
        switch (resizingHandle.current) {
            case "bottom-right":
                updatedSize = {

                }
                break
            default:
                break
        }

        setSize({
            width: Math.max(updatedSize.width, 10),
            height: Math.max(updatedSize.height, 10),
        })
        // setPos(updatedPos)
    }

    const handleMouseUp = () => {
        setObjectSize(updatedSize)
        // setObjectPosition(updatedPos)
        onDragEnd()
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
    }
}

export {
    useResize,
}