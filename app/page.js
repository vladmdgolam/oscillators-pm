"use client"
import Synthesizer from '@/components/Synthesizer'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Synthesizer />
    </main>
  )
}
