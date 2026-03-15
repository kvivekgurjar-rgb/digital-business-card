import { motion } from 'framer-motion';

const variantStyles = {
    primary: 'bg-accent text-white border border-accent hover:bg-accent/90',
    ghost:   'bg-transparent text-ink border border-ink hover:bg-ink hover:text-white',
    light:   'bg-transparent text-white border border-white/40 hover:bg-white hover:text-ink',
};

export default function Button ({ children, href, onClick, variant = 'primary',
    external = false, disabled = false, type = 'button', className = '' }) {
        const base =   `inline-flex items-center justify-center gap-2 px-6 py-3
            font-mono text-[11px] tracking-[0.18em] uppercase transition-all duration-200
            rounded-sm cursor-pointer select-none
            ${variantStyles[variant]}
            ${disabled ? 'opacity-40 pointer-events-none' : ''}
            ${className}`;
            
        if (href) {
            return (
                <motion.a href={href} className={base}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                    {children}
                </motion.a>
            );
        }

        return (
            <motion.Button type={type} onClick={onClick} disabled={disabled}
                className={base}
                whileHover={{ scale: disabled ? 1 : 1.02 }}
                whileTap={{ scale: disabled ? 1 : 0.97 }}>
                {children}
            </motion.Button>
        );
    }