import vars from "../_vars";
const { form } = vars;

form.addEventListener('submit', function(e){
    e.preventDefault();
  const data = new FormData(form);
  //const req = new XMLHttpRequest();
  //req.open('POST', 'http://example.com');
  //req.send(data);

  console.log(getQueryString(data))
})

function getQueryString(formData){
  let pairs = [];

  for (let [key, value] of formData.entries()) {
    pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
  }
  return pairs.join('&');
}




