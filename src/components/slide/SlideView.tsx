import {Color, Gradient, Image, SlideObject} from "../../store/objects.ts";
import styles from "./SlideView.module.css";
import {CSSProperties} from "react";
import {TextObjectView} from "../textObject/TextObjectView.tsx";
import {ImageObjectView} from "../imageObject/ImageObjectView.tsx";
import {FigureObjectView} from "../figureObject/FigureObjectView.tsx";
import {EllipseObject} from "../ellipseObject/EllipseObject.tsx";
import {TriangleObjectView} from "../triangleObject/TriangleObject.tsx";


type SlideProps = {
    scale: number,
    background: Color|Gradient|Image,
    content: Array<SlideObject>,
    extraStyles?: CSSProperties,
};


export default function SlideView({scale, background, content, extraStyles}: SlideProps)
{
    const SLIDE_WIDTH: number = 1920;
    const SLIDE_HEIGHT: number = 1080;

    const slideStyle: CSSProperties = {
        ...extraStyles,
        width: SLIDE_WIDTH * scale + "px",
        height: SLIDE_HEIGHT * scale + "px",
    };
    switch (background.type)
    {
        case "color":
            slideStyle.backgroundColor = background.value;
            break;
        case "image":
            slideStyle.backgroundImage = "url(" + background.src + ")";
            break;
        case "gradient":
            slideStyle.background = "linear-gradient(" + background.angle + "deg, " + background.colors
                                                                                        .map(color => color.value)
                                                                                        .join(", ") + ")";
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
                    <FigureObjectView
                        pos={object.pos}
                        size={object.size}
                        scale={scale}
                        fill={object.fillStyle}
                        strokeColor={object.strokeStyle}
                        strokeWidth={object.strokeWidth}
                        key={object.id}
                    >
                    </FigureObjectView>
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