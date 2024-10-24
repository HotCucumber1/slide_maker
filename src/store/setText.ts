import {Editor} from "./editor.ts";
import {SlideObject} from "./objects.ts";

function setText(editor: Editor, newText: string): Editor
{
    const currentSlide = editor.presentation.slides.filter(
        slide => slide.id === editor.currentSlideId
    )[0];
    const currentSlideIndex = editor.presentation.slides.indexOf(currentSlide);

    console.log(currentSlide.content.filter(
        object => editor.selectedObjects.indexOf(object.id) !== -1
    ));

    const updatedContent: SlideObject = currentSlide.content.filter(
        object => editor.selectedObjects.indexOf(object.id) !== -1
    )[0];
    const updatedContentIndex = currentSlide.content.indexOf(updatedContent);

    if (updatedContent.type !== "text")
    {
        return editor;
    }

    updatedContent[updatedContentIndex].text = newText;

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