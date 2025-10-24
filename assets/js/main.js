// JavaScript لموقع دليل فعاليات المدينة

// تهيئة العناصر عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة السلايدر
    initCarousel();
    
    // تهيئة فلترة الفعاليات
    initEventFilters();
    
    // تهيئة نموذج الاتصال
    initContactForm();
    
    // تهيئة زر العودة للأعلى
    initScrollToTop();
    
    // تهيئة وضع الليل (إذا كان مفعلًا)
    initDarkMode();
});

// دالة تهيئة السلايدر
function initCarousel() {
    // يمكن إضافة خيارات إضافية للسلايدر هنا
    const myCarousel = document.querySelector('#eventsCarousel');
    if (myCarousel) {
        const carousel = new bootstrap.Carousel(myCarousel, {
            interval: 5000,
            wrap: true
        });
    }
}

// دالة تهيئة فلترة الفعاليات
function initEventFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // إزالة النشاط من جميع الأزرار
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // إضافة النشاط للزر المحدد
            this.classList.add('active');
            
            // تصفية البطاقات
            eventCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// دالة تهيئة نموذج الاتصال والتحقق منه
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // الحصول على قيم الحقول
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // التحقق من الحقول
            let isValid = true;
            
            if (name === '') {
                showAlert('الرجاء إدخال الاسم', 'danger');
                isValid = false;
            }
            
            if (email === '') {
                showAlert('الرجاء إدخال البريد الإلكتروني', 'danger');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showAlert('الرجاء إدخال بريد إلكتروني صحيح', 'danger');
                isValid = false;
            }
            
            if (message === '') {
                showAlert('الرجاء إدخال الرسالة', 'danger');
                isValid = false;
            }
            
            // إذا كان النموذج صالحًا
            if (isValid) {
                // هنا يمكن إرسال البيانات إلى الخادم
                showAlert('تم إرسال رسالتك بنجاح، سنتواصل معك قريبًا', 'success');
                contactForm.reset();
            }
        });
    }
}

// دالة للتحقق من صحة البريد الإلكتروني
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// دالة لعرض رسائل التنبيه
function showAlert(message, type) {
    // إنصراف أي تنبيهات سابقة
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // إنشاء عنصر التنبيه
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // إضافة التنبيه إلى الصفحة
    const form = document.getElementById('contactForm') || document.querySelector('main');
    form.parentNode.insertBefore(alertDiv, form);
    
    // إزالة التنبيه تلقائيًا بعد 5 ثوان
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// دالة تهيئة زر العودة للأعلى
function initScrollToTop() {
    const scrollButton = document.createElement('div');
    scrollButton.className = 'scroll-to-top';
    scrollButton.innerHTML = '↑';
    document.body.appendChild(scrollButton);
    
    // إظهار أو إخفاء الزر عند التمرير
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });
    
    // التمرير إلى الأعلى عند النقر
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// دالة تهيئة وضع الليل (وضع الظلام)
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (darkModeToggle) {
        // التحقق مما إذا كان المستخدم قد اختار وضع الظلام مسبقًا
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        
        // تطبيق الوضع عند التحميل
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }
        
        // التبديل بين الوضعين
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'true');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'false');
            }
        });
    }
}

// دالة لحجز الفعالية (وهمية)
function bookEvent(eventId) {
    // عرض نموذج الحجز
    const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'));
    bookingModal.show();
    
    // هنا يمكن إضافة منطق الحجز الحقيقي
    console.log(`حجز فعالية برقم: ${eventId}`);
}

// دالة لمشاركة الفعالية
function shareEvent(eventTitle, eventUrl) {
    if (navigator.share) {
        navigator.share({
            title: eventTitle,
            url: eventUrl
        })
        .then(() => console.log('تم المشاركة بنجاح'))
        .catch(error => console.log('Error sharing:', error));
    } else {
        // نسخ الرابط إذا لم يكن المشاركة مدعومة
        navigator.clipboard.writeText(eventUrl)
            .then(() => showAlert('تم نسخ رابط الفعالية', 'success'))
            .catch(err => showAlert('تعذر نسخ الرابط', 'danger'));
    }
}

// دالة لحجز الفعالية (وهمية)
function bookEvent(eventId) {
    // عرض نموذج الحجز
    const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'));
    bookingModal.show();
    
    // هنا يمكن إضافة منطق الحجز الحقيقي
    console.log(`حجز فعالية برقم: ${eventId}`);
}

// دالة لإرسال نموذج الحجز
function submitBooking() {
    // الحصول على قيم الحقول
    const name = document.getElementById('bookingName').value.trim();
    const email = document.getElementById('bookingEmail').value.trim();
    const phone = document.getElementById('bookingPhone').value.trim();
    const guests = document.getElementById('bookingGuests').value;
    const date = document.getElementById('bookingDate').value;
    
    // التحقق من الحقول
    if (name === '' || email === '') {
        showAlert('الرجاء ملء جميع الحقول المطلوبة', 'danger');
        return;
    }
    
    if (!isValidEmail(email)) {
        showAlert('الرجاء إدخال بريد إلكتروني صحيح', 'danger');
        return;
    }
    
    // إغلاق النموذج
    const bookingModal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
    bookingModal.hide();
    
    // عرض رسالة نجاح
    showAlert('تم حجز مكانك بنجاح! سيصلك تأكيد عبر البريد الإلكتروني', 'success');
    
    // هنا يمكن إرسال البيانات إلى الخادم
    console.log('تم الحجز:', { name, email, phone, guests, date });
}

// دالة لإضافة الفعالية إلى التقويم
function addToCalendar(eventTitle, eventDate, eventLocation) {
    // إنشاء محتوى التقويم (صيغة iCalendar)
    const startDate = new Date(eventDate);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // إضافة ساعتين
    
    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `SUMMARY:${eventTitle}`,
        `DTSTART:${formatDateToICS(startDate)}`,
        `DTEND:${formatDateToICS(endDate)}`,
        `LOCATION:${eventLocation}`,
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\n');
    
    // إنشاء ملف للتحميل
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${eventTitle.replace(/\s+/g, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showAlert('تم إضافة الفعالية إلى التقويم', 'success');
}

// دالة مساعدة لتنسيق التاريخ لصيغة ICS
function formatDateToICS(date) {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
}

// تهيئة إضافة إلى التقويم
document.addEventListener('DOMContentLoaded', function() {
    const addToCalendarBtn = document.getElementById('addToCalendar');
    if (addToCalendarBtn) {
        addToCalendarBtn.addEventListener('click', function() {
            addToCalendar(
                'مهرجان الموسيقى السنوي',
                '2023-11-15T18:00:00',
                'ساحة المدينة الرئيسية'
            );
        });
    }
});





// دالة لتبديل وضع الظلام
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    
    // حفظ التفضيل في localStorage
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    // تحديث زر التبديل
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.checked = isDarkMode;
        darkModeToggle.setAttribute('aria-label', isDarkMode ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن');
    }
    
    // تحديث أيقونة الزر
    updateDarkModeIcon(isDarkMode);
}

// دالة لتحديث أيقونة وضع الظلام
function updateDarkModeIcon(isDarkMode) {
    const icon = document.getElementById('darkModeIcon');
    if (icon) {
        if (isDarkMode) {
            icon.classList.remove('bi-moon');
            icon.classList.add('bi-sun');
        } else {
            icon.classList.remove('bi-sun');
            icon.classList.add('bi-moon');
        }
    }
}

// دالة لتهيئة وضع الظلام
function initDarkMode() {
    // التحقق مما إذا كان المستخدم قد اختار وضع الظلام مسبقًا
    const savedDarkMode = localStorage.getItem('darkMode');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // تطبيق الوضع بناءً على التفضيلات المحفوظة أو تفضيلات النظام
    const shouldApplyDarkMode = savedDarkMode === 'true' || (!savedDarkMode && prefersDarkScheme);
    
    if (shouldApplyDarkMode) {
        document.body.classList.add('dark-mode');
    }
    
    // تحديث زر التبديل
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.checked = shouldApplyDarkMode;
        updateDarkModeIcon(shouldApplyDarkMode);
        
        // إضافة مستمع الحدث
        darkModeToggle.addEventListener('change', toggleDarkMode);
    }
    
    // إضافة زر التبديل إلى واجهة المستخدم إذا لم يكن موجودًا
    addDarkModeToggleToUI();
}

// دالة لإضافة زر تبديل وضع الظلام إلى واجهة المستخدم
function addDarkModeToggleToUI() {
    // التحقق إذا كان الزر موجودًا بالفعل
    if (document.getElementById('darkModeToggleContainer')) {
        return;
    }
    
    // إنشاء عنصر زر التبديل
    const toggleContainer = document.createElement('div');
    toggleContainer.id = 'darkModeToggleContainer';
    toggleContainer.className = 'form-check form-switch ms-3';
    toggleContainer.innerHTML = `
        <input class="form-check-input" type="checkbox" id="darkModeToggle">
        <label class="form-check-label" for="darkModeToggle">
            <i id="darkModeIcon" class="bi bi-moon"></i>
        </label>
    `;
    
    // إضافة الزر إلى شريط التنقل
    const navbarNav = document.querySelector('.navbar-nav');
    if (navbarNav) {
        const listItem = document.createElement('li');
        listItem.className = 'nav-item';
        listItem.appendChild(toggleContainer);
        navbarNav.appendChild(listItem);
        
        // إضافة مستمع الحدث
        const darkModeToggle = document.getElementById('darkModeToggle');
        darkModeToggle.addEventListener('change', toggleDarkMode);
    }
}

// تهيئة وضع الظلام عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // ... الكود الحالي ...
    
    // تهيئة وضع الظلام
    initDarkMode();
    
    // ... باقي الكود ...
});