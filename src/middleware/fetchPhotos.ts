import {AddImageProps} from "../store/actions/addImage.ts"
import {ActionType} from "../store/redux/actions.ts"

const addBase64Image = (props: AddImageProps) => {
    return async (dispatch) => {
        const base64Image = await loadImageToBase64(props)
        const imageWithBase64: AddImageProps = { ...props, src: base64Image as string}

        dispatch({
            type: ActionType.ADD_IMAGE,
            payload: imageWithBase64
        })
    }
}

function loadImageToBase64(imageProps: AddImageProps) {
    return new Promise((resolve, reject) => {
        const image = new Image()
        image.crossOrigin = 'Anonymous'
        image.src = imageProps.src

        image.onload = () => {
            const canvas = document.createElement('canvas')
            const canvasContext = canvas.getContext('2d')

            canvas.width = imageProps.width
            canvas.height = imageProps.height
            canvasContext.drawImage(image, 0, 0);

            const base64Image = canvas.toDataURL('image/png')
            resolve(base64Image)
        }

        image.onerror = (error) => {
            reject(error)
        }
    })
}

export {
    addBase64Image,
}