const Key = ({ note, playNote, stopNote }) => {
    return (
        <button
            onPointerDown={() => playNote(note)}
            onPointerUp={() => stopNote(note)}
        >
            {note}
        </button>
    )
}

export default Key