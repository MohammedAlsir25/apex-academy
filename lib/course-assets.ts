import type { StaticImageData } from 'next/image';

import heroStudentOne from '@/src/assets/images/hero_showcase_student_one_1795406033572.jpg';
import heroStudentTwo from '@/src/assets/images/hero_showcase_student_two_1795406034203.jpg';
import courseSoftwareAi from '@/src/assets/images/course_software_ai_1795406032633.jpg';
import courseDataCloud from '@/src/assets/images/course_data_cloud_1795406033007.jpg';
import courseUxProduct from '@/src/assets/images/course_ux_product_1795406033160.jpg';

import thumbPython from '@/public/assets/aistudio/image_95e49471.png';
import thumbPromptEng from '@/public/assets/aistudio/image_59301dc7.png';
import thumbMlEngineer from '@/public/assets/aistudio/image_fcd704e5.png';
import thumbSqlDb from '@/public/assets/aistudio/image_9ae2c1db.png';
import thumbDataAnalyst from '@/src/assets/images/thumb_data_analyst_1795443041470.jpg';
import thumbItSupport from '@/src/assets/images/thumb_it_support_1795443041054.jpg';
import thumbUiUx from '@/src/assets/images/thumb_ui_ux_1795443042200.jpg';
import thumbDigitalMktg from '@/src/assets/images/thumb_digital_mktg_1795443041877.jpg';
import thumbSocialMedia from '@/src/assets/images/thumb_social_media_1795443041757.jpg';

export const HERO_ASSETS = {
  studentLeft: heroStudentOne,
  studentRight: heroStudentTwo,
};

export const COURSE_THUMBNAILS: Record<string, StaticImageData> = {
  'software-ai': courseSoftwareAi,
  'data-cloud': courseDataCloud,
  'ux-product': courseUxProduct,
};

export const COURSE_THUMBNAILS_BY_ID: Record<string, StaticImageData> = {
  'python-programming-mastery': thumbPython,
  'prompt-engineering-systems': thumbPromptEng,
  'machine-learning-engineering': thumbMlEngineer,
  'sql-relational-mastery': thumbSqlDb,
  'data-analyst-bi-track': thumbDataAnalyst,
  'computer-support-specialist': thumbItSupport,
  'ui-ux-product-designer': thumbUiUx,
  'digital-marketing-specialist': thumbDigitalMktg,
  'social-media-specialist': thumbSocialMedia,
};

export function getCourseThumbnail(course: {
  id: string;
  thumbnailKey: string;
}): StaticImageData {
  return (
    COURSE_THUMBNAILS_BY_ID[course.id] ??
    COURSE_THUMBNAILS[course.thumbnailKey] ??
    courseSoftwareAi
  );
}
