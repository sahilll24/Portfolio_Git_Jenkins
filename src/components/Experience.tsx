import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    title: "DevOps Engineer",
    company: "TDS Infotech",
    location: "Remote / Pune",
    period: "Aug 2024 – Present",
    description: [
      "Set up and managed CI/CD pipelines using Jenkins and GitHub for automated build and deployment",
      "Configured Docker containers and optimized application deployment workflows",
      "Implemented infrastructure monitoring and automation using shell scripting and cloud tools",
      "Collaborated with developers to streamline DevOps processes and improve deployment reliability"
    ]
  },
  {
    title: "Intern Frontend Developer",
    company: "SynergyConnect",
    location: "Andheri, Mumbai",
    period: "Dec 2024 – Feb 2025",
    description: [
      "Collaborated with developers to improve frontend performance and optimize workflows",
      "Contributed to UI/UX development and component optimization in React.js",
      "Assisted in testing, debugging, and code review cycles",
      "Exposure to Git-based version control"
    ]
  },
  {
    title: "Intern JavaScript Developer",
    company: "Mira Advanced Engineering",
    location: "Mumbai",
    period: "Jan 2024 – Feb 2024",
    description: [
      "Developed and deployed MERN-based mini projects including Enquiry Management System and Employee Management System",
      "Implemented CRUD operations, authentication, and data visualization features",
      "Worked closely with REST APIs and database integration (MongoDB)"
    ]
  }
];

const Experience = () => {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-3 text-gradient">
            Work Experience
          </h2>
          <p className="text-muted-foreground">
            My professional journey in tech
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block" />

                {/* Content card */}
                <div className="md:ml-16 glass-effect rounded-xl p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-lg text-accent-foreground font-semibold mt-1">
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2 mt-4">
                    {exp.description.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <Briefcase className="w-3.5 h-3.5 mt-0.5 text-primary flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;