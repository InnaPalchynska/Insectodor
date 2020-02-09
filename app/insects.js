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
        // let searchData = data;
        renderCards(data);
        // document.addEventListener('input', function(ev) {
        //     if(ev.target.classList.contains('form-control')){
        //         let name = document.getElementById("search").value;
        //         name = name.toLowerCase();
        //         console.log(name);
        //         searchData = data.filter(el=>el.gsx$name.$t.toLowerCase().includes(name));
        //         renderCards(searchData);
        //         console.log(searchData);
        //     }else{
        //         renderCards(data);
        //     }
        // })
        // data.forEach(insect=>{
        //       root.innerHTML += `
        //       <div class="card" style="width: 18rem;">
        //   <img src="${insect.gsx$image.$t}" class="card-img-top" alt="insect" width=300 height=200>
        //   <div class="card-body">
        //       <h5 class="card-title">${insect.gsx$name.$t} </h5>
        //       <p class="card-text"><b>Час ставити пастку: </b>${insect.gsx$time.$t}</p>
        //       <p class="card-text"><b>Пастку виставляти на висоті </b>${insect.gsx$hight.$t} м над землею</p>
        //       <p class="card-text"><b>Ціна за комплект: </b>${insect.gsx$cost.$t} грн.</p>
        //       <button class='btn' name='calcQty' data-id=${insect.gsx$id.$t}>Рассчитать</button>
        //   </div>
        //   </div>`;  
        //   });  
       
        
        
        // console.log(goods);
        showCart();
        console.log(cart);
        
    });
    }

insectsLoad();
// showCart();
// loadCart();
console.log(goods);


function renderCards (data){
    data.forEach(insect=>{
        root.innerHTML += `
        <div class="card" style="width: 18rem;">
    <img src="${insect.gsx$image.$t}" class="card-img-top" alt="insect" width=300 height=200>
    <div class="card-body">
        <h5 class="card-title">${insect.gsx$name.$t} </h5>
        <p class="card-text"><b>Час ставити пастку: </b>${insect.gsx$time.$t}</p>
        <p class="card-text"><b>Пастку виставляти на висоті </b>${insect.gsx$hight.$t} м над землею</p>
        <p class="card-text"><b>Ціна за комплект: </b>${insect.gsx$cost.$t} грн.</p>
        <button class='btn' name='calcQty' data-id=${insect.gsx$id.$t}>Рассчитать</button>
    </div>
    </div>`;  
    });
} 



document.addEventListener('click', function(ev){
    //  console.log(ev.target);
     if (ev.target.classList.contains('btn')) {
         console.log(ev.target.dataset.id);
        //  addToCart (ev.target.dataset.id);        
         console.log(ev.target.attributes.name.nodeValue);             
        swal("Введите площадь поля в гектарах:", {
            content: "input",
          })
          .then((value) => {
            let traps = Math.floor(value/goods[ev.target.dataset.id]['trapping']);
            (traps <= 0) ? traps = 1 : traps = traps;
            // console.log(traps);
            swal(`Вам нужно: ${traps} ловушек`);
            addToCart (ev.target.dataset.id, traps);
            // if (traps >0){
            //     addToCart (ev.target.dataset.id, traps);
            // }else{
            //     alert('Malo');
            // }
            });                
        }else if(ev.target.classList.contains('deleteGoods')){
            delete cart[ev.target.attributes.data.nodeValue]; 
            // console.log(ev.target.attributes.data.nodeValue);
            showCart();
            localStorage.setItem('cart', JSON.stringify(cart));
        }else if(ev.target.classList.contains('plusGoods')){
            cart[ev.target.attributes.data.nodeValue]++; 
            showCart();
            localStorage.setItem('cart', JSON.stringify(cart));
        }else if(ev.target.classList.contains('minusGoods')){
            (cart[ev.target.attributes.data.nodeValue] >= 2) ? cart[ev.target.attributes.data.nodeValue]-- : delete cart[ev.target.attributes.data.nodeValue];
            showCart();
            localStorage.setItem('cart', JSON.stringify(cart));
        }else if(ev.target.classList.contains('btn-order')){
            let arrForSend = {};
    for (let key in cart ){
        let temp = {};
        temp.name = goods[key]['name'];
        temp.cost = goods[key]['cost'];
        arrForSend[key] = temp;}
            let senData = {
                phone: document.getElementById('user_phone').value,
                cart: arrForSend,                
            };
            console.log(senData);

           fetch("php/telegram.php",
           {
               method: "POST",
               body: JSON.stringify(senData)
           })
           .then(function (res) {
               console.log(res);
               if (res) {
                   alert('Succses');
               }else{
                   alert('Error');
               }
           })
        }

    //  if (ev.target.attributes.name.nodeValue == 'calcQty') {
    //      console.log('jjjjj');

    //  }else{
    //      console.log('111111');
    //  }
}) 


// document.addEventListener('input', function(ev) {

//     if(ev.target.classList.contains('form-control')){
//         insectsLoad();
//         let name = document.getElementById("search").value;
//         // search(name);
//         name = name.toLowerCase();
//         console.log(name);
        // insectsLoad(name);
        // data.filter(name=>name.insect.gsx$name.$t.toLowerCase().includes(name));  
        // console.log(data);
       
        // data.forEach(insect=>{
        //     root.innerHTML += `
        //     <div class="card" style="width: 18rem;">
        // <img src="${insect.gsx$image.$t}" class="card-img-top" alt="insect" width=300 height=200>
        // <div class="card-body">
        //     <h5 class="card-title">${insect.gsx$name.$t} </h5>
        //     <p class="card-text"><b>Час ставити пастку: </b>${insect.gsx$time.$t}</p>
        //     <p class="card-text"><b>Пастку виставляти на висоті </b>${insect.gsx$hight.$t} м над землею</p>
        //     <p class="card-text"><b>Ціна за комплект: </b>${insect.gsx$cost.$t} грн.</p>
        //     <button class='btn' name='calcQty' data-id=${insect.gsx$id.$t}>Рассчитать</button>
        // </div>
        // </div>`;  
//         // });
//     }

// }) 

// function search(){
//     document.addEventListener('input', function(ev) {

//         if(ev.target.classList.contains('form-control')){
//             let name = document.getElementById("search").value;
           
//             name = name.toLowerCase();
          
//             return name;
            
//         }
    
//     }) 
     
// }

// function arrayForSend(){
//     let arrForSend = {};
//     for (let key in cart ){
//         let temp = {};
//         temp.name = goods[key]['name'];
//         temp.cost = goods[key]['cost'];
//         arrForSend[key] = temp;
//     }
//     // console.log(arrForSend);
//     return arrForSend;
// }



            

function addToCart(elem, traps){
    if (cart[elem] !== undefined) {
       cart[elem] += traps;
        
    }else{
        cart[elem] = traps;
    }
    // console.log(cart);
    showCart();
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

 function showCart(){
    let ul = document.querySelector('.cart');
    ul.innerHTML = ' ';
    let sum = 0;
    let cost = 0;
    for (let key in cart) {
        let li = '<li>';
        li += goods[key]['name'] + ' ';
        li += ` <button class='minusGoods' name='minusGoods' data=${key}>-</button> `;
        li += cart[key] + ' шт. ';
        li += ` <button class='plusGoods' name='plusGoods' data=${key}>+</button> `;
        cost = parseFloat(goods[key]['cost']) * parseFloat(cart[key]);
        li += cost + ' грн.';
        li += ` <button class='deleteGoods' name='deleteGoods' data=${key}>x</button>`;
        li += '</li>';
        sum += cost;
        ul.innerHTML += li;            
        }
        // ul.innerHTML += "Итого: " + sum + ' грн.';
        (sum <= 0) ? ul.innerHTML += "Ваш кошик пустий, додайте щось..." : ul.innerHTML += "Итого: " + sum + ' грн.';          
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