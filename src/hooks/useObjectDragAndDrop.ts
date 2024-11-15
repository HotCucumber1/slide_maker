import {useEffect, useRef} from "react"
import {Point} from "../store/objects.ts"
import {dispatch} from "../store/editor.ts"
import {setObjectPosition} from "../store/actions/setObjectPosition.ts"
import {WORK_AREA_SCALE} from "../store/default_data/scale.ts"

const useObjectDragAndDrop = (objectRef, isObjectSelected, setPos) => {
    const newPos = useRef<Point|null>(null)
    const offset = useRef<Point|null>(null)

    const changePos = (event) => {
        const slide = objectRef.current.parentElement

        newPos.current = {
            x: (event.pageX - slide.getBoundingClientRect().left - offset.current.x) / WORK_AREA_SCALE,
            y: (event.pageY - slide.getBoundingClientRect().top - offset.current.y) / WORK_AREA_SCALE,
        }
        setPos(newPos.current)
    }

    const drop = () => {
        dispatch(setObjectPosition, newPos.current)

        document.removeEventListener("mousemove", changePos)
        document.removeEventListener("mouseup", drop)
    }

    const drag = (event) => {
        offset.current = {
            x: event.pageX - objectRef.current.getBoundingClientRect().left,
            y: event.pageY - objectRef.current.getBoundingClientRect().top,
        }
        document.addEventListener("mousemove", changePos)
        document.addEventListener("mouseup", drop)
    }

    useEffect(() => {
        const object = objectRef.current
        if (isObjectSelected) {
            object.addEventListener("mousedown", drag)
        }

        return () => {
            object.removeEventListener("mousedown", drag)
        }
    })
}

export {
    useObjectDragAndDrop,
}