import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  
  // Kolorki w tle
  const [settings, setSettings] = useState({
    colorScheme: 'purple',
    parallaxIntensity: 1,
    particleDensity: 50,
    animationSpeed: 1
  });

  const [particles, setParticles] = useState([]);
  
  const [cursorTrail, setCursorTrail] = useState([]);
  
  
  const [visibleProjects, setVisibleProjects] = useState([]);

  const colorSchemes = {
    purple: { hueBase: 270, hueRange: 30, accent: '#d18aff', name: 'Purple' },
    neonGreen: { hueBase: 120, hueRange: 40, accent: '#39ff14', name: 'green' },
    oceanBlue: { hueBase: 200, hueRange: 50, accent: '#00d4ff', name: 'Blue' },
    sunsetOrange: { hueBase: 20, hueRange: 40, accent: '#f04501ff', name: 'Orange' },
    cyberpink: { hueBase: 320, hueRange: 30, accent: '#ff007f', name: 'Pink' }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const newMousePos = {
        x: e.clientX / innerWidth,
        y: e.clientY / innerHeight,
      };
      setMousePos(newMousePos);
      
      //  Kursor slad 
      const trailParticle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        life: 1
      };
      
      setCursorTrail(prev => [...prev.slice(-20), trailParticle]);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Inicjalizcja particli
  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < settings.particleDensity; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        opacity: Math.random() * 0.6 + 0.2
      });
    }
    setParticles(newParticles);
  }, [settings.particleDensity]);

  // Animacja partykli
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.speedX * settings.animationSpeed + 100) % 100,
        y: (particle.y + particle.speedY * settings.animationSpeed + 100) % 100
      })));
    }, 50);
    
    return () => clearInterval(interval);
  }, [settings.animationSpeed]);

  // Animacja kursor
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorTrail(prev => 
        prev.map(particle => ({ ...particle, life: particle.life - 0.05 }))
           .filter(particle => particle.life > 0)
      );
    }, 16);
    
    return () => clearInterval(interval);
  }, []);

  // Animacja 
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectIndex = parseInt(entry.target.dataset.index);
            setVisibleProjects(prev => [...new Set([...prev, projectIndex])]);
          }
        });
      },
      { threshold: 0.3 }
    );

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const currentScheme = colorSchemes[settings.colorScheme];
  const hue = currentScheme.hueBase + mousePos.x * currentScheme.hueRange;
  const bgColor = `hsl(${hue}, 60%, 20%)`;

  const parallaxX = (mousePos.x - 0.5) * 40 * settings.parallaxIntensity;
  const parallaxY = (mousePos.y - 0.5) * 20 * settings.parallaxIntensity;
  const headerParallaxX = (mousePos.x - 0.5) * 20 * settings.parallaxIntensity;
  const headerParallaxY = (mousePos.y - 0.5) * 10 * settings.parallaxIntensity;

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div 
      className="app" 
      style={{ 
        backgroundColor: bgColor,
        transition: `background-color ${0.2 / settings.animationSpeed}s ease`,
        '--accent-color': currentScheme.accent,
        '--animation-speed': settings.animationSpeed
      }}
    >
      {/*Trail Cursor */}
      {cursorTrail.map(trail => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: `${trail.x}px`,
            top: `${trail.y}px`,
            backgroundColor: currentScheme.accent,
            opacity: trail.life * 0.8,
            transform: `scale(${trail.life})`,
          }}
        />
      ))}

      {/* Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: currentScheme.accent,
            opacity: particle.opacity,
            transition: `left ${0.05 / settings.animationSpeed}s linear, top ${0.05 / settings.animationSpeed}s linear`
          }}
        />
      ))}

      {/* Settings*/}
      <button
        className="settings-toggle"
        onClick={() => setIsPanelOpen(!isPanelOpen)}
        style={{ color: currentScheme.accent, borderColor: currentScheme.accent }}
      >
        ⚙️
      </button>

      {/* Settings v2 */}
      <div className={`settings-panel ${isPanelOpen ? 'open' : ''}`}>
        <h2 style={{ color: currentScheme.accent }}>Theme Settings</h2>
        
        {/* Kolorki v2*/}
        <div className="setting-group">
          <label>Color Scheme</label>
          {Object.entries(colorSchemes).map(([key, scheme]) => (
            <button
              key={key}
              className={`scheme-button ${settings.colorScheme === key ? 'active' : ''}`}
              onClick={() => updateSetting('colorScheme', key)}
              style={{
                //key=z tablicy z góry
                background: settings.colorScheme === key ? scheme.accent : 'rgba(255,255,255,0.1)',
                color: settings.colorScheme === key ? 'black' : 'white',
                borderColor: scheme.accent
              }}
            >
              {scheme.name}
            </button>
          ))}
        </div>

        {/* Parallax slider*/}
        <div className="setting-group">
          <label>
            Parallax Intensity: {Math.round(settings.parallaxIntensity * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={settings.parallaxIntensity}
            onChange={(e) => updateSetting('parallaxIntensity', parseFloat(e.target.value))}
            className="slider"
            style={{ accentColor: currentScheme.accent }}
          />
        </div>

        {/* Particle slider */}
        <div className="setting-group">
          <label>
            Particle Density: {settings.particleDensity}
          </label>
          <input
            type="range"
            min="0"
            max="150"
            step="10"
            value={settings.particleDensity}
            onChange={(e) => updateSetting('particleDensity', parseInt(e.target.value))}
            className="slider"
            style={{ accentColor: currentScheme.accent }}
          />
        </div>

        {/* Animation slider */}
        <div className="setting-group">
          <label>
            Animation Speed: {Math.round(settings.animationSpeed * 100)}%
          </label>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={settings.animationSpeed}
            onChange={(e) => updateSetting('animationSpeed', parseFloat(e.target.value))}
            className="slider"
            style={{ accentColor: currentScheme.accent }}
          />
        </div>

        {/* Reset */}
        <button
          className="reset-button"
          onClick={() => setSettings({
            colorScheme: 'purple',
            parallaxIntensity: 1,
            particleDensity: 50,
            animationSpeed: 1
          })}
        >
          Reset to Defaults
        </button>
      </div>

      <motion.header
        className="header"
        style={{
          transform: `translate(${headerParallaxX}px, ${headerParallaxY}px)`,
        }}
      >
        <h1 style={{ color: currentScheme.accent }}>My Stuff</h1>
        <nav>
          <a href="#about">About me</a>
          <a href="#projects">Projects</a>
        </nav>
      </motion.header>

      <motion.section
        className="hero"
        style={{
          transform: `translate(${parallaxX}px, ${parallaxY}px)`,
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 * settings.animationSpeed }}
      >
        <h2>
          <span className="highlight" style={{ color: currentScheme.accent }}>SYZYF</span>
        </h2>
        <p>GOAT</p>
      </motion.section>

      <section id="about" className="section">
        <h3>About me</h3>
        <p>
          NIE
        </p>
      </section>

      <section id="projects" className="section">
        <h3>Projects</h3>
        <div className="projects">
          {[
            { title: "Projekt 1", desc: "2D nieskończona gra", link: "#" },
            { title: "Projekt 2", desc: "Aplikacja testowa", link: "#" },
            { title: "Projekt 3", desc: "Inny pomysł", link: "#" }
          ].map((project, index) => (
            <motion.div
              key={index}
              data-index={index}
              className="project-card"
              initial={{ 
                opacity: 0, 
                x: index % 2 === 0 ? -100 : 100,
                y: 50
              }}
              animate={
                visibleProjects.includes(index)
                  ? { opacity: 1, x: 0, y: 0 }
                  : { opacity: 0, x: index % 2 === 0 ? -100 : 100, y: 50 }
              }
              transition={{
                duration: 0.6 * settings.animationSpeed,
                delay: index * 0.2 * settings.animationSpeed,
                type: "spring",
                stiffness: 100
              }}
            >
              <h4>{project.title}</h4>
              <p>{project.desc}</p>
              <a href={project.link} style={{ color: currentScheme.accent }}>GitHub</a>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact">
        <h3>contact</h3>
        <div className="icons">
          <a href="https://github.com/H1kkk1" target="_blank" style={{ color: currentScheme.accent }}>
            GitHub
          </a>
          <a href="mailto:stanaszekfilip@gmail.com" style={{ color: currentScheme.accent }}>Email</a>
        </div>
      </section>
    </div>
  );
}