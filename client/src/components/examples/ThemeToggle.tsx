import ThemeToggle from '../ThemeToggle';

export default function ThemeToggleExample() {
  return (
    <div className="p-6 flex items-center justify-center">
      <div className="flex items-center gap-4">
        <span className="text-sm">Theme:</span>
        <ThemeToggle />
      </div>
    </div>
  );
}