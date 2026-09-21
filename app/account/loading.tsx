import React from 'react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="spinner-border text-primary w-12 h-12" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

