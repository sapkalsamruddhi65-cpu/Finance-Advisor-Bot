document.addEventListener("DOMContentLoaded", function () {
  const typeSelect = document.getElementById("txType");
  const categorySelect = document.getElementById("txCategory");

  function populateCategories() {
    if (!typeSelect || !categorySelect) return;
    const list = typeSelect.value === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    categorySelect.innerHTML = "";
    list.forEach(function (cat) {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      categorySelect.appendChild(opt);
    });
  }

  if (typeSelect) {
    typeSelect.addEventListener("change", populateCategories);
    populateCategories();
  }
});
