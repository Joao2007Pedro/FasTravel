import React from "react";

export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 animate-pulse">
      <div className="h-5 w-1/2 bg-slate-200 rounded mb-3" />
      <div className="space-y-2 mb-4">
        <div className="h-4 w-2/3 bg-slate-100 rounded" />
        <div className="h-4 w-3/5 bg-slate-100 rounded" />
      </div>
      <div className="flex items-center justify-between">
        <div className="h-3 w-16 bg-slate-100 rounded" />
        <div className="h-7 w-24 bg-slate-200 rounded" />
      </div>
      <div className="mt-4 h-9 w-full bg-slate-200 rounded" />
    </div>
  );
}
