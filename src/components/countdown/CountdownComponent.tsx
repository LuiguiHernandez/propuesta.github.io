// src/components/Countdown/Countdown.tsx

import React, { useState, useEffect } from 'react';
import './Countdown.scss';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface CountdownProps {
    targetDate: string | Date;
    onCountdownEnd?: () => void;
}

const calculateTimeLeft = (targetDate: Date): TimeLeft | null => {
    const difference = +targetDate - +new Date();

    if (difference > 0) {
        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }
    return null; // La cuenta regresiva ha terminado
};

const CountdownComponent = ({ targetDate, onCountdownEnd }: CountdownProps) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(
        calculateTimeLeft(new Date(targetDate))
    );
    const [isCountingDown, setIsCountingDown] = useState<boolean>(true);

    useEffect(() => {
        const finalTargetDate = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;

        if (isNaN(finalTargetDate.getTime())) {
            console.error("La fecha objetivo proporcionada no es válida:", targetDate);
            setTimeLeft(null);
            setIsCountingDown(false);
            return;
        }

        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft(finalTargetDate);

            if (newTimeLeft) {
                setTimeLeft(newTimeLeft);
            } else {
                // La cuenta regresiva ha terminado
                clearInterval(timer); // Limpia el intervalo
                setTimeLeft(null); // Establece el tiempo restante a null
                setIsCountingDown(false); // Detiene la cuenta regresiva
                if (onCountdownEnd) {
                    onCountdownEnd(); // Llama al callback si está definido
                }
            }
        }, 1000); // Actualiza cada segundo

        // Función de limpieza para cuando el componente se desmonte o el efecto se re-ejecute
        return () => clearInterval(timer);
    }, [targetDate, onCountdownEnd]); // Dependencias del efecto

    // Renderizado del componente
    if (!isCountingDown || !timeLeft) {
        return <div className="countdown-finished">¡Es hora de empezar esta aventura 🩵​!</div>;
    }

    return (
        <div className="countdown-container">
            {timeLeft.days > 0 && ( // Solo muestra los días si hay días restantes
                <div className="countdown-item">
                    <span className="countdown-value">{timeLeft.days}</span>
                    <span className="countdown-label">Días</span>
                </div>
            )}
            <div className="countdown-item">
                <span className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="countdown-label">Horas</span>
            </div>
            <div className="countdown-item">
                <span className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="countdown-label">Minutos</span>
            </div>
            <div className="countdown-item">
                <span className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="countdown-label">Segundos</span>
            </div>
        </div>
    );
};

export default CountdownComponent;