import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-bg p-6 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
            <div className="text-5xl mb-4">😵</div>
            <h2 className="text-xl font-semibold text-text mb-2">Terjadi Kesalahan</h2>
            <p className="text-text-muted text-sm mb-6">Maaf, aplikasi mengalami masalah. Silakan muat ulang halaman.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-teal text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-teal-dark transition"
            >
              Muat Ulang
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary

