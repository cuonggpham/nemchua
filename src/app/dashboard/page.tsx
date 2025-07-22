import { redirect } from 'next/navigation'
// import { prisma } from '@/lib/prisma'
// import { DashboardHeader } from '@/components/features/dashboard-header'
// import { StatsCards } from '@/components/features/stats-cards'
// import { DecksGrid } from '@/components/features/decks-grid'

export default async function DashboardPage() {
  // Temporary: Authentication disabled for build testing
  // TODO: Re-enable authentication once NextAuth is properly configured
  
  // For now, redirect to signin since auth is not working
  redirect('/auth/signin')

  /* 
  // This code will be uncommented once NextAuth is fixed:
  
  const session = await auth()

  if (!session?.user?.email) {
    redirect('/auth/signin')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      decks: {
        include: {
          _count: {
            select: {
              cards: true
            }
          }
        }
      },
      studySessions: {
        where: {
          date: {
            gte: new Date(new Date().setHours(0, 0, 0, 0))
          }
        }
      }
    }
  })

  if (!user) {
    redirect('/auth/signin')
  }

  // Calculate statistics
  const totalCards = await prisma.flashcard.count({
    where: {
      deck: {
        userId: user.id
      }
    }
  })

  const dueCards = await prisma.flashcard.count({
    where: {
      deck: {
        userId: user.id
      },
      nextReviewDate: {
        lte: new Date()
      }
    }
  })

  const masteredCards = await prisma.flashcard.count({
    where: {
      deck: {
        userId: user.id
      },
      status: 'MASTERED'
    }
  })

  const todayStudied = user.studySessions.length

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Ready to continue your Japanese learning journey?
          </p>
        </div>

        <StatsCards 
          totalCards={totalCards}
          dueCards={dueCards}
          masteredCards={masteredCards}
          todayStudied={todayStudied}
        />

        <DecksGrid decks={user.decks} />
      </main>
    </div>
  )
  */
}
