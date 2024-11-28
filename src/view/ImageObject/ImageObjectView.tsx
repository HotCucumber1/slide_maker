import styles from "../Object.module.css";

type ImageObjectProps = {
    src: string,
};


const ImageObjectView = ({
    src
}: ImageObjectProps) => {
    return (
        <img
            className={styles.object}
            src={src}
            alt={src.split("/").pop()}
        />
    )
}


export {
    ImageObjectView,
}