import { useState ,useCallback } from "react";
import { motion } from "framer-motion";
import questions from "./questions.json";
import BackCart from "../../assets/images/back-cart.png";
import { Button, Dialog, DialogContent } from "@mui/material";

export default function RomanticProposal() {
    const [step, setStep] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // Nuevo estado para el mensaje de ánimo
    const [openModal, setOpenModal] = useState(false); // Estado para controlar el modal
    const [hideCart, setHideCart] = useState<boolean>(false);
    const handleClose = useCallback(() => {
        setOpenModal(false);
    }, []);

    const handleOpenCard = () => {
        setOpenModal(true); // Abrir el modal
        setHideCart(true); // Ocultar el contenido detrás (como el contador y el botón)
    };

    const encouragementMessages = [
        "¡Eres increíble! 🌟",
        "¡Lo estás haciendo genial! 💖",
        "¡Sabía que podías hacerlo! 🥰",
        "¡Eres la mejor! 😘",
        "¡Qué inteligente eres! 🧠✨",
    ];

    const getRandomEncouragement = () => {
        const randomIndex = Math.floor(Math.random() * encouragementMessages.length);
        return encouragementMessages[randomIndex];
    };

    const validateAnswer = (selectedOption: string) => {
        const question = questions[step];
        if (question.response !== null && question.options[question.response] === selectedOption) {
            setErrorMessage(""); // Limpiar mensaje de error si la respuesta es correcta
            setSuccessMessage(getRandomEncouragement()); // Mostrar un mensaje de ánimo aleatorio
            setTimeout(() => {
                setSuccessMessage(""); // Limpiar el mensaje de ánimo después de un breve retraso
                setStep((prev) => prev + 1); // Avanzar automáticamente
            }, 1500);
        } else {
            setErrorMessage("Mi amor 😒, esa no es la respuesta correcta. Por favor, elige otra opción.");
        }
    };

    const final = {
        type: "final",
        content: `Gracias por caminar conmigo esta ruta de palabras. Cada respuesta me hizo sonreír, porque detrás de cada opción, solo veía una cosa: tú.

Ahora solo me queda hacerte una pregunta más, una que no está en las opciones, pero que viene directo de mi corazón…

¿Quieres ser mi novia? 💍🩷`,
    };

    const totalSteps = questions.length + 1; // preguntas + final

    const renderStep = () => {
        if (step === totalSteps - 1) {
            return (
                <>
                    <p className="card p">{final.content}</p>
                    <button
                        className="final-button"
                        onClick={() => handleOpenCard} // Abrir el modal
                    >
                        ¡Acepto 🩵😍!
                    </button>
                </>
            );
        }

        const question = questions[step];

        return (
            <>
                <h2 className="card h2">{question.question}</h2>
                <div className="options">
                    {question.options.map((opt: string, i: number) => (
                        <Button
                            classes="button-option"
                            variant="contained"
                            key={i}
                            onClick={() => validateAnswer(opt)}
                            className="button-option"
                        >
                            {opt}
                        </Button>
                    ))}
                </div>
                {successMessage && <p className="success-message">{successMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </>
        );
    };

    return (
        <div className="wrap-romantic-proposal">
            {!hideCart && (
            <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="card"
            >
                {renderStep()}
            </motion.div>
            )}

            {/* Modal */}
            <Dialog
            open={openModal}
            onClose={handleClose}
            sx={{
                "& .MuiDialogContent-root": {
                padding: 0,
                },
            }}
            slotProps={{
                paper: {
                sx: {
                    backgroundColor: "transparent", // Cambia el color de fondo a transparente
                },
                elevation: 5, // Cambia la elevación si es necesario
                },
            }}
            >
            <DialogContent className="wrap-dialog-cart">
                <img src={BackCart} alt="Background" />
                <div className="text">
                ¡Aceptaste esta aventura de amor conmigo! 💕 Desde hoy somos un dúo inseparable, como Netflix y palomitas. Contigo todo es más bonito: la luz, los días y hasta el silencio.
                <br /><br />
                Prometo hacerte sonreír, acompañarte en lo bueno y en lo difícil, y soñar juntos un futuro lleno de amor, risas y complicidad. Gracias por decir que sí… 
                <br /><br />
                ¡Nuestra historia apenas comienza y será increíble! 💖✨
                <br /><br />
                Te amo muchísimo, mi amor. 🩵
                <br />
                Vamos por esa vaca, ese toro, ese perro, esa camioneta y esa finca amor 😍
                </div>
            </DialogContent>
            </Dialog>
        </div>
    );
}
