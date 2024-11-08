import {useEffect} from "react";

function useSlideDragAndDrop(element, setPos)
{
    const onMouseDown = (event) => {

        const onMouseMove = (e) => {
            const delta = {
                x: e.pageX - startPos.x,
                y: e.pageY - startPos.y
            };
            const newPos = {
                x: modelPos.x + delta.x,
                y: modelPos.y + delta.y
            };
            setPos(newPos)
        }

        const startPos = element.startPosition;
        element.addEventListener("mousemove", onMouseMove);
        element.addEventListener("mouseup", onMouseUp);
    }

    useEffect(() => {
        element.addEventListener("mousedown", onMouseDown)
        return element.removeEventListener("mousedown", onMouseDown)
    })
}

export {
    useSlideDragAndDrop
}