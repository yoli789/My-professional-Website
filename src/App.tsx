/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, createContext, useContext, useRef } from 'react';

export const LanguageContext = createContext({
  lang: 'EN',
  setLang: (lang: string) => { },
  t: (en: string, cn: string) => en,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState('EN');
  const t = (en: string, cn: string) => lang === 'EN' ? (en || '') : (cn || '');
  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Linkedin,
  Github,
  FileText,
  ArrowRight,
  Settings,
  Cpu,
  BarChart3,
  MessageSquare,
  Globe,
  Menu,
  X,
  Database,
  Workflow,
  Bot,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  PieChart,
  Layers,
  Zap,
  TrendingUp,
  ShieldAlert,
  Code2,
  Activity,
  AlertCircle,
  Table,
  Laptop,
  Layout,
  FileBox,
  Image,
  Target,
  AlertTriangle,
  TrendingDown,
  BarChart2,
  Mail
} from 'lucide-react';

// --- Components ---
 
const PrivacyPatch = ({ imageSrc }: { imageSrc: string }) => {
  if (imageSrc === "/automation/project_dashboard.png" || imageSrc === "/automation/savings_dashboard.jpg" || imageSrc === "/dashboards/project_dashboard.png") {
    // Power BI Sidebar Logo
    return (
      <div className="absolute left-[0.2%] bottom-[12.5%] w-[3.5%] h-[6%] backdrop-blur-xl bg-white/20 rounded-full z-20 pointer-events-none border border-white/30 transition-opacity group-hover:opacity-10" />
    );
  }
  if (imageSrc === "/container-forecast.png") {
    // Top right logo
    return (
      <div className="absolute right-[2.1%] top-[1.4%] w-[10%] h-[12.5%] backdrop-blur-2xl bg-white/10 rounded-full z-20 pointer-events-none border border-white/20" />
    );
  }
  return null;
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('About Me', '关于我'), href: '/#about' },
    { name: t('Project Gallery', '项目画廊'), href: '/#projects' },
    { name: t('Technical Skills', '技术能力'), href: '/#skills' },
    { name: t('Contact', '总览与联系'), href: '/#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      const id = href.substring(2);
      const element = document.getElementById(id);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-center items-center relative">
        <div className="flex justify-between items-center w-full">
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6 whitespace-nowrap">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium hover:text-corporate-blue transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center whitespace-nowrap">
            <div className="h-4 w-[1px] bg-gray-200 mx-4"></div>
            <div className="flex items-center text-xs">
              <button
                onClick={() => setLang('EN')}
                className={`transition-colors ${lang === 'EN' ? 'font-bold text-black' : 'font-medium text-gray-400 hover:text-gray-600'}`}
              >
                EN
              </button>
              <span className="mx-1 text-gray-300">/</span>
              <button
                onClick={() => setLang('CN')}
                className={`transition-colors ${lang === 'CN' ? 'font-bold text-black' : 'font-medium text-gray-400 hover:text-gray-600'}`}
              >
                CN
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden ml-auto">
            <div className="flex items-center text-xs">
              <button
                onClick={() => setLang('EN')}
                className={`transition-colors ${lang === 'EN' ? 'font-bold text-black' : 'font-medium text-gray-400'}`}
              >
                EN
              </button>
              <span className="mx-1 text-gray-300">/</span>
              <button
                onClick={() => setLang('CN')}
                className={`transition-colors ${lang === 'CN' ? 'font-bold text-black' : 'font-medium text-gray-400'}`}
              >
                CN
              </button>
            </div>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 flex flex-col space-y-4 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={(e) => {
                  handleNavClick(e, link.href);
                  setIsMobileMenuOpen(false);
                }}
                className="text-lg font-medium"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-start gap-2">
              <button
                onClick={() => {
                  setLang('EN');
                  setIsMobileMenuOpen(false);
                }}
                className={`text-lg transition-colors ${lang === 'EN' ? 'font-bold text-black' : 'font-medium text-gray-400'}`}
              >
                EN
              </button>
              <span className="text-gray-300 text-lg">/</span>
              <button
                onClick={() => {
                  setLang('CN');
                  setIsMobileMenuOpen(false);
                }}
                className={`text-lg transition-colors ${lang === 'CN' ? 'font-bold text-black' : 'font-medium text-gray-400'}`}
              >
                CN
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ResumeModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
        setReason('');
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetEmail = "nikeer96@gmail.com";
    const subject = encodeURIComponent("Resume request");
    const body = encodeURIComponent(`Responder Email Address: ${email}\n\nReason for Request:\n${reason}`);
    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-10">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="text-green-500" size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-display">{t('Request Sent!', '发送成功！')}</h3>
              <p className="text-gray-500 mb-8">{t('Thank you for your interest. I will get back to you shortly at the provided email.', '感谢您的关注。我将尽快通过您提供的邮箱与您取得联系。')}</p>
              <button
                onClick={onClose}
                className="w-full bg-gray-100 text-gray-800 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all font-display"
              >
                {t('Close', '关闭')}
              </button>
            </motion.div>
          ) : (
            <>
              <div className="w-16 h-16 bg-corporate-blue/10 rounded-2xl flex items-center justify-center mb-8">
                <FileText className="text-corporate-blue" size={32} />
              </div>

              <h3 className="text-3xl font-bold mb-4 font-display">{t('Request Resume', '获取简历')}</h3>
              <p className="text-gray-500 mb-8 leading-relaxed">
                {t('Please provide your details below and I will get back to you shortly.', '请填写以下信息，我会尽快回复您。')}
              </p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{t('Email Address', '邮箱地址')}</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-corporate-blue/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{t('Reason for Request', '请求原因')}</label>
                  <textarea
                    required
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder={t("Briefly explain your interest...", "简略说明...")}
                    rows={4}
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-corporate-blue/20 transition-all resize-none"
                  />
                </div>

                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <p className="text-xs text-blue-800 leading-relaxed font-medium">
                    {t('I will send my latest resume to the relevant email address as soon as possible, please pay attention to your inbox.', '我会尽量往相关邮箱内发送最新简历，请关注好自己的邮箱。')}
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-corporate-blue text-white py-5 rounded-2xl font-bold hover:bg-blue-900 transition-all shadow-xl"
                >
                  {t('Submit Request', '提交申请')}
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const ContactModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-10">
          <div className="w-16 h-16 bg-corporate-blue/10 rounded-2xl flex items-center justify-center mb-8">
            <MessageSquare className="text-corporate-blue" size={32} />
          </div>

          <h3 className="text-3xl font-bold mb-4 font-display">{t('Get in Touch', '联系我')}</h3>
          <p className="text-gray-500 mb-8 leading-relaxed">
            {t('Would you like to connect on LinkedIn or send me an email directly? I look forward to hearing from you!', '您希望通过 LinkedIn 与我建立联系，还是直接发送邮件给我？我非常期待收到您的消息！')}
          </p>

          <div className="space-y-4">
            <a
              href="https://www.linkedin.com/in/yulizhang-hec/?locale=en"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 w-full p-6 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/30 transition-all group"
            >
              <div className="w-12 h-12 bg-[#0A66C2] rounded-xl flex items-center justify-center shrink-0">
                <Linkedin className="text-white" size={24} />
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-800">{t('Message on LinkedIn', '在 LinkedIn 上发消息')}</p>
                <p className="text-xs text-gray-500 mt-1 z-10 relative">{t('Connect professionally', '建立职业联系')}</p>
              </div>
            </a>

            <a
              href="mailto:yuli.zhang@hec.ca"
              className="flex items-center gap-4 w-full p-6 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-corporate-blue/10 hover:border-corporate-blue/30 transition-all group"
            >
              <div className="w-12 h-12 bg-corporate-blue rounded-xl flex items-center justify-center shrink-0">
                <Mail className="text-white" size={24} />
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-800">{t('Send an Email', '发送电子邮件')}</p>
                <p className="text-xs text-gray-500 mt-1 z-10 relative">yuli.zhang@hec.ca</p>
              </div>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <section className="min-h-screen flex items-center section-padding pt-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center md:justify-start md:pl-12"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-gray-50 shadow-xl">
              <img
                src="/profile_photo.png"
                alt="Yuli Zhang"
                className="w-full h-full object-cover scale-[1.35] translate-y-[2%]"
                style={{ filter: "contrast(1.1) brightness(1.02) saturate(1.05)" }}
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-6 font-serif italic">
              {t('Hello, I\'m', '你好，我是')} <br />
              <span className="text-corporate-blue not-italic">Yuli ZHANG</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 font-light">
              {t('Global Procurement Digitalization Expert', '全球采购数字化专家')}
            </p>

            <div className="flex flex-col gap-4 mb-10">
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <button
                  onClick={() => setIsResumeModalOpen(true)}
                  className="bg-[#003399] text-white px-10 py-4 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-blue-900 transition-all shadow-lg w-[280px]"
                >
                  <FileText size={20} />
                  {t('Request Resume', '获取简历')}
                </button>
                <span className="hidden sm:inline text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  {t('current version: 2026-03', '当前版本: 2026-03')}
                </span>
              </div>
              <button
                onClick={() => {
                  const element = document.getElementById('about');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-2 border-[#003399] text-[#003399] px-10 py-4 rounded-full font-bold hover:bg-blue-50 transition-all flex items-center justify-center gap-3 w-[280px] mx-auto md:mx-0"
              >
                <ArrowRight size={16} />
                {t('Start Exploring', '开始探索')}
              </button>
            </div>

            <div className="flex justify-center md:justify-start gap-6 text-gray-300">
              <a href="https://www.linkedin.com/in/yulizhang-hec/?locale=en" target="_blank" rel="noopener noreferrer" className="hover:text-corporate-blue transition-colors"><Linkedin size={24} /></a>
            </div>
          </motion.div>
        </div>
      </section>
      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
    </>
  );
};

const Strategy = () => {
  const { t } = useLanguage();
  const strategies = [
    {
      title: t("Process Optimization", "流程优化"),
      icon: <Workflow className="text-corporate-blue" size={32} />,
      description: t("Connecting business logic with advanced technology to automate indirect spend and improve standardization rate.", "将业务逻辑与先进技术相结合，实现间接采购的自动化，并提升标准化率。")
    },
    {
      title: t("AI Automation", "AI自动化"),
      icon: <Bot className="text-corporate-blue" size={32} />,
      description: t("Implementing AI Agents and machine learning workflows to reduce manual overhead in procurement cycles.", "通过部署AI代理和机器学习工作流，减少采购周期中的手动成本。")
    }
  ];

  return (
    <section id="strategy" className="bg-gray-50 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-sm uppercase tracking-widest text-gray-400 font-semibold mb-2 font-display">{t('Get To Know More', '了解更多')}</h2>
          <h3 className="text-4xl font-bold font-display">{t('Digital Strategy', '数字战略')}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {strategies.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100"
            >
              <div className="mb-6">{item.icon}</div>
              <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CaseStudies = () => {
  const { t } = useLanguage();
  const projects = [
    {
      title: t("Global Indirect Contract Optimization", "全球间接采购合同优化"),
      icon: <FileText className="text-corporate-blue" size={24} />,
      image: "/global_contract_optimization.jpg",
      description: t("Optimized contract management for indirect spend across global entities, improving compliance by 40%.", "通过优化跨全球实体的间接采购合同管理，将合规率提高了40%。"),
      tags: [t("Contract Management", "合同管理"), t("Optimization", "优化")],
      demoPath: "/demo/contract-optimization"
    },
    {
      title: t("Non-code Automation Solution Provider", "无代码自动化解决方案"),
      icon: <Workflow className="text-corporate-blue" size={24} />,
      image: "/non_code_automation.png",
      description: t("Driven end-to-end digital transformation of the procurement pipeline by deploying automated no-code workflows; developed a centralized SharePoint data repository to provide a seamless, real-time data source for performance tracking", "通过部署自动化无代码工作流，驱动采购管道的端到端数字化转型；开发了集中的SharePoint数据存储库，为绩效跟踪提供无缝的实时数据源。"),
      tags: [t("No-code", "无代码"), t("Automation", "自动化")],
      demoPath: "/demo/process-automation"
    },
    {
      title: t("Indirect procurement dashboard", "间接采购仪表盘"),
      icon: <Database className="text-corporate-blue" size={24} />,
      image: "/procurement_dashboard_feature.jpg",
      description: t("Architected comprehensive procurement dashboards to monitor target-to-actual savings and evaluate contractual performance metrics, ensuring full visibility into indirect spend efficiency.", "构建综合的采购仪表盘，监控目标与实际节省额的对比，并评估合同绩效指标，确保间接采购效率的充分可视化。"),
      tags: [t("Supplier Management", "供应商管理"), t("KPI design", "KPI设计")],
      demoPath: "/demo/procurement-dashboard"
    }
  ];

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-sm uppercase tracking-widest text-gray-400 font-semibold mb-2 font-display">{t('Explore My', '探索我的')}</h2>
          <h3 className="text-4xl font-bold font-display">{t('Project Gallery', '项目画廊')}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="h-48 bg-gray-100 overflow-hidden relative group">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    style={{ objectPosition: 'right' }}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center p-8">
                    <div className="p-6 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                      {project.icon}
                    </div>
                  </div>
                )}
              </div>
              <div className="p-8 flex-grow">
                <div className="flex gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-gray-400 border border-gray-200 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <h4 className="text-xl font-bold mb-4 leading-tight">{project.title}</h4>
                <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                  {project.description}
                </p>
                <div className="mt-auto flex gap-4">
                  <button className="text-xs font-bold uppercase tracking-widest text-corporate-blue flex items-center gap-1 hover:gap-2 transition-all">
                    {t('Case Study', '案例研究')} <ArrowRight size={14} />
                  </button>
                  <Link
                    to={project.demoPath}
                    className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                  >
                    {t('View Demo', '查看演示')}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const { t } = useLanguage();
  return (
    <section id="about" className="bg-black text-white section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="aspect-[3/4] rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700"
          >
            <img
              src="https://picsum.photos/seed/yuli-strategy/800/1066"
              alt="Strategy"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-corporate-blue rounded-full flex items-center justify-center p-8 text-center">
            <p className="text-sm font-bold leading-tight">{t('3+ YEARS EXPERIENCE', '3年以上经验')}</p>
          </div>
        </div>

        <div>
          <h2 className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-6 font-display">{t('About Me', '关于我')}</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight font-display">
            {t('Connecting Business Logic', '连接业务逻辑')} <br />
            <span className="text-corporate-blue">{t('With Advanced Technology', '与先进技术')}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h4 className="text-corporate-blue font-bold mb-2">{t('Global Digital Strategy', '全球数字战略')}</h4>
              <p className="text-sm text-gray-400">{t('Transformation Leadership in complex procurement environments.', '复杂采购环境中的转型领导力。')}</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h4 className="text-corporate-blue font-bold mb-2">{t('Aerospace+Indirect Procurement', '航空航天+间接采购')}</h4>
              <p className="text-sm text-gray-400">{t('M.Sc. Montreal + Data Analytics Certifications.', '蒙特利尔理学硕士 + 数据分析认证。')}</p>
            </div>
          </div>

          <p className="text-gray-400 leading-relaxed mb-8">
            {t('I drive operational excellence in indirect procurement through strategic digital transformation. As an Aerospace SAP Ariba Specialist, I specialize in turning fragmented data into competitive advantage. By architecting end-to-end solutions—from meticulous data cleansing to advanced predictive analytics and executive visualization—I empower organizations to bridge the gap between technical potential and bottom-line necessity.', '我致力于通过战略性的数字化转型，推动间接采购的运营卓越。作为航空航天 SAP Ariba 专家，我擅长将零碎的数据转化为竞争优势。通过构建端到端解决方案——从细致的数据清洗到高级的预测分析和高管可视化视图——我帮助企业在技术潜力与底线需求之间架起桥梁。')}
          </p>

          <div className="mt-12">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">{t('Previous Companies:', '过往任职公司：')}</p>
            <div className="flex flex-wrap items-center gap-x-12 gap-y-8">
              {[
                { name: 'COSCO', src: '/logos/cosco.png' },
                { name: 'Agropur', src: '/logos/agropur.png' },
                { name: 'BRP', src: '/logos/brp.png' },
                { name: 'Pratt & Whitney', src: '/logos/pratt.png' }
              ].map(company => (
                <div key={company.name} className="flex items-center gap-3">
                  <img
                    src={company.src}
                    alt={company.name}
                    className="h-8 max-w-[120px] object-contain rounded-sm"
                  />
                  <span className="text-lg font-bold text-gray-300">{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Stack = () => {
  const { t } = useLanguage();
  const skills = [
    {
      category: t("Digital Procurement Strategy", "数字采购战略"),
      items: [
        [
          t("Process Optimization", "流程优化"),
          t("Sourcing&Contracting Standardization", "寻源与合同标准化"),
          t("Global Business Mapping", "全球业务地图"),
          t("SAP/Ariba integration", "SAP/Ariba集成"),
          t("Continuous Improvement", "持续改进"),
          t("ServiceNow Deployment", "ServiceNow部署")
        ]
      ]
    },
    {
      category: t("AI & Automation Lab", "AI与自动化实验室"),
      items: [
        [t("AI Agents", "AI 代理人"), "Vibe Coding"],
        ["Sharepoint Builder", "Power Apps", "Power Automation", "Power Query", "Power BI", "Visio"]
      ]
    }
  ];

  return (
    <section id="skills" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="mb-12 col-span-full">
            <h2 className="text-sm uppercase tracking-widest text-gray-400 font-semibold mb-2 font-display">{t('My Capabilities', '我的技术栈')}</h2>
            <h3 className="text-4xl font-bold font-display">{t('Technical Skills', '技术能力')}</h3>
          </div>
          {skills.map((skillGroup, idx) => (
            <div key={idx} className="p-10 rounded-3xl border border-gray-100 bg-gray-50/50">
              <h4 className="text-2xl font-bold mb-8 flex items-center gap-3">
                {idx === 0 ? <Settings className="text-corporate-blue" /> : <Cpu className="text-corporate-blue" />}
                {skillGroup.category}
              </h4>
              <div className="flex flex-col gap-4">
                {skillGroup.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex flex-wrap gap-3">
                    {Array.isArray(item) ? item.map(subItem => (
                      <span key={subItem} className="bg-white px-4 py-2 rounded-full text-sm font-medium shadow-sm border border-gray-100">
                        {subItem}
                      </span>
                    )) : (
                      <span key={item as string} className="bg-white px-4 py-2 rounded-full text-sm font-medium shadow-sm border border-gray-100">
                        {item as string}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = ({ onOpenContactModal }: { onOpenContactModal: () => void }) => {
  const { t } = useLanguage();
  return (
    <section id="contact" className="section-padding bg-gray-50">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-sm uppercase tracking-widest text-gray-400 font-semibold mb-6 font-display">{t('Contact', '总览与联系')}</h2>
        <h3 className="text-4xl font-bold mb-8 font-display">{t('Ready to optimize your procurement process?', '准备好优化您的采购流程了吗？')}</h3>
        <p className="text-gray-600 mb-12 text-lg">
          {t('I\'m always open to discussing digital transformation, AI automation, or global procurement strategies.', '我随时欢迎探讨数字转型、AI自动化或全球采购战略方向。')}
        </p>
        <button
          onClick={onOpenContactModal}
          className="inline-block bg-black text-white px-12 py-4 rounded-full font-bold hover:bg-corporate-blue transition-all shadow-xl"
        >
          {t('GET IN TOUCH', '联系我')}
        </button>
      </div>
    </section>
  );
};

const Footer = () => {
  const [showGithubPopup, setShowGithubPopup] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <footer className="py-12 px-6 md:px-12 lg:px-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <p className="text-2xl font-bold mb-2 tracking-tighter font-display">Yuli ZHANG</p>
            <p className="text-gray-400 text-sm">{t('Global Procurement Digitalization Specialist', '全球采购数字化专家')}</p>
          </div>

          <div className="flex gap-8">
            <a href="https://www.linkedin.com/in/yulizhang-hec/?locale=en" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest hover:text-corporate-blue transition-colors">LinkedIn</a>
            <button
              onClick={() => setShowGithubPopup(true)}
              className="text-xs font-bold uppercase tracking-widest hover:text-corporate-blue transition-colors cursor-pointer"
            >
              GitHub
            </button>
          </div>

          <p className="text-gray-400 text-[10px] uppercase tracking-widest">
            © {new Date().getFullYear()} Yuli ZHANG. {t('ALL RIGHTS RESERVED.', '版权所有.')}
          </p>
        </div>
      </footer>

      <AnimatePresence>
        {showGithubPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGithubPopup(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Github size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('GitHub in Progress', 'GitHub 正在建设中')}</h3>
              <p className="text-gray-500 mb-8">{t('You will be notified once the link is live.', '链接上线后会通知您。')}</p>
              <button
                onClick={() => setShowGithubPopup(false)}
                className="w-full bg-[#003399] text-white py-3 rounded-full font-bold hover:bg-blue-900 transition-colors"
              >
                {t('Got it', '我知道了')}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- Demo Pages ---

const DemoLayout = ({ title, subtitle, children }: { title: string, subtitle: string, children: React.ReactNode }) => {
  const { t } = useLanguage();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-20 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-corporate-blue transition-colors mb-12 uppercase tracking-widest">
          <ChevronLeft size={16} /> {t('Back to Portfolio', '返回全景视图')}
        </Link>

        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-display leading-tight">{title}</h1>
          <p className="text-xl text-gray-500 font-light max-w-2xl">{subtitle}</p>
        </div>

        {children}
      </div>
    </motion.div>
  );
};

const ContractOptimizationDemo = () => {
  const { t } = useLanguage();
  return (
    <DemoLayout
      title={t("Global Indirect Contract Optimization", "全球间接采购合同优化")}
      subtitle={t("A comprehensive digital framework for managing complex indirect spend contracts across international business units.", "跨国际业务部门管理间接采购合同的综合数字化框架。")}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
          <div className="w-12 h-12 bg-corporate-blue/10 rounded-2xl flex items-center justify-center mb-6">
            <CheckCircle2 className="text-corporate-blue" size={24} />
          </div>
          <h4 className="text-xl font-bold mb-2">{t("40% Compliance", "合规率提升 40%")}</h4>
          <p className="text-sm text-gray-500">{t("Increase in contract adherence across global entities.", "全球各实体合同执行力大幅提高。")}</p>
        </div>
        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
          <div className="w-12 h-12 bg-corporate-blue/10 rounded-2xl flex items-center justify-center mb-6">
            <Zap className="text-corporate-blue" size={24} />
          </div>
          <h4 className="text-xl font-bold mb-2">{t("25% Faster", "处理速度提升 25%")}</h4>
          <p className="text-sm text-gray-500">{t("Reduction in contract lifecycle turnaround time.", "合同生命周期流转时间明显缩短。")}</p>
        </div>
        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
          <div className="w-12 h-12 bg-corporate-blue/10 rounded-2xl flex items-center justify-center mb-6">
            <Globe className="text-corporate-blue" size={24} />
          </div>
          <h4 className="text-xl font-bold mb-2">{t("Unified View", "业务统一视图")}</h4>
          <p className="text-sm text-gray-500">{t("Centralized repository for all indirect spend agreements.", "所有的间接支出协议的中央统一数据库。")}</p>
        </div>
      </div>

      <div className="space-y-20">
        <section>
          <h3 className="text-3xl font-bold mb-8 font-display">{t("The Challenge", "面临挑战")}</h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            {t("Managing indirect spend across multiple global entities often leads to fragmented data, inconsistent compliance, and missed savings opportunities. The lack of a centralized digital repository made it nearly impossible to track contractual performance metrics effectively.", "在多个全球实体业务间管理间接支出常常导致数据碎片化、合规不一致，并错失节约成本的机会。缺乏集中式数字化数据库使得有效跟踪评估合同的绩效指标几乎成为不可能。")}
          </p>
        </section>

        <section>
          <h3 className="text-3xl font-bold mb-8 font-display">{t("Digital Solution", "数字化解决方案")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="mt-1"><CheckCircle2 className="text-corporate-blue" size={20} /></div>
                  <div>
                    <h5 className="font-bold mb-1">{t("Intelligent Sourcing Decision Tree", "智能化寻源决策树")}</h5>
                    <p className="text-sm text-gray-500">{t("Architecting demand-driven Power Apps to automate workflow selection and ensure rigorous software compliance.", "构建以需求驱动底层的 Power Apps 应用系统，全自动化工作流路径并保证了软件流程的严谨与合规。")}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1"><CheckCircle2 className="text-corporate-blue" size={20} /></div>
                  <div>
                    <h5 className="font-bold mb-1">{t("End-to-End Lifecycle Management", "端到端的生命周期管理")}</h5>
                    <p className="text-sm text-gray-500">{t("Establishing standardized templates and workflows to monitor indirect procurement activities across internal platforms and SAP Ariba.", "建立起了标准化合同模板与业务流引擎，全面监控跨系统内部流转和 SAP Ariba 的间接采购环节动态。")}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1"><CheckCircle2 className="text-corporate-blue" size={20} /></div>
                  <div>
                    <h5 className="font-bold mb-1">{t("Centralized Data Repository", "集中式核心数据中台")}</h5>
                    <p className="text-sm text-gray-500">{t("Consolidating disparate data into actionable strategic insights to reinforce process governance and data integrity.", "将零散低效数据结构化汇总为具有可执行指导价值的战略洞察，显著加固企业的流程监管和数据规范。")}</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-black p-10 rounded-3xl text-white">
              <h5 className="text-xl font-bold mb-6">{t("Key Technologies", "关键技术栈")}</h5>
              <div className="flex flex-wrap gap-3">
                {['SAP Ariba', 'SharePoint', 'Power Apps', 'Power Query', 'Power BI'].map(tech => (
                  <span key={tech} className="bg-white/10 px-4 py-2 rounded-full text-xs font-medium border border-white/10">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </DemoLayout>
  );
};

const ProcessAutomationDemo = () => {
  const { t } = useLanguage();

  return (
    <DemoLayout
      title={t("Non-code Automation Solution", "无代码自动化解决方案")}
      subtitle={t("Transforming manual procurement pipelines into streamlined, automated workflows using low-code/no-code platforms.", "应用低代码/无代码平台，将主要依赖人力的手工采购业务漏斗转变为高度自动化的数字化工作流。")}
    >
      <div className="relative p-12 rounded-[2.5rem] text-white mb-20 overflow-hidden shadow-2xl">
        {/* Background Image with grayscale and dynamic overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/engine_background.png" 
            alt="Engine Background" 
            className="w-full h-full object-cover grayscale opacity-100 contrast-[1.1]"
            referrerPolicy="no-referrer"
          />
          {/* Multi-layered overlay: Strong on the left for text readability, clear on the right for engine prominence */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/100 via-slate-900/50 to-transparent" />
          <div className="absolute inset-0 bg-corporate-blue/10 mix-blend-color" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-6 font-display">{t("Workflow Architectural Impact", "工作流架构影响力")}</h3>
            <p className="text-blue-50 leading-relaxed mb-10 text-lg opacity-90">
              {t(
                "Architected an end-to-end pipeline—integrating front-end input, database storage, and Power BI—to automate procurement and enable closed-loop tracking. By deploying cross-functional workflows, I simplified complex procedures and bridged knowledge gaps for all users.",
                "构建了端到端数据流水线，集成前端输入与 Power BI 可视化，实现采购流程自动化与闭环追踪。通过跨职能工作流简化复杂程序，消除用户知识鸿沟。"
              )}
            </p>
            <div className="flex gap-6">
              <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
                <p className="text-3xl font-bold">15h+</p>
                <p className="text-[10px] uppercase tracking-widest opacity-70 font-bold">{t("Saved Weekly", "每周节省时间")}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
                <p className="text-3xl font-bold">100%</p>
                <p className="text-[10px] uppercase tracking-widest opacity-70 font-bold">{t("Data Accuracy", "数据准确度")}</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20 shadow-2xl relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-white text-corporate-blue rounded-xl flex items-center justify-center shadow-lg">
                  <Workflow size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl">{t("Digital Pipeline Engine", "数字化管道引擎")}</h4>
                  <p className="text-xs text-blue-200 uppercase tracking-widest font-medium">{t("Live Automation Status", "实时自动化状态")}</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="flex justify-between mb-2 text-xs font-bold uppercase tracking-widest">
                    <span className="text-blue-200">{t("Manual Input", "手动录入")}</span>
                    <span>15%</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '15%' }}
                      className="h-full bg-blue-300"
                    />
                  </div>
                </div>
                
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="flex justify-between mb-2 text-xs font-bold uppercase tracking-widest">
                    <span className="text-blue-200">{t("Automated Pipeline", "自动管道处理")}</span>
                    <span className="text-green-300">85%</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="h-full bg-green-400"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-blue-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    {t("System Active", "系统运行中")}
                  </div>
                  <div>{t("Efficiency Peak", "效率峰值")}</div>
                </div>
              </div>
            </div>
            
            {/* Decorative background elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>

      <div className="space-y-20">
        <section>
          <h3 className="text-3xl font-bold mb-8 font-display">{t("The Architecture", "架构设计")}</h3>
          <p className="text-gray-600 leading-relaxed text-lg mb-12">
            {t("The solution leverages an internal pipeline tool developed via Power Apps to capture real-time data, which is then structured and stored within a Microsoft-based database. This repository, integrated with auxiliary spend and savings datasets, serves as the authoritative data source for a comprehensive Power BI executive dashboard.", "该解决方案利用通过Power Apps开发的内部数据管道工具捕获实时数据，然后将其进行结构化并存储在数据库中。该数据库再辅助的支出和各种数据集集成，作为一个完整统一的、具有权威背书的数据源。")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            {[{ en: 'Data Intake', cn: '数据摄取' }, { en: 'Transforming', cn: '数据清洗' }, { en: 'Processing', cn: '加工处理' }, { en: 'Reporting', cn: '可视化呈现' }].map((step, i) => (
              <div key={step.en} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                <div className="w-8 h-8 bg-corporate-blue text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-sm">
                  {i + 1}
                </div>
                <p className="font-bold text-sm">{t(step.en, step.cn)}</p>
              </div>
            ))}
          </div>


        </section>

        <section className="bg-slate-50 p-12 rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
          <h3 className="text-3xl font-bold mb-8 font-display text-center text-corporate-blue">{t("Interactive Demo Preview", "核心阶段演示预览")}</h3>
          
          <div className="relative w-full aspect-video rounded-[2.5rem] border border-slate-200 overflow-hidden bg-white shadow-2xl">
            {/* Auto-scrolling container */}
            <motion.div 
              className="flex h-full w-fit"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ 
                duration: 35, 
                ease: "linear", 
                repeat: Infinity 
              }}
            >
              {[
                { 
                  src: "/automation/frontend_input.png", 
                  title: t("User-Friendly Interface", "前端输入：用户友好界面"),
                  subtitle: t("Designing intuitive management interfaces for seamless data transmission to back-end databases.", "设计 user friendly 管理界面，用于将数据传送到后端数据库。")
                },
                { 
                  src: "/automation/database_storage.png", 
                  title: t("Isolated Data Clusters", "数据库存储：分立集约管理"),
                  subtitle: t("Setting up three separate databases (Project, Contract, Savings) to avoid data contamination.", "分立设置三个数据库，Project, Contract, Savings 用于独立管理，避免可能的数据污染。")
                },
                { 
                  src: "/automation/project_dashboard_final_v3.png", 
                  title: t("Integrated Dashboards", "可视化报表：集成分析看板"),
                  subtitle: t("Linking database data to integrated cross-platform dashboards, breaking information silos.", "链接数据库的数据集成跨平台的 dashboard，打破信息孤岛。")
                },
                { 
                  src: "/automation/savings_dashboard_final.png", 
                  title: t("Strategic Performance Tracking", "可视化报表：战略执行追踪"),
                  subtitle: t("Strategic cross-platform analytics for goal vs. actual performance tracking.", "战略级跨平台分析，实现“预算 vs 实际”目标的动态追踪。")
                }
              ].concat([
                { 
                  src: "/automation/frontend_input.png", 
                  title: t("User-Friendly Interface", "前端输入：用户友好界面"),
                  subtitle: t("Designing intuitive management interfaces for seamless data transmission to back-end databases.", "设计 user friendly 管理界面，用于将数据传送到后端数据库。")
                },
                { 
                  src: "/automation/database_storage.png", 
                  title: t("Isolated Data Clusters", "数据库存储：分立集约管理"),
                  subtitle: t("Setting up three separate databases (Project, Contract, Savings) to avoid data contamination.", "分立设置三个数据库，Project, Contract, Savings 用于独立管理，避免可能的数据污染。")
                },
                { 
                  src: "/automation/project_dashboard_final_v3.png", 
                  title: t("Integrated Dashboards", "可视化报表：集成分析看板"),
                  subtitle: t("Linking database data to integrated cross-platform dashboards, breaking information silos.", "链接数据库的数据集成跨平台的 dashboard，打破信息孤岛。")
                },
                { 
                  src: "/automation/savings_dashboard_final.png", 
                  title: t("Strategic Performance Tracking", "可视化报表：战略执行追踪"),
                  subtitle: t("Strategic cross-platform analytics for goal vs. actual performance tracking.", "战略级跨平台分析，实现“预算 vs 实际”目标的动态追踪。")
                }
              ]).map((item, idx) => (
                <div key={idx} className="relative h-full aspect-video shrink-0 group">
                  <img 
                    src={item.src} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <PrivacyPatch imageSrc={item.src} />
                  
                  {/* Subtle Light Blue Gradient Overlay instead of full gray */}
                  <div className="absolute inset-0 bg-gradient-to-t from-corporate-blue/40 via-transparent to-transparent opacity-60" />

                  {/* Elegant Glass-morphic Info Card - Bottom Aligned */}
                  <div className="absolute bottom-10 left-10 right-10 flex items-end justify-start">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-2xl max-w-2xl text-slate-900 border-l-4 border-l-corporate-blue"
                    >
                      <h4 className="text-xl md:text-2xl font-bold tracking-tight font-display mb-2 text-corporate-blue uppercase">{item.title}</h4>
                      <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">{item.subtitle}</p>
                    </motion.div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Side Highlights (Indicators) */}
            <div className="absolute top-8 left-8 bg-corporate-blue/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 flex items-center gap-2">
              <div className="w-2 h-2 bg-corporate-blue rounded-full animate-pulse" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-corporate-blue">{t("Live Pipeline View", "实时数据管道视图")}</span>
            </div>

            {/* Gradient Mask Edges */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white/20 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white/20 to-transparent z-10 pointer-events-none" />
          </div>
        </section>

        <section className="mt-24 pt-12 border-t border-slate-100">
          <h3 className="text-3xl font-bold mb-12 font-display text-center text-corporate-blue">
            {t("Other Related Projects", "其他相关项目管理")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { 
                en: "Software Requisition Process", 
                cn: "软件申请流程自动化",
                icon: <Laptop size={24} />
              },
              { 
                en: "PO vs Contract Decision Tree", 
                cn: "PO 与合同对比决策树",
                icon: <Layout size={24} />
              },
              { 
                en: "ServiceNow Ticket Portal Deployment", 
                cn: "ServiceNow 工单门户部署",
                icon: <Workflow size={24} />
              },
              { 
                en: "Contract Storage Process", 
                cn: "合同存储归档流程",
                icon: <FileBox size={24} />
              },
              { 
                en: "General Procurement Process", 
                cn: "通用采购闭环管理流程",
                icon: <Activity size={24} />
              }
            ].map((project, idx) => (
              <div 
                key={idx} 
                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group text-center"
              >
                <div className="w-16 h-16 bg-slate-50 text-corporate-blue rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-corporate-blue group-hover:text-white transition-all duration-500 shadow-inner group-hover:rotate-6">
                  {project.icon}
                </div>
                <h4 className="font-bold text-sm text-slate-800 leading-snug">
                  {t(project.en, project.cn)}
                </h4>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DemoLayout>
  );
};

const ProcurementDashboardDemo = () => {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -clientWidth : clientWidth, behavior: 'smooth' });
    }
  };
  return (
    <DemoLayout
      title={t("Indirect Procurement Dashboard", "间接采购执行仪表盘")}
      subtitle={t("A strategic Power BI framework designed to transform fragmented indirect information streams into actionable executive insights.", "一个具有战略意义的 Power BI 框架，旨在将碎片化的间接采购信息流转化为高管可执行的决策洞察。")}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
          <div className="w-12 h-12 bg-corporate-blue/10 rounded-2xl flex items-center justify-center mb-6">
            <BarChart2 className="text-corporate-blue" size={24} />
          </div>
          <h4 className="text-xl font-bold mb-2">{t("Real-time Analytics", "实时数据分析")}</h4>
          <p className="text-sm text-gray-500">{t("Live tracking of indirect spend limits.", "实时监控间接支出额度和流向。")}</p>
        </div>
        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
          <div className="w-12 h-12 bg-corporate-blue/10 rounded-2xl flex items-center justify-center mb-6">
            <Target className="text-corporate-blue" size={24} />
          </div>
          <h4 className="text-xl font-bold mb-2">{t("Predictive Modeling", "预测性建模")}</h4>
          <p className="text-sm text-gray-500">{t("Forecasting risks before they impact margins.", "在风险影响利润率前进行预判和防范。")}</p>
        </div>
        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
          <div className="w-12 h-12 bg-corporate-blue/10 rounded-2xl flex items-center justify-center mb-6">
            <Database className="text-corporate-blue" size={24} />
          </div>
          <h4 className="text-xl font-bold mb-2">{t("Data Integrity", "数据完整性验证")}</h4>
          <p className="text-sm text-gray-500">{t("Automated reconciliation of disparate reports.", "打通多种来源系统对异常报告进行自动化核对。")}</p>
        </div>
      </div>

      {/* Section 1: Core Capabilities */}
      <div className="space-y-24 mb-32">
        {/* A. Spend Pareto Analysis */}
        <section>
          <div className="flex flex-col md:flex-row gap-12 items-center mb-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-corporate-blue/10 text-corporate-blue rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                <PieChart size={14} /> {t("Case 1: Deep Data Mining", "案例1:数据深度挖掘")}
              </div>
              <h3 className="text-3xl font-bold mb-4 font-display">{t("Spend Pareto Analysis", "采购支出帕累托分析 (80/20)")}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {t("Visualizing the critical impact of indirect spend based on the 80/20 rule. By concentrating on high-leverage suppliers, we enable leadership to negotiate better aggregate volume discounts while reducing long-tail supplier risk.", "通过80/20帕累托法则，揭露间接采购中的关键影响因素。通过集中管理高杠杆的头端供应商队伍，我们助力企业管理层能够以更强势的地位谈判以获得更优质的采购单价，并强有力的降低长尾供应商的潜在流失风险。")}
              </p>
            </div>
            <div className="flex-1 w-full bg-gray-50 p-4 rounded-3xl border border-gray-100 relative overflow-hidden group">
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 min-h-[300px] flex items-center justify-center">
                <motion.img
                  src="/pareto-analysis.png"
                  alt="Spend Pareto Analysis Report"
                  className="w-full h-auto shadow-sm"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                  <button
                    onClick={() => window.open('/pareto-analysis.png', '_blank')}
                    className="bg-corporate-blue text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-2xl transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2 hover:bg-blue-700 active:scale-95"
                  >
                    <ExternalLink size={14} /> {t('Click to expand', '点击放大')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* B. Contract Capacity & KPI */}
        <section>
          <div className="flex flex-col md:flex-row-reverse gap-12 items-center mb-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-corporate-blue/10 text-corporate-blue text-xs font-bold uppercase tracking-widest mb-4">
                <Activity size={14} /> {t("Case 2: Pipeline Tracking", "案例2:pipeline追踪")}
              </div>
              <h3 className="text-3xl font-bold mb-4 font-display">{t("Contract Capacity & KPI", "采购合同产能与进度追踪")}</h3>
              <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                <p>
                  <strong className="text-black">{t("The Pain Point:", "面临痛点：")}</strong> {t("Static contract management fails to align Commodity Manager targets with actual progress, leading to process bottlenecks and delayed contract executions.", "静态的合同管理常常无法将采购经理的目标与实际进度相匹配，导致流程瓶颈和合同执行延迟。")}
                </p>
                <p>
                  <strong className="text-black">{t("The Solution:", "解决方案：")}</strong> {t("Dynamic Execution Monitoring: By tracking \"On-time Delivery (OTD)\" and \"Past-due Rate,\" we ensure sustainable workload distribution and full traceability for Commodity Managers, enabling proactive pipeline management.", "动态执行监控：通过追踪“准时交付率（OTD）”和“逾期率”，我们确保了采购经理的工作量可持续分配和全流程可追溯，实现了前瞻性的业务管道管理。")}
                </p>
              </div>
            </div>
            <div className="flex-1 w-full relative group">
              <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory outline-none pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <style dangerouslySetInnerHTML={{
                  __html: `
                .flex.gap-6::-webkit-scrollbar { display: none; }
              `}} />
                {[
                  { src: "/dashboards/contract_nego_dashboard.jpg", title: "Contract Nego File Dashboard ISC PWC" },
                  { src: "/dashboards/ontime_report.jpg", title: "Contract Nego File - On time Report" },
                  { src: "/automation/project_dashboard_final_v3.png", title: "Project Dashboard" }
                ].map((item, idx) => (
                  <div key={idx} className="min-w-full md:min-w-[85%] snap-center shrink-0 flex flex-col gap-3">
                    <div className="w-full bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden relative pt-[70%]">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 cursor-col-resize"
                      />
                      <PrivacyPatch imageSrc={item.src} />
                    </div>
                    <p className="text-gray-400 text-sm italic text-center px-4 font-medium transition-colors hover:text-gray-600">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>

              {/* Visual Indicators for Scroll */}
              <button
                onClick={() => handleScroll('left')}
                className="cursor-pointer absolute top-[40%] -left-4 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-gray-100 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:-translate-x-0 hidden md:flex hover:bg-white active:scale-95"
              >
                <ChevronLeft className="text-gray-400" size={20} />
              </button>
              <button
                onClick={() => handleScroll('right')}
                className="cursor-pointer absolute top-[40%] -right-4 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-gray-100 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 hidden md:flex hover:bg-white active:scale-95"
              >
                <ChevronRight className="text-gray-400" size={20} />
              </button>
              <p className="text-center text-[10px] text-gray-300 mt-2 block md:hidden">
                Swipe left / right to view all dashboards
              </p>
            </div>
          </div>
        </section>

        {/* C. Risk Prediction (Container Derisking) */}
        <section>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-corporate-blue/10 text-corporate-blue rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                <ShieldAlert size={14} /> {t("Case 3: Complex Data Prediction", "案例3:复杂数据预测")}
              </div>
              <h3 className="text-3xl font-bold mb-4 font-display">{t("Risk Prediction: Container Logistics", "风险预测：货运箱储物流")}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {t("Utilizing historical shipment data fused with macro-economic indicators to forecast container pricing and lead times. This allows supply chain directors to secure contracts ahead of inflationary market spikes.", "利用过往货运数据并融合宏观经济指标以预测未来货柜定价和交货时间。该雷达工具完美支持了供应链总监在通胀攀升前优先以远低于市场溢价的成本提前锁定合同以保障业务供应。")}
              </p>
            </div>
            <div className="flex-1 w-full bg-gray-50 p-4 rounded-3xl border border-gray-100 relative overflow-hidden group">
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 min-h-[300px] flex items-center justify-center">
                <motion.img
                  src="/container-forecast.png"
                  alt="Logistics Spend Forecast Report"
                  className="w-full h-auto shadow-sm"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  referrerPolicy="no-referrer"
                />
                <PrivacyPatch imageSrc="/container-forecast.png" />
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Section 2: The Engine Room */}
      <section className="bg-gray-50 -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24 py-24 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-widest text-gray-400 font-semibold mb-2 font-display">{t("Technology Example", "技术方案示例")}</h2>
            <h3 className="text-4xl font-bold font-display">{t("The Engine Room", "数据引擎核心代码展示")}</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* DAX Logic */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-corporate-blue/10 rounded-2xl flex items-center justify-center mb-6">
                <Code2 className="text-corporate-blue" size={24} />
              </div>
              <h4 className="text-xl font-bold mb-4">{t("DAX Core Logic", "核心 DAX 高阶图谱逻辑")}</h4>
              <p className="text-sm text-gray-500 mb-6">{t("Developed data transformation formulas to bridge cross-system metadata discrepancies, facilitating a single source of truth within Power BI through data normalization.", "开发数据清洗转换规则从而调和跨系统元数据差异，最终在 Power BI 内规范统一实现 Single Source of Truth（单一事实来源）。")}</p>
              <div className="bg-gray-900 p-4 rounded-xl font-mono text-[10px] text-blue-300 overflow-x-auto">
                <pre>
                  {`Final ABB =
 
VAR L1 = 'Project CSV'[Reference level 1]
VAR L2 = 'Project CSV'[Reference level 2]
VAR L3 = 'Project CSV'[Reference level 3]
 
VAR TaxonomyCM =
    CALCULATE (
        SELECTEDVALUE ( 'Reference_VF'[ABB] ),
        FILTER (
            'Reference_VF',
            ( ISBLANK ( L1 ) || 'Reference_VF'[CategoryL1] = L1 ) &&
            ( ISBLANK ( L2 ) || 'Reference_VF'[CategoryL2] = L2 ) &&
            ( ISBLANK ( L3 ) || 'Reference_VF'[CategoryL3] = L3 )
        )
    )
 
VAR IsInvalidTaxonomyCM =
    ISBLANK ( TaxonomyCM ) ||
    TaxonomyCM = "NDY" ||
    CONTAINSSTRING ( TaxonomyCM, ";" )
 
VAR RawName =
    IF (
        IsInvalidTaxonomyCM,
        'Project CSV'[ABB.1],
        TaxonomyCM
    )
 
VAR CleanUpper = UPPER(TRIM(RawName))
 
VAR DotPos = SEARCH(".", CleanUpper, 1, 0)
VAR CommaPos = SEARCH(",", CleanUpper, 1, 0)
 
VAR HasDot = DotPos > 0
VAR HasComma = CommaPos > 0
 
VAR FirstName =
    SWITCH(
        TRUE(),
        HasDot, LEFT(CleanUpper, DotPos - 1),
        HasComma, MID(CleanUpper, CommaPos + 2, LEN(CleanUpper)),
        CleanUpper
    )
 
VAR SpacePos = SEARCH(" ", FirstName, 1, 0)
 
VAR FirstNameOnly =
    IF(
        SpacePos > 0,
        LEFT(FirstName, SpacePos - 1),
        FirstName
    )
 
VAR LastNameRaw =
    SWITCH(
        TRUE(),
        HasDot, MID(CleanUpper, DotPos + 1, LEN(CleanUpper)),
        HasComma, LEFT(CleanUpper, CommaPos - 1),
        BLANK()
    )
 
/* -------- ${t("NORMALIZE LAST NAME", "规范化姓氏")} -------- */
 
VAR LastName =
    VAR NoSpaces = SUBSTITUTE(LastNameRaw, " ", "") -- ${t("This removes all spaces for comparison", "移除所有空格以便进行比对")}
    RETURN
        SWITCH(
            TRUE(),
            -- ${t("Updated logic: If the name is detected (with or without spaces), return the version with NO spaces", "更新逻辑：若检测到姓名（无论是否有空格），返回无空格版本")}
            NoSpaces = "People Name", "PEOPLENAME",
 
            -- fallback
            LastNameRaw
        )
 
RETURN
IF(
    NOT ISBLANK(LastName),
    LastName & ", " & FirstNameOnly,
    CleanUpper
)
// ${t("For reference only", "仅供参考")}`}
                </pre>
              </div>
            </div>

            {/* Dataflows */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-corporate-blue/10 rounded-2xl flex items-center justify-center mb-6">
                <Database className="text-corporate-blue" size={24} />
              </div>
              <h4 className="text-xl font-bold mb-4">{t("Dataflows & ETL", "数据流与 ETL 工具")}</h4>
              <p className="text-sm text-gray-500 mb-6">{t("Consolidating multi-source data (SAP, Ariba, Excel) through Power Query for automated cleansing.", "运用 Power Query 对多来源渠道数据（SAP, Ariba, Excel）执行自动清理。")}</p>
              <div className="flex flex-wrap gap-2">
                {['SAP Ariba', 'Excel', 'Worksheets', 'SAP ERP'].map(source => (
                  <span key={source} className="px-2 py-1 bg-gray-100 rounded text-[8px] font-bold text-gray-500">{source}</span>
                ))}
                <div className="w-full flex justify-center my-2"><ArrowRight className="text-gray-300" size={12} /></div>
                <div className="w-full py-2 bg-corporate-blue/10 rounded text-center text-[10px] font-bold text-corporate-blue">Power Query ETL</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Summary Table */}
      <section className="mb-32">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-widest text-gray-400 font-semibold mb-2 font-display">{t("Business Impact", "业务影响层面")}</h2>
          <h3 className="text-4xl font-bold font-display">{t("Summary of Outcomes", "成果小结")}</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-gray-400">{t("Module", "对应组件")}</th>
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-gray-400">{t("Pain Point Resolved", "解决痛点")}</th>
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-gray-400">{t("Technical Highlight", "技术亮点")}</th>
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-gray-400">{t("Business Output", "业务输出价值")}</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { mod: t('Spend Analysis', '跨维度开销分析'), pain: t('Data clutter; hidden savings', '报表杂乱错失降本机会'), tech: 'Power Query / ETL Integration', out: t('Identified Top 20% Category Consolidation', '识别出80/20开销的供应商缩减清单') },
                { mod: t('Contract KPI', '采购合同绩效KPI打分'), pain: t('Static pipeline; capacity blindspots', '静态看板的执行管理盲区'), tech: 'Tooltips / Drill-through', out: t('30/60 Day Expiry Alerts; On-time tracking', '合同临近到期风险追踪及按时完成率追踪') },
                { mod: t('Savings Dashboard', '成本节约动态看板'), pain: t('Goal tracking fragmentation', '节约目标的各自为战'), tech: 'Multi-platform Integration', out: t('Real-time Goal vs. Actual Tracking', '实现管理层“预算VS实际开销”全局视图') },
                { mod: t('Container Forecast', '物流仓储箱预测'), pain: t('Logistics cost volatility', '物流及海运价极端波动风险'), tech: 'External Data Integration', out: t('Proactive Budget Risk Mitigation', '防患于未然缓解供应链预算压力') },
              ].map((row, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-6 px-6 font-bold text-corporate-blue">{row.mod}</td>
                  <td className="py-6 px-6 text-gray-600">{row.pain}</td>
                  <td className="py-6 px-6 font-mono text-[10px] text-gray-500">{row.tech}</td>
                  <td className="py-6 px-6 font-medium">{row.out}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DemoLayout>
  );
};

const MainLayout = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <About />
        <CaseStudies />
        <Stack />
        <Contact onOpenContactModal={() => setIsContactModalOpen(true)} />
      </main>
      <Footer />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
};

const DemoPageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/demo/contract-optimization" element={<DemoPageWrapper><ContractOptimizationDemo /></DemoPageWrapper>} />
          <Route path="/demo/process-automation" element={<DemoPageWrapper><ProcessAutomationDemo /></DemoPageWrapper>} />
          <Route path="/demo/procurement-dashboard" element={<DemoPageWrapper><ProcurementDashboardDemo /></DemoPageWrapper>} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
