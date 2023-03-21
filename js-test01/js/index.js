window.onload = () => {
  const listsBefore = document.querySelectorAll(".list", "::before");
  const listBefore = getComputedStyle(
    document.querySelector(".list"),
    "::before"
  );

  console.log(listsBefore);
  listsBefore.forEach((element) => {
    element.addEventListener("click", () => {
      element.style.backgroundColor = "#000";
    });
  });
};
