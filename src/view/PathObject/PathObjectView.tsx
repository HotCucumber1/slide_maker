import {Color, Gradient, Point, Size} from "../../store/objects.ts";
import {getGradientCoords, GradientCoords} from "../../service/getGradientCoords.ts";
import {getSlideObjectStyles} from "../../service/getSlideObjectStyles.ts";
import {v4 as uuidv4} from "uuid";

type PathObjectProps = {
    pos: Point,
    size: Size,
    scale: number,
    fill: Color|Gradient,
    strokeColor: Color,
    strokeWidth: number,
};


function PathObjectView(props: PathObjectProps)
{
    let colorsLength: number = 1;

    let gradientCoords: GradientCoords;
    if (props.fill.type === "gradient")
    {
        colorsLength = props.fill.colors.length;
        gradientCoords = getGradientCoords(props.fill.angle);
    }
    const gradId = uuidv4();

/*
    Команды d:
    Z — замыкает контур, возвращаясь к начальной точке (50, 50).
    M (Move To) — перемещение пера без рисования.
    L (Line To) — рисование линии.
    H (Horizontal Line To) — рисование горизонтальной линии.
    V (Vertical Line To) — рисование вертикальной линии.
    C (Cubic Bezier Curve) — рисование кубической кривой Безье.
    S (Smooth Cubic Bezier Curve) — плавная кубическая кривая.
    Q (Quadratic Bezier Curve) — квадратичная кривая Безье.
    A (Arc) — дуга окружности.
    Z — закрыть контур, возвращая перо в начальную точку.
*/

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
            <path
                d={}
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
    PathObjectView
}