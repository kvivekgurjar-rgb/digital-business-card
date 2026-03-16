import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useProjects } from '../../hooks/useProjects.js';
import Badge from '../ui/Badge.jsx';
import SectionLabel from '../ui/SectionLabel.jsx';

function ProjectCard({ project, index }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
    const colDelay = (index % 3) * 0.1;

    return (
        <motion.article ref={ref}
            initial={{ opacity: 0, y:36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: colDelay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -5 }}
            className="flex flex-col bg-paper border border-border rounded-sm overflow-hidden
                transition-shadow duration-300 hover:shadow-lg hover:shadow-black/5">
            {project.image_url && (
                <div className='aspect-video overflow-hidden bg-warm flex-shrink-0'>
                    <motion.img src={project.image_url} alt={project.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }} transition={{ duration: 0.45 }}
                    />
                </div>
            )}

            <div className='flex flex-col flex-1 p-6'>
                <div className='flex items-center gap-2 mb-4'>
                    {project.featured && (
                        <span className='font-mono text-[8px] tracking-[0.2em] uppercase
                            text-accent border border-accent/25 px-2 py-0.5 rounded-sm'>Featured</span>
                    )}
                    <span className='font-mono text-[8px] tracking-[0.16em] uppercase text-muted'>
                        {project.status_label}
                    </span>
                </div>

                <h3 className='font-display font-light text-xl text-ink mb-2 leading-tight'>
                    {project.title}
                </h3>
                <p className='font-body text-muted text-sm leading-relaxed mb-5 flex-1'>
                    {project.short_desc}
                </p>

                {project.tech_stack?.length > 0 && (
                    <div className='flex flex-wrap gap-1.5 mb-6'>
                        {project.tech_stack.map((tech) => <Badge key={tech}>{tech}</Badge>)}
                    </div>
                )}

                <div className='flex gap-5 pt-4 border-t border-border mt-auto'>
                    {project.live_url && (
                        <a href={project.live_url} target='_blank' rel='noopener noreferrer'
                            className='font-mono text-[10px] tracking-[0.16em] uppercase
                                text-ink hover:text-accent transition-colors'>Live ↗</a>
                    )}
                    {project.github_url && (
                        <a href={project.github_url} target='_blank' rel='noopener noreferrer'
                            className='font-mono text-[10px] tracking-[0.16em] uppercase
                                text-ink hover:text-accent transition-colors'>Live ↗</a>
                    )}
                </div>
            </div>
        </motion.article>
    );
}

export default function Project() {
    const { data, loading } = useProjects();
    if (loading) return null;

    const projects = data?.results ?? data ?? [];
    if (!projects.length) return null;

    return (
        <section id='projects' className='py-24 lg:py-32 bg-paper'>
            <div className='section-container'>
                <SectionLabel number="03" title="Selected Work" />
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14'>
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}