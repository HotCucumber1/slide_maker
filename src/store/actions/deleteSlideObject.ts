import { Editor } from "../editor.ts";

function deleteSlideObjects(editor: Editor): Editor {
    const currentSlideIndex = editor.presentation.slides.findIndex(
        slide => slide.id === editor.selectedSlides[0]
    );

    if (currentSlideIndex === -1) {
        return editor;
    }

    const currentSlide = editor.presentation.slides[currentSlideIndex];

    const updatedContent = currentSlide.content.filter(
        object => !editor.selectedObjects.includes(object.id)
    );

    const newSlides = editor.presentation.slides.map((slide, index) => {
        if (index === currentSlideIndex) {
            return { ...slide, content: updatedContent };
        }
        return slide;
    });

    return {
        ...editor,
        selectedObjects: [],
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
    };
}

export {
    deleteSlideObjects,
};