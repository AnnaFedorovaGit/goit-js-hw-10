
import axios from "axios";

export function fetchBreeds() { 
    return axios({
        method: 'get',
        url: 'https://api.thecatapi.com/v1/breeds',
        })
}

export function fetchCatByBreed(breedId) { 
    return axios({
        method: 'get',
        url: `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`,
        })
}