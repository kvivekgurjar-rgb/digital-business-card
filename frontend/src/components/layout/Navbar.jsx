import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
    { href: '#skills',           label: 'Skills' },
    { href: '#projects',         label: 'Work' },
    { href: '#testimonials',     label: 'Testimonials' },
    { href: '#contact',          label: 'Contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 48);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
                ${scrolled ? 'bg-paper/92 backdrop-blur-md border-b border-border shadow-sm' : ''}`}
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}>

            <nav className="section-container flex items-center justify-between py-4">
                <a href="#" className="font-mono text-[11px] tracking-[0.2em] uppercase
                    text-ink hover:text-accent transition-colors">
                    Portfolio
                </a>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <a key={link.href} href={link.href}
                            className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted
                                hover:text-accent transition-colors duration-200">
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Mobile hamburger */}
                <button className="md:hidden flex flex-col gap-1.5 p-1"
                    onClick={ () => setMenuOpen ((o) => !o) } aria-label="Toggle menu">
                    <span className={ `block w-5 h-px bg-ink transition-all duration-200
                        ${menuOpen ? 'rotate-45 translate-y-2' : ''}` } />
                    <span className={`block w-5 h-px bg-ink transition-all duration-200
                        ${menuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-5 h-px bg-ink transition-all duration-200
                        ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            </nav>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden overflow-hidden bg-paper border-t border-border">
                        <div className="section-container py-6 flex flex-col gap-5">
                            {NAV_LINKS.map((link) => (
                                <a key={link.href} href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="font-mono text-[11px] tracking-[0.18em] uppercase
                                        text-muted hover:text-accent transition-colors">
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}