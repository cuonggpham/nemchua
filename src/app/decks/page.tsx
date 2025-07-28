'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Calendar, BookOpen, Trash2, Edit, Play } from 'lucide-react';
import Header from '@/components/Header';
import Card, { CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';

interface Deck {
  _id: string;
  name: string;
  description: string;
  flashcardCount?: number;
  createdAt: string;
  updatedAt: string;
}

export default function DecksPage() {
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

  const handleDelete = async (deckId: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa deck này? Tất cả flashcard trong deck cũng sẽ bị xóa.')) {
      return;
    }

    try {
      const response = await fetch(`/api/decks/${deckId}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.success) {
        setDecks(decks.filter(deck => deck._id !== deckId));
      } else {
        alert(result.error || 'Failed to delete deck');
      }
    } catch (err) {
      alert('An error occurred while deleting the deck');
      console.error('Error deleting deck:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">
              Quản lý Deck
            </h1>
            <p className="text-secondary-600">
              Tạo và quản lý các bộ thẻ từ vựng của bạn
            </p>
          </div>
          <Link href="/decks/new">
            <Button>
              <span className="mr-2">+</span>
              Tạo Deck mới
            </Button>
          </Link>
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

        {/* Decks Grid */}
        {decks.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📚</span>
            </div>
            <h2 className="text-2xl font-semibold text-secondary-900 mb-2">
              Chưa có deck nào
            </h2>
            <p className="text-secondary-600 mb-6 max-w-md mx-auto">
              Tạo deck đầu tiên để bắt đầu học từ vựng tiếng Nhật với Nemchua
            </p>
            <Link href="/decks/new">
              <Button>
                Tạo Deck đầu tiên
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {decks.map((deck) => (
              <Card key={deck._id} variant="elevated" className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">
                    {deck.name}
                  </CardTitle>
                  {deck.description && (
                    <CardDescription className="line-clamp-3">
                      {deck.description}
                    </CardDescription>
                  )}
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-secondary-500 mb-4">
                    <span>
                      {deck.flashcardCount || 0} thẻ từ vựng
                    </span>
                    <span>
                      {new Date(deck.updatedAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="flex gap-2">
                  <Link href={`/study/${deck._id}`} className="flex-1">
                    <Button variant="primary" size="sm" className="w-full">
                      Học ngay
                    </Button>
                  </Link>
                  <Link href={`/decks/${deck._id}`}>
                    <Button variant="outline" size="sm">
                      Chỉnh sửa
                    </Button>
                  </Link>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => handleDelete(deck._id)}
                  >
                    Xóa
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
