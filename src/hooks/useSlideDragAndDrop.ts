import {useCallback, useRef} from "react"
import {EditorAction} from "../store/redux/actions.ts"

const useSlideDragAndDrop = (setSlideIndex: (newIndex: number) => EditorAction) => {
    const draggedSlide = useRef<string|null>(null)
    const slideRefs = useRef<Record<string, HTMLDivElement | null>>({})

    const mouseMoveHandler = useCallback((e: MouseEvent) => {
        if (!draggedSlide.current) {
            return
        }

        const mouseY = e.clientY

        const allSlideIds = Object.keys(slideRefs.current)
        let newIndex = allSlideIds.findIndex((id) => {
            const ref = slideRefs.current[id]
            if (!ref) {
                return false
            }

            const rect = ref.getBoundingClientRect()
            return mouseY > rect.top && mouseY < rect.bottom
        })

        if (newIndex === -1) {
            newIndex = allSlideIds.length - 1
        }

        setSlideIndex(newIndex)
    }, [setSlideIndex])

    const mouseUpHandler = useCallback(() => {
        draggedSlide.current = null
        document.removeEventListener("mousemove", mouseMoveHandler)
        document.removeEventListener("mouseup", mouseUpHandler)
    }, [mouseMoveHandler])

    const mouseDownHandler = useCallback((id: string) => {
        draggedSlide.current = id

        document.addEventListener("mousemove", mouseMoveHandler)
        document.addEventListener("mouseup", mouseUpHandler)
    }, [mouseMoveHandler, mouseUpHandler])

    return {
        slideRefs,
        mouseDownHandler,
    }
}

export {
    useSlideDragAndDrop,
}