import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { ContactsPage } from './pages/ContactsPage';
import { TasksPage } from './pages/TasksPage';
import { MessagesPage } from './pages/MessagesPage';
import { ChatView } from './components/ChatView';
import { AIPage } from './pages/AIPage';
import { SettingsPage } from './pages/SettingsPage';
import { PremiumPage } from './pages/PremiumPage';
import { AuthGuard } from './components/AuthGuard';
import { FirebaseProvider } from './contexts/FirebaseContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { TelegramProvider } from './contexts/TelegramContext';

function App() {
  return (
    <FirebaseProvider>
      <TelegramProvider>
        <SettingsProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/*"
                element={
                  <AuthGuard>
                    <Layout>
                      <Routes>
                        <Route path="/contacts" element={<ContactsPage />} />
                        <Route path="/tasks" element={<TasksPage />} />
                        <Route path="/messages" element={<MessagesPage />} />
                        <Route path="/messages/:contactId" element={<ChatView />} />
                        <Route path="/ai" element={<AIPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/premium" element={<PremiumPage />} />
                        <Route path="*" element={<Navigate to="/contacts" replace />} />
                      </Routes>
                    </Layout>
                  </AuthGuard>
                }
              />
            </Routes>
          </Router>
        </SettingsProvider>
      </TelegramProvider>
    </FirebaseProvider>
  );
}

export default App;