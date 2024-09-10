const products = [
  {
    id: 1,
    name: "Ração Seca para Cães",
    description: "Ração de alta qualidade para cães",
    image: "https://via.placeholder.com/100",
    price: "R$ 79,90",
  },
  {
    id: 2,
    name: "Ração Úmida para Gatos",
    description: "Ração úmida sabor salmão",
    image: "https://via.placeholder.com/100",
    price: "R$ 49,90",
  },
  {
    id: 3,
    name: "Brinquedo de Borracha para Cães",
    description: "Brinquedo resistente para roer",
    image: "https://via.placeholder.com/100",
    price: "R$ 29,90",
  },
  {
    id: 4,
    name: "Cama para Gatos",
    description: "Cama confortável e espaçosa",
    image: "https://via.placeholder.com/100",
    price: "R$ 119,90",
  },
  {
    id: 5,
    name: "Arranhador para Gatos",
    description: "Arranhador com várias alturas",
    image: "https://via.placeholder.com/100",
    price: "R$ 99,90",
  },
  {
    id: 6,
    name: "Coleira para Cães",
    description: "Coleira ajustável com estampa colorida",
    image: "https://via.placeholder.com/100",
    price: "R$ 19,90",
  },
];

const services = [
  {
    id: 1,
    name: "Banho para Cães",
    description: "Banho com produtos de alta qualidade",
    image: "https://via.placeholder.com/100",
    price: "R$ 39,90",
  },
  {
    id: 2,
    name: "Tosa Completa",
    description: "Tosa completa para todas as raças",
    image: "https://via.placeholder.com/100",
    price: "R$ 49,90",
  },
  {
    id: 3,
    name: "Corte de Unhas",
    description: "Serviço de corte de unhas seguro",
    image: "https://via.placeholder.com/100",
    price: "R$ 19,90",
  },
];

function renderProductCard(product) {
  return `
  <div class="card" style="width: 18rem;">
    <img src="${product.image}" class="card-img-top" alt="${product.name}">
    <div class="card-body">
      <h5 class="card-title">${product.name}</h5>
      <p class="card-text">${product.description}</p>
      <div class="product-button-box d-flex justify-content-between">
          <button class="cart-button product-button outlined-button btn">
              <img src="../assets/small-cart.svg" />
          </button>
          <button class="btn btn-primary product-button buy-button">
              Comprar
          </button>
      </div>
    </div>
  </div>
  `;
}

function filterItems() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchInput) ||
      product.description.toLowerCase().includes(searchInput)
  );
  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchInput) ||
      service.description.toLowerCase().includes(searchInput)
  );

  const isProductsVisible = !document
    .getElementById("products-container")
    .classList.contains("hidden");
  if (isProductsVisible) {
    renderProducts(filteredProducts);
  } else {
    renderServices(filteredServices);
  }
}

function renderServiceCard(service) {
  return `
  <div class="card" style="width: 18rem;">
    <img src="${service.image}" class="card-img-top" alt="${service.name}">
    <div class="card-body">
      <h5 class="card-title">${service.name}</h5>
      <p class="card-text">${service.description}</p>
      <div class="service-button-box d-flex justify-content-between">
        <button class="btn btn-primary w-100 agendar-button" data-service-id="${service.id}">
          Agendar
        </button>
      </div>
    </div>
  </div>
  `;
}

function setupAgendarButtons() {
  const agendarButtons = document.querySelectorAll(".agendar-button");
  agendarButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modal = new bootstrap.Modal(
        document.getElementById("agendamentoModal")
      );
      modal.show();
    });
  });
}

function renderProducts(filteredProducts) {
  const container = document.getElementById("products-container");
  container.innerHTML = "";
  (filteredProducts || products).forEach((product) => {
    container.innerHTML += renderProductCard(product);
  });
}

function renderServices() {
  const container = document.getElementById("services-container");
  container.innerHTML = "";
  services.forEach((service) => {
    container.innerHTML += renderServiceCard(service);
  });

  setupAgendarButtons();
}

function showTab(tab) {
  const productsContainer = document.getElementById("products-container");
  const servicesContainer = document.getElementById("services-container");

  if (tab === "products") {
    productsContainer.classList.remove("hidden");
    servicesContainer.classList.add("hidden");
  } else if (tab === "services") {
    productsContainer.classList.add("hidden");
    servicesContainer.classList.remove("hidden");
  }

  document
    .querySelectorAll(".nav-link")
    .forEach((link) => link.classList.remove("active"));
  document
    .querySelector(`[onclick="showTab('${tab}')"]`)
    .classList.add("active");
}

document
  .getElementById("agendamentoForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    window.location.href = "/home";
  });

window.onload = function () {
  renderProducts();
  renderServices();
};
