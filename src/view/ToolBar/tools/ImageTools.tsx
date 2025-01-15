import * as ButtonData from "../toolBarButtonsData.ts"
import {MenuButton} from "../../../components/MenuButton/MenuButton.tsx"
import
    React, {
    useRef,
    useState,
} from "react"
import {
    Photo,
} from "../../../api/apiData.ts"
import styles from "../ToolBar.module.css"
import {closeButtonContent} from "../toolBarButtonsData.ts"
import {useDispatch} from "react-redux"
import {addBase64Image} from "../../../middleware/fetchPhotos.ts"
import {fetchQuery} from "../../../api/fetchQuery.ts"


type GalleryProps = {
    photos: Photo[],
    loader: boolean,
    keyWord: string,
    setGallery: (value: boolean) => void
}

const Gallery = ({
    photos,
    loader,
    keyWord,
    setGallery
}: GalleryProps) => {
    const dispatch = useDispatch()
    const galleryRef = useRef(null)

    const onClick = (photo: Photo) => {
        dispatch(addBase64Image({
            height: photo.height * 0.2,
            width: photo.width * 0.2,
            src: photo.urls.regular,
        }))
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
                    content={closeButtonContent}
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
    const [photos, setPhotos] = useState<Photo[]>([])
    const [loader, setLoader] = useState(false)

    async function fetchPhotos() {
        const keyWord = imgNameRef.current.value

        if (imgNameRef.current.value === "") {
            return
        }
        setLoader(true)
        setGallery(true)
        fetchQuery(keyWord)
            .then(
                photos => setPhotos(photos)
            )
            .catch(
                console.error
            )
            .finally(
                () => setLoader(false)
            )
    }

    return (
        <div className={styles.imageBlock}>
            <div className={styles.imageField}>
                <input
                    ref={imgNameRef}
                    className={styles.inputField}
                />
                <MenuButton
                    onClick={fetchPhotos}
                    content={ButtonData.findImageButtonContent}
                    styles={{
                        color: "#505050",
                        paddingInline: "10px"
                    }}
                />
            </div>
            {gallery &&
                <Gallery
                    photos={photos}
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
