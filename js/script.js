// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector('.navbar-nav');
// ketika hamburger menu di klik
document.querySelector('#hamburger-menu').onclick = () => {
  navbarNav.classList.toggle('active');
};


// Toggle clas active untu search-form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

document.querySelector('#search-button').onclick = () => {
  searchForm.classList.toggle('active');
  searchBox.focus();
  e.preventDefault();
};


// Toggle class active for shopping-cart
const shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart-button').onclick = (e) => {
  shoppingCart.classList.toggle('active');
  e.preventDefault(); 
};



//klik diluar elemen sidebar untuk menghilangkan nav dan search
const hamburger = document.querySelector('#hamburger-menu');
const sb = document.querySelector('#search-button');
const sc = document.querySelector('#shopping-cart-button');

document.addEventListener('click', function(e) {
    if(!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }

    if(!sb.contains(e.target) && !searchForm.contains(e.target)) {
      searchForm.classList.remove('active');
  }
    if(!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
      shoppingCart.classList.remove('active');
  }
});



// Modal Box 

const itemDetailmodal = document.querySelector('#item-detail-modal');
const itemDetailButton = document.querySelector('.item-detail-button');


itemDetailButton.onclick = (e) => {
  itemDetailmodal.style.display = 'flex';
  e.preventDefault();
};



// Klik tombol close modal box
document.querySelector('.modal .close-icon').onclick = (e) => {
  itemDetailmodal.style.display = 'none';
  e.preventDefault();
}


// klik diluar (modalbox)
const modal = document.querySelector('#item-detail-modal');
window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
};




