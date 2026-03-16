import { useState } from "react";
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { api } from "../../api/endpoints.js";
import Button from "../ui/Button.jsx";
import SectionLabel from "../ui/SectionLabel.jsx";

const BLANK_FORM = { name: '', email: '', subject: '', message: '' };

function Field({ label, name, error, as, value, onChange, type = 'text', placeholder = '' }) {
    const inputClass = `w-full bg-white/6 border text-white text-sm font-body
        placeholder-white/25 px-4 py-3 rounded-sm outline-none transition-colors duration-200
        ${error ? 'border-red-500/60 focus:border-red-400' : 'border-white/12 focus:border-accent'}`;
    
    return (
        <div>
            <label className="block font-mono text-[10px] tracking-[0.18em] uppercase
                text-white/40 mb-2">{label}</label>
            {as === 'textarea' ? (
                <textarea name={name} value={value} onChange={onChange}
                    placeholder={placeholder} rows={6} className={inputClass} />
            ) : (
                <input type={type} name={name} value={value} onChange={onChange}
                    placeholder={placeholder} className={inputClass} />
            )}
            {error && (
                <p className="font-mono text-[10px] text-red-400 mt-1.5 tracking-wide">
                    {Array.isArray(error) ? error[0] : error}
                </p>
            )}
        </div>
    );
}

export default function Contact() {
    const [form, setForm]               = useState(BLANK_FORM);
    const [errors, setErrors]           = useState({});
    const [submitting, setSubmitting]   = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({...prev, [name]: null}));
    };

    const handleSubmit = async () => {
        const required = ['name', 'email', 'subject', 'message'];
        const missing = required.filter((f) => !form[f].trim());
        if (missing.length) {
            const errs = {};
            missing.forEach((f) => { errs[f] = 'This field is required.'; });
            setErrors(errs);
            return;
        }
        setSubmitting(true);
        setErrors({});
        try {
            await api.contact(form);
            toast.success("Message sent - I'll be in touch within 24 hours.");
            setForm(BLANK_FORM);
        }   catch (err) {
            if (err.response?.status === 400) {
                setErrors(err.response.data);
                toast.error('Please fix the errors below');
            } else if (err.response?.status === 429) {
                toast.error('Too many messages. Please try again in an hour.');
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        }   finally {
            setSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-24 lg:py-32 bg-ink">
            <div className="section-container">
                <SectionLabel number="05" title="Get In Touch" light />
                <p className="font-body text-white/45 text-base leading-relaxed max-w-lg mt-4 mb-14">
                    Have a project in mind? Drop me a message.
                </p>
                <motion.div initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.6 }} className="max-w-xl">
                    <div className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field label="Your Name" name="name" value={form.name}
                                onChange={handleChange}
                                error={errors.name} placeholder="Jane Smith" />
                            <Field label="Email Address" name="email" type="email"
                                value={form.email} onChange={handleChange} error={errors.email}
                                placeholder="jane@example.com" />
                        </div>
                        <Field label="Subject" name="subject" value={form.subject}
                            onChange={handleChange} error={errors.subject} placeholder="Project enquiry" />
                        <Field label="Message" name="message" as="textarea" value={form.message}
                            onChange={handleChange} error={errors.message}
                            placeholder="Tell me about your project..." />
                        <div className="pt-2">
                            <Button onClick={handleSubmit} disabled={submitting} variant="primary">
                                {submitting ? 'sending...' : 'Send Message →'}
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}