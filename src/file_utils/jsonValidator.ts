import Ajv from "ajv"
import {Editor} from "../store/editor.ts"

const OBJECT_TYPE: string = "object"
const STRING_TYPE: string = "string"
const ARRAY_TYPE: string = "array"
const NUMBER_TYPE: string = "number";

const backgroundSchema = {
    type: OBJECT_TYPE,
    properties: {
        value: { type: STRING_TYPE },
        type: { type: STRING_TYPE },
        src: { type: STRING_TYPE },
        colors: {
            type: ARRAY_TYPE,
            items: {
                type: OBJECT_TYPE,
                properties: {
                    value: { type: STRING_TYPE },
                    type: { type: STRING_TYPE },
                }
            }
        },
        angle: { type: NUMBER_TYPE }
    },
    required: [
        "type",
    ],
    oneOf: [
        {
            required: [
                "value"
            ]
        },
        {
            required: [
                "src"
            ]
        },
        {
            required: [
                "colors",
                "angle"
            ]
        },
    ],
}

const slideContentSchema = {
    type: OBJECT_TYPE,
    properties: {
        $id: { type: STRING_TYPE },
        pos: {
            type: OBJECT_TYPE,
            properties: {
                x: { type: NUMBER_TYPE },
                y: { type: NUMBER_TYPE }
            }
        },
        size: {
            type: OBJECT_TYPE,
            properties: {
                x: { type: NUMBER_TYPE },
                y: { type: NUMBER_TYPE }
            }}
        ,
    },
    required: [
        "type",
        "id",
        "size",
        "pos",
    ],
}

const slideSchema = {
    type: OBJECT_TYPE,
    properties: {
        $id: { type: STRING_TYPE },
        background: backgroundSchema,
        content: {
            type: ARRAY_TYPE,
            items: slideContentSchema,
        }
    }
}

const presentationSchema = {
    type: OBJECT_TYPE,
    properties: {
        title: { type: STRING_TYPE },
        slides: {
            type: ARRAY_TYPE,
            items: slideSchema,
        },
    },
    required: [
        "title",
        "slides",
    ],
}

const editorSchema = {
    type: OBJECT_TYPE,
    properties: {
        presentation: presentationSchema,
        selectedSlides: {
            type: ARRAY_TYPE,
            items: {
                type: STRING_TYPE,
            }
        },
        selectedObjects: {
            type: ARRAY_TYPE,
            items: {
                type: STRING_TYPE,
            }
        }
    },
    required: [
        "presentation",
        "selectedSlides",
        "selectedObjects",
    ],
}

const ajv = new Ajv()
const editorSerialize = ajv.compile(editorSchema)

function isValidPresentationJson(jsonEditor: string): boolean {
    const editor: Editor = JSON.parse(jsonEditor);
    return editorSerialize(editor);
}

export {
    isValidPresentationJson,
}