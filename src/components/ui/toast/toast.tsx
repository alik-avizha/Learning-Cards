import { ToastContainer } from 'react-toastify'

export const GlobalToast = () => {
  return (
    <ToastContainer
      position="bottom-left"
      autoClose={1500}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  )
}
