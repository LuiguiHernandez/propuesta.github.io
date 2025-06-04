import './App.scss';
import ParticlesComponent from './components/particles/ParticlesComponent';
import ImageCart from '../src/assets/images/cart.png';
import CountdownComponent from './components/countdown/CountdownComponent';
function App() {
  return (
    <div className='wrap-message'>
      <CountdownComponent targetDate={new Date('2026-01-01T00:00:00')} />
      <div className="cart">
        <img src={ImageCart} />
      </div>

      <ParticlesComponent />
    </div>
  );
}

export default App;
