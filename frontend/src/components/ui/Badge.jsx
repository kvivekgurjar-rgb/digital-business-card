export default function Badge({ children, className = '' }) {
    return (
        <span className={`inline-block font-mono text-[9px] tracking-[0.14em] uppercase
            bg-warm border border-border text-muted px-2 py-1 rounded-sm ${className}`}>
            {children}
        </span>
    );
}