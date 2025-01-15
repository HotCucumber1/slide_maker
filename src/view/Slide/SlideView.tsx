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
import {SLIDE_HEIGHT, SLIDE_WIDTH} from "../../store/default_data/defaultSlide.ts"


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
        case "gradient": {
                const colors = background.colors.map(color => color.value)
                if (colors.length > 1) {
                    slideStyle.background = `linear-gradient(${background.angle}deg, ${colors.join(", ")})`
                    break
                }
                slideStyle.backgroundColor = background.colors[0].value
                break
            }
        default:
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