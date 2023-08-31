const loadCategories = async () => {
  const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
  const data = await response.json();
  const categories = data.data;
  displayCategories(categories);
};

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.classList = `text-center space-x-3 md:space-x-5 pb-10`;

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.innerHTML = `<button onclick = "loadCategoryItem('${category.category_id}')" class="bg-[#25252526] px-5 py-2 rounded-lg text-[#252525B2] text-base font-medium">${category.category}</button>`;
    categoryContainer.appendChild(button);
  });
};

const loadCategoryItem = async (id) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
  const data = await response.json();
  const categoryId = data.data;
  displayItem(categoryId);
};

const displayItem = (items) => {
  const itemContainer = document.getElementById("item-container");
  itemContainer.innerHTML = "";
  if (items.length !== 0) {
    items.forEach((item) => {
      const div = document.createElement("div");
      div.classList = `card flex flex-col`;
      div.innerHTML = `
      <figure><img class="h-48 w-full rounded-lg" src="${item.thumbnail}" alt="Shoes" /></figure>
      <div class="flex flex-row gap-3 pt-4">
        <img src="${item.authors[0]?.profile_picture}" class="rounded-full w-10 h-10" alt="" />
        <div class="">
          <h2 class="text-[#171717] text-base font-bold">${item.title}</h2>
          <p class="text-[#171717B2] text-sm font-normal py-2">${item.authors[0]?.profile_name}<span class="ml-2 text-blue-600">${
        item.authors[0]?.verified ? `<i class="fa-solid fa-certificate"></i>` : ""
      }</span></p>
          <p class="text-[#171717B2] text-sm font-normal">views: ${item.others?.views}</p>
        </div>
      </div>
      `;
      itemContainer.appendChild(div);
    });
  } else {
    const div = document.createElement("div");
    div.classList = `text-red-500 col-span-4 py-20 text-center`;
    div.innerHTML = `
    <img class="text-center mx-auto rounded-lg w-28 h-32 pb-8" src="./images/icon.png" alt="Shoes" />
    <h2 class="text-[#171717] text-3xl font-bold w-[433px] mx-auto">Oops!! Sorry, There is no content here</h2>
    `;
    itemContainer.appendChild(div);
  }
};

loadCategories();
loadCategoryItem(1000);
