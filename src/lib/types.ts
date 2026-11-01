export type Package = {
  id: string;
  name: string;
  pricePkr: number;
  priceUsd: number;
  eta: string;
  pitch: string;
  includes: string[];
  fiverrTitle: string;
};

export const PACKAGES: Package[] = [
  {
    id: "listings",
    name: "Listing Pack",
    pricePkr: 5000,
    priceUsd: 25,
    eta: "Same day",
    pitch: "10 product titles, bullets, and WhatsApp pitches — ready to paste.",
    includes: [
      "10 Daraz / Instagram product titles",
      "Bullet benefits + objections handled",
      "WhatsApp catalog messages",
      "1 revision",
    ],
    fiverrTitle: "I will write 10 SEO product listings and WhatsApp sales texts",
  },
  {
    id: "replies",
    name: "WhatsApp Reply System",
    pricePkr: 12000,
    priceUsd: 45,
    eta: "24–48 hrs",
    pitch: "Your shop’s FAQs, prices, and order flow — answered even when you’re busy.",
    includes: [
      "Business FAQ brain (Urdu + English)",
      "Quick-reply pack for WhatsApp Business",
      "Order + price + location scripts",
      "Handoff rules when a human must reply",
    ],
    fiverrTitle: "I will create a WhatsApp Business reply system for your shop",
  },
  {
    id: "automation",
    name: "AI Inbox Setup",
    pricePkr: 35000,
    priceUsd: 120,
    eta: "2–4 days",
    pitch: "Automated lead capture + FAQ replies wired for your workflow.",
    includes: [
      "n8n / Make / ManyChat path (your stack)",
      "Lead sheet (Google Sheets)",
      "Tested conversation flows",
      "7-day fix window after delivery",
    ],
    fiverrTitle: "I will setup AI WhatsApp automation for your small business",
  },
];

export const DAILY_TARGET_PKR = 10000;
