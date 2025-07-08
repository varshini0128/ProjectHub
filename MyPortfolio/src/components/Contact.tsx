import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  emailjs
    .send(
      'service_18xejes',      // Replace with your actual service ID from EmailJS
      'template_jxqjukc',     // Replace with your actual template ID
      formData,
      'WAadqf_U-grC5KVrX'       // Replace with your actual public key (user ID)
    )
    .then(
      (result) => {
        console.log('Email successfully sent!', result.text);
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
      },
      (error) => {
        console.error('Failed to send email:', error.text);
        alert('Something went wrong. Please try again.');
      }
    );
};

  const contactInfo = [
    {
      icon: <Mail className="text-blue-400" size={24} />,
      label: "Email",
      value: "varshinisiliveri22@gmail.com",
      href: "mailto:varshinisiliveri22@gmail.com"
    },
    {
      icon: <Phone className="text-green-400" size={24} />,
      label: "Phone",
      value: "+91 7842259549",
      href: "tel:+91 7842259549"
    },
    {
      icon: <MapPin className="text-violet-400" size={24} />,
      label: "Location",
      value: "Hyderabad, India",
      href: "#"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-slate-700">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text text-transparent">
            Get In Touch
          </span>
        </h2>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-semibold text-blue-400 mb-6">Let's Connect</h3>
            <p className="text-slate-300 mb-8 leading-relaxed">
              I'm always interested in hearing about new opportunities, 
              collaborations, or just having a chat about technology and innovation. 
              Feel free to reach out!
            </p>

            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="flex items-center gap-4 p-4 bg-slate-600 rounded-lg border border-slate-500 hover:border-green-400/50 transition-all duration-300 group"
                >
                  <div className="flex-shrink-0">{info.icon}</div>
                  <div>
                    <div className="text-sm text-slate-400">{info.label}</div>
                    <div className="text-blue-400 group-hover:text-green-400 transition-colors duration-300">
                      {info.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-blue-400 mb-4">Follow Me</h4>
              <div className="flex gap-4">
                <a
                  href="https://github.com/varshini0128"
                  className="w-12 h-12 bg-slate-600 rounded-lg border border-slate-500 hover:border-green-400/50 flex items-center justify-center text-slate-400 hover:text-green-400 transition-all duration-300 transform hover:scale-110"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/varshininetha" target="_blank"
                 
                  className="w-12 h-12 bg-slate-600 rounded-lg border border-slate-500 hover:border-green-400/50 flex items-center justify-center text-slate-400 hover:text-green-400 transition-all duration-300 transform hover:scale-110"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="mailto:varshinisiliveri22@gmail.com"
                  className="w-12 h-12 bg-slate-600 rounded-lg border border-slate-500 hover:border-green-400/50 flex items-center justify-center text-slate-400 hover:text-green-400 transition-all duration-300 transform hover:scale-110"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-lg focus:border-green-400 focus:outline-none transition-colors duration-300 text-slate-200"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-lg focus:border-green-400 focus:outline-none transition-colors duration-300 text-slate-200"
                    placeholder="yourname@gmail.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-lg focus:border-green-400 focus:outline-none transition-colors duration-300 text-slate-200"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-lg focus:border-green-400 focus:outline-none transition-colors duration-300 text-slate-200 resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-400 hover:to-violet-400 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 font-medium"
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;