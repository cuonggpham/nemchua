'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface Deck {
  _id: string;
  name: string;
  description: string;
  flashcardCount?: number;
  updatedAt: string;
}

export default function StudyPage() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDecks();
  }, []);

  const fetchDecks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/decks');
      const result = await response.json();
      
      if (result.success) {
        setDecks(result.data);
      } else {
        setError(result.error || 'Failed to fetch decks');
      }
    } catch (err) {
      setError('An error occurred while fetching decks');
      console.error('Error fetching decks:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50/50 via-white to-accent-50/30">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="loading-spinner"></div>
            <span className="ml-2 text-secondary-600">Đang tải...</span>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50/50 via-white to-accent-50/30 text-secondary-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            Học từ vựng tiếng Nhật
          </h1>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Chọn deck để bắt đầu học với hệ thống flashcard thông minh
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchDecks}
              className="mt-2"
            >
              Thử lại
            </Button>
          </div>
        )}

        {/* Decks Selection */}
        {decks.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📚</span>
            </div>
            <h2 className="text-2xl font-semibold text-secondary-900 mb-2">
              Chưa có deck nào để học
            </h2>
            <p className="text-secondary-600 mb-6 max-w-md mx-auto">
              Tạo deck đầu tiên và thêm flashcard để bắt đầu học từ vựng
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/decks/new">
                <Button>
                  Tạo Deck mới
                </Button>
              </Link>
              <Link href="/decks">
                <Button variant="outline">
                  Quản lý Deck
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {decks.map((deck) => (
              <Card key={deck._id} variant="elevated" className="hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2 mb-2">
                    {deck.name}
                  </CardTitle>
                  {deck.description && (
                    <CardDescription className="line-clamp-3">
                      {deck.description}
                    </CardDescription>
                  )}
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                        <span className="text-secondary-600">
                          {deck.flashcardCount || 0} từ vựng
                        </span>
                      </div>
                      <span className="text-secondary-500">
                        {new Date(deck.updatedAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>

                    {/* Progress placeholder */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-secondary-500">
                        <span>Tiến độ</span>
                        <span>0%</span>
                      </div>
                      <div className="w-full bg-secondary-200 rounded-full h-2">
                        <div className="bg-primary-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                    </div>

                    {/* Study Button */}
                    <Link href={`/study/${deck._id}`} className="block w-full">
                      <Button className="w-full">
                        <span className="mr-2">🚀</span>
                        Bắt đầu học
                      </Button>
                    </Link>

                    {/* Secondary Actions */}
                    <div className="flex gap-2">
                      <Link href={`/flashcards?deckId=${deck._id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          Xem từ vựng
                        </Button>
                      </Link>
                      <Link href={`/decks/${deck._id}`}>
                        <Button variant="ghost" size="sm">
                          Chỉnh sửa
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Quick Stats */}
        {decks.length > 0 && (
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">
              Thống kê tổng quan
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {decks.length}
                </div>
                <div className="text-secondary-600">Deck</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {decks.reduce((total, deck) => total + (deck.flashcardCount || 0), 0)}
                </div>
                <div className="text-secondary-600">Tổng từ vựng</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning mb-2">0</div>
                <div className="text-secondary-600">Đến hạn ôn</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-info mb-2">0</div>
                <div className="text-secondary-600">Đã học hôm nay</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
