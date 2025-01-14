import {useGetActiveSlide} from "./useGetActiveSlide.ts"
import {useAppSelector} from "./useAppSelector.ts"
import {SlideObject} from "../store/objects.ts"

function useGetSelectedObjects(): SlideObject[] {
    const selectedObjectIds = useAppSelector((editor => editor.selectedObjects))
    const activeSlide = useGetActiveSlide()

    return activeSlide.content.filter(object => selectedObjectIds.includes(object.id))
}

export {
    useGetSelectedObjects,
}