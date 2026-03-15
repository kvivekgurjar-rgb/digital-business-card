export default function SectionLabel ({ number, title, light = false }) {
    return (
        <div className="flex items-baseline gap-4">
            <span className={`font-mono text-[11px] tracking-[0.18em] uppercase
                ${light ? 'text-accent-light' : 'text-accent'}`}>
                {number} - 
            </span>
            <h2 className={`font-display font-light text-3xl lg:text-4xl leading-tight
                ${light ? 'text-white' : 'text-ink'}`}>
                {title}
            </h2>
        </div>
    );
}