import { motion } from "framer-motion";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      setOffset({
        x: (e.clientX / innerWidth - 0.5) * 30,
        y: (e.clientY / innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="app">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          interactivity: { events: { onHover: { enable: true, mode: "repulse" } } },
          particles: {
            color: { value: "#a855f7" },
            links: { enable: true, color: "#ffffff", distance: 150 },
            move: { enable: true, speed: 2 },
            number: { value: 60 },
            size: { value: { min: 1, max: 3 } },
          },
        }}
      />

      <motion.header
        className="header"
        style={{ transform: `translate(${offset.x / 2}px, ${offset.y / 2}px)` }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Moje Portfolio</h1>
        <nav>
          <a href="#about">O mnie</a>
          <a href="#projects">Projekty</a>
          <a href="#contact">Kontakt</a>
        </nav>
      </motion.header>

      <motion.section
        className="hero"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <h2>
          <span className="highlight">HIKKI</span>
        </h2>
        <p>GOAT</p>
      </motion.section>

      <motion.section
        id="about"
        className="section"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3>O mnie</h3>
        <p>
          Doświadczenia brak, chęci też niewiele, ale jak się przyłożę to mogę
          Cię ograć w karciankę 🎴
        </p>
      </motion.section>

      <motion.section
        id="projects"
        className="section"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3>Projekty</h3>
        <div className="projects">
          <motion.div className="project-card" whileHover={{ scale: 1.05 }}>
            <h4>Projekt 1</h4>
            <p>2D nieskończona gra</p>
            <a href="#">GitHub</a>
          </motion.div>
          <motion.div className="project-card" whileHover={{ scale: 1.05 }}>
            <h4>Projekt 2</h4>
            <p>Aplikacja testowa</p>
            <a href="#">GitHub</a>
          </motion.div>
          <motion.div className="project-card" whileHover={{ scale: 1.05 }}>
            <h4>Projekt 3</h4>
            <p>Inny pomysł</p>
            <a href="#">GitHub</a>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="contact"
        className="contact"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3>Kontakt</h3>
        <div className="icons">
          <a href="https://github.com/H1kkk1" target="_blank">
            GitHub
          </a>
          <a href="mailto:stanaszekfilip@gmail.com">Email</a>
        </div>
      </motion.section>
    </div>
  );
}
