const ACCESS_TOKEN = "LnpCz9Dq2Vx_jynAdUOlWubdeYuf_cGodNpt5511azg"
const BASE_URL = "https://api.unsplash.com"

type UnsplashPhoto = {
    id: string;
    description: string | null;
    urls: {
        regular: string;
        raw: string;
        full: string;
        small: string;
        thumb: string;

    };
    width: number,
    height: number
}


export {
    ACCESS_TOKEN,
    BASE_URL,
    type UnsplashPhoto,
}