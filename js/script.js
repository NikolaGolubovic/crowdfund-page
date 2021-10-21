const gather = document.querySelector(".gather");
const goal = document.querySelector(".goal");
const sliderPercentage = document.querySelector(".slider-percent");
const backers = document.querySelector(".backers");

function getPercentWidthForSlider(gather, goal) {
  sliderPercentage.style.width = `${Math.ceil(
    (+gather.textContent.replace(/,/g, "") /
      +goal.textContent.replace(/,/g, "")) *
      100
  )}%`;
}
getPercentWidthForSlider(gather, goal);

const radios = document.querySelectorAll(".modal-card.active .modal-card-top");
const modalCards = document.querySelectorAll(".modal-card");
const nav = document.querySelector("nav");

radios.forEach((radio) =>
  radio.addEventListener("click", function () {
    modalCards.forEach((card) => card.classList.remove("check"));
    this.parentElement.classList.add("check");
  })
);

const hamburger = document.querySelector(".hamburger");
const logoHamburgerNode = document.querySelector(".logo-hamburger");
const modalNav = document.querySelector(".modal-nav-container");
hamburger.addEventListener("click", function () {
  logoHamburgerNode.classList.toggle("modal-active");
  modalNav.classList.toggle("active");
  modalNav.classList.toggle("open");
  this.classList.toggle("open");
});

const bookmark = document.querySelector(".pledge-app__icon-bookmark");
bookmark.addEventListener("click", function () {
  if (bookmark.children[1].textContent === "Bookmark") {
    bookmark.children[1].textContent = "Bookmarked";
  } else {
    bookmark.children[1].textContent = "Bookmark";
  }
  this.classList.toggle("active");
});

const openModalBtns = document.querySelectorAll(".has-pledge");
const mainModal = document.querySelector(".modal-select");
const pledgeApp = document.querySelector(".pledge-app");
const closeModal = document.querySelector(".close-modal");
const backProject = document.querySelector(".back-project");

backProject.addEventListener("click", () => mainModal.classList.add("open"));

openModalBtns.forEach((btn, index) => {
  btn.addEventListener("click", function () {
    mainModal.classList.add("open");
    modalCards[index + 1].classList.add("check");
    mainModal.scrollTo({
      top: modalCards[index + 1].offsetTop,
    });
  });
});

closeModal.addEventListener("click", function () {
  mainModal.classList.remove("open");
  modalCards.forEach((card) => card.classList.remove("check"));
});

const pledgeForms = document.querySelectorAll(".modal-card-controller form");
const modalSuccess = document.querySelector(".modal-success");
const modalComplete = document.querySelector(".modal-complete");
const modalSuccClose = document.querySelector(".modal-success-btn");

pledgeForms.forEach((form) =>
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const pledgeValue =
      +gather.textContent.replace(/,/g, "") +
      +this.children[0].children[0].value;
    gather.textContent = pledgeValue
      .toString()
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    function getPercentWidthForSlider(gather, goal) {
      sliderPercentage.style.width = `${Math.ceil(
        (+gather.textContent.replace(/,/g, "") /
          +goal.textContent.replace(/,/g, "")) *
          100
      )}%`;
    }
    mainModal.classList.remove("open");
    modalCards.forEach((card) => card.classList.remove("check"));
    modalSuccess.classList.add("open");
    modalComplete.classList.add("load");
    backers.textContent = +backers.textContent + 1;
    const timer = setTimeout(function () {
      modalComplete.classList.remove("load");
      getPercentWidthForSlider(gather, goal);
      clearTimeout(timer);
    }, 500);
  })
);

modalSuccClose.addEventListener("click", function () {
  modalSuccess.classList.remove("open");
});
