import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { COMPANY_DETAILS } from '../data/companyData';

export const generateAndDownloadCatalogPdf = () => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const primaryGreen = [7, 36, 20] as [number, number, number]; // #072414
  const deepGreen = [10, 61, 31] as [number, number, number];   // #0a3d1f
  const accentGreen = [16, 124, 65] as [number, number, number]; // #107c41
  const lightGreenBg = [238, 247, 241] as [number, number, number]; // #eef7f1
  const softBg = [248, 250, 252] as [number, number, number];    // #f8fafc
  const darkGray = [30, 41, 59] as [number, number, number];
  const mutedGray = [100, 116, 139] as [number, number, number];

  const TOTAL_PAGES = 24;

  // Helper to add standard page header & footer
  const addHeaderFooter = (sectionTitle: string, pageNum: number) => {
    // Header banner
    doc.setFillColor(...primaryGreen);
    doc.rect(0, 0, 210, 15, 'F');
    doc.setFillColor(...accentGreen);
    doc.rect(0, 15, 210, 1, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text('MINDTECH BIOTECHNOLOGY', 14, 9.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(167, 215, 188);
    doc.text('NATURE BEYOND THE FUTURE', 72, 9.5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text(sectionTitle, 196, 9.5, { align: 'right' });

    // Footer bar
    doc.setFillColor(...softBg);
    doc.rect(0, 285, 210, 12, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.line(14, 285, 196, 285);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...mutedGray);
    doc.text('Ajaypatel@mindtec.org.in  |  +91-8368947579  |  Bawana DSIDC, New Delhi-110039', 14, 292);
    doc.text(`Page ${pageNum} of ${TOTAL_PAGES}`, 196, 292, { align: 'right' });
  };

  // Helper for Formulator Benefits Box
  const renderFormulatorBenefits = (startY: number, benefits: string[]) => {
    doc.setFillColor(...lightGreenBg);
    doc.roundedRect(14, startY, 182, 18, 2, 2, 'F');
    doc.setDrawColor(180, 220, 195);
    doc.roundedRect(14, startY, 182, 18, 2, 2, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...primaryGreen);
    doc.text('FORMULATOR BENEFITS', 18, startY + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...darkGray);
    
    // Spread 3-5 benefits horizontally
    const colWidth = 174 / benefits.length;
    benefits.forEach((b, idx) => {
      doc.text(`• ${b}`, 18 + idx * colWidth, startY + 12);
    });
  };

  // =========================================================================
  // PAGE 1: COVER PAGE
  // =========================================================================
  doc.setFillColor(...primaryGreen);
  doc.rect(0, 0, 210, 297, 'F');

  // Decorative Geometric Accents
  doc.setFillColor(...deepGreen);
  doc.rect(0, 100, 210, 4, 'F');
  doc.setFillColor(...accentGreen);
  doc.rect(0, 104, 210, 2, 'F');

  // Top Tagline
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(167, 215, 188);
  doc.text('MINDTECH BIOTECHNOLOGY INDIA PVT. LTD.', 105, 36, { align: 'center' });

  // Main Brand Headline
  doc.setFontSize(36);
  doc.setTextColor(255, 255, 255);
  doc.text('MINDTECH', 105, 54, { align: 'center' });

  doc.setFontSize(12);
  doc.setTextColor(52, 211, 153);
  doc.text('NATURE BEYOND THE FUTURE', 105, 66, { align: 'center' });

  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  doc.text('PRODUCT CATALOG', 105, 85, { align: 'center' });

  doc.setFontSize(11);
  doc.setTextColor(167, 215, 188);
  doc.text('PREMIUM BIOTECHNOLOGY SOLUTIONS', 105, 95, { align: 'center' });

  // Value Badges on Cover
  const badges = [
    'INNOVATIVE INGREDIENTS',
    'HIGH QUALITY STANDARDS',
    'TRUSTED BY PROFESSIONALS',
    'GLOBAL REACH',
    'QUALITY EXCELLENCE - OUR PROMISE'
  ];
  let badgeY = 120;
  badges.forEach((badge) => {
    doc.setFillColor(16, 124, 65);
    doc.roundedRect(45, badgeY, 120, 9, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text(badge, 105, badgeY + 6, { align: 'center' });
    badgeY += 13;
  });

  // Global Partners Banner on Cover
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(167, 215, 188);
  doc.text('DIRECT GLOBAL PRINCIPAL PARTNERS', 105, 196, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text('FINE ORGANICS  •  VVF LIMITED  •  SNS SILCOS  •  GREENTECH BIOTECHNOLOGIES', 105, 204, { align: 'center' });

  // Regulatory & Contact Footer Box
  doc.setFillColor(4, 20, 10);
  doc.roundedRect(14, 218, 182, 64, 3, 3, 'F');
  doc.setDrawColor(16, 124, 65);
  doc.roundedRect(14, 218, 182, 64, 3, 3, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(52, 211, 153);
  doc.text('MINDTECH BIOTECHNOLOGY - CONTACT & HUB', 20, 228);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(212, 236, 224);
  doc.text('Address: Ground Floor-181, Pkt-D, Sec-3 Bawana Dsidc City, Opp Delhi Jal Board, New Delhi - 110039', 20, 235);
  doc.text('Phone Hotlines: +91-8368947579  |  +91-8707403441  |  +91-9555446794', 20, 242);
  doc.text('Emails: Ajaypatel@mindtec.org.in  |  sales@mindtec.org.in  |  info@mindtec.org.in', 20, 249);
  doc.text('Government Reg: MSME NO: UDYAM-DL-06-0157900  |  Policy No: 2001/399757984/00/000', 20, 256);
  doc.text('Official Portals: www.mindechbiotechnology.com  |  www.mindtechbiotech.com', 20, 263);
  doc.text('Pillars: NATURAL FOCUS  |  SCIENCE DRIVEN  |  QUALITY ASSURED', 20, 270);

  // =========================================================================
  // PAGE 2: ABOUT US, VISION & MISSION
  // =========================================================================
  doc.addPage();
  addHeaderFooter('ABOUT US, VISION & MISSION', 2);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...primaryGreen);
  doc.text('About Us', 14, 26);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...darkGray);
  const p2About = doc.splitTextToSize(
    'Mindtech Biotechnology India Pvt. Ltd. is a trusted importer and distributor of high-quality cosmetic and personal care ingredients, delivering raw material solutions to manufacturers, formulators and personal care brands.\n\nOur portfolio brings together specialty silicones, natural actives, skin-lightening ingredients, specialty esters, conditioning ingredients and other functional raw materials designed to support the evolving needs of modern personal care formulations.\n\nWith a strong focus on quality, consistency, reliable sourcing and customer support, we work closely with our customers to provide the right ingredients for their formulation requirements.\n\nAt Mindtech, we believe that supplying ingredients is more than a transaction — it is about building dependable partnerships that contribute to innovation, formulation excellence and long-term business growth.',
    182
  );
  doc.text(p2About, 14, 34);

  // Vision Box
  doc.setFillColor(...lightGreenBg);
  doc.roundedRect(14, 110, 182, 38, 3, 3, 'F');
  doc.setDrawColor(180, 220, 195);
  doc.roundedRect(14, 110, 182, 38, 3, 3, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...primaryGreen);
  doc.text('OUR VISION', 20, 120);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...darkGray);
  const visionTxt = doc.splitTextToSize(
    'To become a trusted and preferred ingredient partner for the personal care industry by connecting quality global ingredients with innovative formulation opportunities.',
    170
  );
  doc.text(visionTxt, 20, 128);

  // Mission Box
  doc.setFillColor(...lightGreenBg);
  doc.roundedRect(14, 160, 182, 38, 3, 3, 'F');
  doc.setDrawColor(180, 220, 195);
  doc.roundedRect(14, 160, 182, 38, 3, 3, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...primaryGreen);
  doc.text('OUR MISSION', 20, 170);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...darkGray);
  const missionTxt = doc.splitTextToSize(
    'To deliver quality ingredients, dependable supply and responsive support while building long-term relationships with our customers and global partners.',
    170
  );
  doc.text(missionTxt, 20, 178);

  // =========================================================================
  // PAGE 3: WHY CHOOSE MINDTECH BIOTECHNOLOGY
  // =========================================================================
  doc.addPage();
  addHeaderFooter('WHY CHOOSE MINDTECH BIOTECHNOLOGY?', 3);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...primaryGreen);
  doc.text('Why Choose Mindtech Biotechnology?', 14, 25);

  const pillars = [
    {
      num: '01',
      title: 'GLOBAL SOURCING, LOCAL SUPPORT',
      desc: 'We connect customers with quality ingredients sourced through trusted global supply channels, backed by responsive local support.'
    },
    {
      num: '02',
      title: 'PREMIUM & DIVERSE INGREDIENT PORTFOLIO',
      desc: 'From specialty silicones and natural actives to conditioning ingredients, specialty esters and functional raw materials, our portfolio is curated for a wide range of personal care applications.'
    },
    {
      num: '03',
      title: 'QUALITY YOU CAN RELY ON',
      desc: 'We place strong emphasis on ingredient quality, consistency and dependable supply to support smooth formulation and production processes.'
    },
    {
      num: '04',
      title: 'APPLICATION-FOCUSED APPROACH',
      desc: 'We understand that every formulation has different requirements. Our team works with customers to identify suitable ingredient solutions for their specific applications.'
    },
    {
      num: '05',
      title: 'DEPENDABLE SUPPLY PARTNER',
      desc: 'Our import and distribution capabilities are focused on maintaining reliable availability and ensuring a smooth supply experience for our customers.'
    },
    {
      num: '06',
      title: 'LONG-TERM PARTNERSHIPS',
      desc: 'We believe in building lasting relationships through transparent communication, professional service and a commitment to customer satisfaction.'
    }
  ];

  let pY = 32;
  pillars.forEach((pil) => {
    doc.setFillColor(...softBg);
    doc.roundedRect(14, pY, 182, 38, 2, 2, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(14, pY, 182, 38, 2, 2, 'D');

    // Number circle
    doc.setFillColor(...primaryGreen);
    doc.circle(24, pY + 12, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(pil.num, 24, pY + 14, { align: 'center' });

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...primaryGreen);
    doc.text(pil.title, 34, pY + 14);

    // Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...darkGray);
    const dTxt = doc.splitTextToSize(pil.desc, 156);
    doc.text(dTxt, 34, pY + 22);

    pY += 41;
  });

  // =========================================================================
  // PAGE 4: INGREDIENT PORTFOLIO OVERVIEW (9 PILLARS)
  // =========================================================================
  doc.addPage();
  addHeaderFooter('INGREDIENT PORTFOLIO', 4);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...primaryGreen);
  doc.text('Ingredient Portfolio Overview', 14, 25);

  const portfolioCategories = [
    { title: 'SILICONES & SILICONE SPECIALTIES', desc: 'Advanced sensory modifiers, conditioning silicones and film-forming solutions.' },
    { title: 'SKIN LIGHTENING & ANTI-PIGMENTATION', desc: 'Targeted actives for brightening and even-toned skin formulations.' },
    { title: 'ANTI-AGEING & SKIN BARRIER ACTIVES', desc: 'Specialty ingredients for skin conditioning, moisturization and barrier support.' },
    { title: 'MOISTURIZERS, EMOLLIENTS & SOOTHING', desc: 'Hydration, moisturization and skin-comfort solutions for modern formulations.' },
    { title: 'THICKENERS & RHEOLOGY MODIFIERS', desc: 'Functional polymers for viscosity, stability, suspension and texture control.' },
    { title: 'MILD & SULFATE-FREE SURFACTANTS', desc: 'Gentle cleansing and foam solutions for skin, hair and body care formulations.' },
    { title: 'CONDITIONING AGENTS', desc: 'Performance ingredients for smoothness, manageability, strength and enhanced hair feel.' },
    { title: 'SUNSCREENS & UV FILTERS', desc: 'UV protection solutions for sun-care and daily skin-care formulations.' },
    { title: 'PRESERVATIVES & ANTIMICROBIALS', desc: 'Ingredients supporting product protection and formulation integrity.' }
  ];

  let catY = 32;
  portfolioCategories.forEach((cat, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = col === 0 ? 14 : 108;
    const y = 32 + row * 48;

    if (row < 5) {
      doc.setFillColor(...lightGreenBg);
      doc.roundedRect(x, y, 88, 44, 2, 2, 'F');
      doc.setDrawColor(180, 220, 195);
      doc.roundedRect(x, y, 88, 44, 2, 2, 'D');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(...primaryGreen);
      doc.text(`${idx + 1}. ${cat.title}`, x + 4, y + 10, { maxWidth: 80 });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(...darkGray);
      doc.text(cat.desc, x + 4, y + 24, { maxWidth: 80 });
    }
  });

  // =========================================================================
  // PAGE 5: 1. SILICONES & SILICONE SPECIALTIES
  // =========================================================================
  doc.addPage();
  addHeaderFooter('1. SILICONES & SILICONE SPECIALTIES', 5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...primaryGreen);
  doc.text('1. Silicones & Silicone Specialties', 14, 25);

  autoTable(doc, {
    startY: 30,
    head: [['PRODUCT', 'INCI NAME', 'USE / APPLICABLE', 'DOSAGE']],
    body: [
      ['SNS SFL 45', 'Cyclopentasiloxane', 'Skin Care Emulsions, Hair Care, Conditioners, Serums, Colour Cosmetics, Sunscreens, Make-up', '1–50%'],
      ['SNS STC 44', 'Cyclotetrasiloxane', 'Skin Care, Hair Care, Colour Cosmetics, Sunscreens, Toners, Make-up', '1–50%'],
      ['SNS SGB 15', 'Cyclopentasiloxane & Dimethiconol', 'Skin Care, Hair Care, Colour Cosmetics, Sunscreens, Toners, Make-up', '1–50%'],
      ['SNS SF 350 M', 'Dimethicone', 'Skin Care, Hair Care, Deodorants, Antiperspirants, Hair Conditioners', '1–10%'],
      ['SNS SPF 56', 'Phenyl Trimethicone', 'Skin Care, Hair Care, Body Creams, Lotions, Sunscreens, Make-up, Deodorants, Antiperspirants, Hair Conditioners', '1–50%'],
      ['SNS SEB 45', 'Cyclopentasiloxane & Dimethicone Crosspolymer', 'Skin Care, Hair Care, Colour Cosmetics, Sunscreens, Toners, Make-up, Deodorants, Antiperspirants, Hair Conditioners', '1–50%'],
      ['SNS SEP 93', 'PEG-12 Dimethicone', 'Face Wash, Shampoos, Shower Gel, Body Wash', '1–10%'],
      ['SNS SEP 85', 'Dimethicone, TEA & Dodecylbenzenesulfonate', '2-in-1 Shampoo & Conditioner', '0.5–5%'],
      ['SNS SAE 49', 'Amodimethicone & Cetrimonium Chloride & Trideceth-12', 'Shampoos, Conditioners', '0.5–5%'],
      ['SNS SCB 79', 'Cyclopentasiloxane & Trimethylsiloxysilicate', 'Lipstick / Colour Cosmetics', '1–5%'],
      ['SNS SMR 16', 'Trimethylsiloxysilicate', 'Colour Cosmetics / Lipstick', 'Not specified'],
      ['SNS SAF 701', 'Dimethicone/Vinyl Dimethicone Crosspolymer & Silica', 'Colour Cosmetics, Skin Care, Sun Care, Hydrogels', '0.05–1%'],
      ['SNS SCB 31', 'Cyclopentasiloxane & Phenyl Trimethicone & Dimethiconol & C12-15 Alkyl Benzoate & Dimethicone Crosspolymer', 'Hair Care, Skin Care & Sun Care', '1–5%'],
      ['SNS SCB 21', 'Cyclopentasiloxane & Phenyl Trimethicone & Dimethiconol & C12-15 Alkyl Benzoate & Dimethicone Crosspolymer', 'Hair Care, Hair Spray, Leave-on Conditioner, Colour Cosmetics', '3–10%']
    ],
    theme: 'grid',
    headStyles: { fillColor: primaryGreen, textColor: 255, fontStyle: 'bold', fontSize: 7.5 },
    bodyStyles: { fontSize: 7, cellPadding: 2 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 26 },
      1: { cellWidth: 54 },
      2: { cellWidth: 84 },
      3: { cellWidth: 18, halign: 'center' }
    }
  });

  const finalY5 = (doc as any).lastAutoTable.finalY + 6;
  renderFormulatorBenefits(finalY5, [
    'Silky & Smooth Feel: Elegant texture',
    'Hair Conditioning: Reduces frizz',
    'Spreadability: Luxurious glide',
    'Protective Barrier: Locks moisture',
    'Versatile Formulation'
  ]);

  // =========================================================================
  // PAGE 6: 2. SKIN LIGHTENING & ANTI-PIGMENTATION ACTIVES
  // =========================================================================
  doc.addPage();
  addHeaderFooter('2. SKIN LIGHTENING & ANTI-PIGMENTATION', 6);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...primaryGreen);
  doc.text('2. Skin Lightening & Anti-Pigmentation Actives', 14, 25);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...mutedGray);
  doc.text('Advanced actives to reduce pigmentation, even skin tone and enhance natural radiance.', 14, 30);

  autoTable(doc, {
    startY: 35,
    head: [['PRODUCT', 'INCI NAME', 'USE / APPLICABLE', 'DOSAGE']],
    body: [
      ['Alpha Arbutin', 'Alpha Arbutin', 'Creams, Lotions, Scrubs, Masks, Serums, Face Packs', '0.2–2%'],
      ['Beta Arbutin', 'Beta Arbutin', 'Creams, Lotions, Scrubs, Masks, Serums', '1–7%'],
      ['Kojic Acid', 'Kojic Acid', 'Creams, Lotions, Scrubs, Masks, Serums, Face Packs', '0.5–5%'],
      ['Kojic Acid Dipalmitate', 'Kojic Acid Dipalmitate', 'Creams, Lotions, Scrubs, Masks, Serums, Face Packs', '0.5–5%'],
      ['Ethyl Ascorbic Acid', 'Ethyl Ascorbic Acid', 'Creams, Lotions, Scrubs, Masks, Serums, Face Packs', '0.5–25%'],
      ['Niacinamide', 'Niacinamide', 'Fairness Creams, Sunscreens, Moisturizers, Hair Tonics, Bath Products, Shampoos', '0.1–2%']
    ],
    theme: 'grid',
    headStyles: { fillColor: primaryGreen, textColor: 255, fontStyle: 'bold', fontSize: 8 },
    bodyStyles: { fontSize: 7.5, cellPadding: 3 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 38 },
      1: { cellWidth: 44 },
      2: { cellWidth: 80 },
      3: { cellWidth: 20, halign: 'center' }
    }
  });

  const finalY6 = (doc as any).lastAutoTable.finalY + 8;
  renderFormulatorBenefits(finalY6, [
    'Targets Tyrosinase Pathway',
    'Prevents UV-Induced Dark Spots',
    'Visible Brightening & Glow',
    'High Compatibility with Serums'
  ]);

  // =========================================================================
  // PAGE 7: 3. ANTI-AGEING & 4. MOISTURIZERS
  // =========================================================================
  doc.addPage();
  addHeaderFooter('3. ANTI-AGEING & 4. MOISTURIZERS', 7);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...primaryGreen);
  doc.text('3. Anti-Ageing & Anti-Wrinkle Actives', 14, 24);

  autoTable(doc, {
    startY: 28,
    head: [['PRODUCT', 'INCI NAME', 'USE / APPLICABLE', 'DOSAGE']],
    body: [
      ['Ceramides', 'Ceramides', 'Creams, Lotions, Serums, Masks, Oils', '0.5–2%']
    ],
    theme: 'grid',
    headStyles: { fillColor: primaryGreen, textColor: 255, fontStyle: 'bold', fontSize: 8 },
    bodyStyles: { fontSize: 7.5, cellPadding: 2.5 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 38 },
      1: { cellWidth: 44 },
      2: { cellWidth: 80 },
      3: { cellWidth: 20, halign: 'center' }
    }
  });

  const finalY7_1 = (doc as any).lastAutoTable.finalY + 4;
  renderFormulatorBenefits(finalY7_1, [
    'Improves Skin Elasticity',
    'Strengthens Skin Barrier',
    'Reduces Signs of Ageing',
    'Deep Nourishment'
  ]);

  const startY7_2 = finalY7_1 + 26;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...primaryGreen);
  doc.text('4. Moisturizers, Emollients & Soothing Actives', 14, startY7_2);

  autoTable(doc, {
    startY: startY7_2 + 4,
    head: [['PRODUCT', 'INCI NAME', 'USE / APPLICABLE', 'DOSAGE']],
    body: [
      ['Sodium PCA', 'Sodium PCA', 'Creams, Lotions, Serums, Face Wash, Shampoo, Conditioners', '1–5%'],
      ['Allantoin', 'Allantoin', 'Creams, Lotions, Serums, Face Wash, Shampoo, Conditioners', '0.2–2%'],
      ['D-Panthenol', 'D-Panthenol', 'Creams, Lotions, Serums (Recommended effective level: 0.5-2%)', '0.5–0.2%*']
    ],
    theme: 'grid',
    headStyles: { fillColor: primaryGreen, textColor: 255, fontStyle: 'bold', fontSize: 8 },
    bodyStyles: { fontSize: 7.5, cellPadding: 2.5 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 38 },
      1: { cellWidth: 44 },
      2: { cellWidth: 80 },
      3: { cellWidth: 20, halign: 'center' }
    }
  });

  const finalY7_2 = (doc as any).lastAutoTable.finalY + 4;
  renderFormulatorBenefits(finalY7_2, [
    'Intense Hydration & NMF',
    'Soothes & Calms Irritation',
    'Enhances Skin Resilience',
    'Supple & Soft Feel'
  ]);

  // =========================================================================
  // PAGE 8: 5. THICKENERS & RHEOLOGY MODIFIERS
  // =========================================================================
  doc.addPage();
  addHeaderFooter('5. THICKENERS & RHEOLOGY MODIFIERS', 8);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...primaryGreen);
  doc.text('5. Thickeners & Rheology Modifiers', 14, 25);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...mutedGray);
  doc.text('High-performance polymers that enhance viscosity, stability and texture of cosmetic formulations.', 14, 30);

  autoTable(doc, {
    startY: 35,
    head: [['PRODUCT', 'INCI NAME', 'USE / APPLICABLE', 'DOSAGE']],
    body: [
      ['Acrylates Copolymer', 'Acrylates Copolymer', 'Face Wash, Body Wash, Shampoos, Shower Gel', '2–8%'],
      ['Acrylates/C10-30 Alkyl Acrylate Crosspolymer', 'Acrylates/C10-30 Alkyl Acrylate Crosspolymer', 'Face Wash, Body Wash, Shampoos, Shower Gel, Creams, Lotions, Hair Gels', '0.2–1%'],
      ['Carbomer 940', 'Carbomer 940', 'Creams, Lotions, Serums, Gels, Hand Sanitizers', '0.2–1%'],
      ['Carbomer 980', 'Carbomer 980', 'Creams, Lotions, Shampoos, Gels', '0.2–1%']
    ],
    theme: 'grid',
    headStyles: { fillColor: primaryGreen, textColor: 255, fontStyle: 'bold', fontSize: 8 },
    bodyStyles: { fontSize: 7.5, cellPadding: 3 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 44 },
      1: { cellWidth: 46 },
      2: { cellWidth: 72 },
      3: { cellWidth: 20, halign: 'center' }
    }
  });

  const finalY8 = (doc as any).lastAutoTable.finalY + 8;
  renderFormulatorBenefits(finalY8, [
    'Crystal Clear Gel Formation',
    'Excellent Particle Suspension',
    'Stable at Wide pH Ranges',
    'Non-Tacky Skin Sensory Feel'
  ]);

  // =========================================================================
  // PAGE 9: 6. MILD & SULFATE-FREE SURFACTANTS
  // =========================================================================
  doc.addPage();
  addHeaderFooter('6. MILD & SULFATE-FREE SURFACTANTS', 9);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...primaryGreen);
  doc.text('6. Mild & Sulfate-Free Surfactants', 14, 25);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...mutedGray);
  doc.text('Gentle, plant-derived surfactants that cleanse effectively while respecting the skin and scalp barrier.', 14, 30);

  autoTable(doc, {
    startY: 35,
    head: [['PRODUCT', 'INCI NAME', 'USE / APPLICABLE', 'DOSAGE']],
    body: [
      ['Coco Glucoside', 'Coco Glucoside', 'Shampoos, Face Wash, Body Wash, Shower Gel, Baby Care', '3–20%'],
      ['Decyl Glucoside', 'Decyl Glucoside', 'Shampoos, Face Wash, Cleansers, Shower Gels, Bubble Bath, Body Wash, Soap Bars, Hand Wash', '3–20%'],
      ['Lauryl Glucoside', 'Lauryl Glucoside', 'Shampoos, Face Wash, Cleansers, Shower Gels, Bubble Bath, Body Wash, Soap Bars, Hand Wash', '3–20%'],
      ['Sodium Cocoyl Isethionate', 'Sodium Cocoyl Isethionate', 'Soap Base, Cleansing Products', '2–25%'],
      ['CAPB', 'CAPB', 'Cleansing Products, Foam Booster & Thickener', '2–10%']
    ],
    theme: 'grid',
    headStyles: { fillColor: primaryGreen, textColor: 255, fontStyle: 'bold', fontSize: 8 },
    bodyStyles: { fontSize: 7.5, cellPadding: 3 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 38 },
      1: { cellWidth: 42 },
      2: { cellWidth: 82 },
      3: { cellWidth: 20, halign: 'center' }
    }
  });

  const finalY9 = (doc as any).lastAutoTable.finalY + 8;
  renderFormulatorBenefits(finalY9, [
    'Gentle Cleansing without stripping',
    'Skin & Scalp Friendly (Low Irritation)',
    'Rich & Stable Foam Quality',
    '100% Plant-Derived & Renewable'
  ]);

  // =========================================================================
  // PAGE 10: 7. CONDITIONING AGENTS & 8. SUNSCREENS
  // =========================================================================
  doc.addPage();
  addHeaderFooter('7. CONDITIONING & 8. SUNSCREENS', 10);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...primaryGreen);
  doc.text('7. Conditioning Agents', 14, 24);

  autoTable(doc, {
    startY: 28,
    head: [['PRODUCT', 'INCI NAME', 'USE / APPLICABLE', 'DOSAGE']],
    body: [
      ['Polyquaternium-7', 'Polyquaternium-7', 'Skin & Hair Care Formulations', '0.5–3%'],
      ['Polyquaternium-10', 'Polyquaternium-10', 'Shampoo & Hair Care', '0.5–5%'],
      ['Polyquaternium-39', 'Polyquaternium-39', 'Hair Care / Hair Growth Formula', '0.5–5%'],
      ['Hydrolyzed Keratin', 'Hydrolyzed Keratin', 'Hair Care, Skin Care', '0.5–5%']
    ],
    theme: 'grid',
    headStyles: { fillColor: primaryGreen, textColor: 255, fontStyle: 'bold', fontSize: 8 },
    bodyStyles: { fontSize: 7.5, cellPadding: 2.5 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 38 },
      1: { cellWidth: 44 },
      2: { cellWidth: 80 },
      3: { cellWidth: 20, halign: 'center' }
    }
  });

  const finalY10_1 = (doc as any).lastAutoTable.finalY + 4;
  renderFormulatorBenefits(finalY10_1, [
    'Improves Manageability & Combability',
    'Softness & Natural Shine',
    'Strengthens Hair Structure'
  ]);

  const startY10_2 = finalY10_1 + 26;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...primaryGreen);
  doc.text('8. Sunscreens & UV Filters', 14, startY10_2);

  autoTable(doc, {
    startY: startY10_2 + 4,
    head: [['PRODUCT', 'INCI NAME', 'USE / APPLICABLE', 'DOSAGE']],
    body: [
      ['Avobenzone', 'Avobenzone', 'Sunscreen Creams, Lotions, Anti-ageing Products, Skin Lightening Products', '1–5%'],
      ['Benzophenone-3 / Oxybenzone', 'Benzophenone-3 / Oxybenzone', 'Sunscreen / Cosmetic Formulations', '1–5%'],
      ['Benzophenone-4', 'Benzophenone-4', 'Skin Care, Hair Care, Sunscreen Products', '1–5%'],
      ['Micronized TiO2', 'Titanium Dioxide', 'Sun Care / UV Protection', '1–20%'],
      ['Octocrylene', 'Octocrylene', 'Sun Care / Sunscreen Formulations', '1–5%'],
      ['Octyl Salicylate', 'Octyl Salicylate', 'Sun Care, Skin Care, Protective Hair Care & Lip Care', '1–5%']
    ],
    theme: 'grid',
    headStyles: { fillColor: primaryGreen, textColor: 255, fontStyle: 'bold', fontSize: 8 },
    bodyStyles: { fontSize: 7, cellPadding: 2 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 42 },
      1: { cellWidth: 42 },
      2: { cellWidth: 78 },
      3: { cellWidth: 20, halign: 'center' }
    }
  });

  const finalY10_2 = (doc as any).lastAutoTable.finalY + 4;
  renderFormulatorBenefits(finalY10_2, [
    'Broad-Spectrum UVA & UVB Shield',
    'High Photo-Stability Factor',
    'Prevents Premature Photo-Ageing'
  ]);

  // =========================================================================
  // PAGE 11: 9. PRESERVATIVES & ANTIMICROBIALS
  // =========================================================================
  doc.addPage();
  addHeaderFooter('9. PRESERVATIVES & ANTIMICROBIALS', 11);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...primaryGreen);
  doc.text('9. Preservatives & Antimicrobials', 14, 25);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...mutedGray);
  doc.text('Effective preservation and antimicrobial actives to protect formulations and ensure product safety.', 14, 30);

  autoTable(doc, {
    startY: 35,
    head: [['PRODUCT', 'INCI NAME', 'USE / APPLICABLE', 'DOSAGE']],
    body: [
      ['Imidazolidinyl Urea', 'Imidazolidinyl Urea', 'Skin Care, Hair Care, Sunscreens, Personal Care', '0.2–2%'],
      ['DMDMH & IPBC', 'DMDMH & Iodopropyl Butylcarbamate (IPBC)', 'Personal Care / Cosmetic Products', '0.3–1%'],
      ['Cetyl Pyridinium Chloride (CPC)', 'Cetyl Pyridinium Chloride', 'Mouthwash, Toothpaste, Deodorants, Toiletries, Facial Wipes', '0.05–1%']
    ],
    theme: 'grid',
    headStyles: { fillColor: primaryGreen, textColor: 255, fontStyle: 'bold', fontSize: 8 },
    bodyStyles: { fontSize: 7.5, cellPadding: 3 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 42 },
      1: { cellWidth: 50 },
      2: { cellWidth: 70 },
      3: { cellWidth: 20, halign: 'center' }
    }
  });

  const finalY11 = (doc as any).lastAutoTable.finalY + 8;
  renderFormulatorBenefits(finalY11, [
    'Broad-Spectrum Microbial Protection',
    'Effective Against Bacteria, Yeast & Mold',
    'Maintains Long-Term Product Integrity',
    'Compatible with Emulsions and Surfactants'
  ]);

  // =========================================================================
  // PAGE 12: GREENTECH BIOTECHNOLOGIES - 24 CATEGORIES DIRECTORY
  // =========================================================================
  doc.addPage();
  addHeaderFooter('GREENTECH BIOTECHNOLOGIES - 24 PILLARS', 12);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...primaryGreen);
  doc.text('Greentech Biotechnologies - 24 Active Categories', 14, 24);

  const gtCategories = [
    '1. Skin Care Actives', '2. Anti-Ageing & Firming', '3. Skin Brightening', '4. Hydration & Barrier',
    '5. Soothing & Defense', '6. Anti-Acne & Sebum', '7. Hair Growth & Anti-Loss', '8. Anti-Dandruff & Scalp',
    '9. Hair Strengthening', '10. Anti-Greying Actives', '11. Hair Volumizing', '12. Hair UV/Pollution',
    '13. Natural & Botanicals', '14. Silicones Specialties', '15. Emollients & Esters', '16. Emulsifiers & Solubilizers',
    '17. Surfactants & Cleansing', '18. Conditioning Agents', '19. Thickeners & Rheology', '20. Preservatives & Biocides',
    '21. Potent Antioxidants', '22. Sunscreens & UV', '23. Vitamins & Derivatives', '24. Functional Specialties'
  ];

  let gtY = 30;
  gtCategories.forEach((cat, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const x = 14 + col * 62;
    const y = 30 + row * 28;

    doc.setFillColor(...lightGreenBg);
    doc.roundedRect(x, y, 58, 24, 2, 2, 'F');
    doc.setDrawColor(180, 220, 195);
    doc.roundedRect(x, y, 58, 24, 2, 2, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...primaryGreen);
    doc.text(cat, x + 3, y + 8, { maxWidth: 52 });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(...darkGray);
    doc.text('Clinical grade bioactive solutions', x + 3, y + 16);
  });

  // =========================================================================
  // PAGE 13: GREENTECH 1. SKIN CARE - WELL-AGING / ANTI-AGEING
  // =========================================================================
  doc.addPage();
  addHeaderFooter('GREENTECH: 1. ANTI-AGEING ACTIVES', 13);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...primaryGreen);
  doc.text('1. Skin Care – Well-Aging / Anti-Ageing Actives', 14, 24);

  autoTable(doc, {
    startY: 28,
    head: [['PRODUCT', 'INCI / ACTIVE MOLECULES', 'MAIN USE / BENEFIT', 'APPLICATION', 'DOSE']],
    body: [
      ['HEBELYS®', 'Sphingomonas ferment / polar lipids', 'Anti-ageing, mature skin, wrinkle, radiance, skin & mood uplift', 'Anti-ageing creams, serums', '1%'],
      ['EPICA®', 'Standardized blackcurrant leaf & pine bark extracts', 'Antioxidant, wrinkle & fine-line protection', 'Anti-ageing creams, serums', '0.5–5%'],
      ['NUCLEOLYS', 'White quebracho extract, fermented & bio-purified; gallic acid / proanthocyanidins', 'DNA protection, oxidative & UV-stress protection', 'Anti-ageing / protective skin care', '2–5%'],
      ['SETILINE® SN', 'Oligogalactomannans from fenugreek seed', 'Anti-glycation, wrinkle reduction, skin firmness', 'Anti-ageing formulations', '1%'],
      ['COSMELENE® CENTELLA', 'Centella asiatica extract, asiaticoside/madecassoside', 'Collagen support, wrinkle reduction, skin relief', 'Creams, serums, firming care', '1–10%'],
      ['GOLDEN MICROALGAE', 'Tetraselmis chuii extract', 'Skin hydration, renewal, antioxidant protection, radiance', 'Anti-ageing / revitalizing care', '1%'],
      ['TIMELYS®', 'Schisandra chinensis extract, lignans / AHA', 'Radiance, hydration, skin barrier & microcirculation', 'Anti-ageing / revitalizing care', '1%'],
      ['REVERSKIN®', 'Polysaccharides/polyphenols from fern Polypodium leucotomos', 'Firming, regeneration, wrinkle smoothing', 'Firming / redensifying products', '2%'],
      ['QT40®', 'Green seaweed Ulva lactuca extract', 'V-shape lifting, firmness & elasticity, dermal-filler effect', 'Lifting / firming serums & creams', '2%'],
      ['COSMELENE® TERMINALIA', 'Terminalia arjuna extract, triterpenic acids', 'Skin firmness, tonicity, collagen support', 'Firming / anti-ageing', '1–10%'],
      ['COSMELENE® GINSENG', 'Ginseng root extract / ginsenosides', 'Firmness, tonicity, collagen synthesis', 'Anti-ageing / firming', '1–10%'],
      ['COSMELENE® HORSETAIL', 'Horsetail extract, flavonoids & silica', 'Firmness, connective tissue support', 'Firming / anti-ageing', '1–10%'],
      ['LIPACTIVE® GREEN COFFEE', 'Green coffee seed oil, fatty acids, sterols, vitamin E & caffeine', 'Firming, softening, nourishment', 'Skin care / body care', '1–3%']
    ],
    theme: 'grid',
    headStyles: { fillColor: primaryGreen, textColor: 255, fontStyle: 'bold', fontSize: 7 },
    bodyStyles: { fontSize: 6.5, cellPadding: 1.8 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 26 },
      1: { cellWidth: 48 },
      2: { cellWidth: 54 },
      3: { cellWidth: 38 },
      4: { cellWidth: 16, halign: 'center' }
    }
  });

  const finalY13 = (doc as any).lastAutoTable.finalY + 4;
  renderFormulatorBenefits(finalY13, [
    'Combine QT40 & Centella for Max Lifting',
    'Enhance DNA Defense with Nucleolys',
    'Multi-Active Synergies',
    'Target Multiple Signs of Ageing'
  ]);

  // =========================================================================
  // PAGE 14: GREENTECH 2. ANTIOXIDANTS & 3. SKIN RENEWAL
  // =========================================================================
  doc.addPage();
  addHeaderFooter('GREENTECH: 2. ANTIOXIDANTS & 3. EXFOLIATION', 14);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...primaryGreen);
  doc.text('2. Antioxidants & Anti-Fatigue', 14, 24);

  autoTable(doc, {
    startY: 28,
    head: [['PRODUCT', 'INCI / ACTIVE MOLECULES', 'MAIN USE / BENEFIT', 'APPLICATION', 'DOSE']],
    body: [
      ['TEALINE®', 'Green tea + rooibos extracts; catechins & flavonoids', 'Antioxidant, photo-ageing & environmental-stress protection', 'Anti-ageing / antioxidant care', '0.5–2%'],
      ['FERMENT’ACTIVE GOJI', 'Fermented Lycium barbarum fruit extract', 'Antioxidant, free-radical protection', 'Skin care / antioxidant products', '1–3%'],
      ['FERMENT’ACTIVE POMEGRANATE', 'Fermented Punica granatum fruit extract, polyphenols & tannins', 'Antioxidant, oxidative-stress protection', 'Anti-ageing / antioxidant care', '1–3%'],
      ['CIRCALYS®', 'Andrographis paniculata leaf extract', 'Anti-fatigue, dark-circle/eye-bag care, energizing', 'Face, eye & body care', '1%'],
      ['SOMITINE®', 'Purified mannosyl glucuronic acid oligosaccharide', 'Cellular energy, radiance, anti-fatigue', 'Skin revitalization', '2–5%']
    ],
    theme: 'grid',
    headStyles: { fillColor: primaryGreen, textColor: 255, fontStyle: 'bold', fontSize: 7 },
    bodyStyles: { fontSize: 6.5, cellPadding: 1.8 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 28 },
      1: { cellWidth: 48 },
      2: { cellWidth: 54 },
      3: { cellWidth: 36 },
      4: { cellWidth: 16, halign: 'center' }
    }
  });

  const startY14_2 = (doc as any).lastAutoTable.finalY + 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...primaryGreen);
  doc.text('3. Skin Renewal / Exfoliation / Radiance', 14, startY14_2);

  autoTable(doc, {
    startY: startY14_2 + 4,
    head: [['PRODUCT', 'INCI / ACTIVE MOLECULES', 'MAIN USE / BENEFIT', 'APPLICATION', 'DOSE']],
    body: [
      ['FLOWER ACIDS®', 'Hibiscus sabdariffa flower extract; organic acids (AHA)', 'Cell renewal, exfoliation, radiance', 'Peels, exfoliating & brightening products', '2–10%'],
      ['PROTEASE', 'Protease (Subtilisin) from Bacillus subtilis', 'Enzymatic exfoliation, skin renewal', 'Enzyme peels / exfoliation', '0.1–0.5%'],
      ['ACEROMINE', 'Acerola fruit extract, Vitamin C liposome technology', 'Antioxidant, collagen support, brightening', 'Vitamin C serums / creams', '2–5%'],
      ['RETIMINE® III', 'Pro-vitamin A encapsulated; retinyl palmitate', 'Skin regeneration, elasticity, smoothing', 'Anti-ageing / revitalizing care', '1–5%'],
      ['ROSAMINE', 'Vitamins A, C, E, F + carotenoids', 'Skin nutrition, antioxidant & anti-ageing', 'Vitamin concentrate / serums', '1–5%']
    ],
    theme: 'grid',
    headStyles: { fillColor: primaryGreen, textColor: 255, fontStyle: 'bold', fontSize: 7 },
    bodyStyles: { fontSize: 6.5, cellPadding: 1.8 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 28 },
      1: { cellWidth: 48 },
      2: { cellWidth: 54 },
      3: { cellWidth: 36 },
      4: { cellWidth: 16, halign: 'center' }
    }
  });

  const finalY14 = (doc as any).lastAutoTable.finalY + 4;
  renderFormulatorBenefits(finalY14, [
    'Cell Renewal & Gentle Exfoliation',
    'Boosts Natural Glow & Vitality',
    'Antioxidant & Collagen Support'
  ]);

  // =========================================================================
  // PAGE 15: GREENTECH 4. SKIN BRIGHTENING & 5. EYE CARE
  // =========================================================================
  doc.addPage();
  addHeaderFooter('GREENTECH: 4. BRIGHTENING & 5. EYE CARE', 15);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...primaryGreen);
  doc.text('4. Skin Brightening / Anti-Pigmentation', 14, 24);

  autoTable(doc, {
    startY: 28,
    head: [['PRODUCT', 'INCI / ACTIVE MOLECULES', 'MAIN USE / BENEFIT', 'APPLICATION', 'DOSE']],
    body: [
      ['CLERILYS® / CLERILYS W®', 'Hibiscus, mulberry, cucumber extracts; phenolic compounds', 'Dark spots, pigmentation, even skin tone', 'Brightening creams, serums', '1–3%'],
      ['PHYTELENE COMPLEX LIGHTENING EGX 293', 'Daisy, Madonna lily, licorice & camu extracts', 'Brightening, melanin synthesis/transfer control', 'Brightening / anti-spot', '1–5%'],
      ['RAYOLYS', 'Peach, apple & raspberry extracts; flavonoids / AHA', 'Dark-spot & complexion lightening', 'Brightening / skin lightener', '1–5%'],
      ['SOLIBERINE®', 'Buddleja officinalis extract; phenylpropanoids', 'UV/blue-light/IR protection, hyperpigmentation prevention', 'Sun care, anti-pigmentation', '0.2–2%']
    ],
    theme: 'grid',
    headStyles: { fillColor: primaryGreen, textColor: 255, fontStyle: 'bold', fontSize: 7 },
    bodyStyles: { fontSize: 6.5, cellPadding: 2 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 34 },
      1: { cellWidth: 46 },
      2: { cellWidth: 52 },
      3: { cellWidth: 34 },
      4: { cellWidth: 16, halign: 'center' }
    }
  });

  const startY15_2 = (doc as any).lastAutoTable.finalY + 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...primaryGreen);
  doc.text('5. Eye Care (Dark Circles & Puffiness)', 14, startY15_2);

  autoTable(doc, {
    startY: startY15_2 + 4,
    head: [['PRODUCT', 'INCI / ACTIVE MOLECULES', 'MAIN USE / BENEFIT', 'APPLICATION', 'DOSE']],
    body: [
      ['MYRALYS®', 'Gentiana lutea root extract / gentiopicroside', 'Eye contour rejuvenation, dark circles, eye bags', 'Eye creams, eye serums', '0.1–0.5%'],
      ['CERNILYS®', 'Cedar bark extract', 'Dark-circle reduction, vascular tone, antioxidant', 'Eye contour products', '1%']
    ],
    theme: 'grid',
    headStyles: { fillColor: primaryGreen, textColor: 255, fontStyle: 'bold', fontSize: 7 },
    bodyStyles: { fontSize: 6.5, cellPadding: 2 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 34 },
      1: { cellWidth: 46 },
      2: { cellWidth: 52 },
      3: { cellWidth: 34 },
      4: { cellWidth: 16, halign: 'center' }
    }
  });

  const finalY15 = (doc as any).lastAutoTable.finalY + 4;
  renderFormulatorBenefits(finalY15, [
    'Reduces Dark Circles & Eye Bags',
    'Supports Microcirculation',
    'Gentle for Sensitive Eye Zone'
  ]);

  // =========================================================================
  // PAGE 16: GREENTECH 6. SEBUM CONTROL & 7. MOISTURIZATION
  // =========================================================================
  doc.addPage();
  addHeaderFooter('GREENTECH: 6. SEBUM & 7. MOISTURIZATION', 16);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...primaryGreen);
  doc.text('6. Sebum Control / Anti-Blemish / Anti-Acne', 14, 24);

  autoTable(doc, {
    startY: 28,
    head: [['PRODUCT', 'INCI / ACTIVE MOLECULES', 'MAIN USE / BENEFIT', 'APPLICATION', 'DOSE']],
    body: [
      ['ACNILYS®', 'Rhodomyrtus tomentosa fruit extract', 'Sebum control, anti-blemish, microbiota modulation', 'Acne / oily-skin products', '2%'],
      ['CANNABIDIOL (CBD) ISOLATE POWDER', 'Cannabidiol, CBD ≥98%', 'Sebum control, soothing, antioxidant, anti-ageing', 'Leave-on / rinse-off formulations', '0.01–0.4% leave-on; up to 5% rinse-off'],
      ['GREENSIL®', 'Bamboo silica powder', 'Sebum absorption, mattifying, deodorant/anti-perspirant', 'Face powders, masks, body care', '0.5–5%'],
      ['SEBORILYS', 'Rosemary, terminalia, nasturtium & microalgae complex', 'Sebum regulation, anti-blemish, antimicrobial', 'Oily skin / scalp care', '1–5%']
    ],
    theme: 'grid',
    headStyles: { fillColor: primaryGreen, textColor: 255, fontStyle: 'bold', fontSize: 7 },
    bodyStyles: { fontSize: 6.5, cellPadding: 2 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 32 },
      1: { cellWidth: 44 },
      2: { cellWidth: 54 },
      3: { cellWidth: 34 },
      4: { cellWidth: 18, halign: 'center' }
    }
  });

  const startY16_2 = (doc as any).lastAutoTable.finalY + 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...primaryGreen);
  doc.text('7. Skin Moisturization & Hydration', 14, startY16_2);

  autoTable(doc, {
    startY: startY16_2 + 4,
    head: [['PRODUCT', 'INCI / ACTIVE MOLECULES', 'MAIN USE / BENEFIT', 'APPLICATION', 'DOSE']],
    body: [
      ['CARICILINE®', 'Fig extract, sugars & AHA', 'Long-term moisturization, NMF support', 'Creams, lotions, serums', '1%'],
      ['COSMELENE® NEPTUNE KELP', 'Laminaria saccharina extract, polysaccharides', 'Long-lasting hydration, comfort', 'Moisturizers', '1–5%'],
      ['HYDRALYS M', 'Cantaloupe melon extract, sugars', 'Long-term moisturization, water-loss control', 'Moisturizers / lotions', '1–10%'],
      ['HOLOBIOSYS®', 'Gentiana lutea + fermented extract', 'Deep hydration, lipid synthesis, barrier support', 'Skin hydration / barrier care', '1%'],
      ['JERICINE®', 'Selaginella lepidophylla extract / trehalose', 'Moisturization, anti-stress, dehydration protection', 'Moisturizers', '1–5%'],
      ['POLEVAN S', 'Levan biopolymer', 'Hyaluronic-acid-like moisturization, skin renewal', 'Hydrating formulations', '1–2%']
    ],
    theme: 'grid',
    headStyles: { fillColor: primaryGreen, textColor: 255, fontStyle: 'bold', fontSize: 7 },
    bodyStyles: { fontSize: 6.5, cellPadding: 1.8 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 32 },
      1: { cellWidth: 44 },
      2: { cellWidth: 54 },
      3: { cellWidth: 34 },
      4: { cellWidth: 18, halign: 'center' }
    }
  });

  const finalY16 = (doc as any).lastAutoTable.finalY + 4;
  renderFormulatorBenefits(finalY16, [
    'Intense & Long-Lasting Hydration',
    'Prevents Transepidermal Water Loss',
    'Boosts Lipid Synthesis'
  ]);

  // =========================================================================
  // PAGE 17: GREENTECH 8. NUTRITION & 9. SOOTHING / SENSITIVE SKIN
  // =========================================================================
  doc.addPage();
  addHeaderFooter('GREENTECH: 8. NUTRITION & 9. SENSITIVE SKIN', 17);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...primaryGreen);
  doc.text('8. Skin Nutrition / Repair', 14, 24);

  autoTable(doc, {
    startY: 28,
    head: [['PRODUCT', 'INCI / ACTIVE MOLECULES', 'MAIN USE / BENEFIT', 'APPLICATION', 'DOSE']],
    body: [
      ['LIPACTIVE® CAMELINA', 'Camelina sativa seed oil, omega 3/6/9', 'Nourishment, softness, cell-membrane support', 'Face / body / hair oils', '1–5%'],
      ['LIPACTIVE® INCA INCHI', 'Plukenetia volubilis seed oil, omega 3/6', 'Skin repair, softness, nourishment', 'Skin & hair care', '1–5%'],
      ['LIPACTIVE® TAMANOL', 'Calophyllum inophyllum seed oil', 'Regenerative / repair, fibroblast support', 'Repair / stretch-mark products', '1–5%']
    ],
    theme: 'grid',
    headStyles: { fillColor: primaryGreen, textColor: 255, fontStyle: 'bold', fontSize: 7 },
    bodyStyles: { fontSize: 6.5, cellPadding: 2 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 32 },
      1: { cellWidth: 46 },
      2: { cellWidth: 54 },
      3: { cellWidth: 34 },
      4: { cellWidth: 16, halign: 'center' }
    }
  });

  const startY17_2 = (doc as any).lastAutoTable.finalY + 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...primaryGreen);
  doc.text('9. Anti-Redness / Soothing / Sensitive Skin', 14, startY17_2);

  autoTable(doc, {
    startY: startY17_2 + 4,
    head: [['PRODUCT', 'INCI / ACTIVE MOLECULES', 'MAIN USE / BENEFIT', 'APPLICATION', 'DOSE']],
    body: [
      ['EXPOZEN®', 'Halymenia durvillei extract', 'Sensitive / reactive skin, redness, soothing, microbiota', 'Sensitive-skin care', '1–5%'],
      ['PROTECTOL®', 'Birch bark + figwort extracts', 'Anti-inflammatory, redness, UV-induced irritation', 'Sensitive / after-sun care', '1–5%'],
      ['BIOMODULINE', 'Shiitake extract / beta-glucans', 'Skin defence, soothing, hypersensitivity support', 'Sensitive-skin products', '0.5–2%'],
      ['COSMELENE® ECHINACEA', 'Echinacea angustifolia root extract', 'Soothing, anti-inflammatory, antioxidant', 'Sensitive / after-sun', '1–10%'],
      ['COSMELENE® MATRICARIA', 'Chamomilla recutita flower extract', 'Anti-redness, soothing, eye decongestant', 'Eye & sensitive-skin care', '1–10%'],
      ['COSMELENE® PASSION FLOWER', 'Passiflora incarnata flower extract', 'Soothing, antioxidant, after-sun', 'Soothing / sensitive skin', '1–10%'],
      ['SILIDINE® SN', 'Marine red microalgae extract', 'Vascular toning, redness & microcirculation', 'Redness / leg-care products', '1%'],
      ['COSMELENE® HAWTHORN', 'Crataegus monogyna flower extract', 'Anti-redness, UV / thermal stress relief', 'Sensitive / anti-redness', '1–5%']
    ],
    theme: 'grid',
    headStyles: { fillColor: primaryGreen, textColor: 255, fontStyle: 'bold', fontSize: 7 },
    bodyStyles: { fontSize: 6.5, cellPadding: 1.8 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 32 },
      1: { cellWidth: 46 },
      2: { cellWidth: 54 },
      3: { cellWidth: 34 },
      4: { cellWidth: 16, halign: 'center' }
    }
  });

  const finalY17 = (doc as any).lastAutoTable.finalY + 4;
  renderFormulatorBenefits(finalY17, [
    'Calms & Soothes Reactive Skin',
    'Strengthens Microcirculation',
    'Restores Microbiota Balance'
  ]);

  // =========================================================================
  // PAGE 18: GREENTECH 10. ANTI-POLLUTION & 11. BODY CARE
  // =========================================================================
  doc.addPage();
  addHeaderFooter('GREENTECH: 10. ANTI-POLLUTION & 11. BODY CARE', 18);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...primaryGreen);
  doc.text('10. Anti-Pollution / Sun Protection', 14, 24);

  autoTable(doc, {
    startY: 28,
    head: [['PRODUCT', 'INCI / ACTIVE MOLECULES', 'MAIN USE / BENEFIT', 'APPLICATION', 'DOSE']],
    body: [
      ['URBALYS®', 'Schisandra chinensis extract', 'Anti-pollution, radiance, skin barrier', 'Anti-pollution skin care', '0.5–1%'],
      ['SOLIBERINE®', 'Buddleja officinalis extract', 'UV, blue-light & infrared protection', 'Sun care / daily protection', '0.2–2%'],
      ['LIPACTIVE® SOLARINE IV', 'Coconut, seaberry & wild rose oils', 'Sun protection, repair, UVB-filter booster', 'Sun-care oils/creams', '1–5%'],
      ['SUN PROTECTION COMPLEX', 'Yarrow, arnica & calendula extracts', 'Sun soothing, solar erythema relief', 'After-sun / sun care', '0.5–5%']
    ],
    theme: 'grid',
    headStyles: { fillColor: primaryGreen, textColor: 255, fontStyle: 'bold', fontSize: 7 },
    bodyStyles: { fontSize: 6.5, cellPadding: 2 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 32 },
      1: { cellWidth: 46 },
      2: { cellWidth: 54 },
      3: { cellWidth: 34 },
      4: { cellWidth: 16, halign: 'center' }
    }
  });

  const startY18_2 = (doc as any).lastAutoTable.finalY + 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...primaryGreen);
  doc.text('11. Body Care / Cellulite / Slimming / Stretch Marks', 14, startY18_2);

  autoTable(doc, {
    startY: startY18_2 + 4,
    head: [['PRODUCT', 'INCI / ACTIVE MOLECULES', 'MAIN USE / BENEFIT', 'APPLICATION', 'DOSE']],
    body: [
      ['ARP 100', 'Botanical active complex', 'Body-hair care / specific body care', 'Body-hair products', 'Please refer to technical data'],
      ['KIGELINE®', 'Kigelia africana fruit extract', 'Bust firming / toning', 'Bust-care products', 'Please refer to technical data'],
      ['TIMILINE®', 'Botanical slimming active', 'Cellulite / slimming, adipocyte-focused action', 'Body creams, gels', 'Please refer to technical data'],
      ['IAA 50', 'Botanical active complex', 'Cellulite / slimming', 'Body-care products', 'Please refer to technical data'],
      ['COSMELENE® IVY', 'Hedera helix extract', 'Microcirculation, long-lasting drainage', 'Leg-care products', '1–10%'],
      ['ANTI-STRETCH MARK COMPLEX', 'Lady’s mantle extract', 'Anti-inflammatory, connective-tissue protection', 'Stretch-mark products', '0.5–5%']
    ],
    theme: 'grid',
    headStyles: { fillColor: primaryGreen, textColor: 255, fontStyle: 'bold', fontSize: 7 },
    bodyStyles: { fontSize: 6.5, cellPadding: 1.8 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 32 },
      1: { cellWidth: 44 },
      2: { cellWidth: 54 },
      3: { cellWidth: 34 },
      4: { cellWidth: 18, halign: 'center' }
    }
  });

  const finalY18 = (doc as any).lastAutoTable.finalY + 4;
  renderFormulatorBenefits(finalY18, [
    'Shields Against Urban Pollution',
    'Boosts Microcirculation & Drainage',
    'Tones & Firms Body Contours'
  ]);

  // =========================================================================
  // PAGE 19: GREENTECH 12. HAIR GROWTH & 13. HAIR MOISTURIZATION
  // =========================================================================
  doc.addPage();
  addHeaderFooter('GREENTECH: 12. HAIR GROWTH & 13. REPAIR', 19);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...primaryGreen);
  doc.text('12. Anti-Greying / Hair Growth / Hair Loss', 14, 24);

  autoTable(doc, {
    startY: 28,
    head: [['PRODUCT', 'INCI / ACTIVE MOLECULES', 'MAIN USE / BENEFIT', 'APPLICATION', 'DOSE']],
    body: [
      ['ARCOLYS®', 'Picrorhiza scrophulariiflora root extract', 'Natural hair-colour revival, anti-greying', 'Leave-on anti-greying products', '1%'],
      ['HAIRILINE®', 'Lindera strychniifolia root extract', 'Anti-hair loss, hair density, scalp microbiota', 'Hair-growth / scalp serums', '1%'],
      ['KAPILARINE', 'Cinnamon bark, clary sage, ginkgo & kigelia extracts', 'Hair-loss prevention, follicle stimulation, sebum control', 'Hair/scalp leave-on', '1–5%'],
      ['HAIR STRENGTH EGX 292', 'Nettle, black cohosh, maca & milk thistle extracts', 'Greasy hair/scalp purification, sebum reduction', 'Shampoo / scalp care', '1–5%'],
      ['DANDRILYS®', 'Ziziphus joazeiro bark extract / saponins', 'Anti-dandruff, anti-itching, scalp microbiota', 'Anti-dandruff shampoo', '1%']
    ],
    theme: 'grid',
    headStyles: { fillColor: primaryGreen, textColor: 255, fontStyle: 'bold', fontSize: 7 },
    bodyStyles: { fontSize: 6.5, cellPadding: 1.8 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 32 },
      1: { cellWidth: 46 },
      2: { cellWidth: 54 },
      3: { cellWidth: 34 },
      4: { cellWidth: 16, halign: 'center' }
    }
  });

  const startY19_2 = (doc as any).lastAutoTable.finalY + 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...primaryGreen);
  doc.text('13. Hair Moisturization / Repair / Conditioning', 14, startY19_2);

  autoTable(doc, {
    startY: startY19_2 + 4,
    head: [['PRODUCT', 'INCI / ACTIVE MOLECULES', 'MAIN USE / BENEFIT', 'APPLICATION', 'DOSE']],
    body: [
      ['TILICINE®', 'Acetylated polysaccharides + sugars from linden buds', 'Hair/scalp moisturization, smoothing, anti-static', 'Shampoo, conditioner, styling', '1–5%'],
      ['LIPACTIVE® INCA INCHI', 'Inca Inchi seed oil, omega 3/6', 'Hair repair, softness, detangling', 'Conditioner / hair repair', '1–5%'],
      ['LIPACTIVE® APRICOT', 'Apricot kernel oil, omega 9/6', 'Hair nourishment & protection', 'Shampoo / conditioner', '1–5%'],
      ['LIPACTIVE® BAOBAB', 'Baobab seed oil, omega 9/6', 'Hair nourishment, repair, nail care', 'Conditioner / hair care', '0.5–2%'],
      ['GLIALYS 21', 'Hydrolyzed wheat proteins & amino acids', 'Hair strengthening, moisture, reduced static', 'Shampoo / conditioner', '1–5%'],
      ['HYDROLYZED KERATIN', 'Hydrolyzed keratin', 'Hair-fibre & nail strengthening', 'Hair / skin care', '1–5%'],
      ['HYDROLYZED PEA PROTEINS', 'Hydrolyzed pea proteins', 'Hair strengthening, moisture, amino-acid replenishment', 'Hair care', '1–5%']
    ],
    theme: 'grid',
    headStyles: { fillColor: primaryGreen, textColor: 255, fontStyle: 'bold', fontSize: 7 },
    bodyStyles: { fontSize: 6.5, cellPadding: 1.8 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 32 },
      1: { cellWidth: 44 },
      2: { cellWidth: 54 },
      3: { cellWidth: 34 },
      4: { cellWidth: 18, halign: 'center' }
    }
  });

  const finalY19 = (doc as any).lastAutoTable.finalY + 4;
  renderFormulatorBenefits(finalY19, [
    'Revives Natural Pigment & Hair Density',
    'Balances Scalp Microbiota & Reduces Dandruff',
    'Deep Fibre Repair & Anti-Breakage'
  ]);

  // =========================================================================
  // PAGE 20: GREENTECH 14. CURLY HAIR, 15. STYLING & 16. HYGIENE
  // =========================================================================
  doc.addPage();
  addHeaderFooter('GREENTECH: 14. CURLY, 15. STYLING & 16. HYGIENE', 20);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...primaryGreen);
  doc.text('14. Curly / Frizzy Hair & Hair Nourishment', 14, 22);

  autoTable(doc, {
    startY: 25,
    head: [['PRODUCT', 'INCI / ACTIVE MOLECULES', 'MAIN USE / BENEFIT', 'APPLICATION', 'DOSE']],
    body: [
      ['ARGAN OIL', 'Argan seed oil, omega 6/9', 'Hair nourishment & protection', 'Hair oils, conditioners', '1–5%'],
      ['MURU MURU BUTTER', 'Murumuru seed butter, fatty acids', 'Deep nourishment, smoothing, split-end repair', 'Conditioner / masks', '1–5%'],
      ['HAIR LUSTRE KARKADE', 'Hibiscus flower extract, organic acids', 'Hair softness, shine, detangling', 'Shampoo / conditioner', '1%'],
      ['HAIR VOLUMIZING COMPLEX', 'Ginseng, plantago psyllium & white nettle extracts', 'Hair volume, strengthening, scalp revitalization', 'Volumizing hair products', '1%'],
      ['ZORYALYS®', 'Ginger & magnolia extracts + lipid complex', 'UV/pollution protection, dyed-hair colour protection', 'Leave-on hair protection', '1%']
    ],
    theme: 'grid',
    headStyles: { fillColor: primaryGreen, textColor: 255, fontStyle: 'bold', fontSize: 6.5 },
    bodyStyles: { fontSize: 6, cellPadding: 1.5 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 30 },
      1: { cellWidth: 44 },
      2: { cellWidth: 54 },
      3: { cellWidth: 34 },
      4: { cellWidth: 20, halign: 'center' }
    }
  });

  const startY20_2 = (doc as any).lastAutoTable.finalY + 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...primaryGreen);
  doc.text('15. Hair Shine / Styling & 16. Hygiene / Deodorant', 14, startY20_2);

  autoTable(doc, {
    startY: startY20_2 + 3,
    head: [['PRODUCT', 'INCI / ACTIVE MOLECULES', 'MAIN USE / BENEFIT', 'APPLICATION', 'DOSE']],
    body: [
      ['HAIR LUSTRE KARKADE', 'Hibiscus flower extract / AHA', 'Shine, softness, detangling, improved shampoo texture', 'Shampoo / conditioner', '1%'],
      ['HAIR VOLUMIZING COMPLEX', 'Ginseng, psyllium, white nettle', 'Volume & strengthening', 'Volumizing / scalp products', '1%'],
      ['LACTOPHYT®', 'Fermented Lactococcus lactis', 'Respectful anti-odour, antibacterial support', 'Deodorant', '1%'],
      ['ANTIPERSPIRANT NATURAL COMPLEX', 'Horsetail + sage oil complex', 'Long-lasting antiperspirant, body odour control', 'Deodorant / antiperspirant', '1–5%'],
      ['GREENSIL®', 'Bamboo silica', 'Absorption, mattifying, anti-odour', 'Deodorants / body powders', '0.5–5%']
    ],
    theme: 'grid',
    headStyles: { fillColor: primaryGreen, textColor: 255, fontStyle: 'bold', fontSize: 6.5 },
    bodyStyles: { fontSize: 6, cellPadding: 1.5 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 30 },
      1: { cellWidth: 44 },
      2: { cellWidth: 54 },
      3: { cellWidth: 34 },
      4: { cellWidth: 20, halign: 'center' }
    }
  });

  const finalY20 = (doc as any).lastAutoTable.finalY + 4;
  renderFormulatorBenefits(finalY20, [
    'Frizz Control & Smooth Curl Definition',
    'Long-Lasting Natural Odour Control',
    'Botanical Shine & Volume Boost'
  ]);

  // =========================================================================
  // PAGE 21: GREENTECH 17. NAIL CARE, 18. CLEANSING & 19. EMULSIFIERS
  // =========================================================================
  doc.addPage();
  addHeaderFooter('GREENTECH: 17. NAIL, 18. CLEANSING & 19. SENSORIAL', 21);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...primaryGreen);
  doc.text('17. Nail Care & 18. Cleansing / Make-Up Remover', 14, 22);

  autoTable(doc, {
    startY: 25,
    head: [['PRODUCT', 'INCI / ACTIVE MOLECULES', 'MAIN USE / BENEFIT', 'APPLICATION', 'DOSE']],
    body: [
      ['LIPACTIVE® BABASSU', 'Babassu seed oil, saturated fatty acids', 'Nourishes, repairs & smooths nails; skin/hair conditioning', 'Nail & skin/hair care', '1–5%'],
      ['AQUASILOLS® ECO', 'Vegetable oils + lysine/saponification technology', 'Gentle cleansing, foaming, make-up removal, soothing', 'Cleansers / make-up removers', '1–10%'],
      ['GREENSIL®', 'Bamboo silica', 'Natural abrasive / absorption', 'Scrubs / cleansing powders', '0.5–5%'],
      ['SILYPUR OC', 'Milk-thistle extract / silybins', 'Selective antimicrobial purification', 'Oral care / healthy mouth', '1–5%']
    ],
    theme: 'grid',
    headStyles: { fillColor: primaryGreen, textColor: 255, fontStyle: 'bold', fontSize: 6.5 },
    bodyStyles: { fontSize: 6, cellPadding: 1.5 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 32 },
      1: { cellWidth: 44 },
      2: { cellWidth: 54 },
      3: { cellWidth: 34 },
      4: { cellWidth: 18, halign: 'center' }
    }
  });

  const startY21_2 = (doc as any).lastAutoTable.finalY + 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...primaryGreen);
  doc.text('19. Emulsifier / Sensorial Ingredients', 14, startY21_2);

  autoTable(doc, {
    startY: startY21_2 + 3,
    head: [['PRODUCT', 'INCI / ACTIVE MOLECULES', 'MAIN USE / BENEFIT', 'APPLICATION', 'DOSE']],
    body: [
      ['GREENSOFT™', 'Plant-derived butter/oil association; hydrogenated vegetable oil', 'Emulsifier, co-emulsifier, soft butter-like texture', 'Creams, lotions, emulsions', 'As required / according to formulation'],
      ['SENSOL 100®', 'Avocado-derived concentrate / vegetable emollient', 'Silicone-like touch, velvet feel, sensory enhancement', 'Skin & hair care', '5–20%'],
      ['SOFT BUTTER™', 'Vegetable oil/butter association', 'Natural silicone-like touch, softness, consistency enhancement', 'Skin/hair formulations', 'As required']
    ],
    theme: 'grid',
    headStyles: { fillColor: primaryGreen, textColor: 255, fontStyle: 'bold', fontSize: 6.5 },
    bodyStyles: { fontSize: 6, cellPadding: 1.5 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 32 },
      1: { cellWidth: 44 },
      2: { cellWidth: 54 },
      3: { cellWidth: 34 },
      4: { cellWidth: 18, halign: 'center' }
    }
  });

  const finalY21 = (doc as any).lastAutoTable.finalY + 4;
  renderFormulatorBenefits(finalY21, [
    '100% Plant-Based Silicone Alternatives',
    'Velvety, Ultra-Soft Sensory Touch',
    'Gentle & Effective Make-Up Solubilization'
  ]);

  // =========================================================================
  // PAGE 22: GREENTECH 20. NATURAL / ORGANIC INGREDIENTS
  // =========================================================================
  doc.addPage();
  addHeaderFooter('GREENTECH: 20. NATURAL & ORGANIC INGREDIENTS', 22);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...primaryGreen);
  doc.text('20. Natural / Organic Ingredients', 14, 24);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...mutedGray);
  doc.text('Carefully selected natural and organic ingredients sourced from around the world for clean formulations.', 14, 29);

  autoTable(doc, {
    startY: 33,
    head: [['PRODUCT', 'INCI / ACTIVE MOLECULES', 'MAIN USE / BENEFIT', 'APPLICATION', 'DOSE']],
    body: [
      ['ORGANIC YUZU FROM FRANCE', 'Yuzu fruit extract + Zinc PCA', 'Purifying, sebum-regulating, brightening', 'Oily-skin care', 'Depending on use'],
      ['ORGANIC ALOE VERA FROM MEXICO', 'Aloe vera leaf-based ingredients', 'Moisturizing, soothing, purifying, repairing', 'Skin / hair care', 'Depending on grade / use'],
      ['ORGANIC BAMBOO SAP FROM FRANCE', 'Bamboo sap', 'Moisturization, natural silicon source', 'Skin / hair / nail care', 'Depending on use'],
      ['ORGANIC COCONUT SAP FROM INDONESIA', 'Coconut flower sap / sugars', 'Moisturizing & antioxidant', 'Moisturizing formulations', 'Depending on use'],
      ['ORGANIC CAMELINA OIL FROM FRANCE', 'Camelina sativa seed oil', 'Skin nourishment, softness, hair repair', 'Skin & hair oils', '1–5%'],
      ['ORGANIC & FAIR TRADE INCA INCHI FROM PERU', 'Inca Inchi seed oil', 'Skin & hair repair, omega-3-rich nourishment', 'Skin / hair care', '1–5%'],
      ['ORGANIC LOTUS FLOWERS FROM VIETNAM', 'Organic lotus flower extract', 'Protective care', 'Skin care', 'Depending on use'],
      ['ORGANIC SWEET ALMOND MILK FROM PALESTINA', 'Sweet almond milk extract', 'Protective care', 'Skin care', 'Depending on use'],
      ['ORGANIC TURMERIC FROM MADAGASCAR', 'Turmeric root extract / curcuminoids', 'Protective, antioxidant, purifying; natural yellow colour', 'Skin care / natural colour', 'Depending on use']
    ],
    theme: 'grid',
    headStyles: { fillColor: primaryGreen, textColor: 255, fontStyle: 'bold', fontSize: 7 },
    bodyStyles: { fontSize: 6.5, cellPadding: 1.8 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 38 },
      1: { cellWidth: 42 },
      2: { cellWidth: 50 },
      3: { cellWidth: 34 },
      4: { cellWidth: 18, halign: 'center' }
    }
  });

  const finalY22 = (doc as any).lastAutoTable.finalY + 4;
  renderFormulatorBenefits(finalY22, [
    'Clean & Certified Organic Traceability',
    'Global Origin Sustainability (Peru, France, Madagascar, Mexico)',
    'Multifunctional Active Phyto-Nutrients'
  ]);

  // =========================================================================
  // PAGE 23: OUR TRUSTED GLOBAL PARTNERS
  // =========================================================================
  doc.addPage();
  addHeaderFooter('OUR TRUSTED GLOBAL PARTNERS', 23);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...primaryGreen);
  doc.text('Our Trusted Global Partners', 14, 25);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...mutedGray);
  doc.text('Empowering Innovation. Delivering Excellence with Direct Manufacturer Backing.', 14, 30);

  const partnersData = [
    {
      name: 'FINE ORGANICS',
      badge: 'Sustainable Chemistry',
      desc: 'Fine Organics is a leading manufacturer of specialty performance ingredients known for their high purity, consistent quality and sustainability.',
      portfolio: 'Emollients  •  Specialty Esters  •  Functional Fluids  •  Eco-friendly Ingredients',
      strengths: 'High performance ingredients | Global quality standards | Sustainable & eco-conscious | Reliable supply chain'
    },
    {
      name: 'VVF LIMITED',
      badge: 'Oleochemicals & Cleansing',
      desc: 'VVF Limited is a diversified global company offering a wide range of ingredients used in personal care, cosmetics and industrial applications.',
      portfolio: 'Surfactants  •  Emollients  •  Specialty Chemicals  •  Oleochemicals',
      strengths: 'Wide portfolio of innovative products | Strong R&D and innovation | Consistent quality & reliability | Global presence'
    },
    {
      name: 'SNS SILCOS',
      badge: 'Sensory & Silicones',
      desc: 'SNS Silcos is a trusted name in silicones and silicone specialties, delivering advanced solutions for personal care and cosmetic formulations.',
      portfolio: 'Silicones  •  Silicone Emulsions  •  Functional Silicones  •  Specialty Silicone Actives',
      strengths: 'Superior silicone technology | Enhances texture & performance | Safe, skin-friendly solutions | Tailored for cosmetic innovation'
    },
    {
      name: 'GREENTECH BIOTECHNOLOGIES',
      badge: 'Bio-Actives & Nature',
      desc: 'Greentech Biotechnologies specializes in natural, potent and science-backed active ingredients for skincare and haircare.',
      portfolio: 'Botanical Actives  •  Bioactives  •  Anti-aging Actives  •  Haircare Actives',
      strengths: 'Science of nature, backed by research | High efficacy & safety | Sustainable sourcing | Solutions for modern formulations'
    }
  ];

  let partY = 36;
  partnersData.forEach((part) => {
    doc.setFillColor(...softBg);
    doc.roundedRect(14, partY, 182, 54, 2, 2, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(14, partY, 182, 54, 2, 2, 'D');

    // Partner Title & Badge
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(...primaryGreen);
    doc.text(part.name, 20, partY + 8);

    doc.setFontSize(7.5);
    doc.setTextColor(16, 124, 65);
    doc.text(`[ ${part.badge} ]`, 190, partY + 8, { align: 'right' });

    // Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...darkGray);
    const dTxt = doc.splitTextToSize(part.desc, 170);
    doc.text(dTxt, 20, partY + 16);

    // Product Portfolio
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...primaryGreen);
    doc.text('PRODUCT PORTFOLIO:', 20, partY + 30);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...darkGray);
    doc.text(part.portfolio, 60, partY + 30);

    // Key Strengths
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...primaryGreen);
    doc.text('KEY STRENGTHS:', 20, partY + 40);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...darkGray);
    const sTxt = doc.splitTextToSize(part.strengths, 130);
    doc.text(sTxt, 55, partY + 40);

    partY += 58;
  });

  // =========================================================================
  // PAGE 24: BACK COVER & CENTRAL HEAD OFFICE / DISTRIBUTION
  // =========================================================================
  doc.addPage();
  doc.setFillColor(...primaryGreen);
  doc.rect(0, 0, 210, 297, 'F');

  // Decorative Accent Bars
  doc.setFillColor(...deepGreen);
  doc.rect(0, 60, 210, 3, 'F');
  doc.setFillColor(...accentGreen);
  doc.rect(0, 63, 210, 1.5, 'F');

  // Brand Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(167, 215, 188);
  doc.text('MINDTECH BIOTECHNOLOGY INDIA PVT. LTD.', 105, 30, { align: 'center' });

  doc.setFontSize(32);
  doc.setTextColor(255, 255, 255);
  doc.text('MINDTECH', 105, 45, { align: 'center' });

  doc.setFontSize(11);
  doc.setTextColor(52, 211, 153);
  doc.text('NATURE BEYOND THE FUTURE', 105, 55, { align: 'center' });

  // 4 Core Value Pillars
  const backPillars = [
    { title: 'NATURAL INGREDIENTS', desc: 'Sustainably sourced, bio-fermented & clean botanical extracts.' },
    { title: 'INNOVATIVE SOLUTIONS', desc: 'Cutting-edge sensory modifiers, silicones & bio-actives.' },
    { title: 'PREMIUM QUALITY', desc: 'Rigorous batch COA validation & compliance testing.' },
    { title: 'TRUSTED PARTNER', desc: 'Direct factory supply, technical support & rapid dispatch.' }
  ];

  let bpY = 74;
  backPillars.forEach((bp) => {
    doc.setFillColor(10, 50, 26);
    doc.roundedRect(24, bpY, 162, 14, 2, 2, 'F');
    doc.setDrawColor(16, 124, 65);
    doc.roundedRect(24, bpY, 162, 14, 2, 2, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(52, 211, 153);
    doc.text(bp.title, 30, bpY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(220, 240, 230);
    doc.text(bp.desc, 30, bpY + 10.5);

    bpY += 17;
  });

  // Central Contact Box
  doc.setFillColor(4, 20, 10);
  doc.roundedRect(14, 150, 182, 128, 3, 3, 'F');
  doc.setDrawColor(16, 124, 65);
  doc.roundedRect(14, 150, 182, 128, 3, 3, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(52, 211, 153);
  doc.text('CENTRAL HEAD OFFICE & DISTRIBUTION HUB', 20, 162);

  // Address
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text('ADDRESS:', 20, 173);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(212, 236, 224);
  const addrLines = doc.splitTextToSize(
    'Ground Floor-181, Pkt-D, Sec-3 Bawana Dsidc City, Opp Delhi Jal Board, Bawana, New Delhi - 110039, Delhi - 110039, India',
    165
  );
  doc.text(addrLines, 20, 179);

  // Phone Numbers
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('PHONE NUMBERS:', 20, 196);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(212, 236, 224);
  doc.text('+91-8368947579  |  +91-8707403441  |  +91-9555446794', 20, 202);

  // Emails
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('EMAIL ADDRESSES:', 20, 213);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(212, 236, 224);
  doc.text('Sales Head: Ajaypatel@mindtec.org.in', 20, 219);
  doc.text('Sales Team: sales@mindtec.org.in', 20, 225);
  doc.text('General Inquiries: info@mindtec.org.in', 20, 231);

  // Registrations
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('GOVERNMENT REGISTRATIONS & POLICY:', 20, 242);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(212, 236, 224);
  doc.text('MSME NO: UDYAM-DL-06-0157900', 20, 248);
  doc.text('POLICY NO: 2001/399757984/00/000', 20, 254);

  // Official Website
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(52, 211, 153);
  doc.text('OFFICIAL WEBSITES: www.mindechbiotechnology.com  |  www.mindtechbiotech.com', 105, 268, { align: 'center' });

  // Download Trigger
  doc.save('MINDTECH_BIOTECHNOLOGY_PRODUCT_CATALOG.pdf');
};
