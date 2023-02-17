import findElement from "./utils/findElement.js";
const BASE_URL = "https://63ec615cbe929df00caa5c7d.mockapi.io";
const pageNumber = findElement(".wrapper__page");

const templateBookmark = findElement("#bookmark-template");
const elCard = findElement(".bookmarks__right");
const elForm = findElement("#add-post");
const elSearch = findElement("#search");

let book = [];

const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "http://127.0.0.1:5501/login.html";
}

function rederBookmark(array, parent = elCard) {
  parent.textContent = "";

  const fragment = document.createDocumentFragment();

  array.forEach((books) => {
    const template = templateBookmark.content.cloneNode(true);
    const img = findElement(".right__image", template);
    const title = findElement(".right__title", template);
    const text = findElement(".right__text", template);
    const date = findElement(".right__date", template);
    const bookmarkBtn = findElement("#bookmark-btn", template);
    const infoBtn = findElement("#info-btn", template);
    const readBtn = findElement("#read-btn", template);

    for (let i = 0; i <= array.length; i++) {
      const element = array[i];
      pageNumber.textContent = "Showing " + i;
    }

    // genered date

    const generedDate = new Date(books.date);

    const resultDate = `${generedDate.getFullYear()}`;

    img.src = books.image;
    title.textContent = books.country;
    text.textContent = books.city;
    date.textContent = resultDate;
    title.textContent = books.country;
    fragment.appendChild(template);
  });
  parent.appendChild(fragment);
}

async function getData() {
  const res = await fetch(BASE_URL + "/book");
  let data = await res.json();
  book = data;
  rederBookmark(book);
}
getData();

// elForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();

//   const image = evt.target.image.value;
//   const country = evt.target.country.value;
//   const city = evt.target.city.value;
//   const date = evt.target.date.value;
//   const discription = evt.target.discription.value;

//   const newPost = {
//     image,
//     country,
//     city,
//     date,
//     discription,
//   };

//   fetch(BASE_URL + "/book", {
//     method: "POST",
//     body: JSON.stringify(newPost),
//   })
//     .then((res) => res.json)
//     .then((data) => {
//       getData();
//       elForm.reset();
//     });
// });

// search function

elSearch.addEventListener("input", (e) => {
  e.preventDefault();

  let element = e.target;
  let searchArr = [];
  for (let i = 0; i < book.length; i++) {
    if (book[i].country.toLowerCase().includes(element.value)) {
      searchArr.push(book[i]);
    }
  }
  rederBookmark(searchArr);
});

const logout = findElement("#logout");

logout.addEventListener("click", () => {
  localStorage.removeItem("tokes");
  window.location.href = "http://127.0.0.1:5501/login.html ";
});

// const moreInfo = findElement("#info-btn");
// const modalBook = findElement("#modal-book");
// const exitbtn = findElement("#exit-btn");

// moreInfo.addEventListener("click", () => {
//   modalBook.style.display='block'
//   modalBook.classList.toggle("modal__element--active");
//   console.log(modalBook);
// });
// exitbtn.addEventListener("click", () => {
//   modalBook.classList.toggle("modal__element--active");
// });
