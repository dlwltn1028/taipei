/* CLICK/TAP IMAGE GALLERY
 * Click or tap anywhere in your screen to either hide or show each image.
 * Images are responsive.
 * 
 * You can add as many images as you'd like in this gallery. And is as simple as adding them via HTML. No need to edit CSS or JS.
 *
 * Gallery feature was fully inspired by one found at the Forward Festival website. I liked it so much, that decided to quickly create my own version of it with plain javascript as part of my #100DaysOfCode.
 * Inspiration taken from: https://forward-festival.com/hamburg/speaker/the-rodina-tereza-ruller
 *
 * Feel free to improve this gallery feature, or add more fun to it!
 *
 * #002 - #100DaysOfCode
 * By ilithya | 2019
 */
const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};
const getImgPosValue = imgSize => {
  const randomVal = getRandomInt(100);
  const position = `calc(${randomVal}% - ${imgSize}px)`;

  return randomVal > 50 ? position : `${randomVal}%`;
};
const setImgPosition = elImg => {
  const imgWidth = Math.round(elImg.getBoundingClientRect().width);
  const imgHeight = Math.round(elImg.getBoundingClientRect().height);

  elImg.style.left = getImgPosValue(imgWidth);
  elImg.style.top = getImgPosValue(imgHeight);
};
/* Let's create a posibility to manipulate the z-index of imgs if needed. */
// let z = 50;
// const increaseZindex = (el) => {
// 	el.style.zIndex = z;
// 	z++; // Place counter after styling, to start as of first let 'z' value
// };
const imgArray = [];
function createImgArray() {
  const galleryImg = document.querySelectorAll(".gallery__item");

  galleryImg.forEach(function (el) {
    const imgId = el.getAttribute("id");
    imgArray.push(imgId);

    setImgPosition(el);
    // increaseZindex(el);
  });
}
createImgArray();

let currentIndex = imgArray.length - 1;
const showImg = (elImg, elClass) => {
  currentIndex++; // First increase the img index
  elImg.classList.remove(elClass); // Then use that increased index to show next img
  setImgPosition(elImg); // And also use that increased index to set a new img position inside the gallery
};
const hideImg = (elImg, elClass) => {
  currentIndex--; // First decrease the img index
  elImg.classList.add(elClass); // Then use that decreased index to hide prev img
  // Let's remove the first signal image after one click/tap
  const imgSignalId = "js-item-signal";
  if (imgArray.includes(imgSignalId)) {
    imgArray.pop();

    const imgSignal = document.querySelector(`#${imgSignalId}`);
    imgSignal.remove();
  }
};

function toggleImgVisibility() {
  const $this = this;
  const hasImgsClass = "has-imgs";
  const img = {
    first: document.querySelector(`#${imgArray[0]}`),
    last: document.querySelector(`#${imgArray[imgArray.length - 1]}`),
    current: document.querySelector(`#${imgArray[currentIndex]}`),
    hiddenClass: 'is-hidden' };


  if (currentIndex === -1) {
    showImg(img.first, img.hiddenClass);
    $this.classList.add(hasImgsClass);
  }

  if (currentIndex === imgArray.length) {
    hideImg(img.last, img.hiddenClass);
    $this.classList.remove(hasImgsClass);
  }

  const hasImgsClassExists = $this.classList.contains(hasImgsClass);

  return hasImgsClassExists ? showImg(img.current, img.hiddenClass) : hideImg(img.current, img.hiddenClass);
}

const gallery = document.querySelector("#js-gallery");
gallery.addEventListener("click", toggleImgVisibility);