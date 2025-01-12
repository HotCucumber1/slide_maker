import {Editor} from "../editor.ts"
import {ACCESS_TOKEN, BASE_URL, Photo} from "../../api/apiData.ts"
import {storeImages} from "./storeImage.ts"

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

async function fetchImages(editor: Editor, keyWord: string) {
    const photos = await searchPhotos(keyWord)
    return {
        ...editor,
        images: photos
    }
}

export {
    fetchImages,
}