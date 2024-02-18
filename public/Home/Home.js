const searchBox = document.querySelector("#quote-search-box");
const searchList = document.querySelector("#search-list");
const resultGrid = document.querySelector("#result-grid");
var addToFavBtn = document.querySelector(".favButton");
var favquotes;

window.onload = async function () {
    onLoadData();
};

async function onLoadData() {
    await getFavs();
    const URL = `https://api.quotable.io/quotes/random?limit=10`;

    const res = await fetch(`${URL}`);

    const data = await res.json();
    if (data.length > 0) {
        displayquotesList(data);
    }

}

async function getFavs() {
    let list = await fetch(
        `/api/fav`,
        {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            }
        }
    );
    favquotes = await list.json();
}

const findquotes = () => {
    let searchTerm = searchBox.value.trim();

    if (searchTerm.length > 0) {
        searchList.classList.remove("hide-search-list");
        fetchquotes(searchTerm);
    } else {
        searchList.classList.add("hide-search-list");
    }
};

async function fetchquotes(searchTerm) {
    if (searchTerm == null || searchTerm.length == 0) {
        await onLoadData();
        return;
    }
    const URL = `https://api.quotable.io/search/quotes?query="${searchTerm}"`;

    const res = await fetch(`${URL}`);

    const data = await res.json();
    if (data.count > 0) {
        displayquotesList(data.results);
    }
}

const displayquotesList = (quotes) => {
    searchList.innerHTML = "";

    for (let i = 0; i < quotes.length; i++) {
        let quoteListItem = document.createElement("div");
        quoteListItem.dataset.id = quotes[i]._id;
        quoteListItem.classList.add("search-list-item");

        quoteListItem.innerHTML = `

        <div class="search-item-info">
            <h3>${quotes[i].content}</h3>
            <p>${quotes[i].author}</p>
        </div>
        <button class="favButton" id="${quotes[i]._id}">Add to Favourites</button>
        `;

        searchList.appendChild(quoteListItem);
    }
    addToFavBtn = document.querySelector("#addToFav");
};


const addToFav = async (e) => {
    e.target.textContent = "Added To Favourites";
    let quoteID = e.target.id;
    if (favquotes.includes(quoteID)) {
        e.target.textContent = "Already Added To Favourites";
    } else {


        const result = await fetch(
            `/api/fav/` + quoteID,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        const quoteDetails = await result.json();
    }
};

document.addEventListener("click", function (e) {
    const target = e.target.closest(".favButton");

    if (target) {
        addToFav(e);
    }
});

searchBox.addEventListener("keyup", findquotes);
searchBox.addEventListener("click", findquotes);
