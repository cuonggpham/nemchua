import Link from 'next/link';
import { BookOpen, Library, GraduationCap, Menu } from 'lucide-react';
import Icon from '@/components/ui/Icon';

export default function Header() {
  return (
    <header className="glass border-b border-white/20 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 gradient-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <div className="absolute inset-0 gradient-primary rounded-2xl opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-700 to-primary-600 bg-clip-text text-transparent group-hover:from-primary-600 group-hover:to-primary-500 transition-all duration-300">
              Nemchua
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-1">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50/80 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 focus-ring backdrop-blur-sm"
            >
              <Icon icon={BookOpen} size={16} />
              Trang chủ
            </Link>
            <Link 
              href="/decks" 
              className="flex items-center gap-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50/80 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 focus-ring backdrop-blur-sm"
            >
              <Icon icon={Library} size={16} />
              Quản lý Deck
            </Link>
            <Link 
              href="/study" 
              className="flex items-center gap-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50/80 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 focus-ring backdrop-blur-sm"
            >
              <Icon icon={GraduationCap} size={16} />
              Học từ vựng
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-secondary-600 hover:text-primary-600 hover:bg-primary-50/80 p-2 rounded-xl transition-all duration-300 focus-ring backdrop-blur-sm"
              aria-label="Menu"
            >
              <Icon icon={Menu} size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
