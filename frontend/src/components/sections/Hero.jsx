import { motion } from 'framer-motion';
import { useProfile } from '../../hooks/useProfile.js';
import Button from '../ui/Button.jsx';
import Spinner from '../ui/Spinner.jsx';

const containerVariants = {
    hiddern: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const childVariants = {
    hidden: { opacity: 0, y: 28 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36,1] } },
};

const SOCIAL_KEYS = [
    { key: 'github_url',    label: 'GitHub' },
    { key: 'linkedin_url',  label: 'LinkedIn' },
    { key: 'x_url',         label:  'X / Twitter' },
    { key: 'website_url',   label:  'Website' },
];

export default function Hero() {
    const { data: profile, loading, error } = useProfile();

    if (loading) return <Spinner fullscreen />;
    if (error || !profile) {
        return (
            <section className='min-h-screen flex items-center justify-center bg-paper'>
                <p className='font-mono text-xs text-muted tracking-widest uppercase'>
                    Profile not found - add one via admin.
                </p>
            </section>
        );
    }

    const socials = SOCIAL_KEYS.filter((s) => profile[s.key]);

    return (
        <section id="hero" className='min-h-screen flex items-center relative overflow-hidden bg-paper pt-16'>

            {/* Decorative circle */}
            <motion.div
                className="absolute -right-20 w-80 h-80 lg:w-[480px] lg:h-[480px]
                    rounded-full border-[56px] border-accent/8 pointer-events-none"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
                />

                <div className='section-container relative z-10 py-20 lg:py-32'>
                    <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-3xl">

                        {/* Availability badge */}
                        <motion.div variants={childVariants}>
                            <span className='inline-flex items-center gap-2.5 font-mono text-[10px]
                                tracking-[0.18em] uppercase text-muted border border-border
                                rounded-sm px-3 py-1.5 mb-8'>
                                {profile.available_for_work ? (
                                    <><span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse' />Available for new projects</>
                                ) : (
                                    <><span className='w-2 h-2 rounded-full bg-amber-500' />Currently engaged</>
                                )}
                            </span>
                        </motion.div>

                        <motion.h1 variants={childVariants}
                            className="font-display font-light text-5xl sm:text-6xl lg:text-7xl
                                text-ink leading-[1.08] mb-5">
                        </motion.h1>

                        <motion.p variants={childVariants}
                            className="font-display italic font-light text-2xl lg:text-3xl text-accent mb-7">
                            {profile.title}
                        </motion.p>

                        <motion.p variants={childVariants}
                            className="font-body text-muted text-lg leading-[1.75] max-w-2xl mb-10">
                            {profile.bio}
                        </motion.p>

                        <motion.div variants={childVariants} className="flex flex-wrap gap-4">
                            <Button href="#contact" variant='primary'>Get in touch</Button>
                            {profile.resume_url && (
                                <Button href={profile.resume_url} variant='ghost' external>Download CV ↗</Button>
                            )}
                        </motion.div>

                        {socials.length > 0 && (
                            <motion.div variants={childVariants} className="flex flex-wrap gap-6 mt-12">
                                {socials.map(({ key, label }) => (
                                    <a key={key} href={profile[key]} target='_blank' rel='nooperner noreferrer'
                                        className='font-mono text-[10px] tracking-[0.18em] uppercase
                                            text-muted hover:text-accent transition-colors duration-200'>
                                        {label} ↗
                                    </a>
                                ))}
                            </motion.div>
                        )}

                        {(profile.location || profile.years_experience > 0) && (
                            <motion.div variant={childVariants}
                                className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-border">
                                {profile.location && (
                                    <div>
                                        <p className='font-mono text-[9px] tracking-widest uppercase text-muted/60 mb-1'>Location</p>
                                        <p className='font-body text-sm text-ink'>{profile.location}</p>
                                    </div>
                                )}
                                {profile.years_experience > 0 && (
                                    <div>
                                        <p className='font-mono text-[9px] tracking-widest uppercase text-muted/60 mb-1'>Experience</p>
                                        <p className='font-body text-sm text-ink'>{profile.years_experience}+ years</p>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </motion.div>
                </div>
        </section>
    );
}