import { Routes } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import { Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Templates from "./pages/templates/Templates"
import EditorPage from "./pages/edit/EditorPage"
import Home from "./pages/Home"
import TemplateForm from "./components/layout/FormSections/TemplateForm"


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/editor" element={<TemplateForm />} />
        <Route path="*" element={<h2 className="text-center mt-10 text-2xl">404 - Page Not Found</h2>} />
      </Routes>
    </div>
  )
}

export default App
