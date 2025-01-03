// -- REACT
import { useState, useRef, useEffect } from "react";
// # TIMER HOOK
export function useTimer(initialHours: number, initialMinutes: number, initialSeconds: number) {
    // # TIME STATE 
    const [time, setTime] = useState({
        hours: initialHours,
        minutes: initialMinutes,
        seconds: initialSeconds
    });

    const timerId = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (timerId.current) {
                clearInterval(timerId.current);
            }
        };
    }, []);

    // # ADD TIME
    const tick = (): void => {
        setTime((prevTime) => {
            let { hours, minutes, seconds } = prevTime;
            seconds++;
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
                if (minutes >= 60) {
                    minutes = 0;
                    hours++;
                }
            }
            return { hours, minutes, seconds };
        });
    };
    // # START TIME
    const start = (): void => {
        if (!timerId.current) {
            timerId.current = setInterval(tick, 1000);
        }
    };
    // # STOP TIME
    const stop = (): void => {
        if (timerId.current) {
            clearInterval(timerId.current);
            timerId.current = null;
        }
    };
    // # CLEAR AND RESET TIME
    const reset = (hours: number, minutes: number, seconds: number): void => {
        stop();
        setTime({ hours, minutes, seconds });
    };

    return { time, start, stop, reset };
}
