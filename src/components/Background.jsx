import React, { useEffect, useRef } from "react"

const AnimatedBackground = () => {
	const canvasRef = useRef(null)

	useEffect(() => {
		const canvas = canvasRef.current
		const ctx = canvas.getContext("2d")
		let animationId
		let stars = []
		let shootingStars = []

		const resize = () => {
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
		}
		resize()
		window.addEventListener("resize", resize)

		// Buat bintang biasa
		const createStars = (count) => {
			stars = []
			for (let i = 0; i < count; i++) {
				stars.push({
					x: Math.random() * canvas.width,
					y: Math.random() * canvas.height,
					radius: Math.random() * 1.5 + 0.4,
					opacity: Math.random() * 0.8 + 0.2,
					twinkleSpeed: Math.random() * 0.025 + 0.005,
					twinkleDirection: Math.random() > 0.5 ? 1 : -1,
				})
			}
		}

		// Buat bintang jatuh
		const createShootingStar = () => {
			const startX = Math.random() * canvas.width
			const startY = Math.random() * (canvas.height * 0.4)

			shootingStars.push({
				x: startX,
				y: startY,
				length: Math.random() * 90 + 50,
				speed: Math.random() * 10 + 7,
				opacity: 1,
				angle: Math.PI / 4 + (Math.random() * 0.4 - 0.2),
			})
		}

		createStars(200)

		// Spawn bintang jatuh secara acak
		const shootingInterval = setInterval(() => {
			if (Math.random() > 0.5) {
				createShootingStar()
			}
		}, 1100)

		const animate = () => {
			// Background gelap
			ctx.fillStyle = "#030014"
			ctx.fillRect(0, 0, canvas.width, canvas.height)

			// Gambar bintang + efek berkedip
			stars.forEach((star) => {
				star.opacity += star.twinkleSpeed * star.twinkleDirection
				if (star.opacity <= 0.15 || star.opacity >= 1) {
					star.twinkleDirection *= -1
				}

				ctx.beginPath()
				ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
				ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
				ctx.fill()
			})

			// Gambar & update bintang jatuh
			for (let i = shootingStars.length - 1; i >= 0; i--) {
				const s = shootingStars[i]

				const endX = s.x - Math.cos(s.angle) * s.length
				const endY = s.y - Math.sin(s.angle) * s.length

				const gradient = ctx.createLinearGradient(s.x, s.y, endX, endY)
				gradient.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`)
				gradient.addColorStop(0.4, `rgba(180, 210, 255, ${s.opacity * 0.6})`)
				gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

				ctx.beginPath()
				ctx.moveTo(s.x, s.y)
				ctx.lineTo(endX, endY)
				ctx.strokeStyle = gradient
				ctx.lineWidth = 2.2
				ctx.lineCap = "round"
				ctx.stroke()

				// Kepala bintang
				ctx.beginPath()
				ctx.arc(s.x, s.y, 2.4, 0, Math.PI * 2)
				ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`
				ctx.fill()

				// Update posisi
				s.x += Math.cos(s.angle) * s.speed
				s.y += Math.sin(s.angle) * s.speed
				s.opacity -= 0.012

				if (
					s.opacity <= 0 ||
					s.x > canvas.width + 150 ||
					s.y > canvas.height + 150
				) {
					shootingStars.splice(i, 1)
				}
			}

			animationId = requestAnimationFrame(animate)
		}

		animate()

		return () => {
			cancelAnimationFrame(animationId)
			clearInterval(shootingInterval)
			window.removeEventListener("resize", resize)
		}
	}, [])

	return (
		<canvas
			ref={canvasRef}
			className="fixed inset-0 w-full h-full pointer-events-none"
			style={{
				zIndex: 0,
				background: "#030014",
			}}
		/>
	)
}

export default AnimatedBackground