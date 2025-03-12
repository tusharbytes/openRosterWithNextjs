"use client"; // ✅ Ensure it's a client component

export default function Container({ children }) {
  return (
    <div className="container p-4   "> 
      {children}
    </div>
  );
}
