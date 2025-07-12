import { useState } from 'react'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Dashboard } from './components/Dashboard'
import { WorkQueue } from './components/WorkQueue'
import { NoteReviewer } from './components/NoteReviewer'
import { Analytics } from './components/Analytics'
import './App.css'

function App() {
  const [activeView, setActiveView] = useState('dashboard')
  const [selectedNote, setSelectedNote] = useState(null)

  const handleSelectNote = (note) => {
    setSelectedNote(note)
    setActiveView('note-reviewer')
  }

  const handleBackToQueue = () => {
    setSelectedNote(null)
    setActiveView('work-queue')
  }

  const renderMainContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />
      case 'work-queue':
        return <WorkQueue onSelectNote={handleSelectNote} />
      case 'high-priority':
        return <WorkQueue onSelectNote={handleSelectNote} />
      case 'pending-review':
        return <WorkQueue onSelectNote={handleSelectNote} />
      case 'completed':
        return <WorkQueue onSelectNote={handleSelectNote} />
      case 'analytics':
        return <Analytics />
      case 'reports':
        return <Analytics />
      case 'note-reviewer':
        return selectedNote ? (
          <NoteReviewer note={selectedNote} onBack={handleBackToQueue} />
        ) : (
          <Dashboard />
        )
      case 'users':
        return (
          <div className="p-6">
            <h2 className="text-3xl font-bold tracking-tight mb-4">User Management</h2>
            <p className="text-muted-foreground">
              User management functionality would be implemented here.
            </p>
          </div>
        )
      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Settings</h2>
            <p className="text-muted-foreground">
              System settings and configuration options would be implemented here.
            </p>
          </div>
        )
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        {activeView !== 'note-reviewer' && (
          <Sidebar activeView={activeView} setActiveView={setActiveView} />
        )}
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-white">
          {renderMainContent()}
        </main>
      </div>
    </div>
  )
}

export default App
