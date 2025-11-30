import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, X } from "lucide-react";

const certifications = [
  {
    title: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services (AWS)",
    icon: "☁️",
    image: "aws_1.jpg", // <-- ADD IMAGE HERE
    link: "https://www.linkedin.com/posts/sahil-saykar-9a11a3264_aws-cloud-practitioner-essentials-ugcPost-7378862914373509121-jBmH?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEDPz8kBYpm3t1MJMKZj69LIZSC56hi3XH0" // <-- ADD LINK
  },
  {
    title: "Getting Started with AWS",
    issuer: "Amazon Web Services (AWS)",
    icon: "🚀",
    image: "aws_2.jpg",
    link: "https://www.linkedin.com/posts/sahil-saykar-9a11a3264_getting-started-with-devops-on-aws-ugcPost-7375789329782173696-jBxm?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEDPz8kBYpm3t1MJMKZj69LIZSC56hi3XH0"
  },
  {
    title: "AWS Solutions Architect Job Simulation",
    issuer: "Forage",
    icon: "🏗️",
    image: "aws_3.jpg",
    link: "https://www.linkedin.com/posts/sahil-saykar-9a11a3264_devops-cloudcomputing-ugcPost-7375193181845544960-0h55?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEDPz8kBYpm3t1MJMKZj69LIZSC56hi3XH0"
  }
];

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section className="relative py-20 px-6 overflow-hidden">

      {/* Background animations */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-3 text-gradient">
            Certifications & Training
          </h2>
          <p className="text-muted-foreground">
            Professional credentials and continuous learning
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-primary/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative glass-effect rounded-xl p-6 h-full border border-border/50 group-hover:border-primary/50 transition-all duration-300">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {cert.icon}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    Certified
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4">{cert.issuer}</p>

                {/* OPEN MODAL BUTTON */}
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="flex items-center gap-2 text-xs text-accent-foreground hover:text-primary transition-colors group/btn"
                >
                  <span>View Credential</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ===================== MODAL ===================== */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-background p-6 rounded-xl max-w-xl w-full relative shadow-xl border border-border"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-3 right-3 text-muted-foreground hover:text-primary transition"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground mb-4">
                {selectedCert.title}
              </h3>

              {/* Certificate image */}
              <img
                src={selectedCert.image}
                alt="Certificate"
                className="w-full rounded-lg border mb-4"
              />

              {/* View on LinkedIn */}
              <a
                href={selectedCert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 rounded-lg hover:opacity-90 transition"
              >
                <span>View on LinkedIn</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
