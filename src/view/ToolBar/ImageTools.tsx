import * as ButtonData from "./toolBarButtonsData.ts"
import {MenuButton} from "../../components/MenuButton/MenuButton.tsx"
import
    React, {
    forwardRef,
    MutableRefObject,
    useRef,
    useState,
} from "react"
import {
    ACCESS_TOKEN,
    BASE_URL,
    Photo,
} from "../../api/apiData.ts"
import styles from "./ToolBar.module.css"
import {useAppActions} from "../../hooks/useAppActions.ts"


type GalleryProps = {
    photos: Photo[],
    loader: boolean,
    keyWord: string,
    ref: MutableRefObject<null>
}

const Gallery = forwardRef(
    ({photos, loader, keyWord}: GalleryProps, ref) =>
{
    const { addImage } = useAppActions()

    const onClick = (photo: Photo) => {
        addImage({
            height: photo.height * 0.2,
            width: photo.width * 0.2,
            src: photo.urls.regular,
        })

    }

    return (
        <div
            className={styles.gallery}
            ref={ref}
        >
            <div className={styles.galleryHead}>
                <p>Картинки по запросу "
                    <span className={styles.galleryKeyWord}>{keyWord}</span>"
                </p>
            </div>

            <div className={styles.galleryImageBlock}>
                {loader
                    ? <div className={styles.spinner}/>
                    : photos.map((photo) => (
                        <img
                            key={photo.id}
                            src={photo.urls.thumb}
                            alt={photo.description || "Photo"}
                            className={styles.galleryImage}
                            onClick={() => onClick}
                        />)
                    )
                }
            </div>
        </div>
    )
})


function ImagesField() {
    const imgNameRef = useRef(null)
    const galleryRef = useRef(null);
    const [gallery, setGallery] = useState(false)
    const [photos, setPhotos] = useState<Photo[]>([])
    const [loader, setLoader] = useState(false)

    async function fetchUnsplash(query: string, params?: Record<string, string>) {
        const url = new URL(`${BASE_URL}/${query}`);
        if (params) {
            Object.entries(params).forEach(
                ([key, value]) => url.searchParams.append(key, value)
            );
        }
        const response = await fetch(url.toString(), {
            headers: {
                Authorization: `Client-ID ${ACCESS_TOKEN}`,
            },
        });
        if (!response.ok) {
            throw new Error(`An error has occurred! Status: ${response.status}`);
        }
        return await response.json();
    }

    async function searchPhotos(keyWord: string, perPage = 12) {
        const data = await fetchUnsplash("search/photos", {
            query: keyWord,
            per_page: perPage.toString(),
        });
        return data.results;
    }

    async function fetchPhotos() {
        const keyWord = imgNameRef.current.value

        if (imgNameRef.current.value === "") {
            return
        }
        setLoader(true)
        searchPhotos(keyWord)
            .then(
                photos => {
                    setPhotos(photos)
                    setGallery(true)
                })
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
                >Найти</MenuButton>
            </div>
            {gallery &&
                <Gallery
                    photos={photos}
                    loader={loader}
                    ref={galleryRef}
                    keyWord={imgNameRef.current.value}
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