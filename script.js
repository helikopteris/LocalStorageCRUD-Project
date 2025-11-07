const storageKey = "cartList";

// Load products from localStorage
function loadProducts() {
  return JSON.parse(localStorage.getItem(storageKey)) || [];
}

// Save products to localStorage
function saveProducts(products) {
  localStorage.setItem(storageKey, JSON.stringify(products));
}

// Display all products
function renderProducts() {
  const tableBody = document.querySelector("#productTable tbody");
  tableBody.innerHTML = "";
  const products = loadProducts();

  products.forEach(p => {
    const row = `<tr>
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.quantity}</td>
    </tr>`;
    tableBody.innerHTML += row;
  });
}

// Insert new product
document.getElementById("insertBtn").addEventListener("click", () => {
  const id = document.getElementById("productId").value.trim();
  const name = document.getElementById("productName").value.trim();
  const quantity = document.getElementById("productQuantity").value.trim();

  if (!id || !name || !quantity) {
    alert("Užpildykite visus laukus!");
    return;
  }

  const products = loadProducts();
  if (products.some(p => p.id === id)) {
    alert("Toks produkto ID jau egzistuoja!");
    return;
  }

  products.push({ id, name, quantity });
  saveProducts(products);
  renderProducts();
  clearForm();
});

// Edit product
document.getElementById("editBtn").addEventListener("click", () => {
  const id = document.getElementById("productId").value.trim();
  const name = document.getElementById("productName").value.trim();
  const quantity = document.getElementById("productQuantity").value.trim();

  const products = loadProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    alert("Tokio ID nėra!");
    return;
  }

  products[index] = { id, name, quantity };
  saveProducts(products);
  renderProducts();
  clearForm();
});

// Delete product
document.getElementById("deleteBtn").addEventListener("click", () => {
  const id = document.getElementById("productId").value.trim();
  let products = loadProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    alert("Tokio ID nėra!");
    return;
  }
  products.splice(index, 1);
  saveProducts(products);
  renderProducts();
  clearForm();
});

// Search product by ID
document.getElementById("searchBtn").addEventListener("click", () => {
  const searchId = document.getElementById("searchId").value.trim();
  const tableBody = document.querySelector("#searchTable tbody");
  tableBody.innerHTML = "";
  const products = loadProducts();
  const found = products.find(p => p.id === searchId);

  if (!found) {
    alert("Prekė nerasta!");
    return;
  }

  tableBody.innerHTML = `<tr>
    <td>${found.id}</td>
    <td>${found.name}</td>
    <td>${found.quantity}</td>
  </tr>`;
});

function clearForm() {
  document.getElementById("productId").value = "";
  document.getElementById("productName").value = "";
  document.getElementById("productQuantity").value = "";
}

renderProducts();