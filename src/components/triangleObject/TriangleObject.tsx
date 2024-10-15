import {CSSProperties} from "react";
import {Color, Gradient, Point, Size} from "../../store/objects.ts";
import {v4 as uuidv4} from "uuid";

type TriangleObjectProps = {
    pos: Point,
    size: Size,
    scale: number,
    fill: Color|Gradient,
    strokeColor: Color,
    strokeWidth: number,
};


function TriangleObjectView(props: TriangleObjectProps)
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
    const gradId = uuidv4();

    return (
        <svg
            style={objectStyle}
            xmlns="http://www.w3.org/2000/svg"
        >
            {props.fill.type === "gradient" && (
                <defs>
                    <linearGradient
                        id={gradId}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                        direction={props.fill.angle}
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
            <polygon
                points={`${props.size.width * props.scale / 2},0 0,${props.size.height * props.scale} ${props.size.width * props.scale},${props.size.height * props.scale}`}
                fill={props.fill.type === "color" ?
                    props.fill.value :
                    `url(#${gradId})`
                }
                stroke={props.strokeColor.value}
                strokeWidth={props.strokeWidth * props.scale}
            />
        </svg>
    )
}


export {
    TriangleObjectView
}