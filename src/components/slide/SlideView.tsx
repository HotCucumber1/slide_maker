import {Color, Gradient, Image, SelectedObjects, SlideObject} from "../../store/objects.ts";
import {TextObjectView} from "../textObject/TextObjectView.tsx";
import {ImageObjectView} from "../imageObject/ImageObjectView.tsx";
import {LabelObjectView} from "../labelObject/LabelObjectView.tsx";
import {EllipseObject} from "../ellipseObject/EllipseObject.tsx";
import {TriangleObjectView} from "../triangleObject/TriangleObject.tsx";
import styles from "./SlideView.module.css";
import {CSSProperties} from "react";
import * as React from "react";
import {dispatch} from "../../store/editor.ts";
import {setObjectSelection} from "../../store/setObjectSelection.ts";
import {ObjectWrapper} from "../objectWrapper/ObjectWrapper.tsx";


const SLIDE_WIDTH: number = 1920;
const SLIDE_HEIGHT: number = 1080;
const SELECTED_SLIDE_BORDER_STYLE = "2px solid #2F7DF7";


type SlideProps = {
    scale: number,
    background: Color|Gradient|Image,
    content: Array<SlideObject>,
    isActive?: boolean,
    isSelected?: boolean,
    extraStyles?: CSSProperties,
    objectSelection: SelectedObjects,
};


export default function SlideView({scale, background, content, extraStyles, isSelected, objectSelection}: SlideProps)
{
    const onObjectClick: React.MouseEventHandler = event => {
        event.stopPropagation()
        dispatch(setObjectSelection, [(event.target as HTMLDivElement).id])
    }

    const onSlideClick: React.MouseEventHandler = () => {
        dispatch(setObjectSelection, [])
    }

    const slideStyle: CSSProperties = {
        ...extraStyles,
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,
    };
    if (isSelected)
    {
        slideStyle.border = SELECTED_SLIDE_BORDER_STYLE;
    }

    switch (background.type)
    {
        case "color":
            slideStyle.backgroundColor = background.value;
            break;
        case "image":
            slideStyle.backgroundImage = `url(${background.src})`;
            break;
        case "gradient":
            slideStyle.background = `linear-gradient(${background.angle}deg, 
                                                     ${background.colors
                                                                      .map(color => color.value)
                                                                      .join(", ")})`
            break;
    }

    return (
        <div
            style={slideStyle}
            className={styles.slide}
            onClick={onSlideClick}
        >
            {content.map(object => {
                switch (object.type)
                {
                    case "text":
                        return (
                            <ObjectWrapper
                                objectId={object.id}
                                pos={object.pos}
                                size={object.size}
                                scale={scale}
                                key={object.id}
                                onClick={onObjectClick}
                                isSelected={objectSelection.includes(object.id)}
                                isAdaptive={true}
                            >
                                <TextObjectView
                                    objectId={object.id}
                                    text={object.text}
                                    fontSize={object.fontSize}
                                    fontFamily={object.fontFamily}
                                    fontStyles={object.fontStyles}
                                    color={object.color}
                                    scale={scale}
                                >
                                </TextObjectView>
                            </ObjectWrapper>
                        );
                    case "image":
                        return (
                            <ObjectWrapper
                                objectId={object.id}
                                pos={object.pos}
                                size={object.size}
                                scale={scale}
                                key={object.id}
                                onClick={onObjectClick}
                                isSelected={objectSelection.includes(object.id)}
                            >
                                <ImageObjectView
                                    id={object.id}
                                    src={object.src}
                                >
                                </ImageObjectView>
                            </ObjectWrapper>
                        );
                    case "label":
                        return (
                            <ObjectWrapper
                                objectId={object.id}
                                pos={object.pos}
                                size={object.size}
                                scale={scale}
                                key={object.id}
                                onClick={onObjectClick}
                                isSelected={objectSelection.includes(object.id)}
                            >
                                <LabelObjectView
                                    scale={scale}
                                    fill={object.fillStyle}
                                    strokeColor={object.strokeStyle}
                                    strokeWidth={object.strokeWidth}
                                >
                                </LabelObjectView>
                            </ObjectWrapper>
                        );
                    case "ellipse":
                        return (
                            <ObjectWrapper
                                objectId={object.id}
                                pos={object.pos}
                                size={object.size}
                                scale={scale}
                                key={object.id}
                                onClick={onObjectClick}
                                isSelected={objectSelection.includes(object.id)}
                            >
                                <EllipseObject
                                    id={object.id}
                                    pos={object.pos}
                                    size={object.size}
                                    scale={scale}
                                    fill={object.fillStyle}
                                    strokeColor={object.strokeStyle}
                                    strokeWidth={object.strokeWidth}
                                >
                                </EllipseObject>
                            </ObjectWrapper>
                        );
                    case "triangle":
                        return (
                            <ObjectWrapper
                                objectId={object.id}
                                pos={object.pos}
                                size={object.size}
                                scale={scale}
                                key={object.id}
                                onClick={onObjectClick}
                                isSelected={objectSelection.includes(object.id)}
                            >
                                <TriangleObjectView
                                    pos={object.pos}
                                    size={object.size}
                                    scale={scale}
                                    fill={object.fillStyle}
                                    strokeColor={object.strokeStyle}
                                    strokeWidth={object.strokeWidth}
                                >
                                </TriangleObjectView>
                            </ObjectWrapper>
                        );
                    case "path":
                        break;
                }}
            )}
        </div>
    )
}