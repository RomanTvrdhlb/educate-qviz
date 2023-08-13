import Swiper from "../vendor/swiper";
import vars from "../_vars";

const { mainSlider } = vars;

if(mainSlider){
  const mainContainer = document.querySelector('.form-slider__container');

  const mainSwiper = new Swiper(mainContainer, {
  slidesPerView: 1,
  spaceBetween: 40,
  observer: true,
  observeParents: true,

  navigation: {
    nextEl: '.form-slider__btn--next',
    prevEl: '.form-slider__btn--prev',
  },

  pagination: {
    el: '.form-slider__pagination',
    type: "bullets",
    clickable: true,
  },

});
}

