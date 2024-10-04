import {SlideObject} from "../../../store/objects.ts";
import {CSSProperties} from "react";


type SlideObjectProps = {
    object: SlideObject,
    slideWidth: number,
    slideHeight: number,
};


export default function SlideObjectView(props: SlideObjectProps)
{
    const objectStyle: CSSProperties = {
        position: "absolute",
        top: props.object.pos.y / props.slideHeight * 100 + '%',
        left: props.object.pos.x / props.slideWidth * 100 + "%",
        width: props.object.size.width / props.slideWidth * 100 + "%",
        height: props.object.size.height / props.slideHeight * 100 + "%",
    };
    switch (props.object.type)
    {
        case "text":
            objectStyle["fontSize"] = props.object.fontSize + "px";
            objectStyle["fontFamily"] = props.object.fontFamily;
            objectStyle["color"] = props.object.color.value;
            if (props.object.fontStyles.indexOf("underline"))
            {
                objectStyle["textDecoration"] = "underline";
            }
            if (props.object.fontStyles.indexOf("italic"))
            {
                objectStyle["fontStyle"] = "underline";
            }
            if (props.object.fontStyles.indexOf("bold"))
            {
                objectStyle["fontWeight"] = "bold";
            }
            return (
                <input
                    style={objectStyle}
                    defaultValue={props.object.text}
                />
            )
        case "image":
            return (
                <img
                    style={objectStyle}
                    src={props.object.src}
                    alt={props.object.src.split("/").pop()}
                />
            )
        case "figure":
            objectStyle["border"] = props.object.strokeWidth + "px solid " + props.object.strokeStyle.value;
            switch (props.object.fillStyle.type)
            {
                case "color":
                    objectStyle["backgroundColor"] = props.object.fillStyle.value;
                    break;
                case "gradient":
                    objectStyle["background"] =
                        "linear-gradient(" + props.object.fillStyle.angle + "deg, " + props.object.fillStyle.colors.join(", ") + ")";
                    // TODO: протестировать
                    break;
            }
            return (
                <div style={objectStyle}></div>
            )
    }
}