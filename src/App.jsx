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
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: -1,
          opacity: 0.4
        }}
      >
        <source src="/bac.mov" type="video/quicktime" />
        <source src="/bac.mov" type="video/mp4" />
      </video>
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
