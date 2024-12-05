import React from 'react';

interface LogoProps {
  className?: string;
}

export function Logo({ className = "w-12 h-12" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 500 500"
      className={className}
      fill="currentColor"
    >
      <circle cx="250" cy="250" r="100" fill="none" stroke="currentColor" strokeWidth="40"/>
      <path
        d="M250,50 A200,200 0 0,1 450,250"
        fill="none"
        stroke="currentColor"
        strokeWidth="40"
        strokeLinecap="round"
      />
      <path
        d="M250,450 A200,200 0 0,1 50,250"
        fill="none"
        stroke="currentColor"
        strokeWidth="40"
        strokeLinecap="round"
      />
      <circle cx="450" cy="250" r="20" />
      <circle cx="50" cy="250" r="20" />
    </svg>
  );
}