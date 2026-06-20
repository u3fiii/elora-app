import taskDoneSound from '../assets/sounds/task-done.mp3'

let audio: HTMLAudioElement | null = null

export function playTaskDoneSound() {
  if (typeof window === 'undefined') return

  if (!audio) {
    audio = new Audio(taskDoneSound)
    audio.volume = 0.25
  }

  audio.currentTime = 0
  void audio.play().catch(() => {})
}
