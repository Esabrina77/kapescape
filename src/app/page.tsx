// src/app/page.tsx

import GameBoard from '@/components/GameBoard'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Choisis ta cachette</h1>
      <GameBoard />
    </main>
  )
}