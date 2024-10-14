import {Color, Gradient, Point, Size} from "../../store/objects.ts";
import {CSSProperties} from "react";

type EllipseObjectProps = {
    pos: Point,
    size: Size,
    scale: number,
    fill: Color|Gradient,
    strokeColor: Color,
    strokeWidth: number,
}


function EllipseObject(props: EllipseObjectProps)
{
    let colorsLength: number = 1;
    const objectStyle: CSSProperties = {
        position: "absolute",
        top: props.pos.y * props.scale,
        left: props.pos.x * props.scale,
        width: props.size.width * props.scale,
        height: props.size.height * props.scale,
    };
    const rx: number = props.size.width / 2;
    const ry: number = props.size.height / 2;
    if (props.fill.type === "gradient")
    {
        colorsLength = props.fill.colors.length;
    }

    return (
        <svg
            style={objectStyle}
            xmlns="http://www.w3.org/2000/svg"
        >
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
            <ellipse
                cx={rx * props.scale}
                cy={ry * props.scale}
                rx={rx * props.scale - props.strokeWidth}
                ry={ry * props.scale - props.strokeWidth}
                fill={props.fill.type === "color" ?
                        props.fill.value :
                        "url(#grad)"
                }
                stroke={props.strokeColor.value}
                strokeWidth={props.strokeWidth * props.scale}
            />
        </svg>
    )
}

export {
    EllipseObject
}