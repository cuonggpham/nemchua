import Link from 'next/link';
import { Sparkles, Library, Brain, Target, ArrowRight, Plus, BarChart3 } from 'lucide-react';
import Header from '@/components/Header';
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-100/20 rounded-full blur-3xl"></div>
      </div>
      
      <Header />
      
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 page-transition">
          <div className="inline-flex items-center px-4 py-2 bg-primary-50/80 backdrop-blur-sm border border-primary-200/50 rounded-full text-primary-700 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Học từ vựng tiếng Nhật hiệu quả
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6 text-balance">
            Chào mừng đến với{' '}
            <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600 bg-clip-text text-transparent">
              Nemchua
            </span>
          </h1>
          
          <p className="text-xl text-secondary-600 mb-8 max-w-3xl mx-auto text-balance leading-relaxed">
            Ứng dụng học từ vựng tiếng Nhật hiệu quả với hệ thống flashcard thông minh 
            và thuật toán <span className="font-semibold text-primary-600">SRS (Spaced Repetition System)</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/study">
              <Button size="lg" className="w-full sm:w-auto btn-primary shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40">
                <Icon icon={Sparkles} size={20} className="mr-2" />
                Bắt đầu học ngay
              </Button>
            </Link>
            <Link href="/decks">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary-200 text-primary-700 hover:bg-primary-50 hover:border-primary-300">
                <Icon icon={Library} size={20} className="mr-2" />
                Quản lý Deck
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card variant="elevated" className="text-center group card-hover glass border-primary-100/50 hover:border-primary-200/50">
            <CardHeader>
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary-500/25">
                <Icon icon={Library} size={28} className="text-white" />
              </div>
              <CardTitle className="text-secondary-900">Flashcard thông minh</CardTitle>
              <CardDescription className="text-secondary-600">
                Hệ thống flashcard với giao diện trực quan, hỗ trợ hiển thị kanji, hiragana và nghĩa tiếng Việt
              </CardDescription>
            </CardHeader>
          </Card>

          <Card variant="elevated" className="text-center group card-hover glass border-primary-100/50 hover:border-primary-200/50">
            <CardHeader>
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary-500/25">
                <Icon icon={Brain} size={28} className="text-white" />
              </div>
              <CardTitle className="text-secondary-900">Thuật toán SRS</CardTitle>
              <CardDescription className="text-secondary-600">
                Sử dụng thuật toán SuperMemo 2 để tối ưu hóa việc ôn tập, giúp ghi nhớ từ vựng lâu dài
              </CardDescription>
            </CardHeader>
          </Card>

          <Card variant="elevated" className="text-center group card-hover glass border-primary-100/50 hover:border-primary-200/50">
            <CardHeader>
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary-500/25">
                <Icon icon={Target} size={28} className="text-white" />
              </div>
              <CardTitle className="text-secondary-900">Học tập có mục tiêu</CardTitle>
              <CardDescription className="text-secondary-600">
                Theo dõi tiến độ học tập và tự động điều chỉnh lịch ôn tập phù hợp với khả năng ghi nhớ
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card variant="elevated" className="glass border-primary-100/50 bg-gradient-to-r from-white/80 to-primary-50/30 backdrop-blur-sm">
          <CardContent className="text-center py-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-secondary-900 to-secondary-700 bg-clip-text text-transparent mb-6">
              Bắt đầu ngay hôm nay
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Link href="/decks/new" className="group">
                <div className="p-6 rounded-xl border-2 border-dashed border-primary-300/60 hover:border-primary-500 hover:bg-primary-50/50 transition-all duration-300 backdrop-blur-sm card-hover">
                  <Icon icon={Plus} size={32} className="mx-auto text-primary-600 mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-semibold text-secondary-900 mb-2">Tạo Deck đầu tiên</h3>
                  <p className="text-sm text-secondary-600">Tạo bộ thẻ từ vựng mới để bắt đầu học</p>
                </div>
              </Link>
              
              <Link href="/study" className="group">
                <div className="p-6 rounded-xl border-2 border-dashed border-primary-300/60 hover:border-primary-500 hover:bg-primary-50/50 transition-all duration-300 backdrop-blur-sm card-hover">
                  <Icon icon={ArrowRight} size={32} className="mx-auto text-primary-600 mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-semibold text-secondary-900 mb-2">Bắt đầu học</h3>
                  <p className="text-sm text-secondary-600">Chọn deck và bắt đầu học từ vựng ngay</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Stats Section */}
        <div className="mt-16 text-center page-transition">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-secondary-900 to-secondary-700 bg-clip-text text-transparent mb-8">
            Thống kê học tập
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="text-center glass border-primary-100/50 card-hover">
              <CardContent className="py-6">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent mb-2">0</div>
                <div className="text-secondary-600 font-medium">Từ đã học</div>
              </CardContent>
            </Card>
            <Card className="text-center glass border-primary-100/50 card-hover">
              <CardContent className="py-6">
                <div className="text-3xl font-bold bg-gradient-to-r from-warning to-yellow-500 bg-clip-text text-transparent mb-2">0</div>
                <div className="text-secondary-600 font-medium">Từ đến hạn ôn</div>
              </CardContent>
            </Card>
            <Card className="text-center glass border-primary-100/50 card-hover">
              <CardContent className="py-6">
                <div className="text-3xl font-bold bg-gradient-to-r from-info to-blue-500 bg-clip-text text-transparent mb-2">0</div>
                <div className="text-secondary-600 font-medium">Deck hiện có</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
