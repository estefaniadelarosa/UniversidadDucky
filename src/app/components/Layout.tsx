import { ReactNode } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useNavigate } from 'react-router';

interface LayoutProps {
  children: ReactNode;
  showBackButton?: boolean;
}

export function Layout({ children, showBackButton = false }: LayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1643514225411-d6e6f3c9ef6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGlicmFyeSUyMGJ1aWxkaW5nJTIwY29sdW1uc3xlbnwxfHx8fDE3NzM2ODMyOTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Universidad Ducky"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Back Button */}
      {showBackButton && (
        <button
          onClick={() => navigate(-1)}
          className="absolute top-8 left-8 z-20 text-white hover:text-gray-200 transition-colors"
          aria-label="Volver"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </button>
      )}

      {/* Profile Icon (top right) */}
      <div className="absolute top-8 right-8 z-20">
        <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-6">{children}</div>
    </div>
  );
}
