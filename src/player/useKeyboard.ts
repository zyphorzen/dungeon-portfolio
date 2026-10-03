import { useEffect, useRef } from 'react'

export function useKeyboard() {
    const keys = useRef(new Set<string>())

    useEffect(() => {
        const set = keys.current
        const down = (e: KeyboardEvent) => set.add(e.code)
        const up = (e: KeyboardEvent) => set.delete(e.code)
        const clear = () => set.clear()
        window.addEventListener('keydown', down)
        window.addEventListener('keyup', up)
        window.addEventListener('blur', clear)
        return () => {
            window.removeEventListener('keydown', down)
            window.removeEventListener('keyup', up)
            window.removeEventListener('blur', clear)
        }
    }, [])

    return keys
}