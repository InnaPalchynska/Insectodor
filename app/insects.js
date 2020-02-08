window.onload = function(){

let cart = {};
let goods = {};

function loadCart(){
    if (localStorage.getItem('cart') != undefined){
        cart = JSON.parse(localStorage.getItem('cart'));
    }
};

loadCart();

function insectsLoad(){
    fetch('https://spreadsheets.google.com/feeds/list/1D6SsLsIU3vL_Fhb4EA43OKTbJ30Se06h9t9pN4DdzhM/od6/public/values?alt=json').then(resp=>resp.json()).then(data=>{
        data = data['feed']['entry'];
        goods = arrayHelper(data);
        data.forEach(insect=>{
              root.innerHTML += `
              <div class="card" style="width: 18rem;">
          <img src="${insect.gsx$image.$t}" class="card-img-top" alt="insect" width=300 height=200>
          <div class="card-body">
              <h5 class="card-title">${insect.gsx$name.$t} </h5>
              <p class="card-text">${insect.gsx$time.$t}</p>
              <p class="card-text">Ловушку выставлять на высоте ${insect.gsx$hight.$t} м над землей</p>
              <button class='btn' name='calcQty' data-id=${insect.gsx$id.$t}>Рассчитать</button>
          </div>
          </div>`;  
          });  
        
        console.log(data);
        console.log(goods);
        showCard();
        
    });
}

insectsLoad();
// showCard();
// loadCart();


document.addEventListener('click', function(ev){
    //  console.log(ev.target);
     if (ev.target.classList.contains('btn')) {
         console.log(ev.target.dataset.id);
         addToCart (ev.target.dataset.id);        
         console.log(ev.target.attributes.name.nodeValue);             
        swal("Введите площадь поля в гектарах:", {
            content: "input",
          })
          .then((value) => {
            let traps = Math.floor(value/goods[ev.target.dataset.id]['trapping']);
            // console.log(traps);
            swal(`Вам нужно: ${traps} ловушек`);
            });                
        }else if(ev.target.classList.contains('deleteGoods')){
            delete cart[ev.target.attributes.data.nodeValue]; 
            // console.log(ev.target.attributes.data.nodeValue);
            showCard();
            localStorage.setItem('cart', JSON.stringify(cart));
        }else if(ev.target.classList.contains('plusGoods')){
            cart[ev.target.attributes.data.nodeValue]++; 
            showCard();
            localStorage.setItem('cart', JSON.stringify(cart));
        }else if(ev.target.classList.contains('minusGoods')){
            (cart[ev.target.attributes.data.nodeValue] >= 2) ? cart[ev.target.attributes.data.nodeValue]-- : delete cart[ev.target.attributes.data.nodeValue];
            showCard();
            localStorage.setItem('cart', JSON.stringify(cart));
        }        
     

    //  if (ev.target.attributes.name.nodeValue == 'calcQty') {
    //      console.log('jjjjj');

    //  }else{
    //      console.log('111111');
    //  }
}) 

function addToCart(elem){
    if (cart[elem] !== undefined){
        cart[elem]++;
        
    }else{
        cart[elem]=1;
    }
    console.log(cart);
    showCard();
    localStorage.setItem('cart', JSON.stringify(cart));
 }

 function arrayHelper(arr){ 
     let out = {};
     arr.forEach(element => {
         let temp = {};
         temp['name'] = element.gsx$name.$t;
         temp['hight'] =element.gsx$hight.$t;
         temp['time'] = element.gsx$time.$t;
         temp['info'] = element.gsx$info.$t;
         temp['monitoring'] = element.gsx$monitoring.$t;
         temp['trapping'] = element.gsx$trapping.$t;
         temp['cost'] = element.gsx$cost.$t;
        //  temp['trap'] = 0;
         out[element.gsx$id.$t] = temp;
     });
     return out;
 }

 function showCard(){
    let ul = document.querySelector('.cart');
    ul.innerHTML = ' ';
    let sum = '';
    for (let key in cart) {
        let li = '<li>';
        li += goods[key]['name'] + ' ';
        li += ` <button class='minusGoods' name='minusGoods' data=${key}>-</button> `;
        li += cart[key] + ' шт. ';
        li += ` <button class='plusGoods' name='plusGoods' data=${key}>+</button> `;
        li += goods[key]['cost']*cart[key] +' грн.';
        li += ` <button class='deleteGoods' name='deleteGoods' data=${key}>x</button>`;
        li += '</li>';
        sum += goods[key]['cost']*cart[key] +' грн.';
        ul.innerHTML += li;            
        }
        (sum >= 0) ? ul.innerHTML += "Ваша корзина пуста" : ul.innerHTML += "Итого: " + sum;          
    }

 

 


// let calcQty = document.getElementById('button');
// calcQty.addEventListener('click', function(){
   
// });

// function fetchTxt(){
//     fetch('https://spreadsheets.google.com/feeds/list/1D6SsLsIU3vL_Fhb4EA43OKTbJ30Se06h9t9pN4DdzhM/od6/public/values?alt=json').then(resp => resp.text()).then(data=> console.log(data));
// }

//  Показать полупрозрачный DIV, чтобы затенить страницу
//     (форма располагается не внутри него, а рядом, потому что она не должна быть полупрозрачной)
//     function showCover() {
//         let coverDiv = document.createElement('div');
//         coverDiv.id = 'cover-div';
  
//         // убираем возможность прокрутки страницы во время показа модального окна с формой
//         document.body.style.overflowY = 'hidden';
  
//         document.body.append(coverDiv);
//       }
  
//       function hideCover() {
//         document.getElementById('cover-div').remove();
//         document.body.style.overflowY = '';
//       }
  
//       function showPrompt(text, callback) {
//         showCover();
//         let form = document.getElementById('prompt-form');
//         let container = document.getElementById('prompt-form-container');
//         document.getElementById('prompt-message').innerHTML = text;
//         form.text.value = '';
  
//         function complete(value) {
//           hideCover();
//           container.style.display = 'none';
//           document.onkeydown = null;
//           callback(value);
//         }
  
//         form.onsubmit = function() {
//           let value = form.text.value;
//           if (value == '') return false; // игнорируем отправку пустой формы
  
//           complete(value);
//           return false;
//         };
  
//         form.cancel.onclick = function() {
//           complete(null);
//         };
  
//         document.onkeydown = function(e) {
//           if (e.key == 'Escape') {
//             complete(null);
//           }
//         };
  
//         let lastElem = form.elements[form.elements.length - 1];
//         let firstElem = form.elements[0];
  
//         lastElem.onkeydown = function(e) {
//           if (e.key == 'Tab' && !e.shiftKey) {
//             firstElem.focus();
//             return false;
//           }
//         };
  
//         firstElem.onkeydown = function(e) {
//           if (e.key == 'Tab' && e.shiftKey) {
//             lastElem.focus();
//             return false;
//           }
//         };
  
//         container.style.display = 'block';
//         form.elements.text.focus();
//       }
  
//       document.getElementById("button").onclick = function() {
//         showPrompt("Введите что-нибудь<br>...умное :)", function(value) {
//           alert("Вы ввели: " + value);
//         });
//       };
 }