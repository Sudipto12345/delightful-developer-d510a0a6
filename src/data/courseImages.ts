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
};

export const getCourseImage = (slug: string) => courseImages[slug] ?? webImg;
