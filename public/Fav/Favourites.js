const resultContainer = document.querySelector(".result-container");
var favQuotes;
var list = null;

window.onload = async function () {
    list = await fetch(
        `/api/fav`,
        {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            }
        }
    );
    favQuotes = await list.json();
    favQuotes.forEach((id) => {
        getData(id);
    });
};




async function getData(id) {
    const result = await fetch(
        "https://api.quotable.io/quotes/" + id
    );
    const details = await result.json();

    AddQuotes(details);
}

const AddQuotes = (details) => {
    const child = document.createElement("div");

    child.setAttribute("id", details._id);
    child.setAttribute("class", "result-grid");

    child.innerHTML = `<div class="quote-poster">
        <div class="quote-info">
            <h3 class="quote-title">${details.content}</h3>
            <div class="quote-misc-info">
                <div class="rated">Author: ${details.author}</div>
                <br>    
                <div class="rated">Date: ${details.date ? details.date : ''}</div>
            </div>
        </div>  
        `;

    const btn = document.createElement("button");
    btn.setAttribute("class", "delete-btn");
    btn.innerHTML = `<i data-id="${details._id}" class="fa-solid fa-trash">`;

    btn.addEventListener("click", deleteQuote);
    child.appendChild(btn);

    resultContainer.appendChild(child);
};

const deleteQuote = async (e) => {
    const delID = e.target.dataset.id;

    const quote = document.getElementById(`${delID}`);

    quote.remove();

    favQuotes = favQuotes.filter((id) => id != delID);


    const result = await fetch(
        `/api/fav/remove/` + delID,
        {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            }
        }
    );
};
