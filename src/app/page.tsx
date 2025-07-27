import Link from 'next/link';
import Header from '@/components/Header';
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6">
            Chào mừng đến với{' '}
            <span className="text-primary-600">Nemchua</span>
          </h1>
          <p className="text-xl text-secondary-600 mb-8 max-w-3xl mx-auto">
            Ứng dụng học từ vựng tiếng Nhật hiệu quả với hệ thống flashcard thông minh 
            và thuật toán SRS (Spaced Repetition System)
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/study">
              <Button size="lg" className="w-full sm:w-auto">
                🚀 Bắt đầu học ngay
              </Button>
            </Link>
            <Link href="/decks">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                📚 Quản lý Deck
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card variant="elevated" className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <CardTitle>Flashcard thông minh</CardTitle>
              <CardDescription>
                Hệ thống flashcard với giao diện trực quan, hỗ trợ hiển thị kanji, hiragana và nghĩa tiếng Việt
              </CardDescription>
            </CardHeader>
          </Card>

          <Card variant="elevated" className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧠</span>
              </div>
              <CardTitle>Thuật toán SRS</CardTitle>
              <CardDescription>
                Sử dụng thuật toán SuperMemo 2 để tối ưu hóa việc ôn tập, giúp ghi nhớ từ vựng lâu dài
              </CardDescription>
            </CardHeader>
          </Card>

          <Card variant="elevated" className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <CardTitle>Theo dõi tiến độ</CardTitle>
              <CardDescription>
                Thống kê chi tiết về quá trình học tập, số từ đã học và đến hạn ôn tập
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">
            Bắt đầu ngay hôm nay
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="outlined" className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-primary-600">📚</span>
                  Tạo Deck mới
                </CardTitle>
                <CardDescription>
                  Tạo bộ thẻ từ vựng mới theo chủ đề hoặc cấp độ học tập
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/decks/new">
                  <Button variant="outline" className="w-full">
                    Tạo Deck
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card variant="outlined" className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-primary-600">✏️</span>
                  Thêm từ vựng
                </CardTitle>
                <CardDescription>
                  Thêm từ vựng mới vào các deck hiện có để mở rộng vốn từ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/flashcards/new">
                  <Button variant="outline" className="w-full">
                    Thêm từ vựng
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Section (placeholder) */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-secondary-900 mb-8">
            Thống kê học tập
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl font-bold text-primary-600 mb-2">0</div>
              <div className="text-secondary-600">Từ đã học</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl font-bold text-warning mb-2">0</div>
              <div className="text-secondary-600">Từ đến hạn ôn</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl font-bold text-info mb-2">0</div>
              <div className="text-secondary-600">Deck hiện có</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
