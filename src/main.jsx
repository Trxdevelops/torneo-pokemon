import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App.jsx';
import './index.css';

//==Creacion del cerebro gestionador de peticiones===//
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, //Por defecto son 3 reintentos, con retry 1 solo se reintenta una vez (2 intentos en total).
      refetchOnWindowFocus: false, //No repetir la peticion al cambiar de ventana o aplicacion.
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);