/*
  File: src\components\Background.jsx
  Deskripsi: File ini menangani bagian tertentu dari aplikasi portfolio digital.
  Catatan: Kode ini digunakan untuk rendering, data, dan logika interaksi pada halaman website.
*/
import React, { useEffect, useRef } from "react"

/*
  Background.jsx
  - Komponen background animasi yang menampilkan beberapa 'blob' warna
  - Blob digerakkan berdasarkan posisi scroll untuk efek dinamis
  - Teknik: menyimpan referensi DOM (useRef) dan langsung memodifikasi style
*/
const AnimatedBackground = () => {
	// simpan referensi DOM tiap blob supaya kita bisa atur transform langsung
	const blobRefs = useRef([])

	// posisi dasar (relatif) dari tiap blob, dipakai sebagai offset awal
	const initialPositions = [
		{ x: -4, y: 0 },
		{ x: -4, y: 0 },
		{ x: 20, y: -8 },
		{ x: 20, y: -8 },
	]

	useEffect(() => {
		// currentScroll menyimpan posisi scroll terakhir yang diproses
		let currentScroll = 0
		let requestId

		// handler yang akan dijalankan terus-menerus via rAF untuk performa
		const handleScroll = () => {
			// baca posisi scroll saat ini
			const newScroll = window.pageYOffset
			const scrollDelta = newScroll - currentScroll
			currentScroll = newScroll

			// perbarui tiap blob: gunakan kombinasi sin/cos agar gerakan tidak monoton
			blobRefs.current.forEach((blob, index) => {
				if (!blob) return // safety check jika ref belum terpasang
				const initialPos = initialPositions[index]

				// rincian perhitungan: scale dan frekuensi bisa disesuaikan
				const xOffset = Math.sin(newScroll / 100 + index * 0.5) * 340
				const yOffset = Math.cos(newScroll / 100 + index * 0.5) * 40

				const x = initialPos.x + xOffset
				const y = initialPos.y + yOffset

				// apply transform langsung untuk animasi ringan (CSS transition pada elemen membantu)
				blob.style.transform = `translate(${x}px, ${y}px)`
				blob.style.transition = "transform 1.4s ease-out"
			})

			// schedule next frame via requestAnimationFrame untuk sinkronisasi vsync
			requestId = requestAnimationFrame(handleScroll)
		}

		// listen ke event scroll dan mulai loop animasi
		window.addEventListener("scroll", handleScroll)
		// jalankan sekali agar posisi awal segera dihitung
		handleScroll()

		return () => {
			window.removeEventListener("scroll", handleScroll)
			cancelAnimationFrame(requestId)
		}
	}, [])

	return (
		<div className="fixed inset-0 ">
			<div className="absolute inset-0">
				{/* Blob pertama (besar, kiri atas) */}
				<div
					ref={(ref) => (blobRefs.current[0] = ref)}
					className="absolute top-0 -left-4 md:w-96 md:h-96 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20 "></div>

				{/* Blob kedua (kanan atas, tersembunyi di layar kecil) */}
				<div
					ref={(ref) => (blobRefs.current[1] = ref)}
					className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20 hidden sm:block"></div>

				{/* Blob ketiga (bawah kiri) */}
				<div
					ref={(ref) => (blobRefs.current[2] = ref)}
					className="absolute -bottom-8 left-[-40%] md:left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20 "></div>

				{/* Blob keempat (bawah kanan, lebih redup) */}
				<div
					ref={(ref) => (blobRefs.current[3] = ref)}
					className="absolute -bottom-10 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 md:opacity-10 hidden sm:block"></div>
			</div>

			{/* Overlay grid halus di atas background untuk tekstur */}
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:24px_24px]"></div>
		</div>
	)
}

export default AnimatedBackground
