import {Color, Gradient, Image, SlideObject} from "../../store/objects.ts";
import {TextObjectView} from "../textObject/TextObjectView.tsx";
import {ImageObjectView} from "../imageObject/ImageObjectView.tsx";
import {LabelObjectView} from "../figureObject/LabelObjectView.tsx";
import {EllipseObject} from "../ellipseObject/EllipseObject.tsx";
import {TriangleObjectView} from "../triangleObject/TriangleObject.tsx";
import styles from "./SlideView.module.css";
import {CSSProperties} from "react";


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
};


export default function SlideView({scale, background, content, extraStyles, isSelected}: SlideProps)
{
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

    const slideObjects = content.map(object => {
        switch (object.type)
        {
            case "text":
                return (
                    <TextObjectView
                        pos={object.pos}
                        size={object.size}
                        scale={scale}
                        text={object.text}
                        fontSize={object.fontSize}
                        fontFamily={object.fontFamily}
                        fontStyles={object.fontStyles}
                        color={object.color}
                        key={object.id}
                    >
                    </TextObjectView>
                );
            case "image":
                return (
                    <ImageObjectView
                        pos={object.pos}
                        size={object.size}
                        scale={scale}
                        src={object.src}
                        key={object.id}
                    >
                    </ImageObjectView>
                );
            case "label":
                return (
                    <LabelObjectView
                        pos={object.pos}
                        size={object.size}
                        scale={scale}
                        fill={object.fillStyle}
                        strokeColor={object.strokeStyle}
                        strokeWidth={object.strokeWidth}
                        key={object.id}
                    >
                    </LabelObjectView>
                );
            case "ellipse":
                return (
                    <EllipseObject
                        pos={object.pos}
                        size={object.size}
                        scale={scale}
                        fill={object.fillStyle}
                        strokeColor={object.strokeStyle}
                        strokeWidth={object.strokeWidth}
                        key={object.id}
                    >
                    </EllipseObject>
                );
            case "triangle":
                return (
                    <TriangleObjectView
                        pos={object.pos}
                        size={object.size}
                        scale={scale}
                        fill={object.fillStyle}
                        strokeColor={object.strokeStyle}
                        strokeWidth={object.strokeWidth}
                        key={object.id}
                    >
                    </TriangleObjectView>
                );
            case "path":
                break;
        }
    });

    return (
        <div
            style={slideStyle}
            className={styles.slide}
        >
            {slideObjects}
        </div>
    )
}