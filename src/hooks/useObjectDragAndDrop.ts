import {useEffect, useRef, useState} from "react"
import {Point} from "../store/objects.ts"
import {WORK_AREA_SCALE} from "../store/default_data/scale.ts"
import {useAppActions} from "./useAppActions.ts"

const useObjectDragAndDrop = (
    objectRef,
    setPos,
    isSelected,
) => {

    const { setObjectPosition } = useAppActions()
    const [isDragging, setIsDragging] = useState(false)
    const currentPos = useRef<Point|null>(null)
    const offset = useRef<Point|null>(null)

    useEffect(() => {
        const object = objectRef.current
        if (!isSelected) {
            return
        }

        object.addEventListener("mousedown", drag)
        return () => {
            object.removeEventListener("mousedown", drag)
        }
    })

    const drag = (event) => {
        offset.current = {
            x: event.pageX - objectRef.current.getBoundingClientRect().left,
            y: event.pageY - objectRef.current.getBoundingClientRect().top,
        }
        setIsDragging(true)
        document.addEventListener("mousemove", changePos)
        document.addEventListener("mouseup", drop)
    }

    const changePos = (event) => {
        const slide = objectRef.current.parentElement

        const updatedPos: Point = {
            x: (event.pageX - slide.getBoundingClientRect().left - offset.current?.x) / WORK_AREA_SCALE,
            y: (event.pageY - slide.getBoundingClientRect().top - offset.current?.y) / WORK_AREA_SCALE,
        }
        currentPos.current = updatedPos
        setPos(updatedPos)
    }

    const drop = () => {
        if (currentPos.current !== null) {
            setObjectPosition(currentPos.current as Point)
        }
        setIsDragging(false)
        document.removeEventListener("mousemove", changePos)
        document.removeEventListener("mouseup", drop)
    }

    return isDragging
}

export {
    useObjectDragAndDrop,
}