import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { ThemeProvider } from '@emotion/react'
import theme from './theme/Theme.ts'
import './App.css'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>   
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
   </ThemeProvider>
)
