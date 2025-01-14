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
import {useAppActions} from "../../../hooks/useAppActions.ts"
import {closeButtonContent} from "../toolBarButtonsData.ts"
import {useSearchPhotos} from "../../../hooks/useSearchPhotos.ts"


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
    const { addImage } = useAppActions()
    const galleryRef = useRef(null)

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
        useSearchPhotos(keyWord)
            .then(photos => setPhotos(photos))
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

// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
//
// // Пример редьюсера
// const initialState = { data: [] };
// const dataReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'FETCH_DATA_SUCCESS':
//             return { ...state, data: action.payload };
//         default:
//             return state;
//     }
// };
//
// // Пример асинхронного действия
// const fetchData = () => {
//     return async (dispatch) => {
//         const response = await fetch('https://api.example.com/data');
//         const data = await response.json();
//         dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data });
//     };
// };
//
// // Создание store с middleware
// const store = createStore(dataReducer, applyMiddleware(thunk));
//
// // Диспетчеризация асинхронного действия
// store.dispatch(fetchData());


// import * as ButtonData from "./toolBarButtonsData.ts"
// import {MenuButton} from "../../components/MenuButton/MenuButton.tsx"
// import
//     React, {
//     useRef,
//     useState,
// } from "react"
// import {Photo} from "../../api/apiData.ts"
// import styles from "./ToolBar.module.css"
// import {useAppActions} from "../../hooks/useAppActions.ts"
// import {closeButtonContet} from "./toolBarButtonsData.ts"
// import {fetchPhotos} from "../../middleware/fetchPhotos.ts"
// import {useAppSelector} from "../../hooks/useAppSelector.ts"
//
//
// type GalleryProps = {
//     loader: boolean,
//     keyWord: string,
//     setGallery: (value: boolean) => void
// }
//
// const Gallery = ({loader, keyWord, setGallery}: GalleryProps) => {
//     const { addImage } = useAppActions()
//     const galleryRef = useRef(null)
//
//     const editor = useAppSelector((editor => editor))
//     const photos = editor.images
//
//     const onClick = (photo: Photo) => {
//         addImage({
//             height: photo.height * 0.2,
//             width: photo.width * 0.2,
//             src: photo.urls.regular,
//         })
//         setGallery(false)
//     }
//
//     return (
//         <div
//             className={styles.gallery}
//             ref={galleryRef}
//         >
//             <div className={styles.galleryHead}>
//                 <span>Картинки по запросу "
//                     <span className={styles.galleryKeyWord}>{keyWord}</span>"
//                 </span>
//                 <MenuButton
//                     content={closeButtonContet}
//                     onClick={() => setGallery(false)}
//                     className={styles.galleryCloseButton}
//                 >
//                 </MenuButton>
//             </div>
//
//             <div className={styles.galleryImageBlock}>
//                 {loader
//                     ? <div className={styles.spinner}/>
//                     : photos.length > 0
//                         ? photos.map((photo) => (
//                             <img
//                                 key={photo.id}
//                                 src={photo.urls.thumb}
//                                 alt={photo.description || "Photo"}
//                                 className={styles.galleryImage}
//                                 onClick={() => onClick(photo)}
//                             />)
//                         )
//                         : <span className={styles.imagesNotFound}>
//                             По запросу "{keyWord}" ничего не найдено
//                         </span>
//                 }
//             </div>
//         </div>
//     )
// }
//
//
// function ImagesField() {
//     const imgNameRef = useRef(null)
//     const [gallery, setGallery] = useState(false)
//     const [loader, setLoader] = useState(false)
//     const { fetchImageSuccess } = useAppActions()
//
//     async function onMouseClick() {
//         await fetchPhotos(imgNameRef.current.value, fetchImageSuccess)
//         setGallery(true)
//     }
//
//     return (
//         <div className={styles.imageBlock}>
//             <div className={styles.imageField}>
//                 <input
//                     ref={imgNameRef}
//                     className={styles.inputField}
//                 />
//                 <MenuButton
//                     onClick={onMouseClick}
//                     content={ButtonData.findImageButtonContent}
//                     styles={{
//                         color: "#505050",
//                         paddingInline: "10px"
//                     }}
//                 >Найти</MenuButton>
//             </div>
//             {gallery &&
//                 <Gallery
//                     loader={loader}
//                     keyWord={imgNameRef.current.value}
//                     setGallery={setGallery}
//                 >
//                 </Gallery>
//             }
//         </div>
//     )
// }
//
// function ImageTools() {
//     const [showImportImage, setShowImportImage] = useState(false)
//
//     return (
//         <>
//             <MenuButton
//                 content={ButtonData.addImageButtonContent}
//                 onClick={() => setShowImportImage(!showImportImage)}
//                 styles={{
//                     marginTop: "2px",
//                     height: "50%",
//                 }}
//             />
//             {showImportImage && <ImagesField/> }
//         </>
//     )
// }
//
// export {
//     ImageTools,
// }