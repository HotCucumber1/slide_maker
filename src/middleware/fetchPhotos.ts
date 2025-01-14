import {ACCESS_TOKEN, BASE_URL} from "../api/apiData.ts"
import {EditorAction} from "../store/redux/actions.ts"


async function fetchUnsplash(query: string, params?: Record<string, string>) {
    const url = new URL(`${BASE_URL}/${query}`);
    if (params) {
        Object.entries(params).forEach(
            ([key, value]) => url.searchParams.append(key, value)
        )
    }
    const response = await fetch(url.toString(), {
        headers: {
            Authorization: `Client-ID ${ACCESS_TOKEN}`,
        },
    });
    if (!response.ok) {
        throw new Error(`An error has occurred! Status: ${response.status}`)
    }
    return await response.json()
}

async function searchPhotos(keyWord: string, perPage = 12) {
    const data = await fetchUnsplash("search/photos", {
        query: keyWord,
        per_page: perPage.toString(),
    })
    return data.results
}

async function fetchPhotos(
    keyWord: string,
    onFetchImageSuccess: (images) => EditorAction
) {
    return (dispatch) => {
        if (keyWord === "") {
            return
        }
        searchPhotos(keyWord)
            .then(
                photos => {
                    dispatch(onFetchImageSuccess(photos))
                    console.log(photos)
                })
            .catch(
                console.error
            )
    }
}

export {
    fetchPhotos,
}