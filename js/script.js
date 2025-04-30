


        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-LFVZP6KYK2');
   


        // إخفاء التحميل بعد ثانيتين
        setTimeout(() => {
            document.querySelector('.loader').style.display = 'none';
        }, 500);

        // دالة لعرض جميع المواقع
        function showAll() {
            const sites = document.querySelectorAll('.site-card');
            const buttons = document.querySelectorAll('.categories button');

            buttons.forEach(button => button.classList.remove('active'));
            const activeButton = document.querySelector(`.categories button[onclick*="showAll"]`);
            if (activeButton) {
                activeButton.classList.add('active');
            }

            sites.forEach(site => {
                site.style.display = 'block';
                site.style.animation = 'fadeIn 0.5s ease-in-out';
            });
        }

        // دالة لتصفية المواقع حسب التصنيف
        function filterCategory(category) {
            const sites = document.querySelectorAll('.site-card');
            const buttons = document.querySelectorAll('.categories button');

            buttons.forEach(button => button.classList.remove('active'));
            const activeButton = document.querySelector(`.categories button[onclick*="${category}"]`);
            if (activeButton) {
                activeButton.classList.add('active');
            }

            sites.forEach(site => {
                if (category === 'الكل' || site.getAttribute('data-category') === category) {
                    site.style.display = 'block';
                    site.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    site.style.display = 'none';
                }
            });
        }

        // تأثير الكتابة
        const text = "مكتبة الذكاء الاصطناعي";
        const typingText = document.getElementById('typing-text');
        let index = 0;

        function typeWriter() {
            if (index < text.length) {
                typingText.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            } else {
                typingText.style.animation = 'ripple 3s infinite ease-in-out';
            }
        }

        // بدء تأثير الكتابة بعد تحميل الصفحة
        window.onload = typeWriter;

        // إنشاء عناصر الخلفية
        const words = [
            "AI", "ML", "ChatGPT", "DALL-E", "Neural", "Deep Learning",
            "Algorithm", "Data", "TensorFlow", "PyTorch", "GAN", "NLP",
            "Robotics", "Automation", "Vision", "AI Art", "AI Ethics",
            "AI Tools", "AI Models", "AI Research", "AI Future", "AI Trends"
        ];

        function createBackgroundElements() {
            const container = document.getElementById('background-elements');
            const numElements = 20;

            for (let i = 0; i < numElements; i++) {
                const element = document.createElement('div');
                element.classList.add('background-element');
                element.textContent = words[Math.floor(Math.random() * words.length)];
                element.style.left = `${Math.random() * 100}vw`;
                element.style.top = `${Math.random() * 100}vh`;
                element.style.animationDuration = `${Math.random() * 20 + 10}s`;
                element.style.fontSize = `${Math.random() * 1.5 + 1}rem`;
                container.appendChild(element);
            }
        }

        // بدء إنشاء العناصر عند تحميل الصفحة
        createBackgroundElements();
/*
const adSidebar1 = document.getElementById('adSidebar1'); // الإعلان الأول
const adSidebar2 = document.getElementById('adSidebar2'); // الإعلان الثاني
const closeAdBtn1 = document.getElementById('closeAdBtn1'); // زر إغلاق الإعلان الأول
const closeAdBtn2 = document.getElementById('closeAdBtn2'); // زر إغلاق الإعلان الثاني

let adClosed1 = false;
let adClosed2 = false;

// إظهار الإعلان الأول عند التمرير
window.addEventListener('scroll', () => {
    if (!adClosed1 && window.scrollY > 300) {
        adSidebar1.classList.add('show');
    }
});

// إغلاق الإعلان الأول
closeAdBtn1.addEventListener('click', () => {
    adSidebar1.classList.remove('show');
    adClosed1 = true;

    // عرض الإعلان الثاني بعد دقيقة واحدة
    setTimeout(() => {
        adSidebar2.classList.add('show');
    }, 60000); // دقيقة واحدة
});

// إغلاق الإعلان الثاني
closeAdBtn2.addEventListener('click', () => {
    adSidebar2.classList.remove('show');
    adClosed2 = true;

    // إعادة عرض الإعلان الأول بعد 5 دقائق
    setTimeout(() => {
        adClosed1 = false;
        if (window.scrollY > 300) {
            adSidebar1.classList.add('show');
        }
    }, 5 * 60 * 1000); // 5 دقائق
});
*/






        // دالة البحث عن الأدوات
        function searchTools() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const sites = document.querySelectorAll('.site-card');

            sites.forEach(site => {
                const title = site.querySelector('h2').textContent.toLowerCase();
                const description = site.querySelector('p').textContent.toLowerCase();

                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    site.style.display = 'block';
                    site.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    site.style.display = 'none';
                }
            });
        }

        // إظهار زر العودة للأعلى عند التمرير
        window.addEventListener('scroll', () => {
            const scrollToTopButton = document.querySelector('.scroll-to-top');
            if (window.scrollY > 300) {
                scrollToTopButton.classList.add('visible');
            } else {
                scrollToTopButton.classList.remove('visible');
            }
        });

        // دالة للعودة إلى أعلى الصفحة
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    
