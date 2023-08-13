import vars from "../_vars";
import { addCustomClass, removeCustomClass } from "../functions/customFunctions";
const { form } = vars;
import { modalClickHandler } from "./modals";

const btn = form.querySelector('.main-button');

const itemLength = document.querySelectorAll('.form-list__item').length+1;
const errorWrapeer = document.querySelector('.error');

btn.addEventListener('click' , function(e){
    e.preventDefault();

    const data = {};
    const errorArray = [];

    for(let i=1; i < itemLength; i++){
      const value = getCurrentValue(`ques${i}`);
      // console.log(value);
      if(value !== undefined){
        data[`question_${i}`] = value;
        // localStorage.setItem("testResault", JSON.stringify(data));
        
      } else {
        errorArray.push(i);

        // console.log(errorArray);
      }
    }

    if(errorArray.length){
      printError(errorArray);
      return
    }
    modalClickHandler('entry', 'active');
    console.log(data);
})

function printError(array){
  // console.log(array);
  errorWrapeer.querySelector('span').innerHTML = array;
  addCustomClass(errorWrapeer, 'show')

  setTimeout(function(){
    removeCustomClass(errorWrapeer, 'show')
  }, 3000)
}

function getCurrentValue(name){
  const inputs = document.getElementsByName(name);

  for (const input of inputs) {
    if(input.checked){

      switch(input.value){
        case '1':
          return 'Так';
          break;

        case '2':
          return 'Важко відповісти';
          break;

        case '3':
          return 'Ні';
          break;

        default:
          return null; 
      }     
    }
  }
}






