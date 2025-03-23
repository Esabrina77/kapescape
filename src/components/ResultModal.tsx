import styles from '@/styles/ResultModal.module.css'

interface Props {
  isSurvivor: boolean | null
  onRetry: () => void
}

export default function ResultModal({ isSurvivor, onRetry }: Props) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{isSurvivor ? '😮 Tu as survécu !' : '💀 Tu es mort...'}</h2>
        <button onClick={onRetry}>Rejouer</button>
      </div>
    </div>
  )
}
