const navList = document.querySelector(".nav__list");

const editDiv = document.querySelector("#edit");
const editSubmit = document.querySelector("#editForm");
const tagNameInput = document.querySelector("#tagName");
const tagDescriptionInput = document.querySelector("#tagDescription");
const imageLink = document.querySelector("#imageLink");
const videoLink = document.querySelector("#videoLink");
const placeNewTag = document.querySelector(".add_tag");
const imageInput = document.querySelector("#sel-file");
const navLogo = document.querySelector(".nav__logo");
const seeTags = document.querySelector("#seeTags");
const menuWrapper = document.querySelector("#menu__wrapper");
const tmpBtnWrapper = document.querySelector(".tmp_Btn__wrapper");
const editBtn = document.querySelector("#editBtn");
const tmp3 = document.querySelector("#tmp3");
const imageModal = document.querySelector("#image-modal");
const modalSubmitBtn = document.querySelector(".modal-submit__button");
const modalCloseBtn = document.querySelector(".modal-close__button");
const safeImage1 = document.querySelector("#safe_image1");
const safeImage2 = document.querySelector("#safe_image2");
const safeImage3 = document.querySelector("#safe_image3");
const safeImage4 = document.querySelector("#safe_image4");
const safeImage5 = document.querySelector("#safe_image5");
const safeImage6 = document.querySelector("#safe_image6");

safeImage1.onchange = () => {
  modalSubmitBtn.id =
    "https://matterport.xanqus.site/assets/img/safe_image1.JPG";
};

safeImage2.onchange = () => {
  modalSubmitBtn.id =
    "https://matterport.xanqus.site/assets/img/safe_image2.JPG";
};

safeImage3.onchange = () => {
  modalSubmitBtn.id =
    "https://matterport.xanqus.site/assets/img/safe_image3.JPG";
};

safeImage4.onchange = () => {
  modalSubmitBtn.id =
    "https://matterport.xanqus.site/assets/img/safe_image4.JPG";
};

safeImage5.onchange = () => {
  modalSubmitBtn.id =
    "https://matterport.xanqus.site/assets/img/safe_image5.JPG";
};

safeImage6.onchange = () => {
  modalSubmitBtn.id =
    "https://matterport.xanqus.site/assets/img/safe_image6.JPG";
};

editBtn.addEventListener("click", (e) => {
  e.preventDefault();
});

placeNewTag.addEventListener("click", (e) => {
  e.preventDefault();
});

tmp3.addEventListener("click", (e) => {
  e.preventDefault();
});

modalCloseBtn.addEventListener("click", (e) => {
  e.preventDefault();
});

modalCloseBtn.onclick = () => {
  imageModal.style.display = "none";
  imageModal.classList.remove("modal_expander");
};

modalSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
});

const showMenu = (toggleId, navbarId, bodyId) => {
  const toggle = document.getElementById(toggleId),
    navbar = document.getElementById(navbarId),
    bodypadding = document.getElementById(bodyId);

  if (toggle && navbar) {
    /*toggle.addEventListener("click", () => {
      //navbar.classList.toggle("expander");
      navList.classList.toggle("test");

      if (!navbar.classList.contains("expander")) {
        navList.style.display = "none";
      } else {
        navList.style.display = "block";
      }

      if (!navList.classList.contains("test")) {
        menuWrapper.style.display = "none";
        navLogo.style.display = "none";
        s;
      } else {
        menuWrapper.style.display = "block";
        navLogo.style.display = "block";
      }

      //bodypadding.classList.toggle("body-pd");
    });
    */

    tmp3.addEventListener("click", () => {
      imageModal.classList.toggle("modal_expander");

      if (!imageModal.classList.contains("modal_expander")) {
        imageModal.style.display = "none";
      } else {
        imageModal.style.display = "flex";
      }
    });

    seeTags.addEventListener("click", () => {
      navbar.classList.toggle("expander");
      seeTags.classList.toggle("test2");

      if (!seeTags.classList.contains("test2")) {
        editDiv.style.display = "none";
        placeNewTag.style.display = "none";
        imageInput.style.display = "none";
        navLogo.style.display = "none";
        navList.style.display = "none";
        tmpBtnWrapper.style.display = "none";
      } else {
        editDiv.style.display = "block";
        placeNewTag.style.display = "block";
        imageInput.style.display = "block";
        navLogo.style.display = "block";
        navList.style.display = "block";
        tmpBtnWrapper.style.display = "flex";
      }
      bodypadding.classList.toggle("body-pd");
    });
  }
};

showMenu("nav-toggle", "navbar", "body-pd");
