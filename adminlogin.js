// =========================
// CONFIG
// =========================
const ADMIN_USER = "jay.feet";
const ADMIN_PASS = "001122";
const SESSION_TIME = 60 * 60 * 1000; // 1 hour

// =========================
// LOGIN
// =========================
function login() {
   const username = document.getElementById("username").value.trim();
   const password = document.getElementById("password").value.trim();
   const msg = document.getElementById("msg");
   
   if (!username || !password) {
      msg.style.color = "red";
      msg.innerText = "Please fill all fields!";
      return;
   }
   
   if (username === ADMIN_USER && password === ADMIN_PASS) {
      const session = {
         isAdmin: true,
         loginTime: Date.now()
      };
      
      localStorage.setItem("adminSession", JSON.stringify(session));
      
      msg.style.color = "green";
      msg.innerText = "Login successful...";
      
      setTimeout(() => {
         window.location.href = "admin.html";
      }, 1000);
      
   } else {
      msg.style.color = "red";
      msg.innerText = "Wrong username or password!";
   }
}
