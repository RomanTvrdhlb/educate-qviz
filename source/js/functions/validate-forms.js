import JustValidate from 'just-validate';
import Inputmask from "inputmask";

const currentForm = document.querySelector('.main-form:not([data-page="ortodontiya"])');
const defaultForm = document.querySelector('.main-form[data-page="ortodontiya"]');
const currentFormBtn = document.querySelector('.main-form .submit');

export const validateForms = (selector, rules, afterSend) => {
  const form = document?.querySelector(selector);
  const telSelector = form?.querySelector('input[type="tel"]');

  if (!form) {
    console.error('Нет такого селектора!');
    return false;
  }

  if (!rules) {
    console.error('Вы не передали правила валидации!');
    return false;
  }

  if (telSelector) {
    const inputMask = new Inputmask({
    mask: '38 (999) 999 99 99',
    placeholder: '_'
  });
    inputMask.mask(telSelector);

    for (let item of rules) {
      if (item.tel) {
        item.rules.push({
          rule: 'function',
          validator: function() {
            const phone = telSelector.inputmask.unmaskedvalue();
            return phone.length === 10;
          },
          errorMessage: item.telError
        });
      }
    }
  }

  const validation = new JustValidate(selector);

  for (let item of rules) {
    validation.addField(item.ruleSelector, item.rules);
  }

  validation.onSuccess((e) => {
      if (currentForm) {




        let flag = true;

        const verificationCode = generateCode();

        function generateCode() {
          let code = '';
          for (var i = 0; i < 4; i++) {
            let digit = Math.floor(Math.random() * 10);
            code += digit;
          }
          return code;
        }


        function hiddenFields() {
          currentForm.querySelectorAll('.main-form__row:not(.hidden-row)').forEach(function (item) {
            item.style.display = "none"
          });

          document.querySelector('.info-text').style.display = "none";
        }

        function checkCode() {
          currentFormBtn.style.opacity = '0.5';
          currentForm.querySelector('.main-form__row.hidden-row').style.display = "flex"
          console.log(verificationCode)

          currentForm.querySelector('.input-code').addEventListener('input', function () {
            if (currentForm.querySelector('.input-code').value === verificationCode) {
              currentFormBtn.disabled = false;
              currentFormBtn.style.opacity = '1';

              currentForm.querySelector('.input-code').previousElementSibling.innerText = 'Введено правильний код!'


              if (flag === false) {
                currentFormBtn.addEventListener('click', function () {
                  let formData = new FormData(currentForm);

                  let xhr = new XMLHttpRequest();
                  xhr.open('POST', 'mail.php', true);

                  xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                      if (xhr.status === 200) {
                        const pageName = document.querySelector('.main-form').getAttribute('data-page');
                        window.location.href = `${pageName}_success.html`;
                      } else {
                        console.error("Ошибка при отправке данных:", xhr.status);
                      }
                    }
                  };

                  xhr.send(formData);
                  currentForm.reset();
                })
              }


            } else {
              currentForm.querySelector('.input-code').previousElementSibling.innerText = 'Будь ласка, введіть правильный код!'
              currentFormBtn.disabled = true;
              currentFormBtn.style.opacity = '0.5';
            }
          })
        }

        if (flag === true) {



          (function() {
            e.preventDefault()
            currentFormBtn.disabled = true;
            flag = false;

            const phoneNumber = currentForm.querySelector('input[type="tel"]').value.replace(/\D/g, "");

            const data = {
              phone: [`${phoneNumber}`],
              message: `Код перевірки: ${verificationCode}`,
              src_addr: "BigSales"
            }

            let xhr = new XMLHttpRequest();
            xhr.open('POST', 'sms.php', true);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onreadystatechange = function () {
              if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                  currentFormBtn.disabled = true;

                  hiddenFields();
                  checkCode();


                } else {
                  console.error("Ошибка при отправке данных:", xhr.status);
                }
              }
            };

            xhr.send(JSON.stringify(data));
          })();
        }
      }

      if (defaultForm) {
        let formData = new FormData(defaultForm);

        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              if (afterSend) {
                afterSend();
              }
              console.log('status 200');
            }
          }
        }

        xhr.open('POST', 'mail.php', true);
        xhr.send(formData);

        defaultForm.reset();
      }

  })

};
