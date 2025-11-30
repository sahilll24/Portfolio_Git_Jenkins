import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Server, Cloud, GitBranch, Container, Code2, 
  Activity, Database, Shield, Cpu, FileCode
} from "lucide-react";

interface Skill {
  name: string;
  icon: any;
  category: string;
}

const skills: Skill[] = [
  // DevOps & Cloud
  { name: "AWS EC2", icon: Cloud, category: "Cloud" },
  { name: "AWS S3", icon: Cloud, category: "Cloud" },
  { name: "AWS IAM", icon: Shield, category: "Cloud" },
  { name: "CloudWatch", icon: Activity, category: "Monitoring" },
  { name: "Linux (Ubuntu)", icon: Server, category: "Linux" },
  { name: "Docker", icon: Container, category: "DevOps Tools" },
  { name: "Jenkins", icon: GitBranch, category: "CI/CD" },
  { name: "Git & GitHub", icon: GitBranch, category: "CI/CD" },
  { name: "Python Scripting", icon: Code2, category: "Scripting" },
  { name: "Shell Scripting", icon: Code2, category: "Scripting" },
  { name: "Terraform", icon: Code2, category: "IaC" },
  
  // Development
  { name: "Node.js", icon: Server, category: "Development" },
  { name: "React.js", icon: FileCode, category: "Development" },
  { name: "Express.js", icon: Server, category: "Development" },
  { name: "MongoDB", icon: Database, category: "Development" },
  { name: "MySQL", icon: Database, category: "Development" },
  { name: "PostgreSQL", icon: Database, category: "Development" },
];

const categories = ["All", "Cloud", "Linux", "CI/CD", "DevOps Tools", "IaC", "Scripting", "Development", "Monitoring"];

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredSkills = selectedCategory === "All" 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  return (
    <section className="relative py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground text-lg">
            Technologies I work with daily
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50"
                  : "bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 text-foreground hover:bg-card"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ 
                scale: 1.05, 
                rotate: [0, -2, 2, 0],
                transition: { duration: 0.3 }
              }}
              className="relative group"
            >
              <div className="relative h-full p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300"
                  >
                    <skill.icon className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h3 className="font-semibold text-foreground text-center">
                    {skill.name}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {skill.category}
                  </span>
                </div>

                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "200% 0%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
