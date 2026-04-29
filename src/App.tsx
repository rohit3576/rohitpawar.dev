import { CustomCursor } from './components/CustomCursor';
import { useGsapReveal } from './hooks/useGsapReveal';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { Experience } from './sections/Experience';
import { Footer } from './sections/Footer';
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { TechStack } from './sections/TechStack';

const App = () => {
  useGsapReveal();

  return (
    <>
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <TechStack />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default App;
