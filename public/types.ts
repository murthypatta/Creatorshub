
import type React from 'react';

export enum ToolSuiteId {
  WRITING = 'writing',
  VIDEO = 'video',
  DESIGN = 'design',
  GROWTH = 'growth',
  KIDS = 'kids',
  SOCIAL_MEDIA = 'social_media',
  YOUTUBE_CREATOR = 'youtube_creator',
  MARKETING_SALES = 'marketing_sales',
  BUSINESS_PROFESSIONAL = 'business_professional',
  CREATIVE_WRITING = 'creative_writing',
  ADVANCED_UNIQUE = 'advanced_unique',
}

export interface Suite {
  id: ToolSuiteId;
  name: string;
  icon: React.ReactNode;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  suiteId: ToolSuiteId;
  systemInstruction: string;
  promptLabel: string;
  promptPlaceholder: string;
}

export type PlanName = 'Basic' | 'Creator' | 'Pro';
