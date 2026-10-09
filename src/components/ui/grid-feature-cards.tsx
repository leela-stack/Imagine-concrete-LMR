import { cn } from '@/lib/utils';
import React from 'react';
import { motion } from 'framer-motion';

type FeatureType = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
};

type FeatureCardProps = React.ComponentProps<'div'> & {
  feature: FeatureType;
  delay?: number;
};

export function FeatureCard({ feature, className, delay = 0, ...props }: FeatureCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, x: -2 }}
      className={cn(
        'bg-white border-2 border-black p-6 md:p-8 relative overflow-hidden group flex flex-col justify-between shadow-[5px_5px_0px_0px_#111827] hover:shadow-[7px_7px_0px_0px_#ff5500] transition-all duration-200', 
        className
      )} 
      {...props}
    >
      <div className="relative z-10 flex items-start justify-between">
        <div className="w-12 h-12 bg-[#111827] border-2 border-black flex items-center justify-center text-[#ff5500] shadow-[2px_2px_0px_0px_#ff5500] group-hover:bg-[#ff5500] group-hover:text-white transition-colors">
          <feature.icon className="size-6" strokeWidth={2} aria-hidden />
        </div>
        <span className="font-mono text-[10px] font-bold text-slate-400 group-hover:text-[#ff5500] transition-colors">
          // SYS-MOD
        </span>
      </div>
      
      <div className="relative z-10 mt-8">
        <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#111827] mb-2 group-hover:text-[#ff5500] transition-colors">
          {feature.title}
        </h3>
        <p className="text-slate-700 text-sm md:text-base font-medium leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}
