// components/LoadingSpinner.jsx
export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-20">
      <div className="w-8 h-8 border-4 border-[#323232] border-t-transparent rounded-full animate-spin" />
      <div>Loading...</div>
    </div>
  );
}
