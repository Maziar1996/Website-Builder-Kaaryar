import {
  headerDefaults,
  heroDefaults,
  featuresDefaults,
  gridDefaults,
  processDefaults,
  testimonialsDefaults,
  ctaDefaults,
  faqDefaults,
  contactDefaults,
  footerDefaults,
  contentDefaults,
} from "./defaults";

import { HeaderSection, HeaderSettings } from "./Header/Header";
import { HeroSection, HeroSettings } from "./Hero/Hero";
import { FeaturesSection, FeaturesSettings } from "./Features/Features";
import { GridSection, GridSettings } from "./Grid/Grid";
import { ProcessSection, ProcessSettings } from "./Process/Process";
import {
  TestimonialsSection,
  TestimonialsSettings,
} from "./Testimonials/Testimonials";
import { CtaSection, CtaSettings } from "./CTA/CTA";
import { FaqSection, FaqSettings } from "./FAQ/FAQ";
import { ContactSection, ContactSettings } from "./Contact/Contact";
import { FooterSection, FooterSettings } from "./Footer/Footer";
import { ContentSection, ContentSettings } from "./Content/Content";
import { createId } from "../Shared/Utils/id";

export const sectionRegistry = {
  header: {
    type: "header",
    label: "Header",
    description: "نوار ناوبری سایت",
    Component: HeaderSection,
    Settings: HeaderSettings,
    defaults: headerDefaults,
  },
  hero: {
    type: "hero",
    label: "Hero",
    description: "سکشن معرفی اصلی صفحه",
    Component: HeroSection,
    Settings: HeroSettings,
    defaults: heroDefaults,
  },
  features: {
    type: "features",
    label: "Features",
    description: "کارت‌های خدمات / ویژگی‌ها",
    Component: FeaturesSection,
    Settings: FeaturesSettings,
    defaults: featuresDefaults,
  },
  grid: {
    type: "grid",
    label: "Grid",
    description: "گرید پروژه‌ها، تیم یا لوگوها",
    Component: GridSection,
    Settings: GridSettings,
    defaults: gridDefaults,
  },
  process: {
    type: "process",
    label: "Process",
    description: "مراحل همکاری",
    Component: ProcessSection,
    Settings: ProcessSettings,
    defaults: processDefaults,
  },
  testimonials: {
    type: "testimonials",
    label: "Testimonials",
    description: "نظرات مشتریان",
    Component: TestimonialsSection,
    Settings: TestimonialsSettings,
    defaults: testimonialsDefaults,
  },
  cta: {
    type: "cta",
    label: "CTA",
    description: "دعوت به اقدام",
    Component: CtaSection,
    Settings: CtaSettings,
    defaults: ctaDefaults,
  },
  faq: {
    type: "faq",
    label: "FAQ",
    description: "سوالات متداول",
    Component: FaqSection,
    Settings: FaqSettings,
    defaults: faqDefaults,
  },
  contact: {
    type: "contact",
    label: "Contact",
    description: "اطلاعات تماس",
    Component: ContactSection,
    Settings: ContactSettings,
    defaults: contactDefaults,
  },
  content: {
    type: "content",
    label: "Content",
    description: "بلاک متنی",
    Component: ContentSection,
    Settings: ContentSettings,
    defaults: contentDefaults,
  },
  footer: {
    type: "footer",
    label: "Footer",
    description: "پاورقی سایت",
    Component: FooterSection,
    Settings: FooterSettings,
    defaults: footerDefaults,
  },
};

export function getSectionDefinition(type) {
  return sectionRegistry[type] || null;
}

export function createSection(type, overrides = {}) {
  const definition = getSectionDefinition(type);
  if (!definition) {
    throw new Error(`Unknown section type: ${type}`);
  }

  return {
    id: createId(type),
    type,
    data: {
      ...structuredClone(definition.defaults),
      ...overrides,
    },
  };
}

export function listSectionTypes() {
  return Object.values(sectionRegistry);
}
