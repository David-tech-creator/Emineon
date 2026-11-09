"use client";

import { Component, type ReactNode } from "react";

/** Catches WebGL context/creation errors so the hero falls back instead of crashing the page. */
export class CanvasBoundary extends Component<{ fallback: ReactNode; onError?: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError?.();
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
