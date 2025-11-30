import { motion } from "framer-motion";
import { GitCommit, Boxes, FlaskConical, Rocket, Activity, ArrowRight } from "lucide-react";

interface PipelineStep {
  name: string;
  icon: any;
  description: string;
}

const steps: PipelineStep[] = [
  { name: "Commit", icon: GitCommit, description: "Push code to repository" },
  { name: "Build", icon: Boxes, description: "Compile & package" },
  { name: "Test", icon: FlaskConical, description: "Run automated tests" },
  { name: "Deploy", icon: Rocket, description: "Release to production" },
  { name: "Monitor", icon: Activity, description: "Track performance" },
];

const Pipeline = () => {
  return (
    <section className="relative py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            CI/CD Pipeline
          </h2>
          <p className="text-muted-foreground text-lg">
            Automated delivery from code to production
          </p>
        </motion.div>

        <div className="relative">
          {/* Pipeline Steps */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative group"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative p-6 rounded-2xl bg-card/80 backdrop-blur-sm border-2 border-border hover:border-primary/50 transition-all duration-300 overflow-hidden"
                >
                  {/* Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  
                  {/* Pulse Animation on Hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-primary/50 opacity-0 group-hover:opacity-100"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <div className="relative z-10 flex flex-col items-center text-center gap-4">
                    <motion.div
                      className="p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <step.icon className="w-10 h-10 text-primary" />
                    </motion.div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {step.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>

                    {/* Step Number Badge */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-lg shadow-primary/50">
                      {index + 1}
                    </div>
                  </div>
                </motion.div>

                {/* Arrow Between Steps */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-20">
                    <motion.div
                      animate={{
                        x: [0, 5, 0],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <ArrowRight className="w-8 h-8 text-primary" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary opacity-20 -z-10" />
        </div>
      </div>
    </section>
  );
};

export default Pipeline;
