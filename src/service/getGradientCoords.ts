type GradientCoords = {
    x1: number,
    y1: number,
    x2: number,
    y2: number,
}


function getGradientCoords(angle: number): GradientCoords
{
    const radiansAngle = angle * Math.PI / 180;
    return {
        x1: 0.5 - 0.5 * Math.cos(radiansAngle),
        y1: 0.5 - 0.5 * Math.sin(radiansAngle),
        x2: 0.5 + 0.5 * Math.cos(radiansAngle),
        y2: 0.5 + 0.5 * Math.sin(radiansAngle),
    }
}

export {
    GradientCoords,
    getGradientCoords,
}