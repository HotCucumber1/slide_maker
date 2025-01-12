import * as ButtonData from "./toolBarButtonsData.ts"
import {MenuButton} from "../../components/MenuButton/MenuButton.tsx"
import
    React, {
    useRef,
    useState,
} from "react"
import {Photo} from "../../api/apiData.ts"
import styles from "./ToolBar.module.css"
import {useAppActions} from "../../hooks/useAppActions.ts"
import {closeButtonContet} from "./toolBarButtonsData.ts"
import {fetchPhotos} from "../../middleware/fetchPhotos.ts"
import {useAppSelector} from "../../hooks/useAppSelector.ts"


type GalleryProps = {
    loader: boolean,
    keyWord: string,
    setGallery: (value: boolean) => void
}

const Gallery = ({loader, keyWord, setGallery}: GalleryProps) => {
    const { addImage } = useAppActions()
    const galleryRef = useRef(null)

    const editor = useAppSelector((editor => editor))
    const photos = editor.images

    const onClick = (photo: Photo) => {
        addImage({
            height: photo.height * 0.2,
            width: photo.width * 0.2,
            src: photo.urls.regular,
        })
        setGallery(false)
    }

    return (
        <div
            className={styles.gallery}
            ref={galleryRef}
        >
            <div className={styles.galleryHead}>
                <span>Картинки по запросу "
                    <span className={styles.galleryKeyWord}>{keyWord}</span>"
                </span>
                <MenuButton
                    content={closeButtonContet}
                    onClick={() => setGallery(false)}
                    className={styles.galleryCloseButton}
                >
                </MenuButton>
            </div>

            <div className={styles.galleryImageBlock}>
                {loader
                    ? <div className={styles.spinner}/>
                    : photos.length > 0
                        ? photos.map((photo) => (
                            <img
                                key={photo.id}
                                src={photo.urls.thumb}
                                alt={photo.description || "Photo"}
                                className={styles.galleryImage}
                                onClick={() => onClick(photo)}
                            />)
                        )
                        : <span className={styles.imagesNotFound}>
                            По запросу "{keyWord}" ничего не найдено
                        </span>
                }
            </div>
        </div>
    )
}


function ImagesField() {
    const imgNameRef = useRef(null)
    const [gallery, setGallery] = useState(false)
    const [loader, setLoader] = useState(false)
    const { fetchImageSuccess } = useAppActions()

    async function onMouseClick() {
        await fetchPhotos(imgNameRef.current.value, fetchImageSuccess)
        setGallery(true)
    }

    return (
        <div className={styles.imageBlock}>
            <div className={styles.imageField}>
                <input
                    ref={imgNameRef}
                    className={styles.inputField}
                />
                <MenuButton
                    onClick={onMouseClick}
                    content={ButtonData.findImageButtonContent}
                    styles={{
                        color: "#505050",
                        paddingInline: "10px"
                    }}
                >Найти</MenuButton>
            </div>
            {gallery &&
                <Gallery
                    loader={loader}
                    keyWord={imgNameRef.current.value}
                    setGallery={setGallery}
                >
                </Gallery>
            }
        </div>
    )
}

function ImageTools() {
    const [showImportImage, setShowImportImage] = useState(false)

    return (
        <>
            <MenuButton
                content={ButtonData.addImageButtonContent}
                onClick={() => setShowImportImage(!showImportImage)}
                styles={{
                    marginTop: "2px",
                    height: "50%",
                }}
            />
            {showImportImage && <ImagesField/> }
        </>
    )
}

export {
    ImageTools,
}