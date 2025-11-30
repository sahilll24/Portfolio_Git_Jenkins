import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/sahilsaykar24", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/sahil-saykar-9a11a3264", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/sahilsaykar", label: "Twitter" },
  { icon: Mail, href: "mailto:sahilsaykar24@gmail.com", label: "Email" },
];

const Footer = () => {
  return (
    <footer className="relative py-16 px-6 bg-muted/30 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Let's Build Something Amazing
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Open to exciting DevOps opportunities and collaborations. 
            Let's connect and discuss how we can automate and scale together.
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-12">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ 
                  scale: 1.2, 
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.9 }}
                className="p-4 rounded-full bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group"
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-sm text-muted-foreground"
          >
            © {new Date().getFullYear()} Sahil Saykar. DevOps Engineer | Mumbai, India
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
