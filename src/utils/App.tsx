import { Route, Routes } from 'react-router-dom'
import { CommandPaletteHintsProvider } from '../context/CommandPaletteHintsContext'
import AdminPage from '../pages/AdminPage'
import CertificationsPage from '../pages/CertificationsPage'
import HomePage from '../pages/HomePage'
import ProjectsPage from '../pages/ProjectsPage'

export default function App() {
  return (
    <CommandPaletteHintsProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/certifications" element={<CertificationsPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </CommandPaletteHintsProvider>
  )
}
