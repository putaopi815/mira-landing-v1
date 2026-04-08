"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "zh";

/** 中文 UI：常见 500（medium）在系统黑体上偏粗，用 400 与西文视觉更对齐 */
export function fwUi(lang: Lang, weight: number): number {
  return lang === "zh" && weight === 500 ? 400 : weight;
}

type Messages = (typeof dict)[Lang];

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Messages;
}

export const dict = {
  en: {
    nav: {
      problem: "Problem",
      paradigmShift: "Change",
      solution: "Solution",
      systemDepth: "Architecture",
      advantage: "Advantage",
      cta: "Join waitlist",
      login: "Login",
    },
    hero: {
      badge: "AI-NATIVE RECRUITING",
      line1: "Hiring is becoming",
      line2: "autonomous",
      subtitle: [
        "A self-driving AI recruiting team：from sourcing to outreach, analysis, and interview coordination.",
      ],
      ctaPrimary: "Join waitlist",
      ctaSecondary: "Login",
      scroll: "SCROLL",
    },
    problem: {
      title1: "Hiring was never the problem",
      title2: "The way it's done was",
      items: [
        {
          num: "01",
          title: "It's reactive",
          desc: "Action happens only when needed.\nNot always knowing who matters.",
        },
        {
          num: "02",
          title: "It's fragmented",
          desc: "Sourcing, outreach, screening, coordination.\nDisconnected and uncoordinated.",
        },
        {
          num: "03",
          title: "It's human-limited",
          desc: "Even top recruiters\ncan't operate 24/7.",
        },
      ],
    },
    paradigm: {
      line1: "Hiring is not a process.",
      line2:
        "It's a system of smart decisions, meaningful signals, and precise timing.",
      line3: "So we built one.",
    },
    solution: {
      eyebrow: "THE SYSTEM",
      title: ["A self-operating", "AI recruiting team"],
      agents: [
        { letter: "S", name: "Scout", role: "Talent Discovery", desc: "Always-on radar. Finds talent before you search." },
        { letter: "R", name: "Reach", role: "Outreach Specialist", desc: "Starts conversations. Follows up and persuades." },
        { letter: "A", name: "Analyst", role: "Talent Intelligence", desc: "Deep research. Structured evaluation. Automatically ranks candidates." },
        { letter: "C", name: "Coordinator", role: "Interview Ops", desc: "Schedules interviews. Keeps everyone aligned." },
        { letter: "S", name: "Strategist", role: "Market Intelligence", desc: "Tracks the talent market. Alerts you before others." },
      ],
    },
    howItWorks: {
      eyebrow: "HOW IT WORKS",
      title: ["Always running.", "Always learning.", "Always moving."],
      steps: ["Signal", "Discovery", "Outreach", "Analysis", "Interview"],
      subtitle: "Full collaboration, feedback-driven optimization.",
    },
    userRole: {
      line1: "You don't run the process.",
      line2: "You guide the system.",
      items: [
        { meta: "Training", label: "Train agent judgment" },
        { meta: "Governance", label: "Approve key decisions" },
        { meta: "Strategy", label: "Adjust strategy" },
      ],
    },
    systemDepth: {
      eyebrow: "SYSTEM ARCHITECTURE",
      title: ["A multi-layer", "intelligent system"],
      layers: [
        {
          badge: "Radar",
          title: "Signal Layer",
          desc: "Monitors talent and market trends in real-time, capturing critical data points.",
        },
        {
          badge: "Mapper",
          title: "Graph Layer",
          desc: "Builds complete candidate profiles and connections, visualizing hidden relationships.",
        },
        {
          badge: "Curator",
          title: "Decision Layer",
          desc: "Selects top candidates and suggests next actions, optimizing the workflow.",
        },
      ],
    },
    differentiators: {
      eyebrow: "WHY MIRA",
      title: "Built different.",
      items: [
        { title: "Runs 24/7", desc: "Never sleeps, never stops searching for the right talent." },
        { title: "Multi-channel outreach", desc: "Reaches candidates across every platform simultaneously." },
        { title: "Market-aware decisions", desc: "Every action informed by real-time market intelligence." },
        { title: "Learns from feedback", desc: "Gets smarter with every hire, adapting to your standards." },
      ],
    },
    finalCTA: {
      title: ["Build your AI", "recruiting team"],
      subtitle: "Start with Mira today and transform how you hire.",
      primary: "Join waitlist",
      secondary: "Login",
    },
    footer: {
      tagline: ["The self-operating AI recruiting team.", "Autonomous hiring, from signal to interview."],
      product: "Product",
      company: "Company",
      support: "Support",
      productLinks: ["Scout", "Reach", "Analyst", "Coordinator", "Strategist"],
      companyLinks: ["About", "Research", "Careers", "Blog"],
      supportLinks: ["Documentation", "Contact", "Privacy", "Terms"],
      copyright: "© 2026 Mira AI Inc. All rights reserved.",
    },
    /** 右侧全屏滚动锚点提示（与 SNAP_SECTIONS 顺序一致） */
    snapDots: [
      "Home",
      "Problem",
      "Paradigm",
      "Solution",
      "How it works",
      "User role",
      "System",
      "Advantage",
      "CTA",
    ],
  },
  zh: {
    nav: {
      problem: "问题",
      paradigmShift: "范式",
      solution: "解决方案",
      systemDepth: "系统结构",
      advantage: "核心优势",
      cta: "获取内测资格",
      login: "登录",
    },
    hero: {
      badge: "AI 原生招聘",
      line1: "招聘，正在变成自动运行的系统",
      line2: "",
      subtitle: [
        "是一支自驱动的 AI 招聘团队 ：从人才发现、触达、评估到面试协调",
      ],
      ctaPrimary: "获取内测资格",
      ctaSecondary: "查看演示",
      scroll: "向下滚动",
    },
    problem: {
      title1: "招聘的问题，从未在于人才",
      title2: "而在于方式已经过时",
      items: [
        {
          num: "01",
          title: "它是被动的",
          desc: "只有在有需求时才开始行动\n而不是随时掌握关键人才",
        },
        {
          num: "02",
          title: "它是割裂的",
          desc: "搜索、沟通、筛选、协调\n彼此分离、无法协同",
        },
        {
          num: "03",
          title: "它受限于人",
          desc: "再优秀的招聘者\n也无法 24/7 持续运作",
        },
      ],
    },
    paradigm: {
      line1: "招聘不是流程",
      line2: "而是由决策、信号和时机组成的系统",
      line3: "我们建立了这个系统",
    },
    solution: {
      eyebrow: "AI 招聘团队",
      title: ["一支自运行的", "AI 招聘团队"],
      agents: [
        {
          letter: "S",
          name: "Scout",
          role: "人才发现",
          desc: "全天候雷达\n提前发现人才",
        },
        {
          letter: "R",
          name: "Reach",
          role: "沟通触达",
          desc: "自动发起沟通\n多轮跟进与说服",
        },
        {
          letter: "A",
          name: "Analyst",
          role: "人才分析",
          desc: "深度调研\n结构化评估\n自动排序候选人",
        },
        {
          letter: "C",
          name: "Coordinator",
          role: "面试协调",
          desc: "安排面试\n同步双方时间与流程",
        },
        {
          letter: "S",
          name: "Strategist",
          role: "市场洞察",
          desc: "追踪人才市场\n提前发现机会",
        },
      ],
    },
    howItWorks: {
      eyebrow: "协作机制",
      title: ["始终运行", "持续学习", "自动行动"],
      steps: ["信号", "人才发现", "沟通", "分析", "面试"],
      subtitle: "所有环节协作优化，反馈驱动进化",
    },
    userRole: {
      line1: "你不再执行流程",
      line2: "而是指导系统",
      items: [
        { meta: "训练", label: "训练 Agent 判断" },
        { meta: "审批", label: "审批关键节点" },
        { meta: "策略", label: "调整整体策略" },
      ],
    },
    systemDepth: {
      eyebrow: "系统结构",
      title: ["一个多层", "智能系统"],
      layers: [
        {
          badge: "Radar",
          title: "信号层",
          desc: "实时监控人才和市场趋势，捕捉关键数据点。",
        },
        {
          badge: "Mapper",
          title: "图谱层",
          desc: "建立完整的候选人档案和联系，可视化隐藏的关系。",
        },
        {
          badge: "Curator",
          title: "决策层",
          desc: "选择最高的候选项并建议下一步行动，优化工作流程。",
        },
      ],
    },
    differentiators: {
      eyebrow: "",
      title: "核心优势",
      items: [
        { title: "7×24 小时持续运行", desc: "永不停歇，始终在寻找最合适的人才。" },
        { title: "多渠道自动触达", desc: "同时覆盖所有平台与候选人。" },
        { title: "基于市场的决策能力", desc: "每一步行动都由实时市场情报驱动。" },
        { title: "随用户反馈持续学习", desc: "每一次招聘都让系统更聪明。" },
      ],
    },
    finalCTA: {
      title: ["构建你的 AI 招聘团队", ""],
      subtitle: "",
      primary: "获取内测资格",
      secondary: "联系我们",
    },
    footer: {
      tagline: ["自运行的 AI 招聘团队", "从信号到面试，全程自动化。"],
      product: "产品",
      company: "公司",
      support: "支持",
      productLinks: ["Scout", "Reach", "Analyst", "Coordinator", "Strategist"],
      companyLinks: ["关于我们", "研究", "招聘", "博客"],
      supportLinks: ["文档", "联系", "隐私", "条款"],
      copyright: "© 2026 Mira AI Inc. 保留所有权利。",
    },
    snapDots: [
      "首屏",
      "问题",
      "范式",
      "解决方案",
      "协作机制",
      "用户角色",
      "系统结构",
      "核心优势",
      "行动引导",
    ],
  },
} as const;

const LangContext = createContext<LangContextValue | null>(null);

const LANG_STORAGE_KEY = "mira-ui-lang";

function readStoredLang(): Lang | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (v === "en" || v === "zh") return v;
  } catch {
    /* private / disabled storage */
  }
  return null;
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = readStoredLang();
    if (stored) setLangState(stored);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang, t: dict[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
