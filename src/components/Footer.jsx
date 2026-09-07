/*
  File: src\components\Footer.jsx
  Deskripsi: File ini menangani bagian tertentu dari aplikasi portfolio digital.
  Catatan: Kode ini digunakan untuk rendering, data, dan logika interaksi pada halaman website.
*/
// Footer.jsx
// - Komponen footer sederhana.
// - Menampilkan tahun berjalan dan link pemilik.
const Footer = () => {
  // ambil tahun saat ini untuk copyright
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <center>
        {/* Garis pemisah - visual */}
        <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />

        {/* Copyright + link pemilik */}
        <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
          Â© {currentYear}{" "}
          <a href="https://sanz.com" className="hover:underline">
            xy.sanzz.kceâ„¢
          </a>
          . All Rights Reserved.
        </span>
      </center>
    </footer>
  );
};

export default Footer;
