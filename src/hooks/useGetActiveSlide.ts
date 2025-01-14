import {useAppSelector} from "./useAppSelector.ts"
import {Slide} from "../store/objects.ts"

function useGetActiveSlide(): Slide {
    const slides = useAppSelector((editor => editor.presentation.slides))
    const selectedSlideIds = useAppSelector((editor => editor.selectedSlides))

    return slides.find(slide => slide.id === selectedSlideIds[0])
}

export {
    useGetActiveSlide,
}