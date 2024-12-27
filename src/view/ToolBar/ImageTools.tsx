import * as ButtonData from "./toolBarButtonsData.ts"
import {MenuButton} from "../../components/MenuButton/MenuButton.tsx"
import React, {useRef, useState} from "react"
import {
    ACCESS_TOKEN,
    BASE_URL, UnsplashPhoto,
} from "../../api/apiData.ts"
import styles from "./ToolBar.module.css"
import {useAppActions} from "../../hooks/useAppActions.ts"

type GalleryProps = {
    photos: UnsplashPhoto[],
    loader: boolean
}

function Gallery({photos, loader}: GalleryProps)
{
    const { addImage } = useAppActions()

    return (
        <div className={styles.gallery}>
            {loader
                ? <div className={styles.spinner}/>
                : photos.map(
                    (photo) => (
                        <img
                            key={photo.id}
                            src={photo.urls.thumb}
                            alt={photo.description || "Photo"}
                            className={styles.galleryImage}
                            onClick={() => addImage({
                                height: photo.height * 0.2,
                                width: photo.width * 0.2,
                                src: photo.urls.regular,
                            })}
                        />
                    )
                )
            }
        </div>
    )
}


function ImagesField() {
    const imgNameRef = useRef(null)
    const [gallery, setGallery] = useState(false)
    const [photos, setPhotos] = useState<UnsplashPhoto[]>([])
    const [loader, setLoader] = useState(true)
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
        searchPhotos(keyWord)
            .then(photos => {
                setLoader(false);
                setPhotos(photos)
                setGallery(true)
            })
            .catch(console.error)
    }

    return (
        <div className={styles.imageField}>
            <div>
                <input
                    ref={imgNameRef}
                />
                <button
                    onClick={fetchPhotos}
                >Найти
                </button>
            </div>
            {gallery &&
                <Gallery
                    photos={photos}
                    loader={loader}
                ></Gallery>
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
                iconStyles={{
                    marginTop: "2px",
                    height: "50%",
                }}
            />
            {showImportImage &&
                <ImagesField/>
            }
        </>
    )
}

export {
    ImageTools,
}