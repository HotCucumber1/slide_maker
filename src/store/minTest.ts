import {Presentation, SelectedObjects, SelectedSlides} from "./objects.ts";
import {
    addSlide,
    addImage,
    addText,
    setPresentationTitle,
    setPresentationBackground,
    setSlideBackground,
    setSlidePosition,
    setText,
    setImagePosition,
    setObjectPosition,
    setObjectSize,
    setImageSize,
    setFontSize,
    setFontFamily,
    setFontStyle,
    deleteSlideObjects,
    deleteSlides
} from "./functions.ts";


const presentation: Presentation = {
    title: "Laboratory work №2",
    slides: [],
};
const selectedSlides: SelectedSlides = [];
const selectedObjects: SelectedObjects = [];

console.log("Стартовая версия: ", presentation, "\n");

const oneSlidePresentation = addSlide(presentation);
console.log("Презентация с одним слайдом: ", oneSlidePresentation, "\n");


const imageSlide = addImage(
    oneSlidePresentation.slides[0],
    { x: 100, y: 100},
    { width: 500, height: 500 },
    "./static/img6.jpg",
);
console.log("Слайд с картинкой: ", imageSlide, "\n");


const textSlide = addText(
    oneSlidePresentation.slides[0],
    { x: 100, y: 100},
    12,
    "Arial",
    []);
console.log("Слайд с тестом: ", textSlide, "\n");

console.log("Новый title: ", setPresentationTitle(presentation, "New title"), "\n");

console.log("Новый background презентации: ", setPresentationBackground(presentation, { value: "blue", type: "color"}), "\n");

console.log("Новый background одного слайда: ", setSlideBackground(presentation.slides[0], { value: "blue", type: "color"}),"\n");

const twoSlidesPres2 = setSlidePosition(presentation, presentation.slides[0], 1);
console.log("2 : ", twoSlidesPres2, "\n");

console.log("Слайд с новым текстом: ", setText(textSlide.content[0], "Hello text new"), "\n");

console.log("Новая позиция картинки: ", setImagePosition(imageSlide.content[0], { x: 200, y: 200}));

console.log("Новый размер картинки: ", setImageSize(imageSlide.content[0], { width: 1, height: 1}));

console.log("Новая позиция текста: ", setObjectPosition(textSlide.content[0], { x: 200, y: 200}));

console.log("Новый размер текста: ", setObjectSize(textSlide.content[0], { width: 1, height: 1}));

console.log("Новый размер шрифта: ", setFontSize(textSlide.content[0], 36));

console.log("Новый шрифт: ", setFontFamily(textSlide.content[0], "Times New Roman"));

console.log("Новый стиль шрифта: ", setFontStyle(textSlide.content[0], []));

console.log("Слайд с удаленным текстом: (без выделения)", deleteSlideObjects(textSlide, selectedObjects));

console.log("Презентация с удаленным слайдом : (без выделения)", deleteSlides(oneSlidePresentation, selectedSlides));