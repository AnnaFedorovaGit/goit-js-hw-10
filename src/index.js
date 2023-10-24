
import axios from "axios";
import { fetchBreeds } from "./js/cat-api.js";
import { fetchCatByBreed } from "./js/cat-api.js";
import SlimSelect from 'slim-select'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.headers.common["x-api-key"] = "live_anrBU27ld3o7Lee7BSbeIYc8oujy6GGJtHdmbR4dyntoPzYdZaoWMBuVb2TMetDL";

const breedSelect = document.querySelector("#breed-select");
const loaderText = document.querySelector(".loader");
const info = document.querySelector(".cat-info");

loaderText.style.display = "block";

fetchBreeds()
    .then(function (response) {
        loaderText.style.display = "none";
        breedSelect.style.display = "flex";
        

        const select = new SlimSelect({
            select: '#breed-select',
            events: {
                afterChange: ([data]) => getCat(data.value),
            },
        });

        for (let item of response.data) {
            select.addOption({
                text: item.name,
                value: item.id
            })
        }
    })
    .catch(function () { 
        Notify.failure("Oops! Something went wrong! Try reloading the page!");
        loaderText.style.display = "none";
    });

function getCat (value) {
    loaderText.style.display = "block";
    info.innerHTML = "";
    
    fetchCatByBreed(value)
        .then(function (response) {
            const breeds = response.data[0].breeds[0];
       
            const markup = `            
                <img class="cat-image" src="${response.data[0].url}" alt="${breeds.name}"   width="300" height="200" />
                <div class="cat-desc">
                    <h1 class="cat-spycie">${breeds.name}</h1>
                    <p class="cat-description">${breeds.description}</p>
                    <p class="cat-temperament">Temperament: ${breeds.temperament}</p>
                </div>`;

            loaderText.style.display = "none";
            info.innerHTML = markup;
        })
        .catch(function () { 
            Notify.failure("Oops! Something went wrong! Try reloading the page!");
            loaderText.style.display = "none";
        });
}
