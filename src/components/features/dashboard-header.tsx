'use client'

import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { User } from '@prisma/client'

interface DashboardHeaderProps {
  user: User
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="text-2xl font-bold text-emerald-600">
              Nemchua
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/dashboard" 
              className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </Link>
            <Link 
              href="/decks" 
              className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Decks
            </Link>
            <Link 
              href="/study" 
              className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Study
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">
              Hello, {user.name}
            </span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
