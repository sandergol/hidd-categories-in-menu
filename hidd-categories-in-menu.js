function showAllCategories(maxRow = 1) {
  if (!document.querySelector(".catalog_sections")) return;

  let categoriesEl, categoriesContainer;

  try {
    categoriesEl = document.querySelectorAll(".catalog-hits .catalog_sections a.list");
    categoriesContainer = categoriesEl[0].closest(".catalog_sections");
  } catch (e) {
    return;
  }

  let paramsCategories = {
    showAdd: false,
    idHidden: "id_hide",
    countCategories: categoriesEl.length,
    countHideCategories: 0,
    widthShowEl: 172, // Ширина кнопки "Показать еще"
    widthAllCategoriesEl: 0, // Суммарная ширина всех фильтров
    widthContainerCategories: fullWidth(categoriesContainer) * maxRow, // Ширина контейнера для фильтров умноженная на количество рядов
  };

  hideShowCategories();
  addButtonShow();

  function fullWidth(el) {
    return (el.offsetWidth + +getComputedStyle(el).marginRight.replace(/px/i, "") + +getComputedStyle(el).marginLeft.replace(/px/i, ""));
  }

  function hideShowCategories() {
    let maximumAllowedCategoriesWidth = paramsCategories.widthContainerCategories - paramsCategories.widthShowEl;
    let isWhidthSpaceFirstContaiter = false;

    categoriesEl.forEach((index, i) => {
      // Учитываем пустое пространство вызванное переносом следующей категории на новую строку
      if (!isWhidthSpaceFirstContaiter && paramsCategories.widthAllCategoriesEl + fullWidth(index) >= paramsCategories.widthContainerCategories / 2) {
        paramsCategories.widthAllCategoriesEl += paramsCategories.widthContainerCategories / 2 - paramsCategories.widthAllCategoriesEl;
        isWhidthSpaceFirstContaiter = true;
      }

      paramsCategories.widthAllCategoriesEl += fullWidth(index);

      if (paramsCategories.widthAllCategoriesEl >= maximumAllowedCategoriesWidth && !index.classList.contains(paramsCategories.idHidden)) {
        if (i > 0) {
          // Если первый элемент занимает всю ширину - не скрываем его
          index.classList.add(paramsCategories.idHidden);
          paramsCategories.countHideCategories++;
        }
      } else if (paramsCategories.widthAllCategoriesEl <= maximumAllowedCategoriesWidth && index.classList.contains(paramsCategories.idHidden)) {
        index.classList.remove(paramsCategories.idHidden);
        if (paramsCategories.countHideCategories > 0) paramsCategories.countHideCategories--;
      }
    });
  }

  function addButtonShow() {
    let el = categoriesContainer.querySelector(".categories-filter");

    if (paramsCategories.countHideCategories > 0 && !el) {
      $(categoriesContainer).append(
        '<button class="list categories-filter">' +
        'Показать еще ' +
        '<span class="categories-filter__count">' +
        '(' + paramsCategories.countHideCategories + ")" +
        "</span></button>"
      );
      onClickButton();
    } else if (paramsCategories.countHideCategories === 0 && el) {
      el.remove();
    }
  }

  function onClickButton() {
    let el = categoriesContainer.querySelector(".categories-filter");

    el.addEventListener("click", () => {
      el.remove();
      categoriesEl.forEach((index) => {
        index.classList.remove(paramsCategories.idHidden);
      });
    });
  }
}

showAllCategories(2);
