import {CSSProperties} from "react";
import {Color, Gradient, Point, Size} from "../../../store/objects.ts";

type FigureObjectProps = {
    pos: Point,
    size: Size,
    scale: number,
    fill: Color|Gradient,
    strokeColor: Color,
    strokeWidth: number,
};


function FigureObjectView(props: FigureObjectProps)
{
    let colorsLength: number = 1;
    const objectStyle: CSSProperties = {
        position: "absolute",
        top: props.pos.y * props.scale,
        left: props.pos.x * props.scale,
        width: props.size.width * props.scale,
        height: props.size.height * props.scale,
    };
    if (props.fill.type === "gradient")
    {
        colorsLength = props.fill.colors.length;
    }

    return (
        <svg style={objectStyle}>
            {props.fill.type === "gradient" && (
                <defs>
                    <linearGradient
                        id="grad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                    >
                        {props.fill.colors.map((color, index) => {
                            return (
                                <stop
                                    key={index}
                                    offset={index / (colorsLength - 1) * 100 + "%"}
                                    style={{
                                        stopColor: color.value
                                    }}
                                />
                            );
                        })}
                    </linearGradient>
                </defs>
            )}
            <rect
                x="0"
                y="0"
                width={props.size.width * props.scale}
                height={props.size.height * props.scale}
                fill={props.fill.type === "color" ? props.fill.value : "url(#grad)"}
                stroke={props.strokeColor.value}
                strokeWidth={props.strokeWidth * props.scale}>
            </rect>
        </svg>
    )
}


export {
    FigureObjectView
}