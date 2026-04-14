// =========================
// 🔐 SECURE ADMIN CHECK
// =========================
function checkAdmin() {
   const session = JSON.parse(localStorage.getItem("adminSession"));
   
   if (!session || !session.isAdmin) {
      window.location.href = "adminlogin.html";
      return;
   }
   
   const now = Date.now();
   
   if (now - session.loginTime > 60 * 60 * 1000) {
      localStorage.removeItem("adminSession");
      alert("Session expired. Please login again.");
      window.location.href = "adminlogin.html";
   }
}

// RUN ON LOAD
window.onload = function() {
   checkAdmin();
   displayAdminProducts();
};

// =========================
// 📦 PRODUCTS STORAGE
// =========================
function getProducts() {
   return JSON.parse(localStorage.getItem("products")) || [];
}

function saveProducts(products) {
   localStorage.setItem("products", JSON.stringify(products));
}

// =========================
// ➕ ADD PRODUCT (UPGRADED)
// =========================
function addProduct() {
   const name = document.getElementById("name").value.trim();
   const price = document.getElementById("price").value.trim();
   const imageInput = document.getElementById("image");
   
   if (!name || !price || !imageInput.files[0]) {
      alert("Please fill all fields!");
      return;
   }
   
   const reader = new FileReader();
   
   reader.onload = function(e) {
      const products = getProducts();
      
      products.push({
         id: Date.now(),
         name,
         price: Number(price),
         image: e.target.result,
         
         // 🔥 NEW FEATURES ADDED
         sizes: ["38", "39", "40", "41"],
         description: "No description yet"
      });
      
      saveProducts(products);
      
      clearForm();
      displayAdminProducts();
      alert("Product added successfully!");
   };
   
   reader.readAsDataURL(imageInput.files[0]);
}

// =========================
// 🧹 CLEAR FORM
// =========================
function clearForm() {
   document.getElementById("name").value = "";
   document.getElementById("price").value = "";
   document.getElementById("image").value = "";
}

// =========================
// 🖼 DISPLAY PRODUCTS
// =========================
function displayAdminProducts() {
   const container = document.getElementById("admin-products");
   const products = getProducts();
   
   container.innerHTML = "";
   
   if (products.length === 0) {
      container.innerHTML = "<p style='text-align:center;'>No products yet</p>";
      return;
   }
   
   products.forEach(p => {
      const div = document.createElement("div");
      div.className = "product";
      
      div.innerHTML = `
         <img src="${p.image}" alt="${p.name}">
         <h3>${p.name}</h3>
         <p>$${p.price}</p>

         <small>${p.description || ""}</small>

         <div style="margin-top:8px;">
            ${(p.sizes || []).map(size => `
               <span style="padding:3px 8px;border:1px solid #667eea;margin:2px;border-radius:5px;font-size:12px;">
                  ${size}
               </span>
            `).join("")}
         </div>

         <button onclick="editProduct(${p.id})" class="auth-btn">Edit</button>
         <button onclick="deleteProduct(${p.id})" style="background:red;color:white;padding:8px;border:none;border-radius:6px;margin-top:5px;">
            Delete
         </button>
      `;
      
      container.appendChild(div);
   });
}

// =========================
// 🗑 DELETE PRODUCT
// =========================
function deleteProduct(id) {
   let products = getProducts();
   products = products.filter(p => p.id !== id);
   
   saveProducts(products);
   displayAdminProducts();
}

// =========================
// ✏ EDIT PRODUCT (UPGRADED)
// =========================
function editProduct(id) {
   const products = getProducts();
   const product = products.find(p => p.id === id);
   
   if (!product) return;
   
   const newName = prompt("Enter new name:", product.name);
   const newPrice = prompt("Enter new price:", product.price);
   const newDesc = prompt("Enter description:", product.description || "");
   
   if (newName !== null && newPrice !== null) {
      product.name = newName.trim();
      product.price = Number(newPrice);
      product.description = newDesc;
      
      saveProducts(products);
      displayAdminProducts();
   }
}

// =========================
// 🚪 LOGOUT
// =========================
function logout() {
   localStorage.removeItem("adminSession");
   window.location.href = "adminlogin.html";
}
