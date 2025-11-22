import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 p-8">
            <div className="bg-white p-8 rounded-xl shadow-xl max-w-2xl w-full border border-red-100">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
                <div className="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-auto text-sm font-mono mb-4">
                    {this.state.error?.message}
                </div>
                <button 
                    onClick={() => window.location.reload()}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                    Reload Page
                </button>
                <button 
                    onClick={() => {
                        localStorage.clear();
                        window.location.reload();
                    }}
                    className="ml-4 text-slate-500 hover:text-slate-700 underline"
                >
                    Clear Data & Reload
                </button>
            </div>
        </div>
      );
    }

    return this.props.children;
  }
}

