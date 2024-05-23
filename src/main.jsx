import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import CartProvider from './context/CartProvider.jsx'
import { NotificationProvider } from './notification/NotificationService';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NotificationProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </NotificationProvider>
  </React.StrictMode>,
)
