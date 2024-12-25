import {
    Color,
    Gradient,
    Image,
    SlideObject,
} from "../../store/objects.ts"
import {TextObjectView} from "../TextObject/TextObjectView.tsx"
import {ImageObjectView} from "../ImageObject/ImageObjectView.tsx"
import {LabelObjectView} from "../LabelObject/LabelObjectView.tsx"
import {EllipseObject} from "../EllipseObject/EllipseObject.tsx"
import {TriangleObjectView} from "../TriangleObject/TriangleObject.tsx"
import styles from "./SlideView.module.css"
import {CSSProperties, useEffect} from "react"
import {ObjectWrapper} from "../ObjectWrapper/ObjectWrapper.tsx"
import {useAppSelector} from "../../hooks/useAppSelector.ts"
import {useAppActions} from "../../hooks/useAppActions.ts"


const SLIDE_WIDTH: number = 1920;
const SLIDE_HEIGHT: number = 1080;


type SlideProps = {
    scale: number,
    background: Color|Gradient|Image,
    content: Array<SlideObject>,
    extraStyles?: CSSProperties,
    onRenderComplete: () => void
};


const SlideView = ({
    scale,
    background,
    content,
    extraStyles,
    onRenderComplete
}: SlideProps) => {

    const objectSelection = useAppSelector(editor => editor.selectedObjects)
    const { setObjectSelection } = useAppActions()

    useEffect(() => {
        if (onRenderComplete) {
            onRenderComplete();
        }
    }, [onRenderComplete]);

    const slideStyle: CSSProperties = {
        ...extraStyles,
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,
    };

    switch (background.type)
    {
        case "color":
            slideStyle.backgroundColor = background.value
            break
        case "image":
            slideStyle.backgroundImage = `url(${background.src})`
            break
        case "gradient":
            slideStyle.background = `linear-gradient(${background.angle}deg, 
            ${background.colors
                .map(color => color.value)
                .join(", ")})`
            break
    }

    return (
        <div
            style={slideStyle}
            className={styles.slide}
            onClick={() => setObjectSelection([])}
        >
            {content.map(object => {
                return (
                    <ObjectWrapper
                        objectId={object.id}
                        pos={object.pos}
                        size={object.size}
                        scale={scale}
                        key={object.id}
                        isSelected={objectSelection.includes(object.id)}
                        isAdaptive={object.type === "text"}
                    >
                        {(() => {
                            switch (object.type)
                            {
                                case "text":
                                    return (
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
                                    )
                                case "image":
                                    return (
                                        <ImageObjectView
                                            id={object.id}
                                            src={object.src}
                                        >
                                        </ImageObjectView>
                                    )
                                case "label":
                                    return (
                                        <LabelObjectView
                                            scale={scale}
                                            fill={object.fillStyle}
                                            strokeColor={object.strokeStyle}
                                            strokeWidth={object.strokeWidth}
                                        >
                                        </LabelObjectView>
                                    )
                                case "ellipse":
                                    return (
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
                                    )
                                case "triangle":
                                    return (
                                        <TriangleObjectView
                                            pos={object.pos}
                                            size={object.size}
                                            scale={scale}
                                            fill={object.fillStyle}
                                            strokeColor={object.strokeStyle}
                                            strokeWidth={object.strokeWidth}
                                        >
                                        </TriangleObjectView>
                                    )
                                case "path":
                                    break;
                            }
                        })()}
                    </ObjectWrapper>
                )
            })}
        </div>
    )
}

export {
    SlideView,
}