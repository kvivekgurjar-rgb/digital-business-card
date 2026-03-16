import Hero            from '../components/sections/Hero.jsx';
import Skills          from '../components/sections/Skills.jsx';
import Projects        from '../components/sections/Projects.jsx';
import Testimonials    from '../components/sections/Testimonials.jsx';
import Contact         from '../components/sections/Contact.jsx';

// Thin wrapper - easy to swap into a router later without changing App.jsx
export default function Home() {
    return (
        <>
            <Hero />
            <Skills />
            <Projects />
            <Testimonials />
            <Contact />
        </>
    );
}