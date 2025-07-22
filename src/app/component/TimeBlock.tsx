export default function TimeBlock({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center px-4">
      <span className="text-5xl font-mono font-bold drop-shadow-md">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-sm uppercase tracking-wider text-purple-200">{label}</span>
    </div>
  );
}
