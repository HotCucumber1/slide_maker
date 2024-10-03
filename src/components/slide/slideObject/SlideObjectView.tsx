import {SlideObject} from "../../../store/objects.ts";


type SlideObjectProps = {
    object: SlideObject,
};


export default function SlideObjectView(props: SlideObjectProps)
{
    const objectStyle = {
        position: "absolute",
        top: props.object.pos.y + "px",
        left: props.object.pos.x + "px",
        width: props.object.size.width + "px",
        height: props.object.size.height + "px",
    };
    switch (props.object.type)
    {
        case "text":
            objectStyle["fontSize"] = props.object.fontSize + "px";
            objectStyle["fontFamily"] = props.object.fontFamily;
            objectStyle["color"] = props.object.color;
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
            console.log(props.object.src.split("/"))
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