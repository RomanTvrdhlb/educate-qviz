import Swiper from "../vendor/swiper";
import vars from "../_vars";

const { mainSlider } = vars;

if(mainSlider){
  const mainContainer = document.querySelector('.form-slider__container');
  const btns = document.querySelectorAll('.form-slider__btn');
  const mainSwiper = new Swiper(mainContainer, {
  slidesPerView: 1,
  spaceBetween: 40,
  observer: true,
  observeParents: true,
  autoHeight: true,
  allowTouchMove: false,

  navigation: {
    nextEl: '.form-slider__btn--next',
    prevEl: '.form-slider__btn--prev',
  },

  pagination: {
    el: '.form-slider__pagination',
    type: "bullets",
  },

});

btns.forEach(function(btn){
  btn.addEventListener('click', function(e){
    e.preventDefault;
  
    window.scroll({
      top: 0,
      left: 0
    });
  })
})
}









