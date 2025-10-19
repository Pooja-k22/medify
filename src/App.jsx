
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
      {/* ToastContainer  */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      

      <BrowserRouter>
      <AppRoutes/>
      </BrowserRouter>
     
    </>
  )
}

export default App
