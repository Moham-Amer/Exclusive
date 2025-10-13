import { useEffect, useState } from "react";

export function useDebounce(value, delay = 5_00) {
    const [state, setState] = useState(value);

    useEffect(() => {
        const de = setTimeout(() => {
            setState(value);
        }, delay);

        return () => {
            clearTimeout(de);
        }
    }, [value, delay])

    return state;
}