import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SkillProvider } from '@/context/SkillContext';
import { useSkillTheme } from '@/hooks/useSkillTheme';
import SkillUrlSync from '@/components/SkillUrlSync';
import FloatingTab from '@/components/ui/FloatingTab';
import ErrorBoundary from '@/components/ErrorBoundary';
import Home from '@/pages/Home';

function ThemeApplier() {
  useSkillTheme();
  return null;
}

function App() {
  return (
    <SkillProvider>
      <ThemeApplier />
      <Router basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <SkillUrlSync />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </ErrorBoundary>
        <FloatingTab />
      </Router>
    </SkillProvider>
  );
}

export default App;
