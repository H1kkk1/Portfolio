import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: e.clientX / innerWidth,
        y: e.clientY / innerHeight,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const hue = 270 + mousePos.x * 30; // odcień fioletu od 270 do 300
  const bgColor = `hsl(${hue}, 60%, 20%)`;

  return (
    <div className="app" style={{ backgroundColor: bgColor, width: "100%" }}>
      <motion.header
        className="header"
        style={{
          transform: `translate(${(mousePos.x - 0.5) * 20}px, ${(mousePos.y - 0.5) * 10}px)`,
        }}
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
        style={{
          transform: `translate(${(mousePos.x - 0.5) * 40}px, ${(mousePos.y - 0.5) * 20}px)`,
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <h2>
          <span className="highlight">SYZYF</span>
        </h2>
        <p>GOAT</p>
      </motion.section>

      <section id="about" className="section">
        <h3>O mnie</h3>
        <p>
          NIE
        </p>
      </section>

      <section id="projects" className="section">
        <h3>Projekty</h3>
        <div className="projects">
          <div className="project-card">
            <h4>Projekt 1</h4>
            <p>2D nieskończona gra</p>
            <a href="#">GitHub</a>
          </div>
          <div className="project-card">
            <h4>Projekt 2</h4>
            <p>Aplikacja testowa</p>
            <a href="#">GitHub</a>
          </div>
          <div className="project-card">
            <h4>Projekt 3</h4>
            <p>Inny pomysł</p>
            <a href="#">GitHub</a>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <h3>Kontakt</h3>
        <div className="icons">
          <a href="https://github.com/H1kkk1" target="_blank">
            GitHub
          </a>
          <a href="mailto:stanaszekfilip@gmail.com">Email</a>
        </div>
      </section>
    </div>
  );
}
