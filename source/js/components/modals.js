import vars from '../_vars';
import { disableScroll } from '../functions/disable-scroll';
import { enableScroll } from '../functions/enable-scroll';
import { removeClassInArray,addCustomClass, removeCustomClass } from "../functions/customFunctions";



export function modalClickHandler(attribute, activeClass) {
  const curentModal = overlay.querySelector(`[data-popup="${attribute}"]`);
  removeClassInArray(modals, activeClass);
  addCustomClass(overlay, activeClass);
  addCustomClass(curentModal, activeClass);
  disableScroll();
  innerButton = overlay.querySelector(`${'[data-popup]'}.${activeClass} .close`);
}

const {overlay, activeClass, modalsButton , modals , innerButtonModal, activeMode} = vars;
let innerButton;
const commonFunction = function() {
  removeCustomClass(overlay, activeClass);
  removeClassInArray(modals, activeClass);
  enableScroll();
}



function buttonClickHandler(e,buttonAttribute, activeClass) {
  e.preventDefault();
  const currentModalId = e.target.getAttribute(`${buttonAttribute}`);
  const curentModal = overlay.querySelector(`[data-popup="${currentModalId}"]`);

  removeClassInArray(modals, activeClass);
  addCustomClass(overlay, activeClass);
  addCustomClass(curentModal, activeClass);
  disableScroll();
  innerButton = overlay.querySelector(`${'[data-popup]'}.${activeClass} .close`);
}

function overlayClickHandler(e, activeClass){
  if (e.target === overlay || e.target === innerButton) commonFunction();
}

function modalInit(buttonsArray, buttonAttribute ,activeClass) {
  buttonsArray.map(function(btn){
    btn.addEventListener('click', (e) => buttonClickHandler(e, buttonAttribute, activeClass));
  })
}

overlay && overlay.addEventListener('click', function(e){overlayClickHandler(e, activeClass)});
modalInit(modalsButton, "data-btn-modal", activeClass);

innerButtonModal && innerButtonModal.map(function(btn){
  btn.addEventListener('click', function(e){
    e.preventDefault();
    const currentModalId = e.target.getAttribute('data-btn-inner');
    const curentModal = overlay.querySelector(`[data-popup="${currentModalId}"]`);
    removeClassInArray(modals, activeClass);
    addCustomClass(overlay, activeClass);
    addCustomClass(curentModal, activeClass);
    innerButton = overlay.querySelector(`${'[data-popup]'}.${activeClass} .close`);
  })
})