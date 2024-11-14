import {Editor} from "../editor.ts";
import {Color} from "../objects.ts";

function setFigureColor(editor: Editor, color: Color)
{
    const currentSlide = editor.presentation.slides.filter(
        slide => slide.id === editor.selectedSlides[0]
    )[0];

    const selectedObjects = currentSlide.content
        .filter(
            object => editor.selectedObjects.includes(object.id)
        )
        .filter(
            object => object.type === "label" || object.type === "triangle" || object.type === "ellipse"
        );

    selectedObjects.forEach(figure => {
        figure.fillStyle = color;
        const objectIndex = currentSlide.content.indexOf(figure);
        currentSlide.content[objectIndex] = figure;
    });

    const currentSlideIndex = editor.presentation.slides.indexOf(currentSlide);

    const newSlides = editor.presentation.slides.slice();
    newSlides[currentSlideIndex] = currentSlide;

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    };
}

export {
    setFigureColor,
}