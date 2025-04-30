const client = new Appwrite.Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('6811254f0019904b7081');

const account = new Appwrite.Account(client);

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const user = await account.get();
    document.getElementById("welcomeMessage").textContent = `مرحبًا، ${user.name || user.email}`;
    document.getElementById("logoutBtn").style.display = "inline-block";
    document.getElementById("loginLink").style.display = "none";
  } catch {
    document.getElementById("welcomeMessage").textContent = "مرحبًا بك 👋";
    document.getElementById("loginLink").style.display = "inline-block";
  }
});

document.getElementById("logoutBtn").addEventListener("click", async () => {
  try {
    await account.deleteSession('current');
    location.reload();
  } catch {
    alert("❌ حدث خطأ أثناء تسجيل الخروج.");
  }
});