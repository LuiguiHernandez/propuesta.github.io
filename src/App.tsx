import "./App.scss";
import ParticlesComponent from "./components/particles/ParticlesComponent";
import ImageCart from "../src/assets/images/cart.png";
import BackCart from "../src/assets/images/back-cart.png";
import CountdownComponent from "./components/countdown/CountdownComponent";
import Button from "@mui/material/Button";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useCallback, useState } from "react";

function App() {
  const [open, setOpen] = useState<boolean>(false);
  const [displayButton, setDisplayButton] = useState<boolean>(false);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <div className="wrap-message">
        <div className="cart">
          <CountdownComponent
            onCountdownEnd={() => setDisplayButton(true)}
            targetDate={new Date("2025-06-08T10:00:00")}
          />
          <img src={ImageCart} />
          <div className="buttons">
            {displayButton ? (
              <Button
                variant="contained"
                onClick={() => setOpen(true)}
                disableElevation
              >
                ¡Abrir Carta!
              </Button>
            ) : null}
          </div>
        </div>

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
            <img src={BackCart} />
            <div className="text">
              Desde que llegaste a mi vida, todo es más bonito. Cada sonrisa
              tuya es un universo al que me encantaría pertenecer. <br />
              <br />
              No sé en qué momento mi corazón empezó a latir diferente, solo sé
              que desde entonces, todo lo que quiero… eres tú. <br />
              <br />
              Hoy quiero invitarte a una pequeña aventura, una ruta de preguntas
              hechas con amor, que cuentan un poquito de lo que siento por ti.
              Al final, hay algo muy especial que quiero decirte… <br />
              <br /> ¿Empezamos esta aventura juntos?
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
