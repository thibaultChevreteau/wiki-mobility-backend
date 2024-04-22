import ImageKit from "imagekit";

const IMAGEKIT_URL_ENDPOINT = process.env.IMAGEKIT_URL_ENDPOINT!;
const IMAGEKIT_PUBLIC_KEY = process.env.IMAGEKIT_PUBLIC_KEY!;
const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY!;

export const imagekit = new ImageKit({
	urlEndpoint: IMAGEKIT_URL_ENDPOINT,
	publicKey: IMAGEKIT_PUBLIC_KEY,
	privateKey: IMAGEKIT_PRIVATE_KEY,
});
