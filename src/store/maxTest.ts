import {Presentation, SelectedObjects, SelectedSlides} from "./objects";
import {
    addSlide,
    addImageToSlide,
    addTextToSlide,
    setPresentationTitle,
    setPresentationBackground,
    setSlideBackground,
    setSlidePosition,
    setText,
    setImagePosition,
    setTextPosition,
    setTextSize,
    setImageSize,
    setFontSize,
    setFontFamily,
    setFontStyle,
    deleteSlideObjects,
    deleteSlides
} from "./functions";


const selectedSlides: SelectedSlides = [];
const selectedObjects: SelectedObjects = [];

const presentation: Presentation = {
    title: "Laboratory work №2",
    slides: [],
};
console.log("Стартовая версия: ", presentation, "\n");

const oneSlidePresentation = addSlide(presentation);
const twoSlidesPres = addSlide(oneSlidePresentation);
console.log("Презентация с двумя слайдом: ", twoSlidesPres, "\n");


const imageSlide = addImageToSlide(
    twoSlidesPres.slides[0],
    { x: 100, y: 100},
    {width: 500, height: 500},
    "./static/img6.jpg",
);
const image2Slide = addImageToSlide(
    imageSlide,
    { x: 100, y: 100},
    {width: 500, height: 500},
    "./static/img6.jpg",
);
console.log("Слайд с 2-мя картинкой: ", image2Slide, "\n");


const textSlide = addTextToSlide(
    twoSlidesPres.slides[0],
    { x: 100, y: 100},
    12,
    "Arial",
    ["italic", "bold"],
    { width: 500, height: 500},
    {
        value: "white",
        type: "color",
    });
const text2Slide = addTextToSlide(
    textSlide,
    { x: 100, y: 100},
    12,
    "Arial",
    ["bold", "underline"],
    { width: 500, height: 500},
    {
        value: "white",
        type: "color",
    });
console.log("Слайд с 2-мя текстом: ", text2Slide, "\n");

console.log("Новый title: ", setPresentationTitle(twoSlidesPres, "New title"), "\n");

console.log("Новый background презентации: ", setPresentationBackground(twoSlidesPres, { value: "blue", type: "color"}), "\n");

console.log("Новый background одного слайда: ", setSlideBackground(twoSlidesPres.slides[0], { value: "blue", type: "color"}),"\n");

const twoSlidesPres2 = setSlidePosition(twoSlidesPres, twoSlidesPres.slides[0], 1);
console.log("Поменял местами: ", twoSlidesPres2, "\n");

console.log("Слайд с новым текстом: ", setText(text2Slide.content[0], "Hello text new"), "\n");

console.log("Новая позиция картинки: ", setImagePosition(image2Slide.content[0], { x: 200, y: 200}), "\n");

console.log("Новый размер картинки: ", setImageSize(image2Slide.content[0], { width: 1, height: 1}), "\n");

console.log("Новая позиция текста: ", setTextPosition(text2Slide.content[0], { x: 200, y: 200}), "\n");

console.log("Новый размер текста: ", setTextSize(text2Slide.content[0], { width: 1, height: 1}), "\n");

console.log('Новый размер шрифта: ', setFontSize(textSlide.content[0], 36), "\n");


console.log("Новый шрифт: ", setFontFamily(text2Slide.content[0], "Times New Roman"), "\n");

console.log("Новый стиль шрифта: ", setFontStyle(text2Slide.content[0], ["italic"]), "\n");

selectedObjects.push(text2Slide.content[0].id);
console.log("Слайд с удаленным текстом: ", deleteSlideObjects(text2Slide, selectedObjects), "\n");

selectedSlides.push(twoSlidesPres.slides[0].id);
console.log("Презентация с удаленным слайдом: ", deleteSlides(twoSlidesPres, selectedSlides), "\n");