import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from './components/Layout'
import ToastProvider from './components/ToastProvider'
import Avisar from './pages/Avisar'
import Bairro from './pages/Bairro'
import DetalheAlertaSensor from './pages/DetalheAlertaSensor'
import DetalheRelato from './pages/DetalheRelato'
import Mapa from './pages/Mapa'
import NaoEncontrado from './pages/NaoEncontrado'
import Relatorio from './pages/Relatorio'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Mapa /> },
      { path: 'avisar', element: <Avisar /> },
      { path: 'relatos/:id', element: <DetalheRelato /> },
      { path: 'relatos/:id/editar', element: <Avisar /> },
      { path: 'alertas/:id', element: <DetalheAlertaSensor /> },
      { path: 'bairro', element: <Bairro /> },
      { path: 'relatorio', element: <Relatorio /> },
      { path: '*', element: <NaoEncontrado /> },
    ],
  },
])

export default function App() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  )
}
