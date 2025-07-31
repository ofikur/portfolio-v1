
> KONFIGURASI EMAILJS UNTUK FORMULIR KONTAK <


Dokumen ini menjelaskan cara mengkonfigurasi EmailJS agar formulir kontak di portofolio ini dapat berfungsi dan mengirim email ke alamat email Anda.

--------------------
Langkah-langkah Konfigurasi:
--------------------

1.  **Buat Akun EmailJS:**
    * Kunjungi situs web EmailJS (https://www.emailjs.com).
    * Daftar untuk membuat akun baru. Anda bisa menggunakan akun Gmail untuk mendaftar.

2.  **Tambahkan Service Email:**
    * Setelah masuk ke dashboard, klik "Email Services" di menu sebelah kiri.
    * Klik "Add New Service".
    * Pilih service email yang ingin Anda gunakan (misalnya, Gmail jika Anda mendaftar dengan Google).
    * Ikuti instruksi untuk menghubungkan akun email Anda. Setelah selesai, Anda akan mendapatkan sebuah **Service ID**. Salin ID ini.

3.  **Buat Template Email:**
    * Klik "Email Templates" di menu sebelah kiri.
    * Klik "Create New Template".
    * Anda akan melihat editor template. Di sinilah Anda mengatur format email yang akan Anda terima.
    * Gunakan variabel dengan kurung kurawal ganda untuk menangkap data dari formulir. Pastikan Anda memiliki variabel untuk nama, email, subjek, dan pesan. Variabel ini harus cocok dengan atribut `name` pada input di file `index.html`.
        * `{{name}}` - Untuk nama pengirim.
        * `{{email}}` - Untuk email pengirim.
        * `{{subject}}` - Untuk subjek pesan.
        * `{{message}}` - Untuk isi pesan.
    * Simpan template tersebut. Setelah disimpan, Anda akan mendapatkan sebuah **Template ID**. Salin ID ini.

4.  **Dapatkan Public Key Anda:**
    * Klik menu "Account" di pojok kanan atas dashboard.
    * Di halaman akun, Anda akan menemukan **Public Key** Anda. Salin key ini.

5.  **Masukkan ID dan Key ke dalam Kode:**
    * Buka file `main.js`.
    * Cari bagian kode untuk `handleSubmit` dan `inisialisasi EmailJS`.
    * Masukkan **Public Key**, **Service ID**, dan **Template ID** Anda ke tempat yang sesuai:

        ```javascript
        // main.js

        document.addEventListener("DOMContentLoaded", function () {
          // --- INISIALISASI EMAILJS ---
          (function () {
            emailjs.init({
              publicKey: "MASUKKAN_PUBLIC_KEY_DISINI", // <-- Ganti ini dengan public key yang kamu dapatkan di EmailJS
            });
          })();

          // ... kode lainnya ...

          // --- FUNGSI KIRIM PESAN DENGAN VALIDASI EMAIL ---
          window.handleSubmit = function (event) {
            // ... kode lainnya ...
            const serviceID = "MASUKKAN_SERVICE_ID_DISINI"; // <-- Ganti ini dengan service id yang kamu dapatkan di EmailJS
            const templateID = "MASUKKAN_TEMPLATE_ID_ANDA_DI_SINI"; // <-- Ganti ini template id yang kamu dapatkan di EmailJS
            // ... kode lainnya ...
          };

          // ... sisa kode ...
        });
        ```

--------------------
PENTING:
--------------------
* Pastikan atribut `name` pada setiap input di dalam `<form>` pada file `index.html` sesuai dengan variabel yang Anda gunakan di template EmailJS.
    * `<input type="text" id="name" name="name" ...>` -> `{{name}}`
    * `<input type="email" id="email" name="email" ...>` -> `{{email}}`
    * `<input type="text" id="subject" name="subject" ...>` -> `{{subject}}`
    * `<textarea id="message" name="message" ...>` -> `{{message}}`

Setelah semua langkah di atas selesai, formulir kontak di website portofolio Anda akan berfungsi sepenuhnya.