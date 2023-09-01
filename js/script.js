const loadCategories = async () => {
  const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
  const data = await response.json();
  const categories = data.data;
  displayCategories(categories);
};

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.classList = "text-center space-x-3 md:space-x-5 pb-10";

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.innerHTML = `<button onclick="activateTab(this, '${category.category_id}')" class="btn bg-[#25252526] px-5 py-2 rounded-lg text-[#252525B2] text-base font-medium border-none normal-case hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>`;
    categoryContainer.appendChild(button);
  });
};

let previousButton;

function activateTab(button, categoryId) {
  if (previousButton) {
    previousButton.classList.remove("bg-[#FF1F3D]", "text-white");
    previousButton.classList.add("bg-[#25252526]", "text-[#252525B2]");
  }
  button.classList.remove("bg-[#25252526]", "text-[#252525B2]");
  button.classList.add("bg-[#FF1F3D]", "text-white");

  previousButton = button;
  loadCategoryItem(categoryId);
}

let catID;

const loadCategoryItem = async (id = "1000") => {
  const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
  const data = await response.json();
  const categoryId = data.data;
  catID = id;
  displayItem(categoryId);
};

const displayItem = (items) => {
  const itemContainer = document.getElementById("item-container");
  itemContainer.innerHTML = "";

  if (items.length !== 0) {
    items.forEach((item) => {
      const div = document.createElement("div");
      div.classList = `card flex flex-col relative`;
      div.innerHTML = `
        <figure><img class="h-48 w-full rounded-lg" src="${item.thumbnail}" alt="Shoes" /></figure>
        ${
          item.others?.posted_date
            ? `<span class="bg-[#171717] p-1 rounded-lg text-[10px] font-normal text-white absolute  bottom-[104px] right-3">${Math.floor(item.others.posted_date / 3600)} hrs ${Math.floor(
                (item.others.posted_date % 3600) / 60
              )} mins ago</span>`
            : ""
        }

        <div class="flex flex-row gap-3 pt-4">
          <img src="${item.authors[0]?.profile_picture}" class="rounded-full w-10 h-10" alt="" />
          <div class="">
            <h2 class="text-[#171717] text-base font-bold">${item.title}</h2>
            <p class="text-[#171717B2] text-sm font-normal py-2 w-full flex flex-row gap-1">${item.authors[0]?.profile_name}<span>${
        item.authors[0]?.verified ? `<img src="./images/verified.png" />` : ""
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
      <h2 class="text-[#171717] text-3xl font-bold w-full md:w-[430px] mx-auto">Oops!! Sorry, There is no content here</h2>
      `;
    itemContainer.appendChild(div);
  }
};

const sortByViews = async () => {
  const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${catID}`);
  const data = await response.json();
  const categoryIdData = data.data;
  const sortData = categoryIdData.sort((a, b) => parseFloat(b.others.views) - parseFloat(a.others.views));
  displayItem(sortData);
};

loadCategories();
loadCategoryItem();
