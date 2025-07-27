'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';

export default function NewDeckPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Tên deck là bắt buộc';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});
      
      const response = await fetch('/api/decks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        router.push('/decks');
      } else {
        setErrors({ general: result.error || 'Failed to create deck' });
      }
    } catch (err) {
      setErrors({ general: 'An error occurred while creating the deck' });
      console.error('Error creating deck:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <Header />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-secondary-600 mb-4">
            <Link href="/decks" className="hover:text-primary-600 transition-colors">
              Quản lý Deck
            </Link>
            <span>/</span>
            <span>Tạo deck mới</span>
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            Tạo Deck mới
          </h1>
          <p className="text-secondary-600">
            Tạo một bộ thẻ từ vựng mới để bắt đầu học tiếng Nhật
          </p>
        </div>

        {/* Form */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Thông tin Deck</CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* General Error */}
              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800">{errors.general}</p>
                </div>
              )}

              {/* Deck Name */}
              <Input
                label="Tên Deck *"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Ví dụ: N5 Vocabulary, Hiragana Basics, ..."
                maxLength={100}
                required
              />

              {/* Deck Description */}
              <Textarea
                label="Mô tả"
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={errors.description}
                placeholder="Mô tả về nội dung và mục đích của deck này..."
                rows={4}
                maxLength={500}
                helperText="Tùy chọn - Mô tả giúp bạn nhớ mục đích của deck"
              />

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  loading={loading}
                  disabled={loading}
                  className="flex-1 sm:flex-none"
                >
                  {loading ? 'Đang tạo...' : 'Tạo Deck'}
                </Button>
                
                <Link href="/decks" className="flex-1 sm:flex-none">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    disabled={loading}
                  >
                    Hủy
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">💡 Gợi ý tạo Deck hiệu quả</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-secondary-600">
              <li className="flex items-start gap-2">
                <span className="text-primary-600 font-bold">•</span>
                <span>Đặt tên deck rõ ràng, dễ nhớ (VD: &quot;N5 Kanji&quot;, &quot;Thức ăn tiếng Nhật&quot;)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 font-bold">•</span>
                <span>Chia nhỏ theo chủ đề hoặc cấp độ để dễ quản lý</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 font-bold">•</span>
                <span>Viết mô tả để nhớ mục đích và nội dung của deck</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 font-bold">•</span>
                <span>Sau khi tạo deck, hãy thêm flashcard để bắt đầu học</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
