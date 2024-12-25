'use client'

import Link from 'next/link'
import { Button } from './button'
import { FileText, Github } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function Navigation() {
  const pathname = usePathname()

  return (
    <div className="fixed top-6 right-6 flex gap-4 z-50">
      <Link href="/readme">
        <Button 
          variant={pathname === '/readme' ? 'secondary' : 'ghost'}
          className={`${pathname === '/readme' ? 'bg-blue-600 text-black' : 'text-white'} hover:bg-blue-600/20 border border-blue-500/30`}
        >
          <FileText className="mr-2 h-4 w-4" />
          ReadMe
        </Button>
      </Link>
      <Link href="https://github.com/Prajwal-ak-0/content-guardian" target="_blank">
        <Button 
          variant="ghost"
          className="text-white hover:bg-blue-600/20 border border-blue-500/30"
        >
          <Github className="h-5 w-5" />
        </Button>
      </Link>
    </div>
  )
}
