
const client = new Appwrite.Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('6811254f0019904b7081');

const account = new Appwrite.Account(client);

// تسجيل حساب جديد
window.signup = async function () {
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  try {
    await account.create('unique()', email, password, name);
    await account.createVerification('https://ai-websites.online/verified.html');
    // عرض رسالة نجاح جميلة على الصفحة
    const successMessage = document.getElementById("successMessage");
    successMessage.innerText = "✅ تم إنشاء الحساب! تحقق من بريدك الإلكتروني.";
    successMessage.style.display = "block";
    successMessage.scrollIntoView({ behavior: "smooth" });

    // إعادة تعيين الحقول
    document.getElementById("signupName").value = "";
    document.getElementById("signupEmail").value = "";
    document.getElementById("signupPassword").value = "";

  } catch (error) {
    alert("❌ خطأ أثناء التسجيل: " + error.message);
  }
}

// تسجيل الدخول
window.login = async function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    await account.createEmailSession(email, password);
    const user = await account.get();

    if (!user.emailVerification) {
      alert("⚠️ بريدك الإلكتروني غير مؤكد.");
      return;
    }

    alert("✅ تم تسجيل الدخول بنجاح!");
    window.location.href = 'index.html?loggedIn=true';
  } catch (error) {
    alert("❌ فشل تسجيل الدخول: " + error.message);
  }
}

// ✅ فقط إذا كنا في صفحة login.html، لا نحول المستخدم إلا بعد الضغط على زر الدخول
if (window.location.pathname.includes('login.html')) {
  account.get()
    .then(() => {
      window.location.href = 'index.html?loggedIn=true';
    })
    .catch(() => {
      // لا يوجد جلسة، يبقى في صفحة login.html
    });
}
