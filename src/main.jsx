import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'react-calendar/dist/Calendar.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import App from './App.jsx'
import HOC from './HOC.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HOC>
      <App />
    </HOC>
  </StrictMode>,
)
