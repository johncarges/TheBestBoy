// RETURN a color based on id. Fixed saturation/luminance, hue varies with id

export default function ColorHash(id) {

    const offset = 129
    return `rgb(${id%offset}, 50,70)`

}