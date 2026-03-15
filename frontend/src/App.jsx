import { Toaster }    from 'react-hot-toast';
import Navbar         from './components/layout/Navbar.jsx';
import Footer         from './components/sections/Footer.jsx';
import Hero           from './components/sections/Hero.jsx';
import Skills         from './components/sections/Skills.jsx';
import Project        from './components/sections/Project.jsx';
import Testimonials   from './components/sections/Testimonials.jsx';
import Contact        from './components/sections/Contact.jsx';

export default function App() {
    return (
        <>
            <Toaster
                position="buttom-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        fontFamily: 'DM Mono, monospace',
                        fontSize: '12px',
                        background: '#0d0d0d',
                        color: '#f8f6f2',
                        border: '1px solid #333',
                        borderRadius: '2px',
                    },
                    success: { iconTheme: { primary: '#c8552a', secondary: '#f8f6f2' } },
                }}
        
            />
            <Navbar />
            <main>
                <Hero />
                <Skill />
                <Project />
                <Testimonials />
                <Contact />
            </main>
            <Footer />
        </>
    );
}