import './App.scss';
import ParticlesComponent from './components/particles/ParticlesComponent';
import ImageCart from '../src/assets/images/cart.png';
import CountdownComponent from './components/countdown/CountdownComponent';
function App() {
  return (
    <div className='wrap-message'>
      
      <div className="cart">
        <CountdownComponent targetDate={new Date('2025-06-08T10:00:00')} />
        <img src={ImageCart} />
      </div>

      <ParticlesComponent />
    </div>
  );
}

export default App;
