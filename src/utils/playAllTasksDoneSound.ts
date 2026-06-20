import allTasksDoneSound from '../assets/sounds/all-tasks-done.mp3'

let audio: HTMLAudioElement | null = null

export function playAllTasksDoneSound() {
  if (typeof window === 'undefined') return

  if (!audio) {
    audio = new Audio(allTasksDoneSound)
    audio.volume = 0.35
  }

  audio.currentTime = 0
  void audio.play().catch(() => {})
}
