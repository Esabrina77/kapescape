import Image from 'next/image'
import styles from '@/styles/JohnAttack.module.css'

export default function JohnAttack() {
  return (
    <div className={styles.johnContainer}>
      <Image
        src="/assets/john.png"
        alt="John"
        width={40}
        height={40}
        className={styles.johnImage}
      />
    </div>
  )
}
