import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Helper: convert ASCII digits to Bengali digits
function toBn(str) {
  return String(str).replace(/[0-9]/g, d => "০১২৩৪৫৬৭৮৯"[d]);
}


function toBnTime(t) {
  if (!t || t === "—") return t;

  const match = t.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
  if (!match) return t.replace(/[0-9]/g, d => "০১২৩৪৫৬৭৮৯"[d]);

  let hour = parseInt(match[1], 10);
  const min = match[2];
  const period = match[3].toUpperCase();

  let hour24 = hour;
  if (period === "PM" && hour !== 12) hour24 = hour + 12;
  if (period === "AM" && hour === 12) hour24 = 0;

  let periodLabel;
  if (hour24 >= 5 && hour24 < 12)       periodLabel = "সকাল";
  else if (hour24 >= 12 && hour24 < 17) periodLabel = "দুপুর";
  else if (hour24 >= 17 && hour24 < 20) periodLabel = "বিকাল";
  else                                   periodLabel = "রাত";

  const bnHour = String(hour).replace(/[0-9]/g, d => "০১২৩৪৫৬৭৮৯"[d]);
  const bnMin  = min.replace(/[0-9]/g, d => "০১২৩৪৫৬৭৮৯"[d]);

  return `${periodLabel} ${bnHour}:${bnMin}`;
}

const T = {
  en: {
    brandMU: "· MU",
    navHome: "Home",
    navRoutes: "Routes & Schedule",
    navAbout: "About",
    signIn: "Sign In",
    signUp: "Sign Up →",
    eyebrow: "Campus Transport · Metropolitan University",
    heroH1a: "Make Your Campus",
    heroH1b: "Journey Smarter",
    heroH1c: "& Easier",
    heroP: "Real-time bus tracking system built for Metropolitan University students. Know your bus location, seat capacity, and updated schedule — all in one click.",
    btnAbout: "Get Started",
    btnRoutes: "View Schedule →",
    statBuses: "BUSES ACTIVE",
    statRoutes: "ROUTES",
    statTime: "TO CAMPUS",
    statRiders: "DAILY RIDERS",
    statOnTime: "ON-TIME RATE",
    statBusesVal: "8+",
    statRoutesVal: "5",
    statTimeVal: "~35 min",
    statRidersVal: "1,200+",
    statOnTimeVal: "98%",
    featHeadPill: "What We Offer",
    featH2a: "Built for MU students,",
    featH2b: "every single day.",
    features: [
      { icon: "📡", title: "Live Bus Tracking", desc: "See your bus location on a map — real-time updates directly from the driver's device." },
      { icon: "💺", title: "Crowd Status", desc: "Know seat availability before you walk to the stop." },
      { icon: "🔔", title: "Smart Announcements", desc: "No more WhatsApp chaos — get instant transport notices directly in the app." },
      { icon: "🧾", title: "Complaints & Feedback", desc: "Report issues and track resolution — all in one place." },
    ],
    routesPill: "Live Updates",
    routesH2a: "Routes &",
    routesH2b: "Schedules",
    routesP: "Real MU bus timetable — all routes serving Metropolitan University, Sylhet.",
    tabMain: "Main Routes",
    tabShuttle: "Shuttle Service",
    tabRikabi: "Rikabibazar Temp",
    thRoute: "Route",
    thArrival: "Arrival",
    thDeparture: "Departure",
    thBus: "Bus No.",
    thDriver: "Driver",
    thFor: "For",
    shuttleNote: "Campus–Tilagor–Campus shuttle runs throughout the day.",
    thDepCampus: "Departure from Campus",
    thArrCampus: "Arrival at Campus",
    rikabNote: "Campus – Rikabibazar – Campus (Temporary schedule)",
    scheduleWarn: "⚠️ Schedules may vary due to traffic. Check Live Tracking for real-time updates.",
    howPill: "Simple Process",
    howH2a: "From sign-up",
    howH2b: "to smooth ride.",
    steps: [
      { icon: "📝", title: "Register", desc: "Sign up with your MU student ID in under 1 minute." },
      { icon: "🔍", title: "Track", desc: "Select your route and start live tracking." },
      { icon: "🚌", title: "Board", desc: "Know the exact time and location — reach the stop on time." },
      { icon: "✅", title: "Arrive", desc: "Reach campus on time, every single day — stress free." },
    ],
    galPill: "Photo Gallery",
    galH2: "Our campus & fleet.",
    galOf: "of",
    impacts: [
      { num: 8,    suffix: "+",  label: "Active Buses"           },
      { num: 1200, suffix: "+",  label: "Daily Students"         },
      { num: 98,   suffix: "%",  label: "On-Time Rate"           },
      { num: 32,   suffix: "+",  label: "Bus Stops"              },
    ],
    ctaPill: "Get Onboard",
    ctaH2: "Ready to ride smarter?",
    ctaP: "Join 1,200+ Metropolitan University students who never miss their bus.",
    ctaPrimary: "Create Free Account →",
    ctaSecondary: "Sign In",
    footerSub: "Campus Bus Tracking System\nMetropolitan University, Sylhet",
    footerTag: "CSE Department · 2026",
    footerNav: "Navigate",
    footerNavLinks: ["Home", "Routes & Schedule", "About Us"],
    footerAccount: "Account",
    footerAccountLinks: ["Sign In", "Sign Up"],
    footerSupport: "Support",
    footerSupportLinks: ["Help Center", "Contact", "Report Issue"],
    footerBottom: "© 2026 BusVoyage · Metropolitan University",
    helpTitle: "Help Center",
    helpPill: "FAQ",
    faqs: [
      { q: "How do I track my bus?", a: "Log in and open Live Tracking. You'll see all active buses updated in real time." },
      { q: "How do I check seat availability?", a: "Visit the Crowd Status page. Each bus shows current occupancy." },
      { q: "What if my bus is delayed?", a: "You'll get an instant notification in the Announcements panel." },
      { q: "Can I use BusVoyage on mobile?", a: "Yes — the site is fully mobile responsive." },
      { q: "How do I reset my password?", a: "Click 'Forgot password?' on the Sign In page and follow the instructions." },
    ],
    contactTitle: "Contact Us",
    contactPill: "Get in Touch",
    contactInfo: [
      { icon: "📧", l: "Email",  v: "busvoyage@mu.ac.bd"    },
      { icon: "🏫", l: "Office", v: "CSE Dept, MU, Sylhet"  },
      { icon: "🕐", l: "Hours",  v: "Sun–Thu 9AM–5PM"       },
    ],
    reportTitle: "Report an Issue",
    reportPill: "Report",
    reportOptions: ["Bus delay / not showing up", "Driver behaviour", "App / website bug", "Safety concern", "Other"],
    namePlaceholder: "Your name",
    idPlaceholder: "Student ID",
    msgPlaceholder: "Your message...",
    submitBtn: "Submit →",
    submittedTitle: "Submitted!",
    submittedMsg: "We'll respond within 24–48 hours.",
    langLabel: "Language",
    forTeacher: "Teacher Transport",
    forTeacherStaff: "Teacher & Staff",
    forStudent: "Student",
    departure: "Departure",
    arrival: "Arrival",
    busLabel: "Bus",
  },
  bn: {
    brandMU: "· এমইউ",
    navHome: "হোম",
    navRoutes: "রুট ও সময়সূচি",
    navAbout: "আমাদের সম্পর্কে",
    signIn: "সাইন ইন",
    signUp: "সাইন আপ →",
    eyebrow: "ক্যাম্পাস পরিবহন · মেট্রোপলিটন বিশ্ববিদ্যালয়",
    heroH1a: "আপনার ক্যাম্পাস যাত্রা",
    heroH1b: "হোক আরও সহজ",
    heroH1c: "ও স্মার্ট।",
    heroP: "মেট্রোপলিটন ইউনিভার্সিটির শিক্ষার্থীদের জন্য তৈরি রিয়েল-টাইম বাস ট্র্যাকিং সিস্টেম। এখন বাসের সঠিক অবস্থান, সিট ক্যাপাসিটি এবং আপডেট সময়সূচি জানুন এক ক্লিকেই।",
    btnAbout: "এখনই শুরু করুন",
    btnRoutes: "সময়সূচি দেখুন →",
    statBuses: "সক্রিয় বাস",
    statRoutes: "রুট",
    statTime: "ক্যাম্পাসে",
    statRiders: "দৈনিক যাত্রী",
    statOnTime: "সময়মতো হার",
    statBusesVal: "৮+",
    statRoutesVal: "৫",
    statTimeVal: "~৩৫ মিনিট",
    statRidersVal: "১,২০০+",
    statOnTimeVal: "৯৮%",
    featHeadPill: "আমরা কী অফার করি",
    featH2a: "এমইউ শিক্ষার্থীদের জন্য তৈরি,",
    featH2b: "প্রতিটি একক দিন।",
    features: [
      { icon: "📡", title: "লাইভ বাস ট্র্যাকিং", desc: "বাসের বর্তমান অবস্থান দেখুন সরাসরি চালকের ডিভাইস থেকে।" },
      { icon: "💺", title: "ভিড়ের অবস্থা", desc: "স্টপে যাওয়ার আগেই জেনে নিন বাসে বসার মতো জায়গা আছে কি না।" },
      { icon: "🔔", title: "স্মার্ট নোটিফিকেশন", desc: "বাসের বিলম্ব বা বিশেষ নোটিশের জন্য আর হোয়াটসঅ্যাপ-এর ওপর নির্ভর করতে হবে না; সরাসরি অ্যাপেই পান জরুরি আপডেট।" },
      { icon: "🧾", title: "তাৎক্ষণিক ফিডব্যাক", desc: "যাতায়াত সংক্রান্ত কোনো সমস্যা থাকলে সরাসরি অভিযোগ জানান এবং সমাধানের আপডেট ট্র্যাক করুন।" },
    ],
    routesPill: "লাইভ আপডেট",
    routesH2a: "রুট ও",
    routesH2b: "সময়সূচি",
    routesP: "বাস্তব এমইউ বাস সময়সূচি — সিলেটের মেট্রোপলিটন বিশ্ববিদ্যালয়ের সকল রুট।",
    tabMain: "প্রধান রুট",
    tabShuttle: "শাটল সার্ভিস",
    tabRikabi: "রিকাবিবাজার অস্থায়ী",
    thRoute: "রুট",
    thArrival: "আগমন",
    thDeparture: "প্রস্থান",
    thBus: "বাস নম্বর",
    thDriver: "চালক",
    thFor: "জন্য",
    shuttleNote: "ক্যাম্পাস–টিলাগড়–ক্যাম্পাস শাটল সারাদিন চলে।",
    thDepCampus: "ক্যাম্পাস থেকে প্রস্থান",
    thArrCampus: "ক্যাম্পাসে আগমন",
    rikabNote: "ক্যাম্পাস – রিকাবিবাজার – ক্যাম্পাস (অস্থায়ী সময়সূচি)",
    scheduleWarn: "⚠️ যানজটের কারণে সময়সূচি পরিবর্তন হতে পারে। রিয়েল-টাইম আপডেটের জন্য লাইভ ট্র্যাকিং দেখুন।",
    howPill: "সহজ প্রক্রিয়া",
    howH2a: "১, ২, ৩...",
    howH2b: "এবং আপনি গন্তব্যে!",
    steps: [
      { icon: "📝", title: "নিবন্ধন",    desc: "আপনার এমইউ স্টুডেন্ট আইডি দিয়ে মাত্র ১ মিনিটে অ্যাকাউন্ট তৈরি করুন।" },
      { icon: "🔍", title: "অনুসন্ধান",  desc: "আপনার কাঙ্ক্ষিত রুটটি নির্বাচন করুন এবং লাইভ ট্র্যাকিং চালু করুন।" },
      { icon: "🚌", title: "যাত্রা শুরু", desc: "বাসের সঠিক সময় ও অবস্থান জেনে স্টপে পৌঁছান।" },
      { icon: "✅", title: "সফল গন্তব্য", desc: "কোনো মানসিক চাপ ছাড়াই প্রতিদিন সময়মতো ক্যাম্পাসে পৌঁছান।" },
    ],
    galPill: "ফটো গ্যালারি",
    galH2: "আমাদের ক্যাম্পাস ও বহর।",
    galOf: "এর মধ্যে",
    impacts: [
      { num: 8,    suffix: "+",  label: "নিয়মিত সক্রিয় বাস"          },
      { num: 1200, suffix: "+",  label: "প্রতিদিনের সন্তুষ্ট ব্যবহারকারী" },
      { num: 98,   suffix: "%",  label: "অন-টাইম অ্যারাইভাল রেট"        },
      { num: 32,   suffix: "+",  label: "নির্ধারিত বাস স্টপেজ"           },
    ],
    ctaPill: "যোগ দিন",
    ctaH2: "স্মার্টভাবে যাত্রা করতে প্রস্তুত?",
    ctaP: "১,২০০+ মেট্রোপলিটন বিশ্ববিদ্যালয়ের শিক্ষার্থীদের সাথে যোগ দিন যারা কখনো বাস মিস করেন না।",
    ctaPrimary: "বিনামূল্যে অ্যাকাউন্ট তৈরি করুন →",
    ctaSecondary: "সাইন ইন",
    footerSub: "ক্যাম্পাস ট্রান্সপোর্ট ম্যানেজমেন্ট সিস্টেম\nমেট্রোপলিটন বিশ্ববিদ্যালয়, সিলেট",
    footerTag: "কম্পিউটার সায়েন্স এন্ড ইঞ্জিনিয়ারিং বিভাগ · ২০২৬",
    footerNav: "নেভিগেট",
    footerNavLinks: ["হোম", "রুট ও সময়সূচি", "আমাদের সম্পর্কে"],
    footerAccount: "অ্যাকাউন্ট",
    footerAccountLinks: ["সাইন ইন", "সাইন আপ"],
    footerSupport: "সহায়তা",
    footerSupportLinks: ["সহায়তা কেন্দ্র", "যোগাযোগ", "সমস্যা রিপোর্ট"],
    footerBottom: "© ২০২৬ BusVoyage · মেট্রোপলিটন ইউনিভার্সিটি, সিলেট",
    helpTitle: "সহায়তা কেন্দ্র",
    helpPill: "প্রশ্নোত্তর",
    faqs: [
      { q: "আমি কীভাবে বাস ট্র্যাক করব?",       a: "লগ ইন করুন এবং লাইভ ট্র্যাকিং খুলুন। সকল সক্রিয় বাস রিয়েল-টাইমে আপডেট দেখতে পাবেন।" },
      { q: "আসন প্রাপ্যতা কীভাবে দেখব?",         a: "ক্রাউড স্ট্যাটাস পেজে যান। প্রতিটি বাসের বর্তমান দখল দেখা যাবে।" },
      { q: "বাস দেরি হলে কী হবে?",               a: "আপনি ঘোষণা প্যানেলে তাৎক্ষণিক বিজ্ঞপ্তি পাবেন।" },
      { q: "মোবাইলে BusVoyage ব্যবহার করা যাবে?", a: "হ্যাঁ — সাইটটি সম্পূর্ণ মোবাইল রেসপন্সিভ।" },
      { q: "পাসওয়ার্ড রিসেট করব কীভাবে?",        a: "সাইন ইন পেজে 'পাসওয়ার্ড ভুলে গেছি?' ক্লিক করুন এবং নির্দেশনা অনুসরণ করুন।" },
    ],
    contactTitle: "যোগাযোগ করুন",
    contactPill: "যোগাযোগ",
    contactInfo: [
      { icon: "📧", l: "ইমেইল", v: "busvoyage@mu.ac.bd"                    },
      { icon: "🏫", l: "অফিস",  v: "সিএসই বিভাগ, এমইউ, সিলেট"             },
      { icon: "🕐", l: "সময়",   v: "রবি–বৃহস্পতি সকাল ৯টা–বিকাল ৫টা"     },
    ],
    reportTitle: "সমস্যা রিপোর্ট",
    reportPill: "রিপোর্ট",
    reportOptions: ["বাস দেরি / না আসা", "চালকের আচরণ", "অ্যাপ / ওয়েবসাইট বাগ", "নিরাপত্তা উদ্বেগ", "অন্যান্য"],
    namePlaceholder: "আপনার নাম",
    idPlaceholder: "স্টুডেন্ট আইডি",
    msgPlaceholder: "আপনার বার্তা...",
    submitBtn: "জমা দিন →",
    submittedTitle: "জমা হয়েছে!",
    submittedMsg: "আমরা ২৪–৪৮ ঘণ্টার মধ্যে সাড়া দেব।",
    langLabel: "ভাষা",
    forTeacher: "শিক্ষক পরিবহন",
    forTeacherStaff: "শিক্ষক ও কর্মকর্তা",
    forStudent: "শিক্ষার্থী",
    departure: "প্রস্থান",
    arrival: "আগমন",
    busLabel: "বাস",
  },
};

const GALLERY = ["/bus1.png", "/s2.jpeg", "/s3.jpeg", "/s4.jpeg", "/mu.jpg", "/bus5.jpg"];

const MAIN_ROUTES = [
  { route: { en: "Modina Market, Ambarkhana, Chouhatta, Kumarpara, Tilagor, Campus",      bn: "মদিনা মার্কেট, আম্বরখানা, চৌহাট্টা, কুমারপাড়া, টিলাগড়, ক্যাম্পাস"      }, arrival: "08:10 AM", departure: "—",        bus: "11-0018", driver: { en: "Sajib",   bn: "সজীব"   }, for: "teacher"        },
  { route: { en: "Campus, Shahi Eidgah, Kumarpara, Chouhatta, Rikabibazar, Subidbazar",   bn: "ক্যাম্পাস, শাহী ঈদগাহ, কুমারপাড়া, চৌহাট্টা, রিকাবিবাজার, সুবিদবাজার"  }, arrival: "—",        departure: "04:00 PM", bus: "11-0010", driver: { en: "Shahdat", bn: "শাহদত" }, for: "teacher"        },
  { route: { en: "Subidbazar, Rikabibazar, Kumarpara, Shahi Eidgah, Tilagor, Campus",     bn: "সুবিদবাজার, রিকাবিবাজার, কুমারপাড়া, শাহী ঈদগাহ, টিলাগড়, ক্যাম্পাস"    }, arrival: "09:27 AM", departure: "—",        bus: "11-0967", driver: { en: "Monir",   bn: "মনির"   }, for: "teacherStaff"   },
  { route: { en: "Campus, Shahi Eidgah, Kumarpara, Chouhatta, Rikabibazar, Subidbazar",   bn: "ক্যাম্পাস, শাহী ঈদগাহ, কুমারপাড়া, চৌহাট্টা, রিকাবিবাজার, সুবিদবাজার"  }, arrival: "—",        departure: "06:00 PM", bus: "11-0010", driver: { en: "Shahdat", bn: "শাহদত" }, for: "teacherStaff"   },
  { route: { en: "Subidbazar, Ambarkhana, Shahi Eidgah, Tilagor, Campus",                 bn: "সুবিদবাজার, আম্বরখানা, শাহী ঈদগাহ, টিলাগড়, ক্যাম্পাস"                   }, arrival: "08:10 AM", departure: "05:00 PM", bus: "11-0944", driver: { en: "Nasir",   bn: "নাসির"  }, for: "student"        },
  { route: { en: "Rikabibazar, Chouhatta, Kumarpara, Shahi Eidgah, Tilagor, Campus",      bn: "রিকাবিবাজার, চৌহাট্টা, কুমারপাড়া, শাহী ঈদগাহ, টিলাগড়, ক্যাম্পাস"      }, arrival: "08:15 AM", departure: "02:30 PM", bus: "11-0967", driver: { en: "Monir",   bn: "মনির"   }, for: "student"        },
  { route: { en: "Rikabibazar, Subidbazar, Ambarkhana, Shahi Eidgah, Tilagor, Campus",    bn: "রিকাবিবাজার, সুবিদবাজার, আম্বরখানা, শাহী ঈদগাহ, টিলাগড়, ক্যাম্পাস"     }, arrival: "08:10 AM", departure: "02:30 PM", bus: "11-0900", driver: { en: "Farid",   bn: "ফরিদ"  }, for: "student"        },
  { route: { en: "Ambarkhana, Tilagor, Campus",                                            bn: "আম্বরখানা, টিলাগড়, ক্যাম্পাস"                                             }, arrival: "08:32 AM", departure: "05:00 PM", bus: "BRTC (Double Decker)", driver: { en: "—", bn: "—" }, for: "student"   },
  { route: { en: "Temukhi, Modina Market, Subidbazar, Ambarkhana, Tilagor, Campus",        bn: "তেমুখী, মদিনা মার্কেট, সুবিদবাজার, আম্বরখানা, টিলাগড়, ক্যাম্পাস"       }, arrival: "08:02 AM", departure: "05:00 PM", bus: "BRTC",    driver: { en: "—", bn: "—" }, for: "student"        },
  { route: { en: "Modina Market, Subidbazar, Ambarkhana, Shahi Eidgah, Tilagor, Campus",   bn: "মদিনা মার্কেট, সুবিদবাজার, আম্বরখানা, শাহী ঈদগাহ, টিলাগড়, ক্যাম্পাস"  }, arrival: "08:10 AM", departure: "02:30 PM", bus: "BRTC",    driver: { en: "—", bn: "—" }, for: "student"        },
  { route: { en: "Humayun Rashid Chottor, Kumarpara, Shibgonj, Tilagor, Campus",           bn: "হুমায়ুন রশীদ চত্বর, কুমারপাড়া, শিবগঞ্জ, টিলাগড়, ক্যাম্পাস"            }, arrival: "08:15 AM", departure: "05:00 PM", bus: "BRTC",    driver: { en: "—", bn: "—" }, for: "student"        },
];

const SHUTTLE = [
  { dep: "09:10 AM", arr: "—",        bus: "11-0018", driver: { en: "Sajib",   bn: "সজীব"  } },
  { dep: "10:05 AM", arr: "09:30 AM", bus: "11-0018", driver: { en: "Sajib",   bn: "সজীব"  } },
  { dep: "11:00 AM", arr: "10:30 AM", bus: "11-0018", driver: { en: "Sajib",   bn: "সজীব"  } },
  { dep: "12:05 PM", arr: "11:30 AM", bus: "11-0018", driver: { en: "Sajib",   bn: "সজীব"  } },
  { dep: "01:00 PM", arr: "12:30 PM", bus: "11-0010", driver: { en: "Shahdat", bn: "শাহদত" } },
  { dep: "02:00 PM", arr: "01:30 PM", bus: "11-0010", driver: { en: "Shahdat", bn: "শাহদত" } },
  { dep: "04:05 PM", arr: "02:30 PM", bus: "11-0010", driver: { en: "Shahdat", bn: "শাহদত" } },
];

const SHUTTLE_ROUTE = {
  en: "Campus – Tilagor – Campus",
  bn: "ক্যাম্পাস – টিলাগড় – ক্যাম্পাস",
};

const RIKABI_TEMP = [
  { time: "12:00 PM", type: "departure", bus: "11-0967", driver: { en: "Monir", bn: "মনির"  } },
  { time: "12:35 PM", type: "arrival",   bus: "11-0967", driver: { en: "Monir", bn: "মনির"  } },
  { time: "12:35 PM", type: "arrival",   bus: "11-0944", driver: { en: "Nasir", bn: "নাসির" } },
  { time: "01:35 PM", type: "arrival",   bus: "11-0900", driver: { en: "Farid", bn: "ফরিদ"  } },
];

function formatBus(bus, lang) {
  if (lang === "en") return bus;
  return bus.replace(/[0-9]/g, d => "০১২৩৪৫৬৭৮৯"[d]);
}

// Format time for display
function formatTime(t, lang) {
  if (!t || t === "—") return "—";
  if (lang === "en") return t;
  return toBnTime(t);
}

function useCounter(target, duration = 1800) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start = null;
      const step = ts => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        setVal(Math.floor(p * target));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return [val, ref];
}

function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function Reveal({ children, delay = 0 }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : "translateY(28px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    }}>{children}</div>
  );
}

// StatCounter with Bengali digit support
function StatCounter({ target, suffix = "", lang = "en" }) {
  const [val, ref] = useCounter(target);
  const display = lang === "bn" ? toBn(val.toLocaleString()) + suffix : val.toLocaleString() + suffix;
  return <span ref={ref}>{display}</span>;
}

function remarksColor(forKey) {
  if (forKey === "student")      return { bg: "rgba(96,165,250,0.18)",  color: "#60a5fa" };
  if (forKey === "teacher")      return { bg: "rgba(251,191,36,0.18)",  color: "#fbbf24" };
  return                                { bg: "rgba(74,222,128,0.18)",  color: "#4ade80" };
}

function getForLabel(forKey, t) {
  if (forKey === "teacher")      return t.forTeacher;
  if (forKey === "teacherStaff") return t.forTeacherStaff;
  return t.forStudent;
}

const fi = { width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, color: "#0f172a", background: "#f8fafc", outline: "none", fontFamily: "inherit", boxSizing: "border-box" };
const sb = { width: "100%", padding: "13px", background: "#0f172a", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" };
const modal = {
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", backdropFilter: "blur(4px)" },
  box:     { background: "#fff", borderRadius: 18, padding: "28px 28px 24px", width: "100%", maxWidth: 560, maxHeight: "88vh", overflowY: "auto", boxShadow: "0 24px 64px rgba(0,0,0,0.28)" },
  header:  { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 },
  pill:    { background: "#f1f5f9", color: "#E31E24", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700, marginBottom: 8, display: "inline-block", textTransform: "uppercase" },
  title:   { fontSize: 22, fontWeight: 900, color: "#0f172a", marginBottom: 4 },
  close:   { background: "#f1f5f9", border: "none", width: 34, height: 34, borderRadius: "50%", cursor: "pointer", fontSize: 16, color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
};

function SupportModal({ type, onClose, t }) {
  const [submitted, setSubmitted] = useState(false);

  if (type === "help") return (
    <div style={modal.overlay} onClick={onClose}>
      <div style={{ ...modal.box, maxWidth: 560 }} onClick={e => e.stopPropagation()}>
        <div style={modal.header}>
          <div><div style={modal.pill}>{t.helpPill}</div><h2 style={modal.title}>{t.helpTitle}</h2></div>
          <button style={modal.close} onClick={onClose}>✕</button>
        </div>
        {t.faqs.map((f, i) => (
          <div key={i} style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: "12px 16px", background: "#f8fafc", marginBottom: 10 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#0f172a", marginBottom: 4 }}>❓ {f.q}</div>
            <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>{f.a}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={modal.overlay} onClick={onClose}>
      <div style={{ ...modal.box, maxWidth: 520 }} onClick={e => e.stopPropagation()}>
        <div style={modal.header}>
          <div>
            <div style={modal.pill}>{type === "contact" ? t.contactPill : t.reportPill}</div>
            <h2 style={modal.title}>{type === "contact" ? t.contactTitle : t.reportTitle}</h2>
          </div>
          <button style={modal.close} onClick={onClose}>✕</button>
        </div>
        {submitted ? (
          <div style={{ textAlign: "center", padding: "36px 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 14 }}>✅</div>
            <div style={{ fontWeight: 700, fontSize: 17, color: "#0f172a", marginBottom: 8 }}>{t.submittedTitle}</div>
            <div style={{ fontSize: 13, color: "#64748b" }}>{t.submittedMsg}</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {type === "contact" && (
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
                {t.contactInfo.map((c, i) => (
                  <div key={i} style={{ flex: 1, minWidth: 110, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: "12px", textAlign: "center" }}>
                    <div style={{ fontSize: 20, marginBottom: 5 }}>{c.icon}</div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", marginBottom: 3 }}>{c.l}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#0f172a" }}>{c.v}</div>
                  </div>
                ))}
              </div>
            )}
            {type === "report" && (
              <select style={fi}>
                {t.reportOptions.map((o, i) => <option key={i}>{o}</option>)}
              </select>
            )}
            <input placeholder={t.namePlaceholder} style={fi} />
            <input placeholder={t.idPlaceholder}   style={fi} />
            <textarea placeholder={t.msgPlaceholder} rows={4} style={{ ...fi, resize: "vertical" }} />
            <button style={sb} onClick={() => setSubmitted(true)}>{t.submitBtn}</button>
          </div>
        )}
      </div>
    </div>
  );
}

function LangSwitcher({ lang, setLang }) {
  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 1500,
      background: "#0f172a", border: "1.5px solid rgba(255,255,255,0.15)",
      borderRadius: 40, padding: "8px 14px",
      display: "flex", alignItems: "center", gap: 8,
      boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
    }}>
      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 600, letterSpacing: 1 }}>🌐</span>
      {["en", "bn"].map(l => (
        <button key={l} onClick={() => setLang(l)} style={{
          padding: "5px 14px", borderRadius: 20, border: "none", cursor: "pointer",
          fontSize: 12, fontWeight: 700,
          background: lang === l ? "#E31E24" : "transparent",
          color: lang === l ? "#fff" : "rgba(255,255,255,0.5)",
          transition: "all 0.2s",
        }}>
          {l === "en" ? "EN" : "বাং"}
        </button>
      ))}
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [lang,         setLang]         = useState("en");
  const [supportModal, setSupportModal] = useState(null);
  const [mobileMenu,   setMobileMenu]   = useState(false);
  const [schedTab,     setSchedTab]     = useState(0);
  const [galSlide,     setGalSlide]     = useState(0);

  const t = T[lang];

  const scrollToTop       = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToTimetable = () => document.getElementById("timetable-section")?.scrollIntoView({ behavior: "smooth" });

  const FEAT_COLORS = [
    { bg: "rgba(227,30,36,0.10)", line: "#E31E24" },
    { bg: "rgba(0,43,91,0.10)",   line: "#002B5B" },
    { bg: "rgba(255,193,7,0.15)", line: "#d97706" },
    { bg: "rgba(0,43,91,0.06)",   line: "#002B5B" },
  ];
  const STEP_COLORS = ["#E31E24", "#002B5B", "#1d4ed8", "#16a34a"];

  const galFrom = lang === "bn" ? toBn(galSlide + 1) : galSlide + 1;
  const galTo   = lang === "bn" ? toBn(Math.min(galSlide + 3, GALLERY.length)) : Math.min(galSlide + 3, GALLERY.length);
  const galTotal= lang === "bn" ? toBn(GALLERY.length) : GALLERY.length;

  return (
    <div style={s.page}>
      <style>{CSS}</style>

      {supportModal && <SupportModal type={supportModal} onClose={() => setSupportModal(null)} t={t} />}
      <LangSwitcher lang={lang} setLang={setLang} />

      {/* NAV */}
      <nav style={s.nav}>
        <div style={s.brand}>
          <div style={s.brandDot} />
          <span style={s.brandName}>BusVoyage</span>
          <span style={s.brandMU} className="hide-xs">{t.brandMU}</span>
        </div>
        <div style={s.navCenter} className="nav-desktop">
          {[
            { label: t.navHome,   action: scrollToTop },
            { label: t.navRoutes, action: scrollToTimetable },
            { label: t.navAbout,  action: () => navigate("/about") },
          ].map((l, i) => (
            <span key={i} style={s.navLink} className="nav-link-hover" onClick={l.action}>{l.label}</span>
          ))}
        </div>
        <div style={s.navRight} className="nav-desktop">
          <button style={s.navSignIn} onClick={() => navigate("/login")}>{t.signIn}</button>
          <button style={s.navSignUp} onClick={() => navigate("/register")}>{t.signUp}</button>
        </div>
        <button style={s.hamburger} className="nav-mobile" onClick={() => setMobileMenu(v => !v)}>
          <span style={s.ham} /><span style={s.ham} /><span style={s.ham} />
        </button>
      </nav>

      {mobileMenu && (
        <div style={s.mobileDrawer}>
          {[
            { label: t.navHome,   action: () => { scrollToTop();       setMobileMenu(false); } },
            { label: t.navRoutes, action: () => { scrollToTimetable(); setMobileMenu(false); } },
            { label: t.navAbout,  action: () => { navigate("/about");  setMobileMenu(false); } },
          ].map((l, i) => (
            <div key={i} style={s.mobileLink} onClick={l.action}>{l.label}</div>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button style={{ ...s.navSignIn, flex: 1 }} onClick={() => { navigate("/login");    setMobileMenu(false); }}>{t.signIn}</button>
            <button style={{ ...s.navSignUp, flex: 1 }} onClick={() => { navigate("/register"); setMobileMenu(false); }}>{t.signUp}</button>
          </div>
        </div>
      )}

      {/* HERO */}
      <section style={s.hero}>
        <div style={s.heroBg} />
        <div style={s.heroFloorArea} />
        <div style={s.heroBody}>
          <div style={s.heroImageCol} className="hero-img-col">
            <div style={s.busWrapper}>
              <img src="/buss.png" alt="MU Bus" style={s.busImgStatic}
                onError={e => { e.target.style.opacity = "0.1"; }} />
            </div>
          </div>
          <div style={s.heroTextCol} className="hero-fade-1">
            <div style={s.heroEyebrow} className="hero-fade-1">{t.eyebrow}</div>
            <h1 style={s.heroH1} className="hero-fade-2">
              {t.heroH1a}<br />
              <span style={s.heroBold}>{t.heroH1b}</span><br />
              {t.heroH1c}
            </h1>
            <p style={s.heroP} className="hero-fade-3">{t.heroP}</p>
            <div className="hero-fade-4" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button style={s.btnBook}  onClick={() => navigate("/about")}>{t.btnAbout}</button>
              <button style={s.btnTrack} onClick={scrollToTimetable}>{t.btnRoutes}</button>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div style={s.statsStrip} className="stats-strip">
          {[
            { label: t.statBuses,  val: t.statBusesVal  },
            { label: t.statRoutes, val: t.statRoutesVal  },
            { label: t.statTime,   val: t.statTimeVal    },
            { label: t.statRiders, val: t.statRidersVal  },
            { label: t.statOnTime, val: t.statOnTimeVal  },
          ].map((st, i, arr) => (
            <React.Fragment key={i}>
              <div style={s.stripItem}>
                <div style={s.stripLabel}>{st.label}</div>
                <div style={s.stripVal}>{st.val}</div>
              </div>
              {i < arr.length - 1 && <div style={s.stripDiv} className="strip-div" />}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={s.featSec}>
        <Reveal>
          <div style={s.secPill}>{t.featHeadPill}</div>
          <h2 style={s.secH2}>{t.featH2a}<br />{t.featH2b}</h2>
        </Reveal>
        <div style={s.featGrid} className="feat-grid">
          {t.features.map((f, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={s.featCard} className="lift">
                <div style={{ ...s.featIcon, background: FEAT_COLORS[i].bg }}>{f.icon}</div>
                <div style={s.featTitle}>{f.title}</div>
                <div style={s.featDesc}>{f.desc}</div>
                <div style={{ ...s.featBar, background: FEAT_COLORS[i].line }} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ROUTES & SCHEDULE */}
      <section id="timetable-section" style={s.routeSec}>
        <div style={s.routeInner}>
          <Reveal>
            <div style={s.secPillW}>{t.routesPill}</div>
            <h2 style={{ ...s.secH2, color: "#fff", marginBottom: 12 }}>{t.routesH2a}<br />{t.routesH2b}</h2>
            <p style={{ color: "rgba(255,255,255,0.42)", fontSize: 14, lineHeight: 1.75, maxWidth: 340, marginBottom: 28 }}>{t.routesP}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
              {[t.tabMain, t.tabShuttle, t.tabRikabi].map((tab, i) => (
                <button key={i} onClick={() => setSchedTab(i)} style={{
                  padding: "9px 18px", borderRadius: 8, border: "none", cursor: "pointer",
                  fontSize: 13, fontWeight: 700,
                  background: schedTab === i ? "#E31E24" : "rgba(255,255,255,0.07)",
                  color: schedTab === i ? "#fff" : "rgba(255,255,255,0.55)",
                  transition: "all 0.2s",
                }}>{tab}</button>
              ))}
            </div>
          </Reveal>

          {/* MAIN ROUTES TAB */}
          {schedTab === 0 && (
            <Reveal delay={0.15}>
              <div style={{ overflowX: "auto", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)" }}>
                <table style={s.darkTable}>
                  <thead>
                    <tr>{[t.thRoute, t.thArrival, t.thDeparture, t.thBus, t.thDriver, t.thFor].map(h => <th key={h} style={s.darkTh}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {MAIN_ROUTES.map((r, i) => {
                      const rc = remarksColor(r.for);
                      const forLabel = getForLabel(r.for, t);
                      return (
                        <tr key={i} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.04)" : "transparent" }}>
                          <td style={s.darkTd}>{r.route[lang]}</td>
                          <td style={{ ...s.darkTd, color: r.arrival !== "—" ? "#4ade80" : "#4a5568", fontWeight: r.arrival !== "—" ? 700 : 400 }}>{formatTime(r.arrival, lang)}</td>
                          <td style={{ ...s.darkTd, color: r.departure !== "—" ? "#f87171" : "#4a5568", fontWeight: r.departure !== "—" ? 700 : 400 }}>{formatTime(r.departure, lang)}</td>
                          <td style={{ ...s.darkTd, fontWeight: 700, color: "#fff" }}>{formatBus(r.bus, lang)}</td>
                          <td style={s.darkTd}>{r.driver[lang]}</td>
                          <td style={s.darkTd}><span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 12, background: rc.bg, color: rc.color }}>{forLabel}</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Reveal>
          )}

          {/* SHUTTLE TAB */}
          {schedTab === 1 && (
            <Reveal delay={0.15}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 16 }}>{t.shuttleNote}</p>
              <div style={{ overflowX: "auto", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)" }}>
                <table style={s.darkTable}>
                  <thead>
                    <tr>{[t.thRoute, t.thDepCampus, t.thArrCampus, t.thBus, t.thDriver].map(h => <th key={h} style={s.darkTh}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {SHUTTLE.map((r, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.04)" : "transparent" }}>
                        <td style={s.darkTd}>{SHUTTLE_ROUTE[lang]}</td>
                        <td style={{ ...s.darkTd, color: r.dep !== "—" ? "#f87171" : "#4a5568", fontWeight: r.dep !== "—" ? 700 : 400 }}>{formatTime(r.dep, lang)}</td>
                        <td style={{ ...s.darkTd, color: r.arr !== "—" ? "#4ade80" : "#4a5568", fontWeight: r.arr !== "—" ? 700 : 400 }}>{formatTime(r.arr, lang)}</td>
                        <td style={{ ...s.darkTd, fontWeight: 700, color: "#fff" }}>{formatBus(r.bus, lang)}</td>
                        <td style={s.darkTd}>{r.driver[lang]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          )}

          {/* RIKABI TEMP TAB */}
          {schedTab === 2 && (
            <Reveal delay={0.15}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 16 }}>{t.rikabNote}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {RIKABI_TEMP.map((r, i) => {
                  const isDep = r.type === "departure";
                  const typeLabel = isDep ? t.departure : t.arrival;
                  return (
                    <div key={i} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 18px", minWidth: 200 }}>
                      <div style={{ fontSize: 16, fontWeight: 800, color: isDep ? "#f87171" : "#4ade80", marginBottom: 5 }}>
                        {isDep ? "⬆" : "⬇"} {formatTime(r.time, lang)}
                      </div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
                        {typeLabel} · {t.busLabel} {formatBus(r.bus, lang)} · {r.driver[lang]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          )}

          <Reveal delay={0.2}>
            <div style={{ marginTop: 20, padding: "10px 14px", background: "rgba(227,30,36,0.08)", borderRadius: 8, fontSize: 12, color: "rgba(255,255,255,0.5)", border: "1px solid rgba(227,30,36,0.2)" }}>
              {t.scheduleWarn}
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={s.howSec}>
        <Reveal>
          <div style={s.secPill}>{t.howPill}</div>
          <h2 style={s.secH2}>{t.howH2a}<br />{t.howH2b}</h2>
        </Reveal>
        <div style={s.howRow} className="how-row">
          {t.steps.map((st, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={s.howStep}>
                <div style={{ ...s.howNum, background: STEP_COLORS[i] }}>
                  {lang === "bn" ? toBn(i + 1) : i + 1}
                </div>
                {i < t.steps.length - 1 && <div style={s.howLine} className="how-line" />}
                <div style={s.howIcon}>{st.icon}</div>
                <div style={s.howTitle}>{st.title}</div>
                <div style={s.howDesc}>{st.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section style={s.galSec}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={s.secPillW}>{t.galPill}</div>
            <h2 style={{ ...s.secH2, color: "#fff", marginBottom: 0 }}>{t.galH2}</h2>
          </div>
        </Reveal>
        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
          <div style={s.galGrid} className="gal-grid">
            {GALLERY.slice(galSlide, galSlide + 3).map((src, i) => (
              <Reveal key={galSlide + i} delay={i * 0.07}>
                <div style={{ ...s.galTile, backgroundImage: `url('${src}')` }} className="gal-tile" />
              </Reveal>
            ))}
          </div>
          <button onClick={() => setGalSlide(Math.max(0, galSlide - 3))} disabled={galSlide === 0}
            style={{ ...s.galArrow, left: -52, opacity: galSlide === 0 ? 0.35 : 1 }}>←</button>
          <button onClick={() => setGalSlide(Math.min(GALLERY.length - 3, galSlide + 3))} disabled={galSlide >= GALLERY.length - 3}
            style={{ ...s.galArrow, right: -52, opacity: galSlide >= GALLERY.length - 3 ? 0.35 : 1 }}>→</button>
          <div style={{ textAlign: "center", marginTop: 16, color: "rgba(255,255,255,0.45)", fontSize: 13 }}>
            {galFrom}–{galTo} {t.galOf} {galTotal}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section style={s.impactSec} className="impact-sec">
        {t.impacts.map((imp, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div style={s.impactItem}>
              <div style={s.impactNum}>
                <StatCounter target={imp.num} suffix={imp.suffix} lang={lang} />
              </div>
              <div style={s.impactLabel}>{imp.label}</div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* CTA */}
      <section style={s.ctaSec}>
        <div style={s.ctaGlow} />
        <Reveal>
          <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
            <div style={s.ctaPill}>{t.ctaPill}</div>
            <h2 style={s.ctaH2}>{t.ctaH2}</h2>
            <p style={s.ctaP}>{t.ctaP}</p>
            <div style={s.ctaBtns}>
              <button style={s.ctaPrimary}   onClick={() => navigate("/register")}>{t.ctaPrimary}</button>
              <button style={s.ctaSecondary} onClick={() => navigate("/login")}>{t.ctaSecondary}</button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer style={s.footer}>
        <div style={s.footerTop} className="footer-top">
          <div>
            <div style={s.footerBrand}>🚌 BusVoyage</div>
            <div style={s.footerSub}>{t.footerSub}</div>
            <div style={s.footerTag}>{t.footerTag}</div>
          </div>
          <div style={s.footerCols} className="footer-cols">
            <div>
              <div style={s.footerHead}>{t.footerNav}</div>
              {[
                { label: t.footerNavLinks[0], action: scrollToTop },
                { label: t.footerNavLinks[1], action: scrollToTimetable },
                { label: t.footerNavLinks[2], action: () => navigate("/about") },
              ].map(l => <div key={l.label} style={s.footerLink} onClick={l.action}>{l.label}</div>)}
            </div>
            <div>
              <div style={s.footerHead}>{t.footerAccount}</div>
              {[
                { label: t.footerAccountLinks[0], action: () => navigate("/login")    },
                { label: t.footerAccountLinks[1], action: () => navigate("/register") },
              ].map(l => <div key={l.label} style={s.footerLink} onClick={l.action}>{l.label}</div>)}
            </div>
            <div>
              <div style={s.footerHead}>{t.footerSupport}</div>
              {[
                { label: t.footerSupportLinks[0], action: () => setSupportModal("help")    },
                { label: t.footerSupportLinks[1], action: () => setSupportModal("contact") },
                { label: t.footerSupportLinks[2], action: () => setSupportModal("report")  },
              ].map(l => <div key={l.label} style={s.footerLink} onClick={l.action}>{l.label}</div>)}
            </div>
          </div>
        </div>
        <div style={s.footerRule} />
        <div style={s.footerBottom}>
          <span>{t.footerBottom}</span>
        </div>
      </footer>
    </div>
  );
}

const CSS = `
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior:smooth; }
  button { font-family:inherit; cursor:pointer; }

  @keyframes heroFade { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
  .hero-fade-1 { animation:heroFade 0.8s ease 0.2s both; }
  .hero-fade-2 { animation:heroFade 0.8s ease 0.4s both; }
  .hero-fade-3 { animation:heroFade 0.8s ease 0.6s both; }
  .hero-fade-4 { animation:heroFade 0.8s ease 0.8s both; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }

  .nav-link-hover:hover { color:#fff !important; }
  .lift:hover { transform:translateY(-6px) !important; box-shadow:0 18px 44px rgba(0,0,0,0.10) !important; transition:0.3s; }
  .gal-tile { transition:transform 0.25s ease; cursor:pointer; }
  .gal-tile:hover { transform:scale(1.03); }

  .nav-desktop { display:flex !important; }
  .nav-mobile  { display:none !important; }
  .hide-xs     { display:inline !important; }
  .hero-img-col{ display:flex !important; }

  @media (max-width:900px) {
    .nav-desktop  { display:none !important; }
    .nav-mobile   { display:flex !important; }
    .hero-img-col { display:none !important; }
    .feat-grid    { grid-template-columns:repeat(2,1fr) !important; }
    .how-row      { flex-wrap:wrap !important; }
    .gal-grid     { grid-template-columns:repeat(2,1fr) !important; }
    .impact-sec   { flex-wrap:wrap !important; gap:24px !important; padding:40px 24px !important; }
    .footer-top   { flex-direction:column !important; gap:32px !important; }
    .footer-cols  { flex-wrap:wrap !important; gap:24px !important; }
  }

  @media (max-width:600px) {
    .feat-grid   { grid-template-columns:1fr !important; }
    .gal-grid    { grid-template-columns:1fr !important; }
    .stats-strip { flex-wrap:wrap !important; gap:8px !important; padding:14px 16px !important; }
    .strip-div   { display:none !important; }
    .how-line    { display:none !important; }
    .hide-xs     { display:none !important; }
    .how-row     { gap:16px !important; }
  }

  @media (max-width:380px) {
    .stats-strip { padding:10px 12px !important; }
  }

  @media (max-width:900px) {
    .gal-arrow-left  { left:4px !important; }
    .gal-arrow-right { right:4px !important; }
  }
`;

const s = {
  page: { fontFamily: "'Inter','Segoe UI',sans-serif", background: "#f8f9fa" },

  nav: {
    position: "fixed", top: 0, left: 0, right: 0,
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "0 clamp(16px,4vw,60px)", height: 62, zIndex: 1000,
    background: "#0f172a",
    boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
  },
  brand:       { display: "flex", alignItems: "center", gap: 9, color: "#fff" },
  brandDot:    { width: 9, height: 9, borderRadius: "50%", background: "#E31E24", animation: "pulse 2.5s infinite", flexShrink: 0 },
  brandName:   { fontWeight: 900, fontSize: 19, color: "#fff" },
  brandMU:     { opacity: 0.45, fontSize: 14, color: "#fff" },
  navCenter:   { display: "flex", gap: 28, fontSize: 14, fontWeight: 500 },
  navLink:     { color: "rgba(255,255,255,0.7)", cursor: "pointer", transition: "color 0.2s" },
  navRight:    { display: "flex", gap: 10 },
  navSignIn:   { padding: "7px 20px", background: "transparent", border: "1px solid rgba(255,255,255,0.28)", color: "#fff", borderRadius: 8, fontSize: 13, fontWeight: 600 },
  navSignUp:   { padding: "8px 22px", background: "#E31E24", border: "none", color: "#fff", borderRadius: 8, fontWeight: 700, fontSize: 13, boxShadow: "0 3px 12px rgba(227,30,36,0.4)" },
  hamburger:   { background: "transparent", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5 },
  ham:         { display: "block", width: 22, height: 2, background: "#fff", borderRadius: 2 },
  mobileDrawer:{ position: "fixed", top: 62, left: 0, right: 0, background: "#0f172a", zIndex: 999, padding: "18px 24px 22px", borderBottom: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" },
  mobileLink:  { padding: "12px 0", fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.85)", cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.07)" },

  hero: {
    position: "relative",
    minHeight: "clamp(520px, 80vh, 720px)",
    background: "#2d3436",
    display: "flex", flexDirection: "column", justifyContent: "flex-start",
    overflow: "hidden",
    paddingTop: 90,
    paddingBottom: 130,
  },
  heroBg:        { position: "absolute", inset: 0, backgroundImage: "url('/mu.jpg')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15 },
  heroFloorArea: { position: "absolute", bottom: 0, width: "100%", height: "36%", background: "#f39c12", opacity: 0.92 },
  heroBody: {
    position: "relative", zIndex: 10,
    display: "flex", alignItems: "flex-start", justifyContent: "space-between",
    padding: "0 clamp(16px,5vw,60px)", gap: 40,
  },
  heroImageCol: {
    flex: "1.2 1 0", display: "flex", justifyContent: "center",
    minWidth: 0,
  },
  busWrapper:    { width: "100%", maxWidth: 680, position: "relative", bottom: "-54px" },
  busImgStatic:  { width: "100%", height: "auto", filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.4))" },
  heroTextCol: {
    flex: "1 1 260px", color: "#fff", paddingTop: 60,
    minWidth: 0,
  },
  heroEyebrow: { fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,229,102,0.85)", marginBottom: 16 },
  heroH1:      { fontSize: "clamp(22px,4vw,46px)", fontWeight: 900, lineHeight: 1.2, marginBottom: 18, color: "#fff" },
  heroBold:    { color: "#FFE566", textDecoration: "underline", textDecorationColor: "#E31E24" },
  heroP:       { fontSize: "clamp(13px,1.5vw,15px)", lineHeight: 1.7, color: "rgba(255,255,255,0.82)", marginBottom: 26, maxWidth: 460 },
  btnBook:     { background: "#1e272e", color: "#fff", padding: "13px 30px", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 14 },
  btnTrack:    { background: "rgba(255,255,255,0.1)", color: "#fff", padding: "13px 26px", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: 8, fontWeight: 600, fontSize: 14 },

  statsStrip: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    background: "rgba(15,23,42,0.92)", backdropFilter: "blur(12px)",
    display: "flex", padding: "18px clamp(16px,4vw,40px)",
    zIndex: 20, borderTop: "1px solid rgba(255,255,255,0.08)",
    overflowX: "auto",
  },
  stripItem:  { flex: "1 1 auto", textAlign: "left", minWidth: 80, padding: "0 4px" },
  stripLabel: { fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.38)", marginBottom: 6, letterSpacing: 1.5, textTransform: "uppercase", whiteSpace: "nowrap" },
  stripVal:   { fontSize: "clamp(15px,2vw,20px)", fontWeight: 900, color: "#fff", whiteSpace: "nowrap" },
  stripDiv:   { width: 1, background: "rgba(255,255,255,0.09)", margin: "0 14px", flexShrink: 0 },

  featSec:  { padding: "80px clamp(16px,6vw,70px)", background: "#fff" },
  secPill:  { background: "#f1f2f6", color: "#E31E24", padding: "5px 14px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 16, display: "inline-block", textTransform: "uppercase" },
  secPillW: { background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.65)", padding: "5px 14px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 16, display: "inline-block", textTransform: "uppercase" },
  secH2:    { fontSize: "clamp(20px,3vw,36px)", fontWeight: 900, color: "#1e272e", lineHeight: 1.2, marginBottom: 44 },
  featGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 },
  featCard: { padding: "26px 20px", background: "#fff", borderRadius: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", border: "1px solid #f1f2f6", position: "relative", overflow: "hidden" },
  featIcon: { width: 50, height: 50, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 16 },
  featTitle:{ fontWeight: 800, fontSize: 15, color: "#1e272e", marginBottom: 8 },
  featDesc: { fontSize: 13, color: "#636e72", lineHeight: 1.65 },
  featBar:  { height: 3, width: 34, marginTop: 14, borderRadius: 2 },

  routeSec:   { padding: "80px clamp(16px,6vw,60px)", background: "#0a0f1e" },
  routeInner: { maxWidth: 1200, margin: "0 auto" },
  darkTable:  { width: "100%", borderCollapse: "collapse", fontSize: 13, background: "transparent" },
  darkTh:     { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.65)", padding: "11px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", whiteSpace: "nowrap", borderBottom: "1px solid rgba(255,255,255,0.1)" },
  darkTd:     { padding: "10px 14px", color: "rgba(255,255,255,0.65)", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: 13 },

  howSec:  { padding: "80px clamp(16px,6vw,80px)", background: "#f1f5f9", textAlign: "center" },
  howRow:  { display: "flex", justifyContent: "center", gap: 0, maxWidth: 900, margin: "0 auto", flexWrap: "wrap" },
  howStep: { flex: "1 1 160px", position: "relative", padding: "0 16px", marginBottom: 24 },
  howNum:  { width: 44, height: 44, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 18, margin: "0 auto 18px" },
  howLine: { position: "absolute", top: 22, left: "58%", right: "-42%", height: 2, background: "#CBD5E1" },
  howIcon: { fontSize: 32, marginBottom: 12 },
  howTitle:{ fontSize: 14, fontWeight: 800, color: "#1e272e", marginBottom: 7 },
  howDesc: { fontSize: 12, color: "#64748b", lineHeight: 1.6, maxWidth: 168, margin: "0 auto" },

  galSec:   { padding: "80px clamp(16px,6vw,80px)", background: "#000e22" },
  galGrid:  { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, maxWidth: 1200, margin: "0 auto" },
  galTile:  { height: "clamp(160px,20vw,240px)", borderRadius: 16, backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "#112244" },
  galArrow: { position: "absolute", top: "50%", transform: "translateY(-50%)", background: "#E31E24", color: "#fff", border: "none", width: 42, height: 42, borderRadius: "50%", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" },

  impactSec:  { display: "flex", justifyContent: "space-around", flexWrap: "wrap", padding: "52px clamp(16px,6vw,80px)", background: "#0f172a", borderTop: "3px solid #f39c12" },
  impactItem: { textAlign: "center", padding: "10px 16px" },
  impactNum:  { fontSize: "clamp(28px,5vw,40px)", fontWeight: 900, color: "#f39c12", lineHeight: 1 },
  impactLabel:{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1.5, marginTop: 6 },

  ctaSec:      { padding: "80px clamp(16px,6vw,80px)", background: "#0f172a", textAlign: "center", position: "relative", overflow: "hidden" },
  ctaGlow:     { position: "absolute", top: -120, left: "50%", transform: "translateX(-50%)", width: 600, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(227,30,36,0.13) 0%, transparent 70%)", pointerEvents: "none" },
  ctaPill:     { display: "inline-block", background: "rgba(227,30,36,0.15)", color: "#E31E24", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", padding: "5px 14px", borderRadius: 20, marginBottom: 20 },
  ctaH2:       { fontSize: "clamp(22px,4vw,46px)", fontWeight: 900, color: "#fff", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 14 },
  ctaP:        { fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 },
  ctaBtns:     { display: "flex", gap: 14, justifyContent: "center", marginTop: 32, flexWrap: "wrap" },
  ctaPrimary:  { padding: "14px 32px", background: "#E31E24", color: "#fff", border: "none", borderRadius: 10, fontWeight: 800, cursor: "pointer", fontSize: 15, boxShadow: "0 6px 24px rgba(227,30,36,0.4)" },
  ctaSecondary:{ padding: "14px 26px", background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.22)", borderRadius: 10, fontWeight: 600, cursor: "pointer", fontSize: 15 },

  footer:       { background: "#060f18", padding: "56px clamp(16px,6vw,80px) 28px", color: "#fff" },
  footerTop:    { display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40, marginBottom: 44 },
  footerBrand:  { fontSize: 20, fontWeight: 900, marginBottom: 10 },
  footerSub:    { fontSize: 13, color: "rgba(255,255,255,0.28)", lineHeight: 1.7, marginBottom: 12, whiteSpace: "pre-line" },
  footerTag:    { display: "inline-block", fontSize: 11, color: "#E31E24", background: "rgba(227,30,36,0.1)", border: "1px solid rgba(227,30,36,0.25)", padding: "3px 12px", borderRadius: 20, fontWeight: 600 },
  footerCols:   { display: "flex", gap: 52, flexWrap: "wrap" },
  footerHead:   { fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: "#f39c12", marginBottom: 16 },
  footerLink:   { fontSize: 13, color: "rgba(255,255,255,0.32)", marginBottom: 10, cursor: "pointer", transition: "color 0.2s" },
  footerRule:   { height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 24 },
  footerBottom: { display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, fontSize: 12, color: "rgba(255,255,255,0.2)" },
};
