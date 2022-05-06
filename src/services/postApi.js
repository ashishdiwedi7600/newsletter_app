import axios from "axios"
import { URL } from "./endpoint";


export const postLetter = async (letter, emails) => {
    const template_code = JSON.stringify(letter)
    return await axios.post(`${URL}/sendNewsletter`, { template_code, emails })
}

export const uploadImages = async (uploadImage) => {
    const formData = new FormData();
    const n = uploadImage[0].length
    for (var x = 0; x < n; x++) {
        formData.append('image', uploadImage[0][x])
    }
    return await axios.post(`${URL}/uploadImages`, formData)
}

