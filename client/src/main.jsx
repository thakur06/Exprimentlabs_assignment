import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ContextWrapper from './context/ContextWrapper.jsx'
import App from './App.jsx'
createRoot(document.getElementById('root')).render(

    <ContextWrapper>
    <App />
    </ContextWrapper>

)
