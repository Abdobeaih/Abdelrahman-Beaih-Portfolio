import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  fallback: ReactNode;
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/** Minimal error boundary used to fall back to the 2D journey map if 3D fails. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('Journey 3D boundary caught an error:', error, info);
    }
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

export default ErrorBoundary;
