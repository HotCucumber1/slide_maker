import {Color, Gradient, Image, SlideObject} from "../../store/objects.ts";
import SlideObjectView from "./slideObject/SlideObjectView.tsx";
import styles from "./SlideView.module.css";
import joinStyles from "../../service/joinStyles.ts";
import {CSSProperties} from "react";


type SlideProps = {
    type: "listElement"|"active",
    background: Color|Gradient|Image,
    content: Array<SlideObject>,
};


export default function SlideView(props: SlideProps)
{
    const slideWidth= 1200;
    const slideHeight= 675;

    const slideStyle: CSSProperties = {
        "width": props.type === "active" ? slideWidth + "px" : "",
        "height": props.type === "active" ? slideHeight + "px" : ""
    };
    switch (props.background.type)
    {
        case "color":
            slideStyle["backgroundColor"] = props.background.value;
            break;
        case "image":
            slideStyle["backgroundImage"] = "url(" + props.background.src + ")";
            break;
        case "gradient":
            slideStyle["background"] =
                "linear-gradient(" + props.background.angle + "deg, " + props.background.colors.join(", ") + ")";
            // TODO: протестировать
            break;
    }

    const slideObjects = props.content.map(object => {
        return (
            <SlideObjectView
                slideSize={{
                    width: slideWidth,
                    height: slideHeight
                }}
                object={object}
                key={object.id}
            >
            </SlideObjectView>
        )
    });


    return (
        <div
            style={slideStyle}
            className={joinStyles([
                props.type === "listElement" ? styles.inListSlide : styles.activeSlide,
                styles.slide
            ])}
        >
            {slideObjects}
        </div>
    )
}