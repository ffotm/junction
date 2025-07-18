'use client'
import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: '🌊',
    title: 'Water Quality Monitoring',
    description: 'Real-time tracking of pH, dissolved oxygen, temperature, and ammonia levels in your fish ponds.'
  },
  {
    icon: '🐟',
    title: 'Fish Health Analytics',
    description: 'Monitor fish behavior, growth rates, and health indicators with AI-powered analysis.'
  },
  {
    icon: '⚡',
    title: 'Automated Pond Systems',
    description: 'Smart aeration, feeding schedules, and water circulation based on pond conditions.'
  },
  {
    icon: '�',
    title: 'Yield Optimization',
    description: 'Data-driven insights to maximize fish production and minimize operational costs.'
  },
  {
    icon: '🚨',
    title: 'Alert System',
    description: 'Instant notifications for critical pond conditions and equipment malfunctions.'
  },
  {
    icon: '📱',
    title: 'Mobile Management',
    description: 'Control and monitor your fish ponds remotely from any device, anywhere.'
  }
];

const steps = [
  {
    number: 1,
    title: 'Deploy Pond Sensors',
    description: 'Install waterproof IoT sensors in your fish ponds to monitor water quality parameters.'
  },
  {
    number: 2,
    title: 'Setup Dashboard',
    description: 'Configure your personalized dashboard and set optimal ranges for your fish species.'
  },
  {
    number: 3,
    title: 'Automate Operations',
    description: 'Enable smart automation for feeding, aeration, and water management systems.'
  },
  {
    number: 4,
    title: 'Scale & Optimize',
    description: 'Use AI insights to optimize production and expand your aquaculture operations.'
  }
];

const testimonials = [
  {
    name: 'Maria Rodriguez',
    title: 'Tilapia Farm Owner',
    quote: 'Since using AquaFarm Pro, our fish mortality rate dropped by 40% and production increased by 25%. The early warning system is a game-changer!'
  },
  {
    name: 'David Chen',
    title: 'Aquaculture Operations Manager',
    quote: 'The automated feeding and aeration systems have saved us countless hours. Our fish are healthier and our costs are down significantly.'
  },
  {
    name: 'Jennifer Thompson',
    title: 'Catfish Farm Consultant',
    quote: 'I recommend AquaFarm Pro to all my clients. The water quality monitoring and AI insights help optimize every aspect of pond management.'
  }
];

const partners = [
  'AquaTech Solutions', 'FishSense Pro', 'PondMaster', 'BlueWave Systems', 'AquaFlow', 'SmartPond'
];

const pricing = [
  {
    name: 'Starter',
    price: '$79/mo',
    features: ['Up to 5 ponds', 'Basic water monitoring', 'Email alerts', 'Mobile app access'],
    cta: 'Start Free Trial'
  },
  {
    name: 'Professional',
    price: '$199/mo',
    features: ['Up to 25 ponds', 'Advanced analytics', 'Automated systems', 'SMS & email alerts', 'Fish health tracking'],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: ['Unlimited ponds', 'Custom integrations', 'Dedicated support', 'On-site training', 'API access'],
    cta: 'Contact Sales'
  }
];

const faqs = [
  {
    q: 'What types of fish can I monitor with AquaFarm Pro?',
    a: 'Our system works with all common aquaculture species including tilapia, catfish, salmon, trout, bass, and more. The platform adapts to species-specific requirements.'
  },
  {
    q: 'How quickly can I set up the monitoring system?',
    a: 'Most pond installations are completed within 2-4 hours. Our wireless sensors are easy to deploy and the dashboard setup takes just minutes.'
  },
  {
    q: 'What happens if my internet connection goes down?',
    a: 'Our sensors store data locally and sync automatically when connection is restored. Critical alerts can also be sent via SMS backup.'
  },
  {
    q: 'Can I integrate with my existing pond equipment?',
    a: 'Yes! AquaFarm Pro integrates with most aerators, feeders, and filtration systems through our API and hardware adapters.'
  },
  {
    q: 'Do you provide training and support?',
    a: 'Absolutely. We offer comprehensive onboarding, video tutorials, and 24/7 technical support to ensure your success.'
  }
];

export default function LandingPage() {
  const svgWaveRef = useRef(null);
  const svgDotRef = useRef(null);

  useEffect(() => {
    if (svgWaveRef.current) {
      gsap.to(svgWaveRef.current, {
        y: 20,
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: 'sine.inOut',
      });
    }
    if (svgDotRef.current) {
      gsap.to(svgDotRef.current, {
        y: -15,
        repeat: -1,
        yoyo: true,
        duration: 2.5,
        ease: 'sine.inOut',
      });
    }
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#ffffff] relative overflow-x-hidden">
      {/* Animated SVG Waves and Dots */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-full z-0"
      >
        <svg ref={svgWaveRef} className="w-full h-40 opacity-60" viewBox="0 0 1440 320" fill="none">
          <path fill="url(#wave1)" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
          <defs>
            <linearGradient id="wave1" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1e3a8a" />
              <stop offset="1" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      <motion.div
        ref={svgDotRef}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="absolute left-10 top-1/2 w-16 h-16 z-0"
      >
        <svg className="w-full h-full" viewBox="0 0 64 64" fill="none">
          <circle cx="16" cy="16" r="4" fill="#3b82f6" />
          <circle cx="48" cy="32" r="3" fill="#1e3a8a" />
          <circle cx="32" cy="48" r="2" fill="#3b82f6" />
        </svg>
      </motion.div>

      {/* HERO SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative flex flex-col items-center justify-center min-h-[80vh] px-4 z-10"
      >
        <Card className="bg-white/30 backdrop-blur-lg shadow-2xl rounded-3xl max-w-3xl mx-auto p-10 border-0">
          <CardContent className="flex flex-col items-center">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-5xl font-extrabold text-[#1e3a8a] text-center mb-4 drop-shadow-lg">
              Smart Fish Pond Management
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-lg md:text-2xl text-blue-900/80 text-center mb-8">
              Maximize your fish production with intelligent monitoring, automated systems, and data-driven insights for healthier ponds and higher yields.
            </motion.p>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}>
              <Button size="lg" className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white font-semibold text-lg rounded-lg shadow-md px-8 py-4">
                Start Free Trial
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.section>

      {/* HOW IT WORKS */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="py-20 z-10"
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#1e3a8a] mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }} className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-lg p-8 flex flex-col items-center">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full text-2xl font-bold mb-4 text-blue-700">{step.number}</div>
                <h3 className="text-xl font-semibold text-[#1e3a8a] mb-2">{step.title}</h3>
                <p className="text-gray-700 text-center">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FEATURES */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="py-20 bg-white/40 z-10"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#1e3a8a] mb-12">Comprehensive Pond Management Features</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }} className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-8 flex flex-col items-center">
                <div className="w-14 h-14 flex items-center justify-center bg-blue-100 rounded-full text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-[#1e3a8a] mb-2">{feature.title}</h3>
                <p className="text-gray-700 text-center text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* TESTIMONIALS */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="py-20 z-10"
      >
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#1e3a8a] mb-12">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }} className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 flex flex-col items-center">
                <p className="text-gray-700 italic mb-4">“{t.quote}”</p>
                <div className="text-center">
                  <span className="text-blue-700 font-semibold block">{t.name}</span>
                  <span className="text-gray-600 text-sm">{t.title}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* PARTNERS */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="py-12 bg-white/30 z-10"
      >
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
          <h2 className="text-xl font-bold text-[#1e3a8a] mb-6">Works with your favorite tools</h2>
          <div className="flex flex-wrap gap-8 justify-center items-center">
            {partners.map((p, i) => (
              <span key={i} className="bg-blue-100 text-blue-700 px-6 py-2 rounded-full font-semibold shadow-sm text-sm">{p}</span>
            ))}
          </div>
        </div>
      </motion.section>

      {/* PRICING */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="py-20 z-10"
      >
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#1e3a8a] mb-12">Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((plan, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }} className={`bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 flex flex-col items-center border-2 ${plan.popular ? 'border-blue-600' : 'border-transparent'}`}>
                <h3 className="text-xl font-bold text-[#1e3a8a] mb-2">{plan.name}</h3>
                <div className="text-3xl font-extrabold text-blue-700 mb-4">{plan.price}</div>
                <ul className="mb-6 space-y-2 text-gray-700 text-sm">
                  {plan.features.map((f, j) => <li key={j}>• {f}</li>)}
                </ul>
                <Button className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white font-semibold rounded-lg`}>{plan.cta}</Button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="py-20 bg-white/40 z-10"
      >
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#1e3a8a] mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }} className="bg-white/70 backdrop-blur-lg rounded-xl shadow p-6">
                <div className="font-semibold text-blue-700 mb-2">{faq.q}</div>
                <div className="text-gray-700">{faq.a}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FINAL CTA */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="py-20 z-10"
      >
        <div className="max-w-2xl mx-auto px-4 text-center">
          <Card className="bg-white/60 backdrop-blur-lg shadow-2xl rounded-3xl p-10 border-0">
            <CardContent>
              <h2 className="text-3xl font-bold text-[#1e3a8a] mb-4">Ready to revolutionize your fish farming?</h2>
              <p className="text-lg text-blue-900/80 mb-8">Join thousands of successful fish farmers using AquaFarm Pro to maximize yields, reduce costs, and ensure healthier fish populations.</p>
              <Button size="lg" className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white font-semibold text-lg rounded-lg shadow-md px-8 py-4">
                Get Started
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.section>


    </div>
  );
}