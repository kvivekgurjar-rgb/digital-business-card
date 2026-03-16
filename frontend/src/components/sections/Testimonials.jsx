import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTestimonials } from '../../hooks/useTestimonials.js';
import SectionLabel from '../ui/SectionLabel.jsx';

function TestimonialCard({ testimonial, index }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <motion.blockquote ref={ref}
            initial={{ opacity: 0, y: 28 }}
            animate={ inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: (index % 2) * 0.1, duration: 0.55 }}
            className="bg-paper border border-border rounded-sm p-8 flex flex-col">

            <span className='font-display text-6xl text-accent/20 leading-none mb-2 select-none'>"</span>

            <p className='font-display italic font-light text-lg text-ink leading-relaxed flex-1 mb-8'>
                {testimonial.quote}
            </p>

            <footer className='flex items-center gap-4'>
                {testimonial.avatar_url ? (
                    <img src={testimonial.avatar_url} alt={testimonial.avatar_name}
                        className='w-11 h-11 rounded-full object-cover border border-border flex-shrink-0'
                    />
                ) : (
                    <div className='w-11 h-11 rounded-full bg-warm border border-border
                        flex items-center justify-center flex-shrink-0'>
                        <span className='font-mono text-xs text-muted'>
                            {testimonial.author_name.charAt(0)}
                        </span>
                    </div>
                )}
                <div>
                    <p className='font-body text-sm font-medium text-ink'>{testimonial.author_name}</p>
                    <p className='font-mono text-[10px] tracking-[0.12em] text-muted'>
                        {testimonial.author_title} . {testimonial.author_company}
                    </p>
                </div>
                {testimonial.linkedin_url && (
                    <a href={testimonial.linkedin_url} target='_blank' rel='noopener noreferrer'
                        className="ml-auto font-mono text-[9px] tracking-widest uppercase
                            text-muted hover:text-accent transition-colors">LinkedIn ↗
                    </a>
                )}
            </footer>
        </motion.blockquote>
    );
}

export default function Testimonials() {
    const { data: Testimonials, loading } = useTestimonials();
    if (loading || !testimonials?.length) return null;

    return (
        <section id='testimonials' className='py-24 lg:py-32 bg-warm'>
            <div className='section-container'>
                <SectionLabel number="04" title="What People Say" />
                <div className='grid md:grid-cols-2 gap-8 mt-14'>
                    {testimonials.map((t, index) => (
                        <TestimonialCard key={t.id} testimonial={t} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}