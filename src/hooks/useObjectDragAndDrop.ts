import {useEffect} from "react"
import {Point} from "../store/objects.ts"
import {dispatch} from "../store/editor.ts"
import {setObjectPosition} from "../store/actions/setObjectPosition.ts"

const useObjectDragAndDrop = (objectRef, isObjectSelected, setPos) => {
    let startPos: Point;
    let newPos: Point;

    const changePos = (event) => {
        const delta: Point = {
            x: event.pageX - startPos.x,
            y: event.pageY - startPos.y,
        }
        newPos = {
            x: startPos.x + delta.x,
            y: startPos.y + delta.y,
        }
        setPos(newPos)
    }

    const drop = () => {
        dispatch(setObjectPosition, newPos)
        document.removeEventListener("mousemove", changePos)
        document.removeEventListener("mouseup", drop)
    }

    const drag = (event) => {
        startPos = {
            x: event.pageX,
            y: event.pageY,
        }
        document.addEventListener("mousemove", changePos)
        document.addEventListener("mouseup", drop)
    }

    useEffect(() => {
        const object = objectRef.current
        if (isObjectSelected)
        {
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