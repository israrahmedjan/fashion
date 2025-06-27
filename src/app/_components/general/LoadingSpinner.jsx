// components/LoadingSpinner.jsx
export default function LoadingSpinner() {
  return (
    <div className="flex flex-col gap-3 h-screen items-center justify-center">
      <div className="w-8 h-8  border-4 border-[#323232] border-t-transparent rounded-full animate-spin" />
      <div>Loading...</div>
    </div>
  );
}
