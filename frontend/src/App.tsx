import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NewLandingPage } from './pages/NewLandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { PricingPage } from './pages/PricingPage';
import { SignInPage } from './pages/SignInPage';
import { ShowcasePage } from './pages/ShowcasePage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { DocumentationPage } from './pages/DocumentationPage';
import { ContactPage } from './pages/ContactPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { initAnonymousSession } from './lib/supabase';

import { Analytics } from '@vercel/analytics/react';

function App() {
  // TEMPORARY: Initialize anonymous session for testing persistence
  // See docs/TEMP_ANONYMOUS_AUTH.md - REMOVE BEFORE PRODUCTION
  useEffect(() => {
    initAnonymousSession();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NewLandingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/showcase" element={<ShowcasePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/documentation" element={<DocumentationPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/:mapId"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </>
  );
}

export default App;
