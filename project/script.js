document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("welcome-overlay");
    setTimeout(() => {
        overlay.classList.add("hidden");
    }, 3000); // Adjust time for the welcome message here
});
// Fungsi untuk memeriksa apakah elemen berada dalam viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Menambahkan kelas 'visible' ke elemen yang berada dalam viewport
function handleScroll() {
    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('visible');
        }
    });
}

// Menambahkan event listener scroll untuk mendeteksi saat elemen masuk viewport
window.addEventListener('scroll', handleScroll);

// Menjalankan handleScroll pada saat pertama kali agar elemen yang sudah di-scroll ke bawah bisa muncul
window.onload = handleScroll;
function sendFormData(event) {
    event.preventDefault(); // Mencegah form melakukan submit secara default

    var formData = new FormData(document.getElementById('contact-form')); // Ambil data formulir

    var xhr = new XMLHttpRequest();  // Buat instance XMLHttpRequest
    xhr.open("POST", "send_email.php", true);  // Kirim data ke send_email.php
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Tampilkan pesan sukses jika data berhasil dikirim
            document.getElementById('success-message').style.display = 'block';
            document.getElementById('contact-form').reset();  // Reset form

            setTimeout(function() {
                document.getElementById('success-message').style.display = 'none';
            }, 5000);
        } else {
            alert("Error: " + xhr.statusText);  // Tampilkan error jika terjadi masalah
        }
    };

    xhr.send(formData);  // Kirim data formulir
}