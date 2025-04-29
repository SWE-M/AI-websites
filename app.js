
const client = new Appwrite.Client();
client.setEndpoint('https://fra.cloud.appwrite.io/v1').setProject('6811254f0019904b7081');

const account = new Appwrite.Account(client);

// Signup
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  try {
    await account.create('unique()', email, password);
    alert("Account created. Please log in.");
  } catch (error) {
    alert("Signup error: " + error.message);
  }
});

// Login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  try {
    await account.createEmailSession(email, password);
    loadUser();
  } catch (error) {
    alert("Login failed: " + error.message);
  }
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", async () => {
  try {
    await account.deleteSession('current');
    location.reload();
  } catch (error) {
    alert("Logout error");
  }
});

// Check logged in user
async function loadUser() {
  try {
    const user = await account.get();
    document.getElementById("userEmail").innerText = user.email;
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("userPanel").style.display = "block";
  } catch {
    document.getElementById("userPanel").style.display = "none";
  }
}

loadUser();
