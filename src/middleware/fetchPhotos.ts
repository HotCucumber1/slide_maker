import {ACCESS_TOKEN, BASE_URL} from "../api/apiData.ts"


type FetchPhotosProps = {
    
}
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
    return (dispatch) => {
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

}

export {
    fetchPhotos,
}