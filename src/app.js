// document.addEventListener('alpine:init', () =>{
//     alpine.data('products', () => ({
//         items: [
//             { id: 1, name: 'Robusta brazil', img: '1.jpg', price: 20000 },
//             { id: 1, name: 'Arabica blend', img: '2.jpg', price: 25000 },
//             { id: 1, name: 'Primo passo', img: '3.jpg', price: 30000 },
//             { id: 1, name: 'Aceh gayo', img: '4.jpg', price: 35000 },
//             { id: 1, name: 'sumatra Mandheling', img: '5.jpg', price: 40000 },
//         ],
//     }));
// });\

document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Robusta Brazil", jpg: "1.jpg", price: 40000 },
      { id: 2, name: "Arabica Blend", jpg: "2.jpg", price: 45000 },
      { id: 3, name: "Primo Passo", jpg: "3.jpg", price: 50000 },
      { id: 4, name: "Aceh Gayo", jpg: "4.jpg", price: 55000 },
      { id: 5, name: "Sumatra Mandheling", jpg: "5.jpg", price: 60000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      //cek apakah ada barang yang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      //jika belum ada / cart masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart
        this.items = this.items.map((item) => {
          //jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            //jika barang sudah ada, tambah quantity dan totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      //ambil item yang mau diremove berdasarkan id nya
      const cartItem = this.items.find((item) => item.id === id);

      //jika item lebih dari satu
      if (cartItem.quantity > 1) {
        //terlusuri 1 per 1
        this.items = this.items.map((item) => {
          //jika bukan barang yang diklik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        //jika barangny sisa satu
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// form validation
// const checkoutButton = document.querySelector('.checkout-button');
// checkoutButton.disabled = true;

// const form = document.querySelector('#checkoutForm');

// form.addEventListener('keyup', function () {
//   for (let i = 0; i < form.elements.length; i++) {
//     if (form.elements[i].value.length !== 0) {
//       checkoutButton.classList.remove('disabled');
//       checkoutButton.classList.add('disabled');
//     } else {
//       return false;
//     }
//   }
//   checkoutButton.disabled = false;
//   checkoutButton.classList.remove('disabled');
// });

const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
  let allFilled = true;
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].type !== "submit" && form.elements[i].value === "") {
      allFilled = false;
      break;
    }
  }

  if (allFilled) {
    checkoutButton.disabled = false;
    checkoutButton.classList.remove("disabled");
  } else {
    checkoutButton.disabled = true;
    checkoutButton.classList.add("disabled");
  }
});

// //kirim data ketika tombol checkout di klik
// checkoutButton.addEventListener("click", function (e) {
//   e.preventDefault();
//   const formData = new FormData(form);
//   const data = new URLSearchParams(formData);
//   const objData = Object.fromEntries(data);
//   const message = formatMessage(objData);
//   window.open('https://wa.me/6287791893527?text=' + encodeURIComponent(message));
// });

// //format pesan whatsapp
// const formatMessage = (obj) => {
//   return `Data Customer
//     nama: ${obj.name}
//     Email: ${obj.email}
//     No Hp: ${obj.phone}
// Data Pesanan
//   ${JSON.parse(obj.items).map((item) => `$(item.name) (${item.quantity} x ${rupiah(item.total)}) \n`)}
// TOTAL: ${rupiah(obj.total)}
// Terima Kasih`;
// };



// Kirim data ketika tombol checkout diklik
checkoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const message = formatMessage(data);
  window.open('https://wa.me/6287791893527?text=' + encodeURIComponent(message));
});

// Format pesan WhatsApp
const formatMessage = (obj) => {
  const items = JSON.parse(obj.items);
  const itemList = items.map(item => `${item.name} (${item.quantity} x ${rupiah(item.total)})`).join('\n');

  return `Data Customer
    Nama: ${obj.name}
    Email: ${obj.email}
    No Hp: ${obj.phone}
Data Pesanan
${itemList}
\nTOTAL: ${rupiah(obj.total)}
Terima Kasih`;
};



// konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: "0",
  }).format(number);
};
