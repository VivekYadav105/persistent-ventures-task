import { RouterProvider } from 'react-router-dom'
import { QueryClient,QueryClientProvider } from 'react-query'
import router from './router'
import { Toaster } from 'react-hot-toast'
import UserProvider from './context/user.context'

const queryClient = new QueryClient()

function App() {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position='top-right' />
      </QueryClientProvider>
    </UserProvider>
  )
}

export default App
