import React from "react"
import App from "@/App.tsx"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { persistor, store } from "@/redux/store.ts"
import { PersistGate } from "redux-persist/integration/react"
import "./index.css"
import { Toaster } from "./components/ui/sonner"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Toaster />
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
