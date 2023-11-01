import React from 'react'
import ReactDOM from 'react-dom/client'
import './app.scss'
import App from './App'
import { AuthContextProvider } from './context/AuthContext'
import { Provider } from 'react-redux'
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<AuthContextProvider>
		<React.StrictMode>
		<Provider store={store}>
      <App />
    </Provider>
		</React.StrictMode>
	</AuthContextProvider>
)
