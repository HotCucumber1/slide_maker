import {Color, Gradient, Image, SlideObject} from "../../store/objects.ts";
import SlideObjectView from "../slideObject/SlideObjectView.tsx";
import styles from "./SlideView.module.css";
import {CSSProperties} from "react";


type SlideProps = {
    scale: number,
    background: Color|Gradient|Image,
    content: Array<SlideObject>,
    style?: CSSProperties,
};


export default function SlideView({scale, background, content, style}: SlideProps)
{
    const SLIDE_WIDTH= 1200;
    const SLIDE_HEIGHT= 675;

    const slideStyle: CSSProperties = {
        ...style,
        width: SLIDE_WIDTH * scale + "px",
        height: SLIDE_HEIGHT * scale + "px",
    };
    switch (background.type)
    {
        case "color":
            slideStyle["backgroundColor"] = background.value;
            break;
        case "image":
            slideStyle["backgroundImage"] = "url(" + background.src + ")";
            break;
        case "gradient":
            slideStyle["background"] =
                "linear-gradient(" + background.angle + "deg, " + background.colors
                                                                               .map(color => color.value)
                                                                               .join(", ") + ")";
            break;
    }

    const slideObjects = content.map(object => {
        return (
            // TODO: с помощью switch case определять тип объекта и вынести их в отдельные компоненты
            <SlideObjectView
                scale={scale}
                object={object}
                key={object.id}
            >
            </SlideObjectView>
        )
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