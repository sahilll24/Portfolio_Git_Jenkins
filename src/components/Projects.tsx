import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  github?: string;
  live?: string;
}

const projects: Project[] = [
  {
    title: "CI/CD Pipeline with Jenkins & Docker",
    description: "Set up and managed CI/CD pipelines using Jenkins and GitHub for automated build and deployment. Configured Docker containers and optimized application deployment workflows.",
    tags: ["Jenkins", "Docker", "CI/CD", "AWS"],
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=1920",
    github: "#",
  },
  {
    title: "Employee Management System",
    description: "Full-stack MERN application with CRUD operations, authentication, and data visualization features. Implemented REST APIs and MongoDB integration.",
    tags: ["MERN", "MongoDB", "Node.js", "React"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1920",
    github: "#",
  },
  {
    title: "Enquiry Management System",
    description: "MERN-based web application for managing customer enquiries with real-time updates, user authentication, and comprehensive dashboard.",
    tags: ["MERN", "Express.js", "MongoDB", "React"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1920",
    github: "#",
  },
  {
    title: "Infrastructure Monitoring & Automation",
    description: "Implemented infrastructure monitoring and automation using shell scripting and cloud tools. Collaborated with developers to streamline DevOps processes.",
    tags: ["Monitoring", "Automation", "Shell", "CloudWatch"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1920",
    github: "#",
  },
];

const Projects = () => {
  return (
    <section className="relative py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto" id="projects">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg">
            DevOps automation and full-stack development projects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="relative h-full rounded-2xl overflow-hidden bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-primary/10 border border-border hover:border-primary/50 text-foreground transition-all duration-300"
                      >
                        <Github className="w-4 h-4" />
                        <span className="text-sm font-medium">Code</span>
                      </motion.a>
                    )}
                    {project.live && (
                      <motion.a
                        href={project.live}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm font-medium">Live</span>
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* 3D Shadow Effect */}
                <div className="absolute inset-0 rounded-2xl shadow-2xl shadow-primary/0 group-hover:shadow-primary/20 transition-shadow duration-300 -z-10" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
