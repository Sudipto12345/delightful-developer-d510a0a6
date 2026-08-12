import pAiProduct from "@/assets/catalog/p-ai-product.jpg";
import pAppliedMl from "@/assets/catalog/p-applied-ml.jpg";
import pBrandStudio from "@/assets/catalog/p-brand-studio.jpg";
import pCloudArch from "@/assets/catalog/p-cloud-arch.jpg";
import pCybersec from "@/assets/catalog/p-cybersec.jpg";
import pDataEng from "@/assets/catalog/p-data-eng.jpg";
import pEcommerceScale from "@/assets/catalog/p-ecommerce-scale.jpg";
import pGrowthLead from "@/assets/catalog/p-growth-lead.jpg";
import pProductMgmt from "@/assets/catalog/p-product-mgmt.jpg";
import pSaasFounder from "@/assets/catalog/p-saas-founder.jpg";
import aiImg from "@/assets/course-ai.jpg";
import dataImg from "@/assets/course-data.jpg";
import designImg from "@/assets/course-design.jpg";
import englishImg from "@/assets/course-english.jpg";
import freelancingImg from "@/assets/course-freelancing.jpg";
import marketingImg from "@/assets/course-marketing.jpg";
import uiuxImg from "@/assets/course-uiux.jpg";
import webImg from "@/assets/course-web.jpg";

export const courseImages: Record<string, string> = {
  "full-stack-web-development": webImg,
  "graphic-design-mastery": designImg,
  "digital-marketing-pro": marketingImg,
  "freelancing-roadmap": freelancingImg,
  "python-data-analysis": dataImg,
  "spoken-english-confidence": englishImg,
  "ui-ux-design-sprint": uiuxImg,
  "ai-tools-for-work": aiImg,
};

export const categoryImages: Record<string, string> = {
  "web-development": webImg,
  "graphic-design": designImg,
  "digital-marketing": marketingImg,
  freelancing: freelancingImg,
  "data-ai": dataImg,
  "spoken-english": englishImg,
  seo: marketingImg,
  wordpress: webImg,
  "ui-ux": uiuxImg,
  ai: aiImg,
  "svc-graphic-design": designImg,
  "svc-web": webImg,
  "svc-seo": marketingImg,
  "svc-marketing": marketingImg,
  "svc-training": englishImg,
  "svc-business": freelancingImg,
};

/**
 * Database URLs always win; bundled art is only a fallback while the catalog
 * query is still in flight.
 */
export const getCourseImage = (slug: string, imageKey?: string, url?: string) =>
  url || courseImages[slug] || (imageKey ? categoryImages[imageKey] : undefined) || webImg;

export const getCategoryImage = (slug: string, url?: string) =>
  url || categoryImages[slug] || webImg;

