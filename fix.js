import fs from 'fs';

const filepath = '/Users/yulizhang/Downloads/remix_-yuli-zhang-portfolio (2)/src/App.tsx';
let content = fs.readFileSync(filepath, 'utf-8');

// The tear occurs starting at line 731:
//             >
//               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <Github size={32} className="text-gray-400" />
// const ProcurementDashboardDemo = () => {

// Let's find this exact string in the file.
const tearStart = `              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Github size={32} className="text-gray-400" />`;

const tearIndex = content.indexOf(tearStart);
if (tearIndex !== -1) {
  // We keep the file up to the end of the Github icon
  const beforeTear = content.substring(0, tearIndex + tearStart.length);
  
  // We need to find where the rest of the file resumes correctly. 
  // It resumes at the Engine Room properly.
  const EngineRoomStart = `    {/* Section 2: The Engine Room */}`;
  const engineIndex = content.indexOf(EngineRoomStart);
  let afterEngine = content.substring(engineIndex);

  const blockToInsert = `
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
        <p className="text-gray-600 leading-relaxed text-lg mb-6">
          {t("Managing indirect spend across multiple global entities often leads to fragmented data, inconsistent compliance, and missed savings opportunities. The lack of a centralized digital repository made it nearly impossible to track contractual performance metrics effectively.", "在多个全球实体业务间管理间接支出常常导致数据碎片化、合规不一致，并错失节约成本的机会。缺乏集中式数字化数据库使得有效跟踪评估合同的绩效指标几乎成为不可能。")}
        </p>
        <div className="aspect-video bg-gray-100 rounded-3xl overflow-hidden border border-gray-200 flex items-center justify-center">
          <p className="text-gray-400 font-medium italic">{t("[Interactive Contract Map Visualization]", "[交互式合同地图数据可视化]")}</p>
        </div>
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
  const [simulationStep, setSimulationStep] = useState(0);
  const { t } = useLanguage();

  const simulate = () => {
    if (simulationStep > 0) return;
    setSimulationStep(1); // Starting
    setTimeout(() => setSimulationStep(2), 1500); // Processing Data
    setTimeout(() => setSimulationStep(3), 3000); // Integrating
    setTimeout(() => setSimulationStep(4), 4500); // Complete
    setTimeout(() => setSimulationStep(0), 8500); // Reset
  };

  return (
  <DemoLayout 
    title={t("Non-code Automation Solution", "无代码自动化解决方案")} 
    subtitle={t("Transforming manual procurement pipelines into streamlined, automated workflows using low-code/no-code platforms.", "应用低代码/无代码平台，将主要依赖人力的手工采购业务漏斗转变为高度自动化的数字化工作流。")}
  >
    <div className="bg-corporate-blue p-12 rounded-3xl text-white mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-3xl font-bold mb-6 font-display">{t("Workflow Efficiency", "工作流效率提升")}</h3>
          <p className="text-blue-100 leading-relaxed mb-8">
            {t("By deploying automated no-code workflows, we eliminated over 15 hours of manual data entry per week for the procurement team.", "通过部署自动化无代码工作流，我们每周为采购团队消除了超过15小时的手动数据录入时间。")}
          </p>
          <div className="flex gap-4">
            <div className="bg-white/20 p-4 rounded-2xl">
              <p className="text-2xl font-bold">15h+</p>
              <p className="text-[10px] uppercase tracking-widest opacity-70">{t("Saved Weekly", "每周节省")}</p>
            </div>
            <div className="bg-white/20 p-4 rounded-2xl">
              <p className="text-2xl font-bold">100%</p>
              <p className="text-[10px] uppercase tracking-widest opacity-70">{t("Data Accuracy", "数据准确度")}</p>
            </div>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
          <Workflow size={48} className="mb-6" />
          <h4 className="text-xl font-bold mb-4">{t("Automation Engine", "自动化计算引擎")}</h4>
          <div className="space-y-3">
            <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 1.5 }}
                className="h-full bg-white"
              />
            </div>
            <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
              <span>{t("Manual", "手动处理")}</span>
              <span>{t("Automated", "自动处理")}</span>
            </div>
          </div>
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

        <div className="w-full aspect-[21/9] bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-12 text-center group hover:border-corporate-blue transition-colors">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-corporate-blue/10 transition-colors">
            <Image className="text-gray-400 group-hover:text-corporate-blue transition-colors" size={32} />
          </div>
          <p className="text-gray-500 font-medium">{t("Process Map Placeholder", "流程图占位符")}</p>
          <p className="text-xs text-gray-400 mt-2 italic">{t("我会之后上传一个 process map", "我会之后上传一个 process map")}</p>
        </div>
      </section>

      <section className="bg-gray-900 p-12 rounded-3xl text-white">
        <h3 className="text-3xl font-bold mb-8 font-display text-center">{t("Interactive Demo Preview", "动态演示预览")}</h3>
        <div 
          onClick={simulate}
          className="aspect-video bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center relative group cursor-pointer overflow-hidden"
        >
          {simulationStep === 0 && (
            <div className="text-center">
              <div className="w-20 h-20 bg-corporate-blue rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Zap size={32} />
              </div>
              <p className="text-gray-400 font-medium">{t("Click to simulate automation sequence", "点击预览自动化执行流程")}</p>
            </div>
          )}
          {simulationStep > 0 && (
            <div className="w-full max-w-xl p-8">
              <div className="space-y-6">
                {[
                  { step: 1, label: t("Extracting Data from SharePoint...", "正在从 SharePoint 提取数据...") },
                  { step: 2, label: t("Executing Business Logic (Power Apps)...", "执行业务逻辑和合规性校验...") },
                  { step: 3, label: t("Updating SAP Ariba Records...", "后台更新 SAP Ariba 系统记录...") },
                  { step: 4, label: t("Automation Complete! 15h Saved.", "自动化完成！当周已节省15小时工作量。") }
                ].map((item, idx) => (
                  <motion.div 
                    key={item.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: simulationStep >= item.step ? 1 : 0.3, x: simulationStep >= item.step ? 0 : -20 }}
                    className="flex items-center gap-4"
                  >
                    <div className={\`w-10 h-10 rounded-full flex items-center justify-center shrink-0 \${simulationStep > item.step ? 'bg-green-500' : simulationStep === item.step ? 'bg-corporate-blue animate-pulse' : 'bg-white/10'}\`}>
                      {simulationStep > item.step ? <CheckCircle2 size={20} /> : <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <p className={\`font-medium text-lg md:text-xl \${simulationStep >= item.step ? 'text-white' : 'text-gray-500'}\`}>{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  </DemoLayout>
  );
};

const ProcurementDashboardDemo = () => {
  const { t } = useLanguage();
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
              <PieChart size={14} /> {t("Component 1", "核心组件 1")}
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

      {/* B. Spend Leakage Diagnostics */}
      <section>
        <div className="flex flex-col-reverse md:flex-row gap-12 items-center mb-12">
          <div className="flex-1 w-full">
            <div className="bg-gray-900 p-8 rounded-3xl text-white shadow-2xl">
              <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                <AlertTriangle className="text-yellow-500" /> {t("Leakage Alert", "资金流失预警")}
              </h4>
              <div className="space-y-4">
                {[
                  { id: '1', dept: t("Marketing", "市场发展部"), variance: '+12.4%', status: 'critical' },
                  { id: '2', dept: t("IT Infrastructure", "信息服务基建"), variance: '+8.1%', status: 'warning' },
                  { id: '3', dept: t("Facilities", "工厂设施维护"), variance: '-2.3%', status: 'good' }
                ].map(item => (
                  <div key={item.id} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="font-medium">{item.dept}</span>
                    <span className={\`font-mono font-bold \${item.status === 'critical' ? 'text-red-400' : item.status === 'warning' ? 'text-yellow-400' : 'text-green-400'}\`}>
                      {item.variance}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-corporate-blue/10 text-corporate-blue rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              <TrendingDown size={14} /> {t("Component 2", "核心组件 2")}
            </div>
            <h3 className="text-3xl font-bold mb-4 font-display">{t("Spend Leakage Diagnostics", "过度支出诊断及漏洞排查")}</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {t("Proactively mapping forecasted spend against actualized metrics to identify deviations. This diagnostic tool uncovers hidden inefficiencies in departmental budgets, permitting immediate course correction.", "主动将预测支出与实际已支付的指标建立映射网络，进而识别预算偏差。此诊断工具揭示了跨部门预算中隐藏的低效分配环节，并允许执行实时的业务路径纠偏。")}
            </p>
          </div>
        </div>
      </section>

      {/* C. Risk Prediction (Container Derisking) */}
      <section>
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-corporate-blue/10 text-corporate-blue rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              <ShieldAlert size={14} /> {t("Component 3", "核心组件 3")}
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
            </div>
          </div>
        </div>
      </section>
    </div>
`

  let newContent = beforeTear + blockToInsert + afterEngine;
  fs.writeFileSync(filepath, newContent, 'utf-8');
  console.log("File patched successfully!");
} else {
  console.log("Could not find tear start marker!");
}
