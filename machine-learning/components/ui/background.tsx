'use client'

import { useEffect, useRef } from 'react'

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const dots: { x: number; y: number }[] = []
    const spacing = 25
    const glowRadius = 200
    const baseOpacity = 0.3

    const createDots = () => {
      dots.length = 0
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          dots.push({ x, y })
        }
      }
    }

    const drawDots = () => {
      if (!ctx || !canvas) return
    
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    
      dots.forEach((dot) => {
        const distance = Math.hypot(dot.x - mouseRef.current.x, dot.y - mouseRef.current.y)
        const opacity = Math.max(baseOpacity, 1 - distance / glowRadius)
        const size = Math.max(1, 2 * (1 - distance / glowRadius))
        
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(147, 197, 253, ${opacity})`
        ctx.fill()
      })
    }

    const animate = () => {
      drawDots()
      requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      }
    }

    const handleResize = () => {
      resizeCanvas()
      createDots()
    }

    window.addEventListener('resize', handleResize)
    canvas.addEventListener('mousemove', handleMouseMove)

    handleResize()
    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
    />
  )
}
