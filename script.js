const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

function send(onError, onSuccess, url, method = 'GET', data = '', headers = {}, timeout = 60000) {
 
  let xhr;

  if (window.XMLHttpRequest) {
    // Chrome, Mozilla, Opera, Safari
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) { 
    // Internet Explorer
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  for([key, value] of Object.entries(headers)) {
    xhr.setRequestHeader(key, value)
  }

  xhr.timeout = timeout; 

  xhr.ontimeout = onError;

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if(xhr.status < 400) {
        onSuccess(xhr.responseText)
      } else if (xhr.status >= 400) {
        onError(xhr.status)
      }
    }
  }

  xhr.open(method, url, true);

  xhr.send(data);
}

function getCounter() {
  let last = 0;

  return () => ++last;
}


function getCounter() {
  let last = 0;

  return () => ++last;
}

const stackIDGenrator = getCounter()


class Good {
  constructor({id, title, price}) {
    this.id = id;
    this.title = title;
    this.price = price;
  }

  getId() {
    return this.id;
  }

  getPrice() {
    return this.price;
  }

  getTitle() {
    return this.title;
  }
}

class GoodStack {
  constructor(good) {
    this.id = stackIDGenrator();
    this.good = good;
    this.count = 1;
  }

  getGoodId() {
    return this.good.id
  }

  getGood(){
    return this.good;
  }

  getCount() {
    return this.count;
  }

  getPrice() {
    return this.good.price * this.count
  }

  add() {
    this.count++;
    return this.count;
  }

  remove() {
    this.count--;
    return this.count;
  }
}

// Товары на витрине.
class Cart {
  constructor(){
    this.list = []
  }

  add(good) {
    const idx = this.list.findIndex((stack) => stack.getGoodId() == good.id)

    if(idx >= 0) {
      this.list[idx].add()
    } else {
      this.list.push(new GoodStack(good))
    }
  
  }

  remove(id) {
    const idx = this.list.findIndex((stack) => stack.getGoodId() == id)

    if(idx >= 0) {
      this.list[idx].remove()

      if(this.list[idx].getCount() <= 0) {
        this.list.splice(idx, 1)
      }
    } 

  }
}
// Витрина.
class Showcase {
  constructor(cart){
    this.list = [];
    this.cart = cart;
  }

  _onSuccess(response) {
    const data = JSON.parse(response)
    data.forEach(product => {
      this.list.push(
        new Good({id: product.id_product, title:product.product_name, price:product.price})
      )
    });
    renderGoodsList();
    console.log(showcase, cart)
    const $clickAdd = document.querySelectorAll('.addCart');

    $clickAdd.forEach((elem)=>{ 
    elem.addEventListener('click', () =>{
    const id = +event.target.dataset.id;
    showcase.addToCart(id);
    if (!event.target.closest('.addCart')) {
      return;
    }
    if (!(id in cart)) {
      renderProductInBasket(id);
    }

  })
})
  }

  _onError(err) {
    console.log(err);
  }

  fetchGoods() {
    send(this._onError, this._onSuccess.bind(this), `${API_URL}catalogData.json`)
  }

  addToCart(id) {
    const idx = this.list.findIndex((good) => id == good.id);
    if(idx >= 0) {
      this.cart.add(this.list[idx]);
     // send(this._onError, this._onSuccesstwo.bind(this, id), `${API_URL}addToBasket.json`)
    }
  }
}

 function render(item){
   return `<div  class = "cart" style="color: red; border: solid;margin-left : 20px; border-color: purple;
   padding-left:10px; margin-top:20px;"
   class="goods-item"><h3 style="color: green;
    margin-right:10px">${item.title}</h3>
   <p>${item.price}</p>
   <button data-id="${item.id}" class = "addCart";>AddCart</button></div>`;
  }
const renderGoodsList = (list = showcase.list) => {
  let goodsList = list.map((item) =>  {
              return  render(item)
          }
      ).join('');

      $goodsList.insertAdjacentHTML('beforeend', goodsList);
}
const basket = {};
const $BasketList = document.querySelector('.basketTotal');
const $goodsList = document.querySelector('.goods-list');
const basketCounterEl = document.querySelector('.cartIconWrap span');
const basketTotalEl = document.querySelector('.basketTotal');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketEl = document.querySelector('.basket');
const $clickBasket = document.querySelector('.cart-button').addEventListener('click', () => {
  document.querySelector('.basket').classList.toggle('hide');
} ); 
const cart = new Cart()
const showcase = new Showcase(cart)

const $clickAdd = document.querySelectorAll('.addCart');

$clickAdd.forEach((elem)=>{ 
  elem.addEventListener('click', () =>{
    const id = +event.target.dataset.id;
    showcase.addToCart(id);
    if (!event.target.closest('.addCart')) {
      return;
    }
    if (!(id in cart)) {
      renderProductInBasket(id);
    }

  })
})
function renderProductInBasket(productId) {
  // Получаем строку в корзине, которая отвечает за данный продукт.
  const basketRowEl = basketEl
    .querySelector(`.addCart[data-productId="${productId}"]`);
  // Если такой строки нет, то отрисовываем новую строку.
  if (!basketRowEl) {
    renderNewProductInBasket(productId);
    return;
  }

  // Получаем данные о продукте из объекта корзины, где хранятся данные о всех
  // добавленных продуктах.
  const product = basket[productId];
  // Ставим новое количество в строке продукта корзины.
  basketRowEl.querySelector('.productCount').textContent = product.count;
  // Ставим нужную итоговую цену по данному продукту в строке продукта корзины.
  basketRowEl
    .querySelector('.productTotalRow')
    .textContent = (product.price * product.count).toFixed(2);
}

function renderNewProductInBasket(productId) {
  let z ;

  cart.list.forEach((elem)=>{ 
    for ( let i = 0;i < showcase.list.length;++i){
    if (elem.good.id === productId){
       z = elem;
    }
  }
  i=0;
});
 
  const productRow = `
    <div class="basketRow" data-productId="${productId}">
      <div>${z.good.title}</div>
      <div>
        <span class="productCount">${z.count}</span> шт.
      </div>
      <div>$${z.good.price}</div>
      <div>
        $<span class="productTotalRow">${(z.good.price * z.count).toFixed(2)}</span>
      </div>
      <div>
      <button data-id="${productId}" class = "dell";>Delite</button>
      </div>
    </div>
    `;
    $BasketList.insertAdjacentHTML("beforebegin", productRow);
   
}

/**
 * Отрисовывает в корзину информацию о продукте.
 * @param {number} productId - Id продукта.
 */
 function renderProductInBasket(productId) {
  let sumall = 0;
  // Получаем строку в корзине, которая отвечает за данный продукт.
  const basketRowEl = basketEl
    .querySelector(`.basketRow[data-productId="${productId}"]`);
  // Если такой строки нет, то отрисовываем новую строку.
  if (!basketRowEl) {
    renderNewProductInBasket(productId);
    cart.list.forEach((elem)=>{ 
      sumall = sumall + (elem.good.price * elem.count);
      });
      sumall= Number(sumall);
      sumall = sumall.toFixed(2);
      basketTotalValueEl.textContent = sumall;
      const $Dell = document.querySelectorAll('.dell');
      $Dell.forEach((elem)=>{ 
      elem.addEventListener('click', () =>{
      elem.parentNode.parentNode.remove();
      })
      })
    return 
  }

  const rm = document.querySelector(`.basketRow[data-productId="${productId}"]`);
  rm.remove();
  renderNewProductInBasket(productId);
   cart.list.forEach((elem)=>{ 
    sumall = sumall + (elem.good.price * elem.count);
    });
    sumall= Number(sumall);
    sumall = sumall.toFixed(2);
    basketTotalValueEl.textContent = sumall;
}


showcase.fetchGoods();
renderGoodsList();


