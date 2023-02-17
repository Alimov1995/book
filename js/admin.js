import findElement from "./utils/findElement.js";

const BASE_URL = "https://63ec615cbe929df00caa5c7d.mockapi.io";
const elForm = findElement("#add-post");
const templateBookmark = findElement("#bookmark-template");
const elCard = findElement(".bookmarks__right");
let book = [];

// render post
function rederBookmark(array, parent = elCard) {
  parent.textContent = "";

  const fragment = document.createDocumentFragment();

  array.forEach((books) => {
    const template = templateBookmark.content.cloneNode(true);
    const img = findElement(".right__image", template);
    const title = findElement(".right__title", template);
    const text = findElement(".right__text", template);
    const date = findElement(".right__date", template);

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
elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const image = evt.target.image.value;
  const country = evt.target.country.value;
  const city = evt.target.city.value;
  const date = evt.target.date.value;
  const discription = evt.target.discription.value;

  const newPost = {
    image,
    country,
    city,
    date,
    discription,
  };

  fetch(BASE_URL + "/book", {
    method: "POST",
    body: JSON.stringify(newPost),
  })
    .then((res) => res.json)
    .then((data) => {
      getData();
      elForm.reset();
    });
});
async function getData() {
  const res = await fetch(BASE_URL + "/book");
  let data = await res.json();
  book = data;
  rederBookmark(book);
}
getData();

elCard.addEventListener("click", (evt) => {
  if (evt.target.className.includes("del")) {
    const id = evt.target.dataset.id;
    console.log(id);

    fetch(BASE_URL + "/book/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        getData();
      })
      .catch((err) => {});
  }
});
const editForm = findElement("#editeForm");

// elCard.addEventListener("click", (evt) => {
//   const target = evt.target;
//   if (target.className.includes("btn-edit")) {
//     const id = target.dataset.id;
//     console.log(id);
//     book.forEach((book) => {
//       if (book.id === id) {
//         const image = editForm.image;
//         const title = editForm.title;
//         const description = editForm.description;
//         const editImg = findElement("#editImage");
//         const saveBtn = findElement("#saveBtn");

//         editImg.src = book.image;
//         image.alt = book.name;

//         image.value = book.image;
//         title.value = book.name;
//         category.value = book.category;
//         description.value = book.description;

//         saveBtn.addEventListener("click", () => {
//           const newObject = {
//             id: book.id,
//             image: image.value,
//             name: title.value,
//             description: description.value,
//           };

//           fetch(BASE_URL + "/book/" + id, {
//             method: "PUT",
//             body: JSON.stringify(newObject),

//             headers: {
//               "Content-Type": "application/json",
//             },
//           })
//             .then((res) => res.json())
//             .then((data) => {
//               getData();
//             })
//             .catch((err) => {});
//         });
//       }
//     });
//   }
// });
