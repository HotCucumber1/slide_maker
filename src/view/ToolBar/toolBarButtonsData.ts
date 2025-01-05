import {Icon, Text} from "../../components/MenuButton/MenuButton.tsx";
import undoButtonIcon from "../../assets/icons/undo.png";
import redoButtonIcon from "../../assets/icons/redo.png";
import setFontSizeButtonIcon from "../../assets/icons/font_size_icon.png";
import uploadButtonIcon from "../../assets/icons/upload_button_icon.png";
import addTextButtonIcon from "../../assets/icons/add_text_button_icon.png";
import downloadButtonIcon from "../../assets/icons/download_button_icon.png";
import addImageButtonIcon from "../../assets/icons/add_image_button_icon.png";
import addLabelButtonIcon from "../../assets/icons/add_label_button_icon.png";
import addSlideButtonIcon from "../../assets/icons/add_slide_button_icon.png";
import setColorButtonIcon from "../../assets/icons/set_color_button_icon.png";
import addCircleButtonIcon from "../../assets/icons/add_circle_button_icon.png";
import addFigureButtonIcon from "../../assets/icons/add_figure_button_icon.png";
import addTriangleButtonIcon from "../../assets/icons/add_triangle_button_icon.png";
import deleteSlideButtonIcon from "../../assets/icons/delete_slide_button_icon.png";
import setBackgroundImageButtonIcon from "../../assets/icons/set_background_image_button_icon.png";


const downloadButtonContent: Icon = {
    type: "icon",
    src: downloadButtonIcon,
}

const uploadButtonContent: Icon = {
    type: "icon",
    src: uploadButtonIcon,
}

const addSlideButtonContent: Icon = {
    type: "icon",
    src: addSlideButtonIcon,
}

const deleteSlideButtonContent: Icon = {
    type: "icon",
    src: deleteSlideButtonIcon,
}

const addTextButtonContent: Icon = {
    type: "icon",
    src: addTextButtonIcon,
}

const setColorButtonContent: Icon = {
    type: "icon",
    src: setColorButtonIcon,
}

const addImageButtonContent: Icon = {
    type: "icon",
    src: addImageButtonIcon,
}

const addLabelButtonContent: Icon = {
    type: "icon",
    src: addLabelButtonIcon,
}

const addTriangleButtonContent: Icon = {
    type: "icon",
    src: addTriangleButtonIcon,
}

const addCircleButtonContent: Icon = {
    type: "icon",
    src: addCircleButtonIcon,
}

const setBackgroundImageButtonContent: Icon = {
    type: "icon",
    src: setBackgroundImageButtonIcon,
}

const addFigureButtonContent: Icon = {
    type: "icon",
    src: addFigureButtonIcon,
}

const undoActionButtonContent: Icon = {
    type: "icon",
    src: undoButtonIcon,
}

const redoActionButtonContent: Icon = {
    type: "icon",
    src: redoButtonIcon,
}

const fontSizeButtonContent: Icon = {
    type: "icon",
    src: setFontSizeButtonIcon
}

const findImageButtonContent: Text = {
    type: "text",
    value: "Найти"
}



export {
    uploadButtonContent,
    downloadButtonContent,
    addFigureButtonContent,
    addCircleButtonContent,
    addImageButtonContent,
    addLabelButtonContent,
    addSlideButtonContent,
    addTextButtonContent,
    addTriangleButtonContent,
    setBackgroundImageButtonContent,
    setColorButtonContent,
    deleteSlideButtonContent,
    undoActionButtonContent,
    redoActionButtonContent,
    fontSizeButtonContent,
    findImageButtonContent
}