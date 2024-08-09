import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './shared/store/store.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './app/App.tsx'
import EditUserPage from './pages/UserPage.tsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/profile/:id',
		element: <EditUserPage />,
	},
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
)
