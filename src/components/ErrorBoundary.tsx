import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.hash = '';
    window.location.reload();
  };

  private handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[50vh] w-full flex items-center justify-center p-6 bg-white text-gray-900">
          <div className="max-w-md w-full bg-emerald-50/60 rounded-3xl p-6 sm:p-8 border border-emerald-200/80 shadow-lg text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800">
              <AlertTriangle className="w-7 h-7 text-emerald-700" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-black text-[#072414]">
                Unable to load this section
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                A transient module or network update occurred. Please refresh or return to the main overview.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <button
                onClick={this.handleReload}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-full bg-[#072414] hover:bg-emerald-950 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Page</span>
              </button>

              <button
                onClick={this.handleGoHome}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-full bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-xs uppercase tracking-wider border border-emerald-300 transition-all cursor-pointer"
              >
                <Home className="w-3.5 h-3.5 text-emerald-700" />
                <span>Return to Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
