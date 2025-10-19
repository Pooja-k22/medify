import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CustomThemeProvider } from './context/CustomThemeProvider.jsx'
import { CssBaseline } from '@mui/material'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CustomThemeProvider >
      <CssBaseline />
      <App /></CustomThemeProvider>
  </StrictMode>,
)
