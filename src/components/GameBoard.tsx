'use client'

import Image from 'next/image'
import { useState } from 'react'
import styles from '@/styles/GameBoard.module.css'
import JohnAttack from './JohnAttack'
import ResultModal from './ResultModal'

const zones = [
  { id: 1, top: 30, left: 250 },
  { id: 2, top: 140, left: 260 },
  { id: 3, top: 190, left: 120 },
  { id: 4, top: 330, left: 65 },
  { id: 5, top: 80, left: 60 },
  { id: 6, top: 160, left: 355 },
  { id: 7, top: 345, left: 140 },
  { id: 8, top: 90, left: 140 },
]

function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array]
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArr[i], newArr[j]] = [newArr[j], newArr[i]]
  }
  return newArr
}

export default function GameBoard() {
  const [selectedZone, setSelectedZone] = useState<number | null>(null)
  const [eliminatedZones, setEliminatedZones] = useState<number[]>([])
  const [currentJohnZone, setCurrentJohnZone] = useState<number | null>(null)
  const [isFinished, setIsFinished] = useState(false)
  const [isSurvivor, setIsSurvivor] = useState<boolean | null>(null)
  const [canStart, setCanStart] = useState(false)

  const handleSelect = (id: number) => {
    if (isFinished) return
    setSelectedZone(id)
    setCanStart(true)
  }

  const startGame = () => {
    if (!selectedZone) return
    setCanStart(false)

    const shuffled = shuffleArray(zones.map((z) => z.id))
    const victims = shuffled.slice(0, 6)
    const survivors = shuffled.slice(6)
    let step = 0

    const eliminate = () => {
      const next = victims[step]
    
      // John apparaît et tue immédiatement
      setCurrentJohnZone(next)
      setEliminatedZones((prev) => [...prev, next])
    
      // Si le joueur est tué : stop immédiat
      if (next === selectedZone) {
        setTimeout(() => {
          setCurrentJohnZone(null)
          setIsSurvivor(false)
          setIsFinished(true)
        }, 3000) // on laisse John visible 3s
        return // stop le reste du jeu
      }
    
      // Sinon continuer le déroulement normal
      setTimeout(() => {
        setCurrentJohnZone(null)
    
        setTimeout(() => {
          step++
    
          if (step < victims.length) {
            eliminate()
          } else {
            const survived = survivors.includes(selectedZone!)
            setIsSurvivor(survived)
            setIsFinished(true)
          }
        }, 3000)
      }, 3000)
    }
    

  
  
    eliminate()
  }

  const resetGame = () => {
    setSelectedZone(null)
    setEliminatedZones([])
    setCurrentJohnZone(null)
    setIsFinished(false)
    setIsSurvivor(null)
    setCanStart(false)
  }

  return (
    <div className={styles.boardContainer}>
      <Image
        src="/assets/level1.png"
        alt="Maison"
        width={390}
        height={390}
        className={styles.houseImage}
      />

      {zones.map((zone) => (
        <div
          key={zone.id}
          className={`${styles.zone} ${
            selectedZone === zone.id ? styles.selected : ''
          } ${eliminatedZones.includes(zone.id) ? styles.eliminated : ''}`}
          style={{ top: `${zone.top}px`, left: `${zone.left}px` }}
          onClick={() => handleSelect(zone.id)}
        >
          {currentJohnZone === zone.id && <JohnAttack />}
          {eliminatedZones.includes(zone.id) && (
            <Image
              src="/assets/blood.png"
              alt="Sang"
              width={40}
              height={40}
              className={styles.bloodStain}
            />
          )}
        </div>
      ))}

      {canStart && (
        <button onClick={startGame} className={styles.startButton}>
          Commencer
        </button>
      )}

      {isFinished && (
        <ResultModal isSurvivor={isSurvivor} onRetry={resetGame} />
      )}
    </div>
  )
}
