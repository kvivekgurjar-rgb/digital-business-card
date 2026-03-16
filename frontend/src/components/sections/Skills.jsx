import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useSkills } from '../../hooks/useSkills.js';
import SectionLabel from '../ui/SectionLabel.jsx';

const WIDTH_MAP = { 1: '20%', 2: '40%', 3: '60%', 4: '80%', 5: '100%' };

function SkillBar({ name, proficiency, proficiency_lable, index }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 });

    return (
        <motion.div ref={ref}
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.06, duration: 0.45 }}>

            <div className='flex items-baseline justify-between mb-1.5'>
                <span className='font-body text-sm font-medium text-ink'>{name}</span>
                <span className='font-mono text-[9px] tracking-[0.15em] uppercase text-muted'>{proficiency_lable}</span>
            </div>

            <div className='h-px bg-border rounded-full overflow-hidden'>
                <motion.div className="h-full bg-accent rounded-full"
                    initial={{ width: '0%' }}
                    animate={inView ? { width: WIDTH_MAP[proficiency] } : {}}
                    transition={{ delay: index * 0.06 + 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                />
            </div>
        </motion.div>
    );
}

export default function Skills() {
    const { data: categories, loading } = useSkills();
    if (loading || !categories?.length) return null;

    return (
        <section id='skills' className='py-24 lg:py-32 bg-warm'>
            <div className='section-container'>
                <SectionLabel number="02" title="Skills & Expertise" />
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-12 mt-14'>
                    {categories.map((category) => (
                        <div key={category.id}>
                            <h3 className='font-mono text-[10px] tracking-[0.2em] uppercase text-accent mb-7'>
                                {category.name}
                            </h3>
                            <div className='space-y-6'>
                                {category.skills.map((skill, index) => (
                                    <SkillBar key={skill.id} {...skill} index={index} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}