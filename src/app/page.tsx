import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-emerald-900 mb-6">
            Nemchua
          </h1>
          <p className="text-xl text-emerald-700 mb-8 max-w-2xl mx-auto">
            Master Japanese vocabulary with intelligent flashcards and spaced repetition
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                Get Started
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button size="lg" variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-900">Smart Flashcards</CardTitle>
              <CardDescription>
                Learn Japanese vocabulary with Kanji, Vietnamese meanings, and example sentences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-emerald-700">
                Create and organize your vocabulary decks with rich content including Kanji characters, 
                Vietnamese translations, and contextual examples.
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-900">Spaced Repetition</CardTitle>
              <CardDescription>
                Optimize your learning with the proven SM-2 algorithm
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-emerald-700">
                Our intelligent system schedules reviews based on your performance, 
                ensuring you focus on the words that need the most practice.
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-900">Progress Tracking</CardTitle>
              <CardDescription>
                Monitor your learning journey with detailed statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-emerald-700">
                Track your progress with comprehensive statistics and insights 
                to stay motivated on your Japanese learning journey.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
