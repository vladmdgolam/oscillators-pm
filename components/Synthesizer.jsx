import { useRef } from 'react'
import Key from './Key'
import { useKeyPress } from '@/hooks/useKeyPress'

const noteFrequencies = {
    'A': 440,    // A4
    'S': 466.16, // A#4/Bb4
    'D': 493.88, // B4
}

const Synthesizer = () => {

    const audioContextRef = useRef(null)
    const oscillatorsRef = useRef({})

    const playNote = (note) => {
        if (!audioContextRef.current) {
            audioContextRef.current = new AudioContext()
        }
        if (oscillatorsRef.current[note]) {
            // Note is already playing
            return
        }
        const oscillator = audioContextRef.current.createOscillator()

        const noteFrequency = noteFrequencies[note]
        oscillator.frequency.setValueAtTime(noteFrequency, audioContextRef.current.currentTime)

        oscillator.type = 'sine'
        oscillator.connect(audioContextRef.current.destination)
        oscillator.start()
        oscillatorsRef.current[note] = oscillator
    }

    const stopNote = (note) => {
        if (oscillatorsRef.current[note]) {
            oscillatorsRef.current[note].stop()
            oscillatorsRef.current[note].disconnect()
            delete oscillatorsRef.current[note]
        }
    }


    // Define the event callback for key press
    const handleKeyPress = (isKeyDown, key) => {
        isKeyDown ? playNote(key) : stopNote(key)
    }

    // Set up the useKeyPress hook for each key
    useKeyPress('a', (isKeyDown) => handleKeyPress(isKeyDown, 'A'))
    useKeyPress('s', (isKeyDown) => handleKeyPress(isKeyDown, 'S'))
    useKeyPress('d', (isKeyDown) => handleKeyPress(isKeyDown, 'D'))


    return (
        <section className='synthesizer'>
            <Key note="A" playNote={playNote} stopNote={stopNote} />
            <Key note="S" playNote={playNote} stopNote={stopNote} />
            <Key note="D" playNote={playNote} stopNote={stopNote} />
        </section>
    )
}

export default Synthesizer