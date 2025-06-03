
// عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', async () => {
  // إخفاء اللودر
  const loader = document.querySelector('.loader');
  if (loader) loader.style.display = 'none';

  // إعداد Appwrite
  const client = new Appwrite.Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('6811254f0019904b7081');

  const account = new Appwrite.Account(client);

  try {
    const user = await account.get();
    console.log("✅ المستخدم مسجل الدخول:", user.name);
    document.body.classList.add("user-logged-in");

    const welcomeElement = document.getElementById("welcomeUser");
    if (welcomeElement) {
      welcomeElement.textContent = `👋 مرحبًا ${user.name}`;
      welcomeElement.style.display = "block";
    }
  } catch (err) {
    console.log("❌ المستخدم غير مسجل دخول");
  }
});

// زر الرجوع لأعلى
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// عرض جميع الأدوات
function showAll() {
  const sites = document.querySelectorAll('.site-card');
  const buttons = document.querySelectorAll('.categories button');

  buttons.forEach(button => button.classList.remove('active'));
  const activeButton = document.querySelector('.categories button[onclick*="showAll"]');
  if (activeButton) activeButton.classList.add('active');

  sites.forEach(site => {
    site.style.display = 'block';
    site.style.animation = 'fadeIn 0.5s ease-in-out';
  });
}

// فلترة الأدوات حسب التصنيف
function filterCategory(category) {
  const sites = document.querySelectorAll('.site-card');
  const buttons = document.querySelectorAll('.categories button');

  buttons.forEach(button => button.classList.remove('active'));
  const activeButton = document.querySelector(`.categories button[onclick*="${category}"]`);
  if (activeButton) activeButton.classList.add('active');

  sites.forEach(site => {
    if (site.dataset.category === category || category === 'الكل') {
      site.style.display = 'block';
      site.style.animation = 'fadeIn 0.5s ease-in-out';
    } else {
      site.style.display = 'none';
    }
  });
}

// ✅ دالة البحث داخل الأدوات
function searchTools() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".site-card");

  cards.forEach(card => {
    const title = card.querySelector("h2").textContent.toLowerCase();
    const desc = card.querySelector("p").textContent.toLowerCase();

    if (title.includes(input) || desc.includes(input)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
