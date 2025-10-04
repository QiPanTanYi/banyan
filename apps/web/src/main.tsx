import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { useAuthStore } from './stores/authStore'
import './index.css'

// 初始化认证状态
const initializeApp = async () => {
  const { initializeAuth } = useAuthStore.getState();
  await initializeAuth();
};

// 在应用启动时初始化认证状态
initializeApp();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)