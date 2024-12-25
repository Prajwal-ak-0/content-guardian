'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Background } from '@/components/ui/background'
import { Navigation } from '@/components/ui/navigation'
import { Inter, Merriweather } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const merriweather = Merriweather({ 
  weight: ['300', '400', '700'],
  subsets: ['latin']
})

export default function ReadMe() {
  return (
    <>
      <Background />
      <Navigation />
      <main className={`min-h-screen p-8 relative ${inter.className}`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-[900px] mx-auto"
        >
          <Link href="/">
            <Button variant="ghost" className="text-white/80 hover:text-white mb-8 hover:bg-blue-600/20">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to App
            </Button>
          </Link>

          <article className={`prose prose-lg lg:prose-xl prose-invert mx-auto ${merriweather.className}`}>
            <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent leading-tight">
              Content Guardian: Advanced Content Moderation System
            </h1>
            
            <div className="text-gray-300 space-y-8 leading-relaxed">
              <section>
                <h2 className="text-3xl font-semibold text-white mt-12 mb-6">Introduction</h2>
                <p className="text-lg leading-8">
                  Content Guardian is a state-of-the-art content moderation system that leverages Meta's Llama Guard model
                  to provide real-time analysis of text content. Our system is designed to identify and flag potentially
                  harmful content across 13 different categories, making it an essential tool for maintaining safe online
                  spaces.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-semibold text-white mt-12 mb-6">Getting Started</h2>
                
                <h3 className="text-2xl font-semibold text-white mt-8 mb-4">1. Prerequisites</h3>
                <ul className="list-disc pl-6 space-y-3 text-lg">
                  <li>Node.js 16+ for frontend</li>
                  <li>Python 3.8+ for backend</li>
                  <li>Hugging Face account</li>
                  <li>Access to Meta's Llama Guard model</li>
                </ul>

                <h3 className="text-2xl font-semibold text-white mt-8 mb-4">2. Llama Guard Model Access</h3>
                <div className="space-y-4 text-lg">
                  <p>To use Llama Guard, follow these steps:</p>
                  <ol className="list-decimal pl-6 space-y-4">
                    <li>
                      Visit the <a href="https://huggingface.co/meta-llama/Llama-Guard-3-1B" className="text-blue-400 hover:text-blue-300">Llama Guard model page</a> on Hugging Face
                    </li>
                    <li>
                      Click on "Access Request" and fill out the form explaining your intended use case
                    </li>
                    <li>
                      Wait for Meta's approval (typically 2-3 business days)
                    </li>
                    <li>
                      Once approved, create a <a href="https://huggingface.co/settings/tokens" className="text-blue-400 hover:text-blue-300">Hugging Face access token</a> with write permissions
                    </li>
                  </ol>
                </div>

                <h3 className="text-2xl font-semibold text-white mt-8 mb-4">3. Installation</h3>
                <div className="bg-gray-800/50 p-6 rounded-lg space-y-4 font-mono text-sm">
                  <div>
                    <p className="text-gray-400 mb-2"># Clone the repository</p>
                    <code>git clone https://github.com/Prajwal-ak-0/content-guardian</code>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 mb-2"># Install frontend dependencies</p>
                    <code>cd machine_learning<br/>npm install</code>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 mb-2"># Install backend dependencies</p>
                    <code>cd ..<br/>pip install -r requirements.txt</code>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 mb-2"># Set up Hugging Face token</p>
                    <code>export HUGGING_FACE_TOKEN=your_token_here</code>
                  </div>

                  <div>
                    <p className="text-gray-400 mb-2"># Run frontend (Next.js) from machine_learning directory</p>
                    <code>cd machine_learning<br/> npm run dev</code>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 mb-2"># Run backend (FastAPI) from root directory</p>
                    <code>cd .. <br/>uvicorn main:app --reload</code>
                  </div>
                  
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-semibold text-white mt-12 mb-6">Technical Architecture</h2>
                
                <h3 className="text-2xl font-semibold text-white mt-8 mb-4">Frontend (Next.js)</h3>
                <ul className="list-disc pl-6 space-y-3 text-lg">
                  <li>Built with Next.js 15+ for server-side rendering and optimal performance</li>
                  <li>Tailwind CSS for responsive and modern UI design</li>
                  <li>Framer Motion for smooth animations and transitions</li>
                  <li>Shadcn UI components for consistent and beautiful interface elements</li>
                  <li>Interactive canvas background with dynamic particle effects</li>
                </ul>

                <h3 className="text-2xl font-semibold text-white mt-8 mb-4">Backend (FastAPI)</h3>
                <ul className="list-disc pl-6 space-y-3 text-lg">
                  <li>FastAPI framework for high-performance API endpoints</li>
                  <li>Async request handling for improved scalability</li>
                  <li>CORS middleware for secure cross-origin requests</li>
                  <li>Pydantic for robust data validation</li>
                  <li>Integration with Llama Guard for content analysis</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-semibold text-white mt-12 mb-6">Features</h2>
                <ul className="list-disc pl-6 space-y-3 text-lg">
                  <li>Real-time content analysis with confidence scores</li>
                  <li>Beautiful, responsive UI with interactive elements</li>
                  <li>Detailed category-wise content analysis</li>
                  <li>Toast notifications for instant feedback</li>
                  <li>Progress indicators for analysis status</li>
                  <li>Hover cards for additional information</li>
                </ul>
              </section>

              <section className="pb-12">
                <h2 className="text-3xl font-semibold text-white mt-12 mb-6">Contributing</h2>
                <p className="text-lg leading-8">
                  We welcome contributions! Please feel free to submit pull requests or create issues on our GitHub repository.
                  Make sure to read our contribution guidelines before getting started.
                </p>
              </section>
            </div>
          </article>
        </motion.div>
      </main>
    </>
  )
}
