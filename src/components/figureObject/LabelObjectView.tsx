import {Color, Gradient, Point, Size} from "../../store/objects.ts";
import {getGradientCoords, GradientCoords} from "../../service/getGradientCoords.ts";
import {getSlideObjectStyles} from "../../service/getSlideObjectStyles.ts";
import {v4 as uuidv4} from "uuid";

type FigureObjectProps = {
    pos: Point,
    size: Size,
    scale: number,
    fill: Color|Gradient,
    strokeColor: Color,
    strokeWidth: number,
};


function LabelObjectView(props: FigureObjectProps)
{
    let colorsLength: number = 1;

    let gradientCoords: GradientCoords;
    if (props.fill.type === "gradient")
    {
        colorsLength = props.fill.colors.length;
        gradientCoords = getGradientCoords(props.fill.angle);
    }
    const gradId = uuidv4();

    return (
        <svg
            style={getSlideObjectStyles(props.pos, props.size, props.scale)}
            xmlns="http://www.w3.org/2000/svg"
        >
            {props.fill.type === "gradient" && (
                <defs>
                    <linearGradient
                        id={gradId}
                        x1={gradientCoords.x1}
                        y1={gradientCoords.y1}
                        x2={gradientCoords.x2}
                        y2={gradientCoords.y2}
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
            <rect
                x="0"
                y="0"
                width={props.size.width * props.scale}
                height={props.size.height * props.scale}
                fill={props.fill.type === "color" ?
                    props.fill.value :
                    `url(#${gradId})`
                }
                stroke={props.strokeColor.value}
                strokeWidth={props.strokeWidth * props.scale}>
            </rect>
        </svg>
    )
}


export {
    LabelObjectView
}