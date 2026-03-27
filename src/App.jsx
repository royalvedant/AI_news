import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import Newsroom from './pages/Newsroom';
import NewsNavigator from './pages/NewsNavigator';
import StoryArc from './pages/StoryArc';
import Vernacular from './pages/Vernacular';
import VideoStudio from './pages/VideoStudio';

function ProtectedRoute({ children }) {
  const { userProfile } = useUser();
  if (!userProfile) return <Navigate to="/onboarding" replace />;
  return children;
}

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/newsroom" element={<ProtectedRoute><Newsroom /></ProtectedRoute>} />
        <Route path="/navigator" element={<ProtectedRoute><NewsNavigator /></ProtectedRoute>} />
        <Route path="/story-arc" element={<ProtectedRoute><StoryArc /></ProtectedRoute>} />
        <Route path="/vernacular" element={<ProtectedRoute><Vernacular /></ProtectedRoute>} />
        <Route path="/video-studio" element={<ProtectedRoute><VideoStudio /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </BrowserRouter>
  );
}
