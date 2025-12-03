// src/config/site.config.ts
/**
 * Centralized configuration for Fares Bermak Portfolio
 * All static content in one place - makes updates easier
 */

// ============================================================================
// PERSONAL INFORMATION
// ============================================================================

export const PERSONAL_INFO = {
  name: 'Fares Bermak',
  title: 'Remote Virtual Assistant & Data Entry Expert',
  email: 'faresbermak97@gmail.com',
  phone: '+213 542 346 579',
  location: {
    city: 'Blida',
    country: 'Algeria',
    timezone: 'Africa/Algiers',
    gmt: 'GMT+1'
  },
  social: {
    linkedin: 'https://www.linkedin.com/in/faresbermak-va/',
    instagram: 'https://www.instagram.com/bermak_fares/'
  },
  cv: '/Fares CV.pdf'
} as const;

// ============================================================================
// SEO & METADATA
// ============================================================================

export const SEO = {
  title: 'Fares Bermak - Remote Virtual Assistant & Data Entry Expert',
  description: 'Professional remote virtual assistant, data entry specialist, and IT support. I help businesses automate workflows, organize data, and streamline operations. 99%+ accuracy, 5-15 hours saved weekly.',
  siteUrl: 'https://faresbermak.vercel.app',
  ogImage: '/Pictures/about me pic.webp'
} as const;

// ============================================================================
// NAVIGATION
// ============================================================================

export const NAV_ITEMS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
] as const;

// ============================================================================
// SERVICES DATA
// ============================================================================

export const SERVICES = [
  {
    id: 1,
    title: 'Virtual Assistant & Admin Support',
    description: 'Complete day-to-day operational support: calendar management, inbox organization, client communications, meeting prep, and document control. I keep your operations smooth so you can focus on strategy, not admin overhead.',
    image: '/Pictures/Remote Virtual Assistance.webp',
    bgColor: 'bg-[#E4D1FF]',
    details: [
      'Email & Calendar Management - Organize inbox, schedule meetings across time zones, send reminders, ensure no conflicts',
      'Client Communication & Follow-ups - Manage routine emails, payment reminders, onboarding, maintain conversation logs',
      'Document Organization - Structure Google Drive/Dropbox, create naming conventions, organize files by project',
      'Meeting Preparation & Support - Prepare agendas, compile documents, take notes, distribute action items',
      'Task & Project Management - Manage Asana/Trello boards, update statuses, send progress reminders',
      'Travel & Event Coordination - Book flights/hotels, manage itineraries, coordinate logistics'
    ]
  },
  {
    id: 2,
    title: 'Data Entry & Management',
    description: 'Fast, accurate data capture with structured spreadsheets designed for analysis. I process 200-400+ records monthly with 99%+ accuracy. Invoice data, CRM updates, financial records—I deliver clean datasets using Excel and Google Sheets.',
    image: '/Pictures/Data Entry.webp',
    bgColor: 'bg-[#CCEDFB]',
    details: [
      'High-Volume Data Entry - 200-400+ records monthly, invoice data, customer records, inventory lists, expense logs with validation checks',
      'CRM & Database Management - Input/update records in HubSpot, Salesforce, Pipedrive; clean duplicates, maintain consistency',
      'Spreadsheet Development - Custom Excel/Google Sheets templates with formulas, pivot tables, validation rules, automated calculations',
      'Financial Data Entry - Enter invoice data, expense records, transaction details into QuickBooks or spreadsheets for accountant review',
      'Report Generation - Compile data into clear reports with summaries, charts, insights (operational, sales, expense reports)',
      'Data Quality & Cleanup - Audit databases, identify errors, remove duplicates, standardize formatting, implement validation rules'
    ]
  },
  {
    id: 3,
    title: 'IT Support Help Desk L1',
    description: 'I help remote teams integrate software tools, manage cloud systems, and resolve technical issues quickly. From automation setup to day-to-day IT support, I make your systems efficient and dependable.',
    image: '/Pictures/IT Support Help Desk L1.webp',
    bgColor: 'bg-[#E8FFEF]',
    details: [
      'Software Onboarding - Set up accounts, configure permissions, walk new team members through tools and access',
      'Basic Troubleshooting - Password resets, access issues, connectivity problems, software conflicts—resolved quickly to keep your team productive',
      'Cloud System Management - Help manage Google Workspace, Microsoft 365, configure sharing settings, organize cloud storage',
      'Tool Integration Support - Assist with connecting apps (Zapier setups, Google Workspace integrations) and document workflows',
      'Technical Documentation - Create simple guides and SOPs for common technical tasks and tool usage',
      'Tools Supported: Google Workspace, Microsoft Office 365, Slack, Zoom, Asana, Trello, QuickBooks Online, basic CRM platforms'
    ]
  }
] as const;

// ============================================================================
// FEATURES DATA
// ============================================================================

export const FEATURES = [
  {
    id: 1,
    highlight: 'Workflow Automation',
    text: 'I design smart automations that eliminate repetitive manual tasks and connect your essential tools—from Google Workspace to Zapier integrations. By streamlining processes like data transfers, email triggers, and task creation, I save your team 5-15 hours weekly and allow you to focus on growth instead of routine.',
    image: '/Pictures/Workflow%20Automation.webp',
    reverse: false,
    details: [
      'Auto-import email purchase orders → Google Sheets with categorization',
      'New CRM contact → Welcome email + calendar invite + task in Asana',
      'Invoice sent → Automatic 7-day follow-up reminder if unpaid',
      'Form submission → Data added to spreadsheet + Slack notification',
      'Calendar event → Meeting prep doc auto-created in Google Drive',
      'Result: 5-15 hours saved weekly per client'
    ]
  },
  {
    id: 2,
    highlight: 'Organization',
    text: 'I bring structure to your digital workspace by creating clear systems for managing data, schedules, and workflows. From organized spreadsheets and shared drives to project dashboards and reporting templates, I ensure everything is accessible, consistent, and easy to maintain.',
    image: '/Pictures/Organization.webp',
    reverse: true,
    details: [
      'Google Drive/Dropbox folder structures with naming conventions',
      'Excel/Sheets workbooks with validation, formulas, pivot tables',
      'Project dashboards in Asana/Trello with status tracking',
      'Standard operating procedures (SOPs) documentation',
      'Email templates for common scenarios',
      'Client/vendor contact databases - Find any file in under 30 seconds'
    ]
  },
  {
    id: 3,
    highlight: 'Communication',
    text: 'Smooth communication is the backbone of any remote team. I manage inboxes, coordinate updates, and ensure information flows clearly between departments and clients. Whether through Slack, email, or project platforms like Asana, I help teams stay aligned and focused on results.',
    image: '/Pictures/Communication.webp',
    reverse: false,
    details: [
      'Inbox filtering and priority flagging (Inbox Zero daily)',
      'Client email responses with your tone/voice',
      'Meeting scheduling across multiple time zones',
      'Follow-up tracking to ensure no missed replies',
      'Internal team updates via Slack/email',
      'Cross-department coordination - Response Time: Within 4 hours'
    ]
  }
] as const;

// ============================================================================
// ABOUT SECTION
// ============================================================================

export const ABOUT = {
  heading: 'Who I Am',
  paragraphs: [
    "I'm Fares Bermak, a disciplined Remote Administrative Professional who converts chaotic manual processes into dependable digital systems.",
    'I specialize in high-accuracy data management, workflow automation with Zapier and Advanced Excel, and maintaining strict integrity across financial and operational records.',
    "Trilingual (Arabic, English, French) with proven experience in asynchronous remote collaboration, I've helped businesses eliminate hours of repetitive work each week while reducing errors and improving team coordination."
  ],
  quote: 'My approach is simple: Build systems that work reliably, automate what shouldn\'t require human attention, and keep everything organized so your business scales without friction.',
  image: '/Pictures/about me pic.webp',
  imageAlt: 'Fares Bermak - Professional Profile'
} as const;

// ============================================================================
// PRELOADER GREETINGS
// ============================================================================

export const PRELOADER_GREETINGS = [
  'Hello',
  'Bonjour',
  'Ciao',
  'Hola',
  'مرحبا',
  'Привет',
  'こんにちは',
  'Guten Tag',
  'Olá',
  'Namaste'
] as const;

// ============================================================================
// FORM VALIDATION
// ============================================================================

export const VALIDATION = {
  name: { min: 2, max: 100 },
  message: { min: 10, max: 1000 }
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type Service = typeof SERVICES[number];
export type Feature = typeof FEATURES[number];