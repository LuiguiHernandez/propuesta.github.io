import "./App.scss";
import ParticlesComponent from "./components/particles/ParticlesComponent";
import ImageCart from "../src/assets/images/cart.png";
import BackCart from "../src/assets/images/back-cart.png";
import CountdownComponent from "./components/countdown/CountdownComponent";
import Button from "@mui/material/Button";
import { Dialog, DialogContent } from "@mui/material";
import { useCallback, useState } from "react";
import RomanticProposal from "./components/romantic-proposal/RomanticProposal";
import "../src/components/romantic-proposal/RomanticProposal.scss";



function App() {
  const [open, setOpen] = useState<boolean>(false);
  const [displayButton, setDisplayButton] = useState<boolean>(false);
  const [hideCart, setHideCart] = useState<boolean>(false);
  const [showProposal, setShowProposal] = useState<boolean>(false);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpenCard = () => {
    setOpen(true);
    setHideCart(true); // Ocultar el carta contador y boton al abrir el diálogo
    setDisplayButton(false); // Ocultar el botón al abrir el diálogo
  };

  const handleShowProposal = () => {
    setShowProposal(true);
    handleClose(); // Cerrar el diálogo al mostrar la propuesta romántica
  }


  return (
    <>
      <div className="wrap-message">
      {!hideCart && (
    <div className="cart">
      <CountdownComponent
        onCountdownEnd={() => setDisplayButton(true)}
        targetDate={new Date("2025-06-07T00:42:00")}
      />
      <img src={ImageCart} alt="" />
      <div className="buttons">
        {displayButton && (
          <Button
            variant="contained"
            onClick={handleOpenCard}
          >
            ¡Abrir Carta!
          </Button>
        )}
      </div>
    </div>
  )}

        <ParticlesComponent />
      </div>
      <Dialog
        open={open}
        sx={{
          "& .MuiDialogContent-root": {
            padding: 0,
          },
        }}
        onClose={handleClose}
        slotProps={{
          paper: {
            // Este es el slot para el componente Paper interno
            sx: {
              backgroundColor: "transparent", // Cambia el color de fondo a transparentes
              // Puedes pasar otras props del Paper aquí también
              // elevation: 5, // Si necesitas cambiar la elevación
            },
            // También puedes pasar otras props del Paper directamente aquí
            // como 'elevation' si no quieres usarlo dentro de 'sx'
            elevation: 5,
          },
        }}
      >
        <DialogContent>
          <div className="wrap-dialog-cart">
            <img src={BackCart} alt=""/>
            <div className="text">
              Desde que llegaste a mi vida, todo es más bonito. Cada sonrisa
              tuya es un universo al que me encantaría pertenecer 😍​. <br />
              <br />
              No sé en qué momento mi corazón empezó a latir diferente, solo sé
              que desde entonces, todo lo que quiero… eres tú. <br />
              <br />
              Hoy quiero invitarte a una pequeña aventura, una ruta de preguntas
              hechas con amor, que cuentan un poquito de lo que siento por ti.
              Al final, hay algo muy especial que quiero decirte… <br />
              <br /> ¿Empezamos esta aventura juntos? 🩵​
            </div>
          </div>
          <div className="buttons">
            <Button onClick={handleShowProposal} 
            variant="contained" 
            color="primary">
                Vamos a empezar 
              </Button>
              </div> 
        </DialogContent>
      </Dialog>
      <div className="wrap-romantic-proposal">
      {showProposal && <RomanticProposal />}
      </div>
    </>
  );
}

export default App;
