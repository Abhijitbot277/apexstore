import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-sm text-text-faint">Error 404</p>
      <h1 className="mt-3 font-display text-4xl font-bold text-gradient">Off the map.</h1>
      <p className="mt-3 max-w-sm text-text-muted">This page doesn't exist — but the rest of ApexStore does.</p>
      <Link
        to="/"
        className="mt-7 flex items-center gap-2 rounded-full bg-gradient-to-br from-cyan to-violet px-6 py-3 text-sm font-bold text-void"
      >
        <ArrowLeft size={16} /> Back to shop
      </Link>
    </div>
  );
}
