import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import { store } from "./redux/Store.jsx";
import { Provider } from "react-redux";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Provider store={store}>
      <ThemeProvider>
        <App className="text-[#EEEEEE]" />
      </ThemeProvider>
     </Provider>
  </React.StrictMode>,
)
