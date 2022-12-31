import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { FontStyle } from './themes/FontStyle';
import { GlobalStyle } from './themes/GlobalStyle';
import { AuthProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <FontStyle/>
      <GlobalStyle/>
      <App />
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


