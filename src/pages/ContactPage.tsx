/**
 * @Author:XYH
 * @Date:2025-11-17
 * @Description: 联系页面，提供邮件联系方式（无后端）。
 */
import React, { useState } from 'react';
import Seo from '../components/common/Seo';

const ContactPage: React.FC = () => {
    const [name, setName] = useState('');
    const [msg, setMsg] = useState('');
    const [email, setEmail] = useState('');

    return (
        <div className="container">
            <Seo title="Contact - EditText Lab" description="Contact the maintainers of EditText Lab." />

            <h1 className="section-title">Contact</h1>
            <p className="section-subtitle">Feel free to reach out to us with suggestions or feedback.</p>

            <div className="card" style={{ padding: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <input
                        className="input"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        className="input"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <textarea
                        className="textarea"
                        placeholder="Message..."
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        style={{ minHeight: 140 }}
                    />

                    <a
                        className="btn btn-primary"
                        href={`mailto:contact@edittextlab.com?subject=Feedback from ${name}&body=${msg}`}
                    >
                        Send email
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;