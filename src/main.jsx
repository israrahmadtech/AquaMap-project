import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { WaterSpotProvider } from './components/WaterSpotContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WaterSpotProvider>
      <App />
    </WaterSpotProvider>
  </StrictMode>,
)
