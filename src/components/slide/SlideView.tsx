import {Color, Gradient, Image, SlideObject} from "../../store/objects.ts";
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
            // TODO: дописать
            break;
    }

    // const slideObjects = props.content.map(object => {
    //     const objectsStyle = {
    //         top: object.pos.y,
    //         left: object.pos.x,
    //         width: object.size.width,
    //         height: object.size.height,
    //     }
    //     switch (object.type)
    //     {
    //         case "text":
    //             <input style={objectsStyle} className={styles.inputField} value={object.text}/>
    //     }
    // });


    return (
        <div
            style={slideStyle}
            className={joinStyles([
                props.type === "listElement" ? styles.inListSlide : styles.activeSlide,
                styles.slide
            ])}
        >
        </div>
    )
}