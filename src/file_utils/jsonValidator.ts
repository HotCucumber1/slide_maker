import Ajv from "ajv";
import {Editor} from "../store/editor.ts";
import {Presentation, Slide} from "../store/objects.ts";


const OBJECT_TYPE: string = "object";
const STRING_TYPE: string = "string";
const ARRAY_TYPE: string = "array";


const editorSchema: object = {
    type: OBJECT_TYPE,
    properties: {
        presentation: { type: OBJECT_TYPE },
        currentSlideId: { type: STRING_TYPE },
        selectedSlides: { type: ARRAY_TYPE }, // TODO убрать
        selectedObjects: { type: ARRAY_TYPE },
    },
    required: [
        "presentation",
        "currentSlideId",
        "selectedSlides",
        "selectedObjects"
    ],
};

const presentationSchema: object = {
    type: OBJECT_TYPE,
    properties: {
        title: { type: STRING_TYPE },
        slides: { type: ARRAY_TYPE },
    },
    required: [
        "title",
        "slides",
    ],
};

const slideSchema: object = {
    type: OBJECT_TYPE,
    properties: {
        id: { type: STRING_TYPE },
        background: { type: OBJECT_TYPE },
        content: { type: ARRAY_TYPE },
    },
    required: [
        "id",
        "background",
        "content",
    ],
};

const ajv = new Ajv();

const editorSerialize = ajv.compile(editorSchema);
const presentationSerialize = ajv.compile(presentationSchema);
const slideSerialize = ajv.compile(slideSchema);


function checkSlidesValid(slides: Slide[]): boolean
{
    slides.forEach((slide: Slide) => {
        if (!slideSerialize(slide))
        {
            return false;
        }
    });
    return true;
}


function isValidPresentationJson(jsonEditor: string): boolean
{
    const editor: Editor = JSON.parse(jsonEditor);
    const isEditorValid: boolean = editorSerialize(editor);

    const presentation: Presentation = editor.presentation;
    const isPresentationValid: boolean = presentationSerialize(presentation);

    const slides: Slide[] = presentation.slides;
    const areSlidesValid = checkSlidesValid(slides);

    return isEditorValid &&
           isPresentationValid &&
           areSlidesValid;
}

export {
    isValidPresentationJson,
}