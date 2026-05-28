import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ErrorBoundary from './components/shared/ErrorBoundary'
import ProtectedRoute from './components/shared/ProtectedRoute'
import AuthPage from './pages/AuthPage'
import LandingPage from './pages/LandingPage'
import UploadDetectPage from './pages/UploadDetectPage'
import ResultPage from './pages/ResultPage'
import HistoryPage from './pages/HistoryPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import FavoritesPage from './pages/FavoritesPage'

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          
          <Route path="/detect" element={
            <ProtectedRoute>
              <UploadDetectPage />
            </ProtectedRoute>
          } />
          
          <Route path="/result" element={
            <ProtectedRoute>
              <ResultPage />
            </ProtectedRoute>
          } />
          
          <Route path="/history" element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          } />
          
          <Route path="/history/:id" element={
            <ProtectedRoute>
              <ResultPage />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default App