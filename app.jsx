const { useState, useEffect, useRef } = React;

// --- Components ---

const Hero = ({ onCtaClick }) => (
    <section className="hero animate-slide-up">
        <div className="container">
            <h1>Know Your Interview Readiness</h1>
            <p className="subtitle">
                Leverage advanced AI to analyze your profile, evaluate your skills, and get a personalized roadmap to land your dream job.
            </p>
            <button className="btn" onClick={onCtaClick}>
                <i className="ph ph-target"></i>
                Check My Score
            </button>
        </div>
    </section>
);

const Features = () => {
    const features = [
        {
            icon: "ph-file-text",
            title: "Resume Analysis",
            desc: "AI scans your resume against industry standards and ATS requirements."
        },
        {
            icon: "ph-code",
            title: "Technical Skills",
            desc: "Evaluate your coding prowess based on your GitHub and tech stack."
        },
        {
            icon: "ph-chats",
            title: "Communication",
            desc: "Assess your ability to articulate ideas clearly and confidently."
        },
        {
            icon: "ph-map-trifold",
            title: "Personalized Roadmap",
            desc: "Get a step-by-step guide to bridge your skill gaps and ace the interview."
        }
    ];

    return (
        <section className="container">
            <div className="features-grid">
                {features.map((feature, idx) => (
                    <div key={idx} className={`glass-card animate-slide-up delay-${idx + 1}`}>
                        <i className={`ph ${feature.icon} feature-icon`}></i>
                        <h3>{feature.title}</h3>
                        <p className="score-desc">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

const ReadinessForm = ({ onSubmit }) => {
    const [loading, setLoading] = useState(false);
    const [confidence, setConfidence] = useState(50);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call for AI scoring
        setTimeout(() => {
            setLoading(false);
            onSubmit({
                overall: 84,
                tech: 88,
                resume: 75,
                comm: 92,
                port: 80
            });
        }, 2000);
    };

    return (
        <section className="form-section container animate-fade-in delay-2" id="form-section">
            <div className="glass-card">
                <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Evaluate Your Profile</h2>
                <form onSubmit={handleSubmit} className="form-grid">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" required placeholder="John Doe" />
                    </div>
                    <div className="form-group">
                        <label>Department / Major</label>
                        <input type="text" required placeholder="Computer Science" />
                    </div>
                    <div className="form-group">
                        <label>Year of Study / Experience</label>
                        <select required>
                            <option value="">Select...</option>
                            <option value="1">1st Year</option>
                            <option value="2">2nd Year</option>
                            <option value="3">3rd Year</option>
                            <option value="4">4th Year</option>
                            <option value="grad">Graduate / Professional</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Dream Company</label>
                        <input type="text" placeholder="Google, Microsoft, etc." />
                    </div>
                    <div className="form-group full-width">
                        <label>Key Skills (comma separated)</label>
                        <input type="text" required placeholder="React, Python, System Design..." />
                    </div>
                    <div className="form-group">
                        <label>GitHub URL</label>
                        <input type="url" placeholder="https://github.com/..." />
                    </div>
                    <div className="form-group">
                        <label>LinkedIn URL</label>
                        <input type="url" placeholder="https://linkedin.com/in/..." />
                    </div>
                    <div className="form-group full-width">
                        <label>Current Confidence Level: {confidence}%</label>
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={confidence} 
                            onChange={(e) => setConfidence(e.target.value)}
                        />
                    </div>
                    <div className="form-group full-width" style={{ marginTop: '1rem', textAlign: 'center' }}>
                        <button type="submit" className="btn" disabled={loading} style={{ width: '100%' }}>
                            {loading ? (
                                <span><i className="ph ph-spinner ph-spin"></i> Analyzing Profile...</span>
                            ) : (
                                <span><i className="ph ph-sparkle"></i> Generate AI Report</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

const CircularProgress = ({ score, label, desc, colorClass }) => {
    const [currentScore, setCurrentScore] = useState(0);
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = `${(currentScore / 100) * circumference} ${circumference}`;

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentScore(score);
        }, 300);
        return () => clearTimeout(timer);
    }, [score]);

    return (
        <div className={`score-card glass-card animate-slide-up ${colorClass}`}>
            <svg viewBox="0 0 36 36" className="circular-chart">
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                </defs>
                <path className="circle-bg"
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path className="circle"
                    strokeDasharray={strokeDasharray}
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className="percentage">{currentScore}%</text>
            </svg>
            <div className="score-label">{label}</div>
            <div className="score-desc">{desc}</div>
        </div>
    );
};

const ResultsDashboard = ({ scores, onReset }) => {
    return (
        <section className="dashboard container animate-fade-in">
            <div className="dashboard-header">
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Your Readiness Report</h2>
                <p className="subtitle">Based on our AI analysis, here is how you stack up against industry standards.</p>
            </div>

            <div className="scores-grid" style={{ marginBottom: '4rem' }}>
                <CircularProgress score={scores.overall} label="Overall Readiness" desc="Your total combined score." colorClass="overall" />
            </div>

            <div className="scores-grid">
                <CircularProgress score={scores.tech} label="Technical Skills" desc="Code quality and stack." colorClass="tech" />
                <CircularProgress score={scores.resume} label="Resume Strength" desc="ATS compatibility." colorClass="resume" />
                <CircularProgress score={scores.comm} label="Communication" desc="Clarity and articulation." colorClass="comm" />
                <CircularProgress score={scores.port} label="Portfolio & GitHub" desc="Projects and impact." colorClass="port" />
            </div>

            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                <button className="btn btn-glass" onClick={onReset}>
                    <i className="ph ph-arrow-left"></i> Re-evaluate Profile
                </button>
            </div>
        </section>
    );
};

// --- Main App ---

const App = () => {
    const [view, setView] = useState('landing'); // 'landing', 'dashboard'
    const [scores, setScores] = useState(null);

    const handleCtaClick = () => {
        document.getElementById('form-section').scrollIntoView({ behavior: 'smooth' });
    };

    const handleFormSubmit = (generatedScores) => {
        setScores(generatedScores);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setView('dashboard');
    };

    const handleReset = () => {
        setScores(null);
        setView('landing');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <nav style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--glass-border)' }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.25rem' }}>
                    <i className="ph ph-cpu" style={{ color: 'var(--primary-purple)', fontSize: '1.5rem' }}></i>
                    CareerForge AI
                </div>
            </nav>

            <main>
                {view === 'landing' && (
                    <>
                        <Hero onCtaClick={handleCtaClick} />
                        <Features />
                        <ReadinessForm onSubmit={handleFormSubmit} />
                    </>
                )}

                {view === 'dashboard' && scores && (
                    <ResultsDashboard scores={scores} onReset={handleReset} />
                )}
            </main>

            <footer>
                <div className="container">
                    <p>&copy; 2026 CareerForge AI. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
