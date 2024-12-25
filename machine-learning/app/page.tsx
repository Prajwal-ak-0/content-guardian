'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Loader2, Shield, AlertTriangle, CheckCircle, Sparkles, Brain, FileText, Users } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { motion, AnimatePresence } from 'framer-motion'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link'
import { Background } from '@/components/ui/background'
import { Navigation } from '@/components/ui/navigation'

interface CategoryDetail {
  category: string
  description: string
}

interface ModerateResponse {
  input: string
  status: string
  timestamp: string
  violated_categories?: string[]
  details?: CategoryDetail[]
  confidence_score: number
}

export default function Home() {
  const [text, setText] = useState('')
  const [result, setResult] = useState<ModerateResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  // Interactive Background
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
        const size = Math.max(1, 2 * (1 - distance / glowRadius))  // Dynamic dot size
        
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(147, 197, 253, ${opacity})`  // Blue-ish glow
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

  // Progress bar animation
  useEffect(() => {
    if (loading) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer)
            return 100
          }
          return prev + 5
        })
      }, 100)

      return () => {
        clearInterval(timer)
        setProgress(0)
      }
    }
  }, [loading])

  const handleModerate = async () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to moderate",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('http://localhost:8000/api/moderate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        throw new Error('Failed to moderate content')
      }

      const data = await response.json()
      console.log(data.confidence_score)
      data.confidence_score = data.confidence_score || (data.status === 'safe' ? 0.95 : 0.85)
      setResult(data)
      
      toast({
        title: data.status === 'safe' ? "Content is Safe" : "Content Flagged",
        description: data.status === 'safe' 
          ? "No harmful content detected"
          : "Potentially harmful content detected",
        variant: data.status === 'safe' ? "default" : "destructive"
      })
    } catch (err) {
      setError('Failed to analyze content. Please try again.')
      toast({
        title: "Error",
        description: "Failed to analyze content. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Background />
      <Navigation />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10"
      />
      <main className="min-h-screen p-8 relative">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <h1 className="text-5xl font-bold tracking-tight text-white flex items-center justify-center gap-3">
              <Shield className="h-12 w-12 text-blue-400" />
              Content Guardian
              <Sparkles className="h-8 w-8 text-yellow-400" />
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Powered by Meta's Llama Guard, our advanced AI system analyzes text for potential harmful content
              across 13 different categories in real-time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="h-6 w-6 text-purple-400" />
                  Content Analysis
                </CardTitle>
                <CardDescription>
                  Enter the text you want to analyze for potential harmful content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Type or paste your content here..."
                  className="min-h-[150px] bg-gray-900/70 border-gray-600 text-white text-lg font-medium 
                    placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20 
                    transition-colors duration-200 backdrop-blur-sm resize-none p-4"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                {loading && (
                  <div className="mt-4 space-y-2">
                    <Progress value={progress} className="h-2" />
                    <p className="text-sm text-gray-400 text-center">Analyzing content...</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 
                  hover:to-blue-800 text-white font-semibold py-6 text-lg transition-all 
                  duration-200 shadow-lg hover:shadow-blue-500/20 active:scale-[0.99]"
                onClick={handleModerate}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Content'
                )}
              </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm transition-all duration-300 
  hover:bg-gray-800/60 hover:border-gray-600 hover:shadow-lg hover:shadow-blue-500/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {result.status === 'safe' ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-2 text-green-400"
                        >
                          <CheckCircle className="h-6 w-6" />
                          <span>Content is Safe</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-2 text-red-400"
                        >
                          <AlertTriangle className="h-6 w-6" />
                          <span>Potentially Harmful Content Detected</span>
                        </motion.div>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">

                    {result.status === 'unsafe' && result.details && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-4"
                      >
                        <h3 className="font-semibold text-red-400">Detected Categories:</h3>
                        <div className="space-y-2">
                          {result.details.map((detail, index) => (
                            <motion.div
                              key={index}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Alert className="bg-gray-900/50 border-red-800/50 backdrop-blur-sm">
                                <AlertTitle className="text-red-400">
                                  {detail.category}
                                </AlertTitle>
                                <AlertDescription className="text-gray-400">
                                  {detail.description}
                                </AlertDescription>
                              </Alert>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    
                    <div className="pt-4">
                      <p className="text-sm text-gray-400">
                        Analysis completed at: {new Date(result.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  )
}