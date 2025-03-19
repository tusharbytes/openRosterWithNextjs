"use client"; // ✅ Ensure it's a client component

export default function Container({ children }) {
  return (
    <div className="container p-4 max-w-12/12    "> 
      {children}
    </div>
  );
}
