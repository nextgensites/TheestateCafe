import React from 'react';
import { motion } from 'framer-motion';
import { Hero3D } from '@/components/Hero3D';
import { MapPin, Clock, Phone, ArrowRight, Instagram, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

export default function Home() {
  return (
    <div className="relative min-h-screen font-sans text-white selection:bg-[#c98b33]/40 selection:text-white">
      {/* Full-page fixed animated background */}
      <Hero3D />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-6 px-8 md:px-16 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent backdrop-blur-[2px]">
        <div className="font-serif text-2xl font-bold tracking-wider text-white">
          THE ESTATE CAFE
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-widest uppercase text-white/80">
          <a href="#story" className="hover:text-white transition-colors">Our Story</a>
          <a href="#menu" className="hover:text-white transition-colors">Menu</a>
          <a href="#experience" className="hover:text-white transition-colors">Experience</a>
          <a href="#visit" className="hover:text-white transition-colors">Visit</a>
        </div>
        <Button
          variant="outline"
          className="bg-transparent text-white border-white/30 hover:bg-white hover:text-black hidden md:inline-flex rounded-none tracking-widest uppercase text-xs px-6 py-5"
        >
          Reserve
        </Button>
      </nav>

      {/* ── Hero ── */}
      <section className="relative z-10 h-screen w-full flex items-center justify-center">
        <div className="text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="mb-6 inline-block"
          >
            <span className="font-sans text-xs md:text-sm tracking-[0.3em] text-[#c98b33] uppercase">
              Chikkamagaluru, Karnataka
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-medium tracking-tight mb-8"
          >
            A Slow Breath in the Coffee Hills
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
            className="font-sans text-lg md:text-xl text-white/75 font-light max-w-2xl mx-auto mb-12"
          >
            Honest Malnad food and estate-grown filter coffee, served in a restored planter's bungalow surrounded by mist and sprawling greenery.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <Button className="bg-[#c98b33] hover:bg-[#b0782a] text-white rounded-none px-8 py-6 text-sm tracking-widest uppercase transition-all duration-300">
              Discover the Menu
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/40"
        >
          <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </section>

      {/* ── The Story ── */}
      <section id="story" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUpVariant}
              className="order-2 md:order-1 relative aspect-[4/5] w-full"
            >
              <img
                src="/images/hills-panorama.png"
                alt="Chikkamagaluru hills panorama"
                className="object-cover w-full h-full rounded-sm shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUpVariant}
              className="order-1 md:order-2 flex flex-col justify-center"
            >
              {/* Glass panel */}
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-sm p-10 md:p-12">
                <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Born from the Estate.</h2>
                <div className="w-12 h-1 bg-[#c98b33] mb-8" />
                <p className="text-lg text-white/70 mb-6 leading-relaxed font-light">
                  The Estate Cafe wasn't built; it was restored. Originally a 19th-century planter's bungalow, we've kept the timber ceilings, the wide verandas, and the unhurried pace of estate life.
                </p>
                <p className="text-lg text-white/70 mb-10 leading-relaxed font-light">
                  We believe in honest, rooted cooking. Our coffee is grown on the very hills you look out upon, roasted in small batches, and brewed the traditional way. Our food draws from generations of Malnad heritage — spice-rich, earthy, and deeply comforting.
                </p>
                <a
                  href="#experience"
                  className="inline-flex items-center gap-3 text-[#c98b33] font-medium tracking-wide uppercase text-sm hover:text-[#e6ac55] transition-colors"
                >
                  Our Philosophy <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Menu Highlights ── */}
      <section id="menu" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUpVariant}
            className="text-center mb-20"
          >
            <span className="font-sans text-xs tracking-[0.3em] text-[#c98b33] uppercase block mb-4">Provisions</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">From the Kitchen</h2>
            <div className="w-12 h-1 bg-[#c98b33] mx-auto" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                img: '/images/filter-coffee.png',
                title: 'Estate Filter Coffee',
                desc: 'Our signature blend of Arabica and Peaberry, grown at 4000ft, roasted over wood-fire, and brewed in a traditional brass dabara set.',
                price: '₹ 250',
              },
              {
                img: null,
                label: 'Akki Rotti & Bamboo Shoot',
                labelDesc: 'A Malnad staple. Soft rice flour rottis pressed on banana leaves, served with seasonal bamboo shoot curry and fresh coconut chutney.',
                title: 'Malnad Breakfast',
                desc: 'Start your morning with the true taste of the hills. Slow-cooked, deeply spiced, and completely satisfying.',
                price: '₹ 450',
              },
              {
                img: null,
                label: 'Pepper Chicken Roast',
                labelDesc: 'Free-range chicken slow-roasted with black pepper from our estate vines, curry leaves, and cold-pressed coconut oil.',
                title: 'Estate Dinner',
                desc: 'Rich, robust flavors designed to warm you up after a long day exploring the misty plantations.',
                price: '₹ 650',
              },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUpVariant}>
                <Card className="bg-black/45 backdrop-blur-md border border-white/10 rounded-sm overflow-hidden text-white group h-full">
                  <div className="aspect-[4/3] overflow-hidden">
                    {item.img ? (
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#1a2a18]/80 flex flex-col items-center justify-center p-8 text-center">
                        <h3 className="font-serif text-xl mb-3 text-[#e6dcc8]">{item.label}</h3>
                        <p className="text-white/60 font-light text-sm leading-relaxed">{item.labelDesc}</p>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-8">
                    <h3 className="font-serif text-2xl mb-3 text-[#e6dcc8]">{item.title}</h3>
                    <p className="text-white/65 font-light text-sm leading-relaxed mb-6">{item.desc}</p>
                    <span className="text-[#c98b33] font-mono text-sm">{item.price}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-16 text-center">
            <Button
              variant="outline"
              className="bg-transparent text-white border-white/25 hover:bg-white hover:text-black rounded-none tracking-widest uppercase text-xs px-8 py-6"
            >
              View Full Menu
            </Button>
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUpVariant}
              className="md:col-span-5 flex flex-col justify-center z-10"
            >
              <div className="bg-black/45 backdrop-blur-md border border-white/10 p-10 md:p-14 rounded-sm md:-mr-12 relative">
                <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">Time moves slower here.</h2>
                <p className="text-white/70 mb-6 font-light leading-relaxed">
                  We don't do quick turnarounds. When you claim a table on the veranda, it's yours. Read a book, watch the mist roll over the valley, or simply listen to the rain on the terracotta tiles.
                </p>
                <p className="text-white/70 font-light leading-relaxed">
                  The ambiance is natural and unforced. Warm amber lamps, weathered teakwood, and the constant, comforting scent of roasting coffee and damp earth.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUpVariant}
              className="md:col-span-7 h-full"
            >
              <div className="aspect-[16/10] w-full">
                <img
                  src="/images/estate-mist.png"
                  alt="Cafe nestled in misty plantations"
                  className="w-full h-full object-cover rounded-sm shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Visit ── */}
      <section id="visit" className="relative z-10 py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUpVariant}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Plan Your Visit</h2>
            <div className="w-12 h-1 bg-[#c98b33] mx-auto mb-8" />
            <p className="text-lg text-white/65 max-w-2xl mx-auto font-light">
              We highly recommend making a reservation, especially for weekend visits and larger groups.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {[
              {
                icon: <MapPin size={22} />,
                title: 'Location',
                lines: ['Kaimara Post, Chikmagalur', 'Karnataka 577101', 'India'],
              },
              {
                icon: <Clock size={22} />,
                title: 'Hours',
                lines: ['Wed – Mon: 8:00 AM – 8:00 PM', 'Tuesday: Closed'],
              },
              {
                icon: <Phone size={22} />,
                title: 'Contact',
                lines: ['+91 98765 43210', 'hello@estatecafe.in'],
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUpVariant}
                className="flex flex-col items-center text-center bg-black/35 backdrop-blur-md border border-white/10 rounded-sm p-10"
              >
                <div className="w-12 h-12 rounded-full bg-[#c98b33]/15 flex items-center justify-center text-[#c98b33] mb-6">
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl text-white mb-3">{item.title}</h3>
                <p className="text-white/60 font-light text-sm leading-relaxed">
                  {item.lines.map((l, j) => (
                    <React.Fragment key={j}>{l}{j < item.lines.length - 1 && <br />}</React.Fragment>
                  ))}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUpVariant}
            className="flex justify-center"
          >
            <Button className="bg-[#c98b33] hover:bg-[#b0782a] text-white rounded-none px-12 py-8 text-sm tracking-widest uppercase">
              Book a Table
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 py-16 px-6 border-t border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-serif text-2xl font-bold tracking-wider text-[#e6dcc8]">
            THE ESTATE CAFE
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-white/50 hover:text-[#c98b33] transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-white/50 hover:text-[#c98b33] transition-colors"><Facebook size={20} /></a>
            <a href="#" className="text-white/50 hover:text-[#c98b33] transition-colors"><Twitter size={20} /></a>
          </div>

          <div className="text-sm font-light text-white/40 text-center md:text-right">
            &copy; {new Date().getFullYear()} The Estate Cafe. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
