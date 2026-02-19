'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { SITE_INFO, CONTACT_INFO } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-vintage-darkBrown text-vintage-cream py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="font-baby text-2xl font-bold mb-4">{SITE_INFO.title}</div>
            <p className="text-vintage-cream/80 text-sm leading-relaxed">
              {SITE_INFO.description}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-baby text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-vintage-cream/80 hover:text-vintage-gold transition-colors">
                  All Stories
                </a>
              </li>
              <li>
                <a href="#" className="text-vintage-cream/80 hover:text-vintage-gold transition-colors">
                  Timeline
                </a>
              </li>
              <li>
                <a href="#" className="text-vintage-cream/80 hover:text-vintage-gold transition-colors">
                  About The Professor
                </a>
              </li>
              <li>
                <a href="/admin" className="text-vintage-cream/80 hover:text-vintage-gold transition-colors">
                  Admin Dashboard
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-baby text-xl font-bold mb-4">Connect</h4>
            <div className="space-y-3 text-sm">
              <a 
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-2 text-vintage-cream/80 hover:text-vintage-gold transition-colors"
              >
                <Mail size={16} />
                <span>{CONTACT_INFO.email}</span>
              </a>
              <a 
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-center gap-2 text-vintage-cream/80 hover:text-vintage-gold transition-colors"
              >
                <Phone size={16} />
                <span>{CONTACT_INFO.phoneDisplay}</span>
              </a>
              <div className="flex gap-4 mt-4">
                <motion.a
                  href={CONTACT_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-vintage-cream/80 hover:text-vintage-gold transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  <Github size={20} />
                </motion.a>
                <motion.a
                  href={CONTACT_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-vintage-cream/80 hover:text-vintage-gold transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  <Linkedin size={20} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="border-t border-vintage-cream/20 pt-8 text-center text-sm text-vintage-cream/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p>© {currentYear} {SITE_INFO.title}. All rights reserved.</p>
          <p className="mt-2">
            Built by{' '}
            <a 
              href={CONTACT_INFO.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="text-vintage-gold hover:underline"
            >
              {CONTACT_INFO.name}
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
