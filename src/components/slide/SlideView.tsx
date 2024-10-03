import {Color, Gradient, Image, SlideObject} from "../../store/objects.ts";
import SlideObjectView from "./slideObject/SlideObjectView.tsx";
import styles from "./SlideView.module.css";
import joinStyles from "../../service/joinStyles.ts";


type SlideProps = {
    type: "listElement"|"active",
    background: Color|Gradient|Image,
    content: Array<SlideObject>,
};


export default function SlideView(props: SlideProps)
{
    const slideStyle = {};
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