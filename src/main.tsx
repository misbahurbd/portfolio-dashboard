import React from "react"
import App from "@/App.tsx"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { persistor, store } from "@/redux/store.ts"
import { PersistGate } from "redux-persist/integration/react"
import "./index.css"
import { Toaster } from "./components/ui/sonner"
import { HelmetProvider } from "react-helmet-async"
import AddSkillForm from "./modal/skill-form-modal"
import EditSkillForm from "./modal/edit-skill-form-modal"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <HelmetProvider>
          <AddSkillForm />
          <EditSkillForm />
          <Toaster />
          <App />
        </HelmetProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
