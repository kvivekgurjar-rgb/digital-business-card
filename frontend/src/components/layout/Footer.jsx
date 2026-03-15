export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <Footer className="bg-ink border-t border-white/5">
            <div className="section-container py-8 flex flex-col sm:flex-row items-center justify=between gap-4">
                <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/30">
                    © {year} - Built with Django + React
                </p>
                <button onClick={ () => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="font-mono text-[10px] tracking-[0.15em] uppercase
                        text-white/30 hover:text-accent-light transition-colors">
                    Back to top ⬆️
                </button>    
            </div>
        </Footer>
        
    );
}