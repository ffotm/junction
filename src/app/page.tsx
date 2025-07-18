'use client'
import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: '🌊',
    title: 'Real-time Water Monitoring',
    description: 'Track pH, temperature, and oxygen levels with live sensor data.'
  },
  {
    icon: '🤖',
    title: 'Automated Controls',
    description: 'Automate aeration, feeding, and water flow for optimal conditions.'
  },
  {
    icon: '📈',
    title: 'AI Insights',
    description: 'Get actionable recommendations to boost yield and reduce costs.'
  },
  {
    icon: '📱',
    title: 'Mobile Dashboard',
    description: 'Manage your ponds from anywhere, on any device.'
  }
];

const steps = [
  {
    number: 1,
    title: 'Install Sensors',
    description: 'Place wireless sensors in your ponds to start collecting data.'
  },
  {
    number: 2,
    title: 'Connect & Configure',
    description: 'Link your devices and set up automation rules in minutes.'
  },
  {
    number: 3,
    title: 'Monitor & Optimize',
    description: 'Track performance, receive alerts, and optimize with AI.'
  }
];

const testimonials = [
  {
    name: 'Sarah, Farm Owner',
    quote: 'AquaFarm Pro transformed our operations. We catch issues before they become problems!'
  },
  {
    name: 'James, Operations Manager',
    quote: 'The automation and insights save us hours every week. Highly recommended.'
  },
  {
    name: 'Priya, Aquaculture Consultant',
    quote: 'My clients love the real-time data and easy-to-use dashboard.'
  }
];

const partners = [
  'PartnerOne', 'FishTech', 'AquaSense', 'BlueWave'
];

const pricing = [
  {
    name: 'Starter',
    price: '$49/mo',
    features: ['Up to 3 ponds', 'Basic monitoring', 'Email alerts'],
    cta: 'Start Free'
  },
  {
    name: 'Pro',
    price: '$149/mo',
    features: ['Up to 20 ponds', 'Full automation', 'AI insights', 'SMS alerts'],
    cta: 'Start Free',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: ['Unlimited ponds', 'Custom integrations', 'Dedicated support'],
    cta: 'Contact Sales'
  }
];

const faqs = [
  {
    q: 'How quickly can I get started?',
    a: 'Most farms are up and running in under an hour.'
  },
  {
    q: 'Is my data secure?',
    a: 'Yes, we use industry-standard encryption and best practices.'
  },
  {
    q: 'Can I integrate with other farm tools?',
    a: 'Absolutely! We support a wide range of integrations.'
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
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#ffffff] relative overflow-x-hidden">
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
              Smart Aquaculture, Simplified
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-lg md:text-2xl text-blue-900/80 text-center mb-8">
              Monitor, automate, and optimize your ponds with real-time data and AI-driven insights.
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
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#1e3a8a] mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
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
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#1e3a8a] mb-12">Key Features</h2>
          <div className="grid md:grid-cols-4 gap-8">
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
                <span className="text-blue-700 font-semibold">{t.name}</span>
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
              <h2 className="text-3xl font-bold text-[#1e3a8a] mb-4">Ready to transform your aquaculture?</h2>
              <p className="text-lg text-blue-900/80 mb-8">Join hundreds of successful farmers using AquaFarm Pro to optimize their operations.</p>
              <Button size="lg" className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white font-semibold text-lg rounded-lg shadow-md px-8 py-4">
                Get Started
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="bg-gray-900 text-white py-12 z-10"
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 font-bold text-xl">AquaFarm Pro</div>
          <div className="flex gap-6 text-gray-400 text-sm">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
          <div className="text-gray-400 text-sm mt-4 md:mt-0">&copy; 2025 AquaFarm Pro. All rights reserved.</div>
        </div>
      </motion.footer>
    </div>
  );
}