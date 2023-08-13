export default {
  activeMode: 'active--mode',
  activeClass: "active",
  windowEl: window,
  documentEl: document,
  htmlEl: document.documentElement,
  bodyEl: document.body,
  overlay: document.querySelector('[data-overlay]'),
  accParrent: [...document.querySelectorAll("[data-accordion-init]")],
  // selectParrent: [...document.querySelectorAll("[data-select]")],
  // tabsParrents: [...document.querySelectorAll("[data-tabs-parrent]")],
  modals: [...document.querySelectorAll('[data-popup]')],
  modalsButton: [...document.querySelectorAll("[data-btn-modal]")],
  modalsButtonMode: [...document.querySelectorAll("[data-mode-modal]")],
  innerButtonModal: [...document.querySelectorAll("[data-btn-inner]")],
  // customSelect: [...document.querySelectorAll("[data-select]")],
  // burger: document.querySelector('.header .burger'),

  footer: document.querySelector("footer"),
  header: document.querySelector(".header"),

  mainSlider: [...document.querySelectorAll('.form-slider')],
  form: document.querySelector('.questions-form'),

  // ----------------------

  // default variables

  // passForm: [...document.querySelectorAll('.password-form__label')],
  // parrentBuffer: [...document.querySelectorAll('.buffer')],
  mobileMenu: document.querySelector('.main-nav'),
  mainLinks: [...document.querySelectorAll('.main-nav a')],
  burger: document.querySelector('.burger'),
}





