import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Pipeline from "@/components/Pipeline";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-['Space_Grotesk']">
      <Hero />
      <Skills />
      <Experience />
      <Certifications />
      <Pipeline />
      <Projects />
      <Footer />
    </div>
  );
};

export default Index;