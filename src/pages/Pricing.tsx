import React from 'react';
import { motion } from 'motion/react';
import { Check, Lock } from 'lucide-react';

const PricingCard = ({ 
  title, 
  subtitle, 
  price, 
  features, 
  buttonText, 
  highlight = false, 
  locked = false,
  badge = ""
}: { 
  title: string, 
  subtitle: string, 
  price: string, 
  features: string[], 
  buttonText: string, 
  highlight?: boolean, 
  locked?: boolean,
  badge?: string
}) => (
  <div className={`glass-panel p-10 flex flex-col relative ${highlight ? 'border-pr ring-4 ring-pr/5' : ''}`}>
    {badge && (
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 instagram-gradient text-white text-[0.65rem] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full whitespace-nowrap shadow-xl">
        {badge}
      </div>
    )}
    <div className="mb-8">
      <h3 className="text-2xl font-black mb-1">{title}</h3>
      <p className="text-tx-muted text-[0.85rem]">{subtitle}</p>
    </div>
    <div className="mb-8">
      <span className="text-[3rem] font-black tracking-tight leading-none text-tx-main">{price}</span>
      <span className="text-tx-muted text-[0.9rem] font-bold ml-2">/ lifetime</span>
    </div>
    <div className="space-y-4 mb-10 flex-1">
      {features.map((feat, i) => (
        <div key={i} className="flex items-center gap-3 border-b border-border-subtle pb-3">
          <div className="w-5 h-5 rounded-full bg-pr/10 flex items-center justify-center text-pr shrink-0">
            <Check size={12} strokeWidth={3} />
          </div>
          <span className="text-[0.85rem] text-tx-muted font-medium">{feat}</span>
        </div>
      ))}
    </div>
    {locked ? (
      <button className="w-full h-[52px] rounded-full bg-surface-subtle border border-border-subtle text-tx-dim flex items-center justify-center gap-2 text-[0.85rem] font-black uppercase tracking-widest cursor-not-allowed">
        <Lock size={16} /> Coming Soon
      </button>
    ) : (
      <button className="btn-primary w-full h-[52px] text-[0.85rem]">
        {buttonText}
      </button>
    )}
  </div>
);

const Pricing: React.FC = () => {
  return (
    <div className="p-6 md:p-12 max-w-[1200px] mx-auto space-y-12 animate-fade-up">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="badge badge-primary">Simple Pricing</div>
        <h1 className="text-[3.5rem] font-black tracking-tighter leading-none">Start Free. <span className="gradient-text">Always.</span></h1>
        <p className="text-tx-muted text-[1rem]">Top 100 registered students get lifetime free access. Our mission is to democratize elite JEE coaching data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PricingCard 
          title="Free Forever"
          subtitle="For the first 100 students"
          price="₹0"
          features={[
            "All 10 exam question banks",
            "3200+ chapter-wise questions",
            "Full simulation lab",
            "Accuracy analytics",
            "Unlimited mock tests",
            "Error analysis dashboard"
          ]}
          buttonText="Claim Free Spot"
          badge="67/100 spots taken"
        />
        <PricingCard 
          title="Scholar"
          subtitle="For serious aspirants"
          price="₹499"
          highlight
          locked
          features={[
            "Everything in Free",
            "AI-powered doubt solver",
            "Live leaderboard rankings",
            "Personalised weak-area plans",
            "PDF notes per chapter",
            "Priority support"
          ]}
          buttonText="Upgrade Now"
          badge="Most Popular"
        />
        <PricingCard 
          title="Pro Batch"
          subtitle="With live mentorship"
          price="₹999"
          locked
          features={[
            "Everything in Scholar",
            "1-on-1 mentor sessions",
            "Live doubt classes",
            "Test series with evaluation",
            "IIT alumni guidance",
            "Rank predictor tool"
          ]}
          buttonText="Level Up"
        />
      </div>

      <div className="text-center pt-10 border-t border-border-subtle">
        <p className="label-sm mb-6">Trusted by students cracking</p>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
          <div className="font-display font-black text-xl text-tx-muted opacity-60">JEE ADV AIR <span className="text-pr tracking-tighter">&lt; 5000</span></div>
          <div className="font-display font-black text-xl text-tx-muted opacity-60">NEET <span className="text-emerald-500 tracking-tighter">680+</span></div>
          <div className="font-display font-black text-xl text-tx-muted opacity-60">BITSAT <span className="text-indigo-500 tracking-tighter">380+</span></div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
