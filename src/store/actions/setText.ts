import {Editor} from "../editor.ts";
import {SlideObject} from "../objects.ts";

function setText(editor: Editor, newText: string): Editor
{
    const currentSlide = editor.presentation.slides.filter(
        slide => slide.id === editor.selectedSlides[0]
    )[0];
    const currentSlideIndex = editor.presentation.slides.indexOf(currentSlide);

    const updatedContent: SlideObject = currentSlide.content.filter(
        object => editor.selectedObjects.indexOf(object.id) !== -1
    )[0];

    const updatedContentIndex = currentSlide.content.indexOf(updatedContent);

    if (currentSlide.content[updatedContentIndex].type !== "text")
    {
        return editor;
    }


    currentSlide.content[updatedContentIndex].text = newText;

    const newSlides = editor.presentation.slides.slice();
    newSlides[currentSlideIndex] = currentSlide;

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        }
    };
}

export {
    setText,
}