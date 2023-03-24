const loadProduct = () => {
    fetch("./product.json")
      .then((response) => response.json())
      .then((data) => displayProduct(data));
    };
  
const displayProduct = (data) => {
    console.log(data);
    const cards = document.getElementById("cards");
    data.forEach((product) => {
        // console.log(product.id);
        const card = document.createElement("div");
        card.classList.add("card", "m-2");
        const isBookmarked = checkBookmark(product.id);
        console.log(isBookmarked);
  
        card.innerHTML = `
            <div class="bookmark-icon">
                <i onclick="${isBookmarked ?`handleRemoveBookmark('${product.id}')` : `handleBookmark('${product.name}', '${product.id}', '${product.price}')`}" class="${isBookmarked ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"}"></i>
            </div>
            <div class="product-img-container">
                <img class="product-img" src=${product.image} alt="" />
            </div>
            <h3>${product.name}</h3>
            <p>The Widget 3000 is the latest and greatest in widget</p>
            <div class="priceAndButtons">
                <h2 class="text-primary">${product.price}</h2>
                <button class="btn btn-primary">Buy Now</button>
            </div>`;
        cards.appendChild(card);
    });
};

const handleBookmark = (name, id, price) => {
    const previousBookmark = JSON.parse(localStorage.getItem("bookmark"));
    let bookmark = [];
    const product = {name, id, price}

    if (previousBookmark) {
        const isThisProductMarked = previousBookmark.find(product => product.id == id) 

        if(isThisProductMarked) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Already Bookmarked',
            })
        }
        else {
            bookmark.push(...previousBookmark, product);
            localStorage.setItem("bookmark", JSON.stringify(bookmark))
            console.log(bookmark);
        }
    }
    else {
        bookmark.push(product);
        localStorage.setItem("bookmark", JSON.stringify(bookmark))
    }
    window.location.href = "index.html"
}

const handleRemoveBookmark = (id) => {
    const previousBookmark = JSON.parse(localStorage.getItem("bookmark"));
    const restOfBookmark = previousBookmark.filter(product => product.id != id);
    localStorage.setItem("bookmark", JSON.stringify(restOfBookmark))
    window.location.href = "index.html"
}

const checkBookmark = (id) => {
    const previousBookmark = JSON.parse(localStorage.getItem("bookmark"));
    const isBookmarked = previousBookmark?.find(product => product.id == id);

    if(isBookmarked) {
        return true;
    }
    else {
        return false;
    }
}

loadProduct();