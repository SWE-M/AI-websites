const client = new Appwrite.Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1') // غير هذا إذا عندك سيرفر خاص
  .setProject('6811254f0019904b7081'); // غير الـ ID إذا عندك مشروع مختلف

const account = new Appwrite.Account(client);

// إنشاء حساب جديد
window.signup = async function () {
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  try {
    await account.create('unique()', email, password, name);
    await account.createVerification('https://ai-websites.online/verified.html');
    alert("✅ تم إنشاء الحساب. تحقق من بريدك الإلكتروني.");
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
      alert("⚠️ لم يتم تأكيد البريد الإلكتروني بعد.");
      return;
    }

    alert("✅ تم تسجيل الدخول بنجاح!");
    window.location.href = 'index.html'; // غيّره إذا عندك صفحة رئيسية مختلفة
  } catch (error) {
    alert("❌ فشل تسجيل الدخول: " + error.message);
  }
}
