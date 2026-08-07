import heroLoop from "@/assets/hero-loop.mp4.asset.json";
import sectionLoop from "@/assets/section-loop.mp4.asset.json";

import { getCourseImage } from "./courseImages";

/**
 * Every course gets a preview (trial) video. Two cinematic loops are alternated
 * so each course page and the learning player always has playable media.
 */
export const courseVideos: Record<string, string> = {
  "full-stack-web-development": heroLoop.url,
  "graphic-design-mastery": sectionLoop.url,
  "digital-marketing-pro": heroLoop.url,
  "freelancing-roadmap": sectionLoop.url,
  "python-data-analysis": heroLoop.url,
  "spoken-english-confidence": sectionLoop.url,
  "ui-ux-design-sprint": heroLoop.url,
  "ai-tools-for-work": sectionLoop.url,
};

export const getCourseVideo = (slug: string) => courseVideos[slug] ?? heroLoop.url;

export const getCoursePoster = (slug: string) => getCourseImage(slug);
