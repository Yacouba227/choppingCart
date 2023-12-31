console.log(contenu);

const storeItems = document.getElementById("store-items");
const afficheProduit = (contenu) => {
  contenu.forEach((element) => {
    storeItems.innerHTML += `
        <div id="essaie" class="col-10 col-sm-6 col-lg-4 mx-auto my-3 store-item sweets" data-item=${element.name}>
        <div class="card ">
        <span id="iconsStar">
          <span class="lol"><i class="fa-solid fa-star"></i></span>
          <span class="lol"><i class="fa-solid fa-star"></i></span>
          <span class="lol"><i class="fa-solid fa-star"></i></span>
          <span class="lol"><i class="fa-solid fa-star"></i></span>
          <span class="lol"><i class="fa-solid fa-star"></i></span>
        </span>
          <div class="img-container">
            <img src=${element.url} class="card-img-top store-img" alt="">
            <span class="store-item-icon">
              <i class="fas fa-shopping-cart"></i>
            </span>
          </div>
          <div class="card-body">
            <div class="card-text d-flex justify-content-between text-capitalize">
              <h5 id="store-item-name">${element.libelle}</h5>
              <h5 class="store-item-value">$ <strong id="store-item-price" class="font-weight-bold">${element.prix}</strong></h5>
  
            </div>
          </div>
  
  
        </div>
        <!-- end of card-->
      </div>
        `;
    
  });
};
afficheProduit(contenu);

//----------------------------------//

//-------------------------------------//
function etoile(){
  let iconsStar = document.querySelectorAll('#iconsStar');
  iconsStar.forEach((element, elementSecond) => {
    const starColor = [...element.children].filter(test => test.className === "lol");
    starColor.forEach((star, index1) => {
      star.addEventListener("click", () => {
            starColor.forEach((param, index2) => {
              index1 >= index2 ? param.classList.add('couleur') : param.classList.remove('couleur')
            });
            //Enregistrement des etoiles dans e localStorase pour chaque card
            const starColored = Array.from(starColor).map(starColor => starColor.classList.contains('couleur'));
            localStorage.setItem(`starData-${elementSecond}`, JSON.stringify(starColored));
          });
          // Recupere et initialise les etoile depuis le localStorage
          const cardStar = JSON.parse(localStorage.getItem(`starData-${elementSecond}`));
          if (cardStar && cardStar.length === starColor.length) {
            if (cardStar[index1]) {
              star.classList.add('couleur');
            }else{
              star.classList.remove('couleur');
            }
          }
    });
  });
}
etoile();

//***************************** */

//**************************** */

// let iconsStar = document.querySelectorAll('#iconsStar i');
// iconsStar.forEach((star, index1) => {
//   star.addEventListener("click", () => {
//     console.log('====================================');
//     console.log(index1);
//     console.log('====================================');
//   })
// });

const allBtn = document.getElementById("allBtn");
const cakeBtn = document.getElementById("cakeBtn");
const cupcakeBtn = document.getElementById("cupcakeBtn");
const sweetsBtn = document.getElementById("sweetsBtn");
const doughnutBtn = document.getElementById("doughnutBtn");

allBtn.addEventListener("click", () => {
  storeItems.innerHTML = "";
  afficheProduit(contenu);
});
cakeBtn.addEventListener("click", () => {
  const cake = contenu.filter((element) => element.libelle == "cake item");
  storeItems.innerHTML = "";
  afficheProduit(cake);
});
cupcakeBtn.addEventListener("click", () => {
  const cupcake = contenu.filter(
    (element) => element.libelle == "cupcake item"
  );
  storeItems.innerHTML = "";
  afficheProduit(cupcake);
});
sweetsBtn.addEventListener("click", () => {
  const sweet = contenu.filter((element) => element.libelle == "sweet item");
  storeItems.innerHTML = "";
  afficheProduit(sweet);
});
doughnutBtn.addEventListener("click", () => {
  const doughnut = contenu.filter(
    (element) => element.libelle == "dougnut item"
  );
  storeItems.innerHTML = "";
  afficheProduit(doughnut);
});
//search
const search = document.getElementById("search-icon");
const inputSearch = document.getElementById("search-item");
search.addEventListener("click", () => {
  if (inputSearch.value == "All") {
    storeItems.innerHTML = "";
    afficheProduit(contenu);
  } else {
    const fil = contenu.filter(
      (element) =>
        element.libelle.toUpperCase() == inputSearch.value.toUpperCase()
    );
    storeItems.innerHTML = "";
    afficheProduit(fil);
  }
});

(function () {
  const cartInfo = document.getElementById("cart-info");
  const cart = document.getElementById("cart");
  cartInfo.addEventListener("click", function () {
    cart.classList.toggle("show-cart");
  });
})();
/* ------------------------------------------------ */
//////////////////////////////////////////////////////
////// La fonction qui permet de gerer le panier//////
//////////////////////////////////////////////////////
/* ------------------------------------------------ */
/* function affiche(){
  // Stockez les données dans le localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
} */

(function () {
  const cartBtn = document.querySelectorAll(".store-item-icon");
  cartBtn.forEach(function (btn) {
    //displayCart();
    btn.addEventListener("click", function (event) {
      //console.log(event.target);
      //displayCart();
      if (event.target.parentElement.classList.contains("store-item-icon")) {
        // Obtenez les données du produit
        let fullPath = event.target.parentElement.previousElementSibling.src;
        let pos = fullPath.indexOf("img") + 3;
        let partPath = fullPath.slice(pos);
        const item = {};
        item.img = `img-cart${partPath}`;
        let name =
          event.target.parentElement.parentElement.nextElementSibling
            .children[0].children[0].textContent;
        item.name = name;
        let price =
          event.target.parentElement.parentElement.nextElementSibling
            .children[0].children[1].textContent;
        let finalPrice = price.slice(1).trim();
        item.price = finalPrice;

        // Stockez les données dans le localStorage
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));

        // Affichez le message de confirmation
        batard();

        // Mettez à jour l'affichage du panier
        //displayCart();
        //document.location.reload();
        location.reload();
      }
    });
  });
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  //console.log(cart);
  //function affiche(){}
  // Fonction pour afficher le panier
  function displayCart() {
    const azerty = document.querySelector(".mol");
    const cartItems = document.createElement("div");
    cartItems.classList.add("cart-item");
    azerty.appendChild(cartItems);
    //const cartItems = document.getElementById("cart-items");

    if (cart.length === 0) {
      // Affichez un message si le panier est vide
      cartItems.innerHTML = "Le panier est vide.";
    } else {
      // Affichez les articles du panier
      let cartHTML = "";
      cart.forEach((item) => {
        cartHTML += `
        <div class="cart-item d-flex justify-content-between text-capitalize my-3">
        <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
        <div class="item-text">

          <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
          <span>$</span>
          <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
        </div>
        <a href="#" id='cart-item-remove' class="cart-item-remove">
          <i class="fas fa-trash"></i>
        </a>
      </div>`;
      });
      cartItems.innerHTML = cartHTML;
      showTotal(); // Appel de la fonction pour afficher le total
    }
  }
  displayCart();
  //////////////////////////////////////////
  function batard() {
    const confirm = document.querySelector(".info");
    confirm.classList.remove("info-none");
    setTimeout(() => {
      confirm.classList.add("info-none");
    }, 1000);
  }
  //////////////////////////////////////////
  //show total
  /* ------------------------------------------------ */
  //////////////////////////////////////////////////////
  //////// La fonction qui permet de calculer /////////
  //// le montant total et l'afficher dans le span /////
  //////////////////////////////////////////////////////
  //displayCart()
  //location.reload();
})();
/* ------------------------------------------------ */
function showTotal() {
  const total = [];
  const items = document.querySelectorAll(".cart-item-price");
  items.forEach(function (item) {
    total.push(parseFloat(item.textContent));
  });
  //console.log(total);
  const totalMoney = total.reduce(function (total, item) {
    total += item;
    return total;
  }, 0);
  const finalyMoney = totalMoney.toFixed(2);
  //console.log(finalyMoney);
  document.getElementById("cart-total").textContent = finalyMoney;
  document.querySelector(".item-total").textContent = finalyMoney;
  document.getElementById("item-count").textContent = total.length;
}

//Pour le bouttom "span"

// Sélectionnez tous les éléments avec la classe .btnClick
const btnClick = document.querySelectorAll(".btnClick");
// Sélectionnez tous les éléments avec la classe .store-item
const allStoree = document.querySelectorAll(".store-item");

// Ajoutez un écouteur d'événements à chaque bouton
for (let i = 0; i < btnClick.length; i++) {
  btnClick[i].addEventListener("click", filterPosts.bind(this, btnClick[i]));
}

// Fonction pour filtrer les articles en fonction du bouton cliqué
function filterPosts(item) {
  // Supprimez la classe 'active' de tous les boutons
  changeActivePosition(item);

  // Parcourez tous les éléments .store-item
  for (let i = 0; i < allStoree.length; i++) {
    const currentItem = allStoree[i];
    // Vérifiez si le bouton "All" a été cliqué
    if (item.getAttribute("data-filter") === "all") {
      currentItem.style.display = "block"; // Affichez tous les éléments
    } else if (
      currentItem.classList.contains(item.getAttribute("data-filter"))
    ) {
      currentItem.style.display = "block"; // Affichez l'élément correspondant
    } else {
      currentItem.style.display = "none"; // Masquez les éléments qui ne correspondent pas
    }
  }
}

// Fonction pour changer la classe 'active' du bouton actif
function changeActivePosition(activeItem) {
  for (let i = 0; i < btnClick.length; i++) {
    btnClick[i].classList.remove("active");
  }
  activeItem.classList.add("active");
}

// Supprimer tout le panier
const clearCartButton = document.getElementById("clear-cart");
clearCartButton.addEventListener("click", clearCart);
function clearCart() {
  // Supprimer les éléments du panier affichés à l'écran
  const cartItems = document.querySelector(".cart-item");
  cartItems.innerHTML = "";

  // Supprimer les éléments du panier dans le localStorage
  localStorage.removeItem("cart");

  // Réinitialiser le compteur d'articles et le total à zéro
  document.getElementById("item-count").textContent = "0";
  document.getElementById("cart-total").textContent = "0";
  document.querySelector(".item-total").textContent = "0";
}
//Pour chaque element du panier
const cartItems = document.querySelectorAll(".cart-item-remove");

cartItems.forEach((item) => {
  item.addEventListener("click", removeCartItem);
});
function removeCartItem(event) {
  // Obtenez l'élément parent du bouton "cart-item-remove" (c'est le div cart-item)
  const cartItem = event.target.parentElement.parentElement;
  console.log('///////////////////////////////////////');
  console.log(cartItem);
  console.log('///////////////////////////////////////');
  // Obtenez le nom de l'article que vous souhaitez supprimer
  const itemName = document.querySelector("#cart-item-title").textContent;

  // Supprimez l'élément du panier affiché à l'écran
  cartItem.remove();

  // Supprimez l'élément correspondant du localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const updatedCart = cart.filter((item) => item.name !== itemName);
  localStorage.setItem("cart", JSON.stringify(updatedCart));

  // Mettez à jour le total et le compteur d'articles
  showTotal();
}
///******************* */
