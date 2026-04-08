'use strict';
/* ================================================
   CLEAN INDIA — script.js v4.2 (Image Background)
   ================================================ */

if (typeof Chart !== 'undefined') {
    Chart.defaults.color = '#334155';
    Chart.defaults.borderColor = 'rgba(0,0,0,0.06)';
    Chart.defaults.font.family = "'DM Sans', sans-serif";
}

// ════ DATA ══════════════════════════════════════════

const stateWasteData = {
    "Andhra Pradesh": 3200, "Arunachal Pradesh": 120, "Assam": 650,
    "Bihar": 1800, "Chhattisgarh": 800, "Goa": 280, "Gujarat": 5500,
    "Haryana": 1200, "Himachal Pradesh": 280, "Jharkhand": 700,
    "Karnataka": 5200, "Kerala": 2100, "Madhya Pradesh": 2800,
    "Maharashtra": 22000, "Manipur": 150, "Meghalaya": 180,
    "Mizoram": 100, "Nagaland": 120, "Odisha": 1400, "Punjab": 1600,
    "Rajasthan": 3200, "Sikkim": 80, "Tamil Nadu": 8500,
    "Telangana": 4200, "Tripura": 200, "Uttar Pradesh": 14500,
    "Uttarakhand": 480, "West Bengal": 8000, "Delhi": 13000,
    "Jammu & Kashmir": 400, "Ladakh": 60, "Chandigarh": 520,
    "Andaman & Nicobar Island": 80, "Lakshadweep": 15,
    "Puducherry": 220, "Dadra & Nagar Haveli": 180
};

const cityData = {
    "Maharashtra": { total_tpd: 22000, cities: {
        "Mumbai":     { tpd: 9500, collection: 92, recycling: 18, burden: 21.8, trend: [7200,7800,8200,8800,9100,9500] },
        "Pune":       { tpd: 2200, collection: 85, recycling: 22, burden: 5.1,  trend: [1600,1750,1850,2000,2100,2200] },
        "Nagpur":     { tpd: 1100, collection: 78, recycling: 15, burden: 2.5,  trend: [800,850,900,980,1050,1100] },
        "Nashik":     { tpd: 800,  collection: 72, recycling: 12, burden: 1.8,  trend: [600,640,680,720,760,800] },
        "Aurangabad": { tpd: 600,  collection: 68, recycling: 10, burden: 1.4,  trend: [420,460,500,540,570,600] }
    }},
    "Delhi": { total_tpd: 13000, cities: {
        "New Delhi":   { tpd: 10500, collection: 88, recycling: 20, burden: 24.1, trend: [8500,9000,9500,9800,10200,10500] },
        "Dwarka":      { tpd: 1100,  collection: 80, recycling: 16, burden: 2.5,  trend: [800,850,900,980,1040,1100] },
        "Noida (NCR)": { tpd: 900,   collection: 75, recycling: 14, burden: 2.1,  trend: [620,680,740,800,860,900] }
    }},
    "Uttar Pradesh": { total_tpd: 14500, cities: {
        "Lucknow":   { tpd: 3200, collection: 75, recycling: 14, burden: 7.4, trend: [2400,2600,2750,2900,3050,3200] },
        "Kanpur":    { tpd: 2800, collection: 68, recycling: 11, burden: 6.4, trend: [2000,2200,2400,2550,2700,2800] },
        "Agra":      { tpd: 1800, collection: 65, recycling: 10, burden: 4.1, trend: [1300,1420,1530,1620,1720,1800] },
        "Varanasi":  { tpd: 1500, collection: 60, recycling: 9,  burden: 3.5, trend: [1100,1180,1260,1340,1420,1500] },
        "Prayagraj": { tpd: 1300, collection: 62, recycling: 8,  burden: 3.0, trend: [900,1000,1080,1150,1230,1300] }
    }},
    "Karnataka": { total_tpd: 8500, cities: {
        "Bengaluru": { tpd: 5500, collection: 90, recycling: 28, burden: 12.6, trend: [4200,4600,4900,5100,5300,5500] },
        "Mysuru":    { tpd: 900,  collection: 88, recycling: 30, burden: 2.1,  trend: [680,730,780,830,870,900] },
        "Hubballi":  { tpd: 700,  collection: 75, recycling: 18, burden: 1.6,  trend: [500,540,580,620,660,700] },
        "Mangaluru": { tpd: 600,  collection: 82, recycling: 22, burden: 1.4,  trend: [440,480,520,550,580,600] }
    }},
    "Tamil Nadu": { total_tpd: 9200, cities: {
        "Chennai":    { tpd: 4500, collection: 89, recycling: 25, burden: 10.4, trend: [3500,3750,4000,4150,4350,4500] },
        "Coimbatore": { tpd: 1200, collection: 84, recycling: 20, burden: 2.8,  trend: [900,970,1020,1080,1140,1200] },
        "Madurai":    { tpd: 900,  collection: 78, recycling: 16, burden: 2.1,  trend: [660,710,760,810,860,900] },
        "Salem":      { tpd: 700,  collection: 72, recycling: 13, burden: 1.6,  trend: [520,560,600,640,670,700] }
    }},
    "Gujarat": { total_tpd: 9800, cities: {
        "Ahmedabad": { tpd: 4200, collection: 87, recycling: 22, burden: 9.7, trend: [3200,3450,3700,3850,4050,4200] },
        "Surat":     { tpd: 2800, collection: 90, recycling: 26, burden: 6.4, trend: [2100,2280,2450,2580,2700,2800] },
        "Vadodara":  { tpd: 1100, collection: 82, recycling: 20, burden: 2.5, trend: [820,880,940,1000,1060,1100] },
        "Rajkot":    { tpd: 900,  collection: 78, recycling: 17, burden: 2.1, trend: [680,730,780,830,870,900] }
    }},
    "West Bengal": { total_tpd: 8000, cities: {
        "Kolkata":  { tpd: 4500, collection: 80, recycling: 15, burden: 10.4, trend: [3500,3750,4000,4150,4350,4500] },
        "Asansol":  { tpd: 800,  collection: 65, recycling: 10, burden: 1.8,  trend: [580,630,680,720,760,800] },
        "Siliguri": { tpd: 650,  collection: 62, recycling: 9,  burden: 1.5,  trend: [480,510,550,590,620,650] },
        "Howrah":   { tpd: 700,  collection: 70, recycling: 12, burden: 1.6,  trend: [520,550,590,630,670,700] }
    }},
    "Rajasthan": { total_tpd: 6200, cities: {
        "Jaipur":  { tpd: 2400, collection: 76, recycling: 14, burden: 5.5, trend: [1800,1950,2100,2200,2300,2400] },
        "Jodhpur": { tpd: 900,  collection: 68, recycling: 10, burden: 2.1, trend: [660,710,760,810,860,900] },
        "Kota":    { tpd: 750,  collection: 65, recycling: 9,  burden: 1.7, trend: [560,600,640,680,720,750] },
        "Udaipur": { tpd: 420,  collection: 70, recycling: 12, burden: 1.0, trend: [300,330,360,385,405,420] }
    }},
    "Telangana": { total_tpd: 5500, cities: {
        "Hyderabad": { tpd: 4800, collection: 85, recycling: 20, burden: 11.0, trend: [4000,4200,4400,4500,4650,4800] },
        "Warangal":  { tpd: 500,  collection: 70, recycling: 12, burden: 1.2,  trend: [360,390,420,450,480,500] }
    }},
    "Kerala": { total_tpd: 2100, cities: {
        "Kochi":              { tpd: 850, collection: 90, recycling: 35, burden: 2.0, trend: [630,680,720,770,810,850] },
        "Thiruvananthapuram": { tpd: 700, collection: 88, recycling: 32, burden: 1.6, trend: [520,570,610,640,670,700] },
        "Kozhikode":          { tpd: 400, collection: 82, recycling: 28, burden: 0.9, trend: [300,320,340,360,380,400] }
    }}
};

const cityPopulation = {
    "Mumbai": 20667656, "Pune": 6629000, "Nagpur": 2984000, "Nashik": 1486000, "Aurangabad": 1175000,
    "New Delhi": 32941000, "Dwarka": 1200000, "Noida (NCR)": 664000,
    "Lucknow": 3741000, "Kanpur": 3020000, "Agra": 1800000, "Varanasi": 1435000, "Prayagraj": 1117000,
    "Bengaluru": 13193000, "Mysuru": 1014000, "Hubballi": 943000, "Mangaluru": 620000,
    "Chennai": 11503000, "Coimbatore": 2151000, "Madurai": 1561000, "Salem": 831000,
    "Ahmedabad": 8450000, "Surat": 7784000, "Vadodara": 2166000, "Rajkot": 1390000,
    "Kolkata": 14974000, "Asansol": 1243000, "Siliguri": 513000, "Howrah": 1072000,
    "Jaipur": 3766000, "Jodhpur": 1033000, "Kota": 1001000, "Udaipur": 474000,
    "Hyderabad": 10534000, "Warangal": 811000,
    "Kochi": 677000, "Thiruvananthapuram": 1024000, "Kozhikode": 609000
};

const recyclingCenters = [
    { name: "Deonar Recycling Complex", city: "Mumbai", state: "Maharashtra", type: "recycling", lat: 19.0445, lng: 72.9211, capacity: "500 TPD", contact: "BMC Mumbai", mapsLink: "https://maps.google.com/?q=19.0445,72.9211" },
    { name: "Bellandur SWM Plant", city: "Bengaluru", state: "Karnataka", type: "recycling", lat: 12.9352, lng: 77.6784, capacity: "200 TPD", contact: "BBMP", mapsLink: "https://maps.google.com/?q=12.9352,77.6784" },
    { name: "Kodungaiyur Complex", city: "Chennai", state: "Tamil Nadu", type: "recycling", lat: 13.1231, lng: 80.2584, capacity: "250 TPD", contact: "GCC Chennai", mapsLink: "https://maps.google.com/?q=13.1231,80.2584" },
    { name: "Dhapa Processing Plant", city: "Kolkata", state: "West Bengal", type: "recycling", lat: 22.5658, lng: 88.4303, capacity: "180 TPD", contact: "KMC", mapsLink: "https://maps.google.com/?q=22.5658,88.4303" },
    { name: "Peeragarhi Recycling Plant", city: "Delhi", state: "Delhi", type: "recycling", lat: 28.6802, lng: 76.9965, capacity: "300 TPD", contact: "NDMC Delhi", mapsLink: "https://maps.google.com/?q=28.6802,76.9965" },
    { name: "Subramanyapura Composting", city: "Bengaluru", state: "Karnataka", type: "composting", lat: 12.9082, lng: 77.5267, capacity: "80 TPD", contact: "BBMP", mapsLink: "https://maps.google.com/?q=12.9082,77.5267" },
    { name: "Sarita Vihar Composting", city: "Delhi", state: "Delhi", type: "composting", lat: 28.5358, lng: 77.2902, capacity: "60 TPD", contact: "SDMC", mapsLink: "https://maps.google.com/?q=28.5358,77.2902" },
    { name: "Versova Composting Unit", city: "Mumbai", state: "Maharashtra", type: "composting", lat: 19.1396, lng: 72.8158, capacity: "70 TPD", contact: "BMC", mapsLink: "https://maps.google.com/?q=19.1396,72.8158" },
    { name: "E-Parisaraa", city: "Bengaluru", state: "Karnataka", type: "ewaste", lat: 13.1120, lng: 77.6098, capacity: "30 TPD", contact: "eparisaraa.com", mapsLink: "https://maps.google.com/?q=13.1120,77.6098" },
    { name: "Attero Recycling", city: "Roorkee", state: "Uttarakhand", type: "ewaste", lat: 29.8543, lng: 77.8880, capacity: "Large Scale", contact: "Attero.in", mapsLink: "https://maps.google.com/?q=29.8543,77.8880" },
    { name: "Eco Recycling Ltd", city: "Mumbai", state: "Maharashtra", type: "ewaste", lat: 19.0760, lng: 72.8777, capacity: "25 TPD", contact: "ecobirdd.com", mapsLink: "https://maps.google.com/?q=19.0760,72.8777" },
    { name: "Okhla WtE Plant", city: "Delhi", state: "Delhi", type: "wte", lat: 28.5390, lng: 77.2714, capacity: "1950 TPD → 16MW", contact: "IL&FS ETS", mapsLink: "https://maps.google.com/?q=28.5390,77.2714" },
    { name: "Ghazipur WtE Plant", city: "Delhi", state: "Delhi", type: "wte", lat: 28.6289, lng: 77.3339, capacity: "2000 TPD → 12MW", contact: "East Delhi MC", mapsLink: "https://maps.google.com/?q=28.6289,77.3339" },
    { name: "Pune WtE Facility", city: "Pune", state: "Maharashtra", type: "wte", lat: 18.5204, lng: 73.8567, capacity: "700 TPD → 6MW", contact: "PMC", mapsLink: "https://maps.google.com/?q=18.5204,73.8567" }
];

const schemesData = [
    { year: "2014", name: "Swachh Bharat Abhiyan", icon: "fa-broom", impl: 72, stat: "100M+ toilets built", desc: "Launched on Gandhi Jayanti (Oct 2, 2014). Aims at Open Defecation Free (ODF) India and improved solid waste management in all cities and villages.", link: "https://swachhbharatmission.gov.in/" },
    { year: "2015", name: "Smart Cities Mission", icon: "fa-city", impl: 58, stat: "100 cities covered", desc: "Integration of ICT with waste management for real-time tracking, GPS-enabled collection fleets, and smart bin sensors in 100 selected cities.", link: "https://smartcities.gov.in/" },
    { year: "2016", name: "SWM Rules 2016", icon: "fa-book", impl: 45, stat: "Segregation mandated", desc: "Source segregation of wet, dry, and hazardous waste made compulsory. Defines legal responsibilities for generators, local bodies, and state governments.", link: "https://cpcb.nic.in/" },
    { year: "2022", name: "AMRUT 2.0", icon: "fa-building-columns", impl: 34, stat: "500 cities targeted", desc: "Expanded Atal Mission for Rejuvenation and Urban Transformation, targeting 500 cities with improved water, drainage, and waste management.", link: "https://amrut.gov.in/" },
    { year: "2022", name: "EPR Policy", icon: "fa-industry", impl: 28, stat: "Producers made liable", desc: "Extended Producer Responsibility mandates manufacturers take back packaging waste and meet annual recycling targets under CPCB supervision.", link: "https://cpcb.nic.in/" }
];

const truthQuestions = [
    { q: "Which Indian city produces the MOST municipal solid waste per day?", options: ["Delhi", "Mumbai", "Bengaluru", "Kolkata"], answer: 1, explanation: "Mumbai generates ~9,500 tonnes/day, the highest in India." },
    { q: "What percentage of India's total waste is actually recycled?", options: ["5–8%", "20–25%", "40–45%", "About 60%"], answer: 0, explanation: "India recycles only ~5–8% of its waste. Far below the global average of 30%." },
    { q: "Diwali week typically causes what spike in national waste generation?", options: ["10% increase", "25% increase", "35–40% increase", "5% increase"], answer: 2, explanation: "Diwali generates 35–40% more waste due to packaging, firecrackers, and celebrations." },
    { q: "What does 'EPR' stand for in India's waste management policy?", options: ["Environmental Protection Regulation", "Extended Producer Responsibility", "Effective Pollution Reduction", "Ecological Preservation Rights"], answer: 1, explanation: "EPR means manufacturers are legally responsible for the entire lifecycle of their products." },
    { q: "How many tonnes of plastic waste does India generate per year?", options: ["1 Million", "3.5 Million", "8 Million", "15 Million"], answer: 2, explanation: "India generates about 8 million tonnes of plastic waste annually." },
    { q: "Which Indian state has the best waste management record?", options: ["Kerala", "Sikkim", "Goa", "Himachal Pradesh"], answer: 1, explanation: "Sikkim is India's first fully organic state and consistently scores highest in waste management." },
    { q: "How long does a plastic bottle take to decompose in a landfill?", options: ["10–20 years", "50–80 years", "450–500 years", "1000+ years"], answer: 2, explanation: "A PET plastic bottle takes approximately 450–500 years to decompose!" },
    { q: "What color bin is used for WET/organic waste in India?", options: ["Blue", "Red", "Green", "Yellow"], answer: 2, explanation: "Green = wet/organic. Blue = dry recyclables. Red = hazardous. Under India's SWM Rules 2016." },
    { q: "The 'Swachh Bharat Abhiyan' was launched in which year?", options: ["2011", "2014", "2016", "2019"], answer: 1, explanation: "Swachh Bharat Abhiyan launched on Oct 2, 2014 (Gandhi Jayanti) by PM Narendra Modi." },
    { q: "What does 'WtE' stand for in sustainability?", options: ["Waste to Education", "Water to Energy", "Waste to Energy", "Wealth through Environment"], answer: 2, explanation: "Waste-to-Energy (WtE) plants burn non-recyclable waste to generate electricity." },
    { q: "Which of these is NOT biodegradable?", options: ["Banana peel", "Newspaper", "Polystyrene foam cup", "Cotton cloth"], answer: 2, explanation: "Polystyrene (thermocol) is non-biodegradable and takes hundreds of years to break down." },
    { q: "How much does India lose annually to recyclables buried in landfills?", options: ["$2 Billion", "$8 Billion", "$15 Billion", "$25 Billion"], answer: 2, explanation: "India loses approximately $15 Billion worth of recyclable materials in landfills every year." },
    { q: "What is 'source segregation' in waste management?", options: ["Separating waste at home before collection", "Finding the pollution source", "A government department", "Recycling plastic bottles only"], answer: 0, explanation: "Source segregation = YOU separate wet, dry, and hazardous waste at home. The most critical step!" },
    { q: "By 2030, India's waste generation is projected to reach approximately?", options: ["80 Million Tonnes", "110 Million Tonnes", "165 Million Tonnes", "200 Million Tonnes"], answer: 2, explanation: "Without urgent action, India's MSW will reach ~165 million tonnes by 2030." },
    { q: "What % of collected waste in India is scientifically treated?", options: ["Less than 20%", "About 40%", "About 60%", "About 80%"], answer: 0, explanation: "Despite collection, less than 20% is scientifically processed. The rest goes to landfills." },
    { q: "Composting organic waste creates which valuable product?", options: ["Plastic", "Organic fertilizer", "Diesel fuel", "Drinking water"], answer: 1, explanation: "Composting converts food waste into rich organic fertilizer, reducing landfill use." },
    { q: "Which city has the Okhla Waste-to-Energy plant?", options: ["Mumbai", "Hyderabad", "Delhi", "Jaipur"], answer: 2, explanation: "Delhi's Okhla WtE plant processes ~1,950 tonnes/day and generates 16 MW of electricity." },
    { q: "What is the 3R principle of waste management?", options: ["Reject, Reduce, Reuse", "Reduce, Reuse, Recycle", "Reclaim, Reform, Recycle", "Remove, Rebuild, Restore"], answer: 1, explanation: "Reduce → Reuse → Recycle. In that exact priority order for maximum impact!" },
    { q: "Which city is famous for its 'Garbage Café' that gives free food for waste?", options: ["Mumbai", "Ambikapur", "Surat", "Indore"], answer: 1, explanation: "Ambikapur, Chhattisgarh has a Garbage Café where people exchange waste for free meals." },
    { q: "What is the name of India's annual city cleanliness ranking survey?", options: ["Swachh Survekshan", "Clean India Index", "Urban Hygiene Score", "City Health Report"], answer: 0, explanation: "Swachh Survekshan ranks Indian cities by cleanliness. Indore has won multiple times." }
];

const dareTasks = [
    { dare: "MISSION: CLEAN SWEEP", description: "RIGHT NOW — collect 3 pieces of litter from your room, hostel corridor, or nearest outdoor area. Take a photo as proof and show the group. You are now an official Clean India Agent!", icon: "🧹", points: 20 },
    { dare: "VOICE FOR CHANGE", description: "Record a 30-second video explaining ONE waste management fact you learned today. Post it to your Instagram/WhatsApp status with #CleanIndiaLPU and #EVSProject2026. Show the group!", icon: "📱", points: 30 },
    { dare: "THE 30-DAY PLEDGE", description: "Write and sign a personal pledge: 'I will use ZERO single-use plastic bags for 30 days.' Show your signed pledge to the group. Honor system — people are watching!", icon: "✍️", points: 25 },
    { dare: "DUSTBIN DETECTIVE", description: "Go to the nearest dustbin RIGHT NOW. Count how many items are in the WRONG bin. Report the exact number to the group. Bonus dare: Actually re-sort them if it's safe to do so!", icon: "🗑️", points: 35 },
    { dare: "TEACH A STRANGER", description: "In the next 24 hours, explain to someone outside this group the difference between wet and dry waste. Report back what they said!", icon: "🎓", points: 50 },
    { dare: "WARRIOR SELFIE", description: "Find a piece of litter on campus. Pick it up safely, take a selfie holding it BEFORE disposing it properly. Post it with #EcoWarrior. Your Instagram needs this energy!", icon: "🤳", points: 20 },
    { dare: "UPCYCLE CHAMPION", description: "In the next 48 hours, find one item that would normally be thrown away and create something new from it. Show before/after!", icon: "🎨", points: 45 },
    { dare: "CAMPUS WASTE AUDIT", description: "Walk exactly 100 meters of your campus. Count and report: (a) overflowing dustbins, (b) litter items on ground, (c) items in wrong bins. Present your official audit report!", icon: "🔍", points: 35 },
    { dare: "PLASTIC TRACKER", description: "Count every single-use plastic item you use in the next 12 hours. Write them ALL down. Present the full list to the group.", icon: "🔢", points: 20 },
    { dare: "ORGANIZE A DRIVE", description: "RIGHT NOW — plan a 5-person campus clean-up drive. Create a WhatsApp group, invite 5 people, choose a date and location. Show proof the group was created! You have 5 minutes!", icon: "📋", points: 60 },
    { dare: "DIGITAL ECO-WARRIOR", description: "Write a 3-sentence LinkedIn or Instagram post about waste management with ONE real statistic from this website. Tag 3 friends who should know this. Post it LIVE and show the group!", icon: "💻", points: 40 },
    { dare: "THE REFUSAL CHALLENGE", description: "The next 3 times someone offers you a plastic straw, disposable spoon, or plastic bag — refuse politely and explain why. Do this at least 3 times this week.", icon: "✋", points: 20 },
    { dare: "WRITE TO POWER", description: "Write a 5-line email/letter to your college administration requesting ONE specific waste improvement. Share what you wrote!", icon: "📧", points: 55 },
    { dare: "FAMILY KNOWLEDGE DROP", description: "Call or text a parent or sibling RIGHT NOW. Tell them ONE waste fact. Ask them to try one new sustainable habit this week. Report back which habit they chose.", icon: "📞", points: 30 },
    { dare: "MINI COMPOST MISSION", description: "Save all food waste from your NEXT meal. Find a soil patch on campus and bury it 6 inches deep. You've just made a mini-compost! Mark the spot with a stone.", icon: "🌱", points: 35 }
];

const monthlyWaste = {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    data: [68, 65, 60, 55, 52, 58, 61, 62, 72, 89, 78, 70],
    events: ['Makar Sankranti','Valentine Week','Holi Celebrations','','Summer Low','Eid Season','Guru Purnima','Independence Day','Navratri Begins','DIWALI PEAK','Post-Festival','New Year Eve']
};

// ════ INIT ═══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger, TextPlugin);
    }
    initNav();
    // Removed initHero3D()
    initGSAPAnimations();
    initProblem3D();
    initIndiaChoropleth();
    initCityDashboard();
    initHeatmapCalendar();
    initSchemeTimeline();
    initEconCharts();
    initCalculator();
    initLeafletTracker();
    initTruthOrDare();
    initVolunteerCert();
    initSparklines();
    initBackToTop();
    initSegregationGame();
    initFutureCity();
});

// ════ NAV ════════════════════════════════════════════

function initNav() {
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scroll-progress');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 80);
        const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (scrollProgress) scrollProgress.style.width = ((document.documentElement.scrollTop / h) * 100) + '%';
    });

    if (hamburger) hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
    if (closeMenu) closeMenu.addEventListener('click', () => mobileMenu.classList.remove('open'));
    document.querySelectorAll('.mobile-links a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(a => a.classList.remove('active'));
                const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { threshold: 0.4 });
    sections.forEach(s => observer.observe(s));
}

// ════ GSAP ANIMATIONS ════════════════════════════════

function initGSAPAnimations() {
    if (typeof gsap === 'undefined') return;

    if (document.getElementById('hero-typewriter')) {
        gsap.to('#hero-typewriter', { text: 'LPU \u2022 CHE110 ENVIRONMENTAL STUDIES PROJECT 2026', duration: 1.5, delay: 0.5 });
    }
    gsap.from('.hero-title span', { y: 100, opacity: 0, duration: 1, stagger: 0.2, delay: 0.8, ease: 'power4.out' });
    gsap.from('.hero-subtitle', { y: 30, opacity: 0, duration: 1, delay: 1.4, ease: 'power3.out' });
    gsap.from('.stats-row .stat-pill', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, delay: 1.8, ease: 'back.out' });
    gsap.from('.hero-buttons .btn', { y: 20, opacity: 0, duration: 0.6, stagger: 0.15, delay: 2.1, ease: 'back.out' });

    document.querySelectorAll('.counter').forEach(counter => {
        ScrollTrigger.create({
            trigger: counter, start: 'top 80%', once: true,
            onEnter: () => {
                const target = parseFloat(counter.getAttribute('data-target'));
                const isFloat = target % 1 !== 0;
                let current = 0;
                const step = target / 80;
                const timer = setInterval(() => {
                    current = Math.min(current + step, target);
                    counter.textContent = isFloat ? current.toFixed(1) : Math.floor(current);
                    if (current >= target) clearInterval(timer);
                }, 25);
                const ring = counter.closest('.circle-progress')?.querySelector('.progress');
                if (ring) {
                    const circ = 2 * Math.PI * 45;
                    ring.style.strokeDasharray = circ;
                    ring.style.strokeDashoffset = circ;
                    const pct = Math.min(target / (target * 1.5), 1);
                    setTimeout(() => { ring.style.strokeDashoffset = circ - (pct * circ); }, 100);
                }
            }
        });
    });

    gsap.utils.toArray('.glass-card, .dash-card, .flip-card, .tech-card, .zone-card').forEach(el => {
        ScrollTrigger.create({
            trigger: el, start: 'top 85%', once: true,
            onEnter: () => gsap.from(el, { y: 40, opacity: 0, duration: 0.7, ease: 'power3.out' })
        });
    });

    ScrollTrigger.create({
        trigger: '.timeline-box', start: 'top 80%', once: true,
        onEnter: () => gsap.from('.timeline-item', { x: -50, opacity: 0, stagger: 0.2, duration: 0.8 })
    });

    const infoSection = document.getElementById('infographic');
    if (infoSection) {
        const panels = document.querySelectorAll('.info-panel');
        gsap.to('.horizontal-scroll-container', {
            xPercent: -(100 - 100 / panels.length),
            ease: 'none',
            scrollTrigger: {
                trigger: '#infographic', pin: true, scrub: 1,
                snap: 1 / (panels.length - 1),
                end: () => '+=' + (infoSection.offsetWidth * (panels.length - 1))
            }
        });
    }
}

// ════ PROBLEM 3D ═════════════════════════════════════

function initProblem3D() {
    const container = document.getElementById('problem-3d');
    if (!container) return;
 
    // Replace contents with a styled canvas for Chart.js
    container.innerHTML = `
        <canvas id="waste-growth-chart" style="width:100%;height:100%;"></canvas>
    `;
    container.style.cssText += 'display:flex;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;';
 
    const ctx = document.getElementById('waste-growth-chart').getContext('2d');
 
    const years  = ['1990', '2000', '2010', '2015', '2020', '2025'];
    const values = [28, 40, 48, 55, 62, 72];
    const colors = [
        'rgba(34,197,94,0.85)',   // green
        'rgba(132,204,22,0.85)',  // lime
        'rgba(234,179,8,0.85)',   // yellow
        'rgba(249,115,22,0.85)', // orange
        'rgba(239,68,68,0.85)',   // red
        'rgba(185,28,28,0.85)',   // dark red
    ];
    const borderColors = [
        '#16a34a','#65a30d','#ca8a04','#ea580c','#dc2626','#991b1b'
    ];
 
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [{
                label: 'Waste (Million Tonnes/Year)',
                data: values,
                backgroundColor: colors,
                borderColor: borderColors,
                borderWidth: 2,
                borderRadius: 10,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                delay: (ctx) => ctx.dataIndex * 150,
                duration: 1000,
                easing: 'easeOutQuart',
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(255,255,255,0.98)',
                    borderColor: '#22c55e',
                    borderWidth: 2,
                    titleColor: '#0f172a',
                    bodyColor: '#475569',
                    padding: 14,
                    cornerRadius: 12,
                    callbacks: {
                        title: (items) => `Year ${items[0].label}`,
                        label: (item) => ` ${item.parsed.y}M Tonnes/Year`,
                        afterLabel: (item) => {
                            const notes = {
                                '1990': 'Mostly organic, low plastic',
                                '2000': 'Liberalization surge begins',
                                '2010': 'E-waste emerges',
                                '2015': 'Swachh Bharat launched',
                                '2020': '+30% plastic (COVID)',
                                '2025': 'Current — urgent action needed'
                            };
                            return ' ' + (notes[item.label] || '');
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 90,
                    grid: {
                        color: 'rgba(0,0,0,0.05)',
                        drawBorder: false,
                    },
                    ticks: {
                        callback: (v) => v + 'M',
                        font: { family: "'JetBrains Mono', monospace", size: 12 },
                        color: '#64748b',
                        stepSize: 15,
                    },
                    title: {
                        display: true,
                        text: 'Million Tonnes / Year',
                        color: '#94a3b8',
                        font: { size: 11, family: "'DM Sans', sans-serif" }
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: {
                        font: { family: "'JetBrains Mono', monospace", size: 13, weight: 'bold' },
                        color: '#334155',
                    }
                }
            }
        }
    });
 
    // Animate bars in on scroll
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.create({
            trigger: container,
            start: 'top 75%',
            once: true,
            onEnter: () => {
                // Chart animates automatically on creation;
                // add a glow effect to the container
                container.style.transition = 'box-shadow 0.6s ease';
                container.style.boxShadow = '0 0 0 2px rgba(34,197,94,0.3), 0 12px 32px rgba(15,23,42,0.08)';
            }
        });
    }
}
 
// ════ INDIA CHOROPLETH MAP ════════════════════════════

function initIndiaChoropleth() {
    const svgEl = document.getElementById('india-svg-map');
    if (!svgEl || typeof d3 === 'undefined') return;

    const W = 800, H = 800;
    const svg = d3.select('#india-svg-map');
    const tooltip = document.getElementById('map-tooltip');

    const projection = d3.geoMercator()
        .center([83, 22])
        .scale(1050)
        .translate([W / 2, H / 2]);

    const pathGen = d3.geoPath().projection(projection);

    const getColor = tpd => tpd > 5000 ? '#ef4444' : tpd > 2000 ? '#f97316' : tpd > 500 ? '#eab308' : '#22c55e';
    const getRisk  = tpd => tpd > 5000 ? '🔴 CRITICAL' : tpd > 2000 ? '🟠 HIGH' : tpd > 500 ? '🟡 MODERATE' : '🟢 LOW';

    const GEO_URLS = [
        'https://gist.githubusercontent.com/jbrobst/56c13bbbf9d97d187fea01ca62ea5112/raw/e388c4cae20aa53cb5090210a42ebb9b765c0a36/india_states.geojson',
        'https://raw.githubusercontent.com/geohacker/india/master/state/india_telengana.geojson'
    ];

    function renderMap(data) {
        svg.selectAll('path')
            .data(data.features)
            .enter()
            .append('path')
            .attr('d', pathGen)
            .attr('fill', d => getColor(stateWasteData[d.properties.ST_NM || d.properties.NAME_1] || 0))
            .attr('stroke', '#0d1a12')
            .attr('stroke-width', 1.5)
            .style('opacity', 0)
            .style('cursor', 'pointer')
            .on('mouseover', function(event, d) {
                d3.select(this).attr('stroke-width', 3).attr('stroke', '#fff');
                const name = d.properties.ST_NM || d.properties.NAME_1 || 'Unknown';
                const tpd = stateWasteData[name] || 0;
                if (tooltip) {
                    tooltip.innerHTML = `
                        <strong style="color:#22c55e;font-size:1rem;">${name}</strong><br>
                        <span>Waste: <b>${tpd ? tpd.toLocaleString() + ' TPD' : 'N/A'}</b></span><br>
                        <span>Risk Level: ${getRisk(tpd)}</span>
                    `;
                    tooltip.classList.remove('hidden');
                    tooltip.style.left = (event.offsetX + 15) + 'px';
                    tooltip.style.top  = (event.offsetY - 10) + 'px';
                }
            })
            .on('mousemove', function(event) {
                if (tooltip) {
                    tooltip.style.left = (event.offsetX + 15) + 'px';
                    tooltip.style.top  = (event.offsetY - 10) + 'px';
                }
            })
            .on('mouseout', function() {
                d3.select(this).attr('stroke-width', 1.5).attr('stroke', '#0d1a12');
                if (tooltip) tooltip.classList.add('hidden');
            })
            .transition().duration(60).delay((d, i) => i * 20).style('opacity', 0.82);
    }

    function showFallback() {
        svg.append('rect').attr('x', 50).attr('y', 50).attr('width', 700).attr('height', 700).attr('rx', 12)
            .attr('fill', 'rgba(34,197,94,0.05)').attr('stroke', 'rgba(34,197,94,0.2)').attr('stroke-width', 2);

        const zones = [
            { label: 'North India', x: 300, y: 150, r: 80, tpd: 28000, color: '#ef4444' },
            { label: 'South India', x: 400, y: 500, r: 90, tpd: 18000, color: '#f97316' },
            { label: 'West India',  x: 180, y: 380, r: 75, tpd: 20000, color: '#f97316' },
            { label: 'East India',  x: 580, y: 320, r: 65, tpd: 12000, color: '#eab308' },
            { label: 'North-East',  x: 620, y: 200, r: 50, tpd: 2000,  color: '#22c55e' },
            { label: 'Central',     x: 380, y: 340, r: 70, tpd: 8000,  color: '#eab308' },
        ];

        zones.forEach(z => {
            svg.append('circle').attr('cx', z.x).attr('cy', z.y).attr('r', z.r + 15)
                .attr('fill', 'none').attr('stroke', z.color).attr('stroke-width', 1)
                .attr('opacity', 0.3).attr('stroke-dasharray', '6 4');
            svg.append('circle').attr('cx', z.x).attr('cy', z.y).attr('r', z.r)
                .attr('fill', z.color).attr('opacity', 0.25).attr('stroke', z.color).attr('stroke-width', 2);
            svg.append('text').attr('x', z.x).attr('y', z.y - 8)
                .attr('text-anchor', 'middle').attr('fill', '#f0fdf4').attr('font-size', 13).attr('font-weight', 'bold')
                .text(z.label);
            svg.append('text').attr('x', z.x).attr('y', z.y + 12)
                .attr('text-anchor', 'middle').attr('fill', z.color).attr('font-size', 11).attr('font-family', 'monospace')
                .text(z.tpd.toLocaleString() + ' TPD');
        });

        svg.append('text').attr('x', W/2).attr('y', H - 30)
            .attr('text-anchor', 'middle').attr('fill', '#4ade80').attr('font-size', 13)
            .text('⚠️ Live map requires internet — showing zone overview');
    }

    fetch(GEO_URLS[0])
        .then(r => { if (!r.ok) throw new Error('Failed'); return r.json(); })
        .then(renderMap)
        .catch(() => {
            fetch(GEO_URLS[1])
                .then(r => { if (!r.ok) throw new Error('Failed'); return r.json(); })
                .then(renderMap)
                .catch(showFallback);
        });
}

// ════ CITY DASHBOARD ═════════════════════════════════

function initCityDashboard() {
    const stateSelect = document.getElementById('state-select');
    const citySelect  = document.getElementById('city-select');
    if (!stateSelect) return;

    Object.keys(cityData).forEach(state => {
        const opt = document.createElement('option');
        opt.value = opt.textContent = state;
        stateSelect.appendChild(opt);
    });

    const donutCtx = document.getElementById('national-donutChart');
    if (donutCtx) {
        new Chart(donutCtx, {
            type: 'doughnut',
            data: {
                labels: ['North India', 'South India', 'West India', 'East India', 'Northeast'],
                datasets: [{ data: [32, 22, 26, 12, 8], backgroundColor: ['#ef4444','#f97316','#eab308','#22c55e','#3b82f6'], borderWidth: 0 }]
            },
            options: {
                responsive: true, maintainAspectRatio: false, cutout: '70%',
                plugins: {
                    legend: { position: 'right', labels: { padding: 15 } },
                    tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.parsed}%` } }
                }
            }
        });
    }

    let stateBartChart = null, cityPieChart = null, cityTrendChart = null;

    stateSelect.addEventListener('change', e => {
        const state = e.target.value;
        if (!cityData[state]) return;
        const ds = cityData[state];

        citySelect.innerHTML = '<option value="">Select a city</option>';
        citySelect.disabled = false;
        Object.keys(ds.cities).forEach(city => {
            const opt = document.createElement('option');
            opt.value = opt.textContent = city;
            citySelect.appendChild(opt);
        });

        document.getElementById('overview-panels')?.classList.remove('hidden');
        document.getElementById('city-panels')?.classList.add('hidden');

        const barCtx = document.getElementById('state-barChart');
        if (barCtx) {
            if (stateBartChart) stateBartChart.destroy();
            const cityNames  = Object.keys(ds.cities);
            const cityTPDs   = cityNames.map(c => ds.cities[c].tpd);
            const cityColors = cityTPDs.map(t => t > 5000 ? '#ef4444' : t > 2000 ? '#f97316' : t > 1000 ? '#eab308' : '#22c55e');
            stateBartChart = new Chart(barCtx, {
                type: 'bar',
                data: { labels: cityNames, datasets: [{ label: 'Daily Waste (TPD)', data: cityTPDs, backgroundColor: cityColors, borderRadius: 8, borderSkipped: false }] },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { },
                        x: { grid: { display: false }, ticks: { maxRotation: 30 } }
                    }
                }
            });
        }
    });

    citySelect.addEventListener('change', e => {
        const state = stateSelect.value;
        const city  = e.target.value;
        if (!city || !cityData[state]) return;
        const data = cityData[state].cities[city];
        if (!data) return;

        document.getElementById('overview-panels')?.classList.add('hidden');
        document.getElementById('city-panels')?.classList.remove('hidden');

        const el = id => document.getElementById(id);
        if (el('cd-waste'))   el('cd-waste').innerText   = data.tpd.toLocaleString() + ' TPD';
        if (el('cd-collect')) el('cd-collect').innerText = data.collection + '%';
        if (el('cd-recycle')) el('cd-recycle').innerText = data.recycling + '%';
        if (el('cd-burden'))  el('cd-burden').innerText  = '$' + data.burden + 'M/yr';

        const pieCtx = el('city-pieChart');
        if (pieCtx) {
            if (cityPieChart) cityPieChart.destroy();
            cityPieChart = new Chart(pieCtx, {
                type: 'pie',
                data: {
                    labels: ['Organic', 'Plastic', 'Paper', 'E-Waste', 'Other'],
                    datasets: [{ data: [52, 18, 14, 5, 11], backgroundColor: ['#22c55e','#ef4444','#f59e0b','#3b82f6','#9ca3af'], borderWidth: 0 }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { boxWidth: 14 } } } }
            });
        }

        const trendCtx = el('city-trendChart');
        if (trendCtx) {
            if (cityTrendChart) cityTrendChart.destroy();
            cityTrendChart = new Chart(trendCtx, {
                type: 'line',
                data: {
                    labels: ['2020','2021','2022','2023','2024','2025'],
                    datasets: [{ label: 'Waste (TPD)', data: data.trend, borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.1)', tension: 0.4, fill: true, pointBackgroundColor: '#22c55e', pointRadius: 4 }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { },
                        x: { grid: { display: false } }
                    }
                }
            });
        }
    });

    populateCompareDropdowns();
}

function populateCompareDropdowns() {
    const c1 = document.getElementById('compare-city-1');
    const c2 = document.getElementById('compare-city-2');
    if (!c1 || !c2) return;

    const allCities = [];
    Object.keys(cityData).forEach(state => {
        Object.keys(cityData[state].cities).forEach(city => {
            allCities.push({ city, state, data: cityData[state].cities[city] });
        });
    });

    [c1, c2].forEach((sel, idx) => {
        allCities.forEach(item => {
            const opt = document.createElement('option');
            opt.value = JSON.stringify(item);
            opt.textContent = `${item.city} (${item.state})`;
            sel.appendChild(opt);
        });
        if (allCities[idx]) sel.value = JSON.stringify(allCities[idx]);
    });

    let radarChart = null;

    function updateRadar() {
        const v1 = c1.value, v2 = c2.value;
        if (!v1 || !v2) return;
        let d1, d2;
        try { d1 = JSON.parse(v1); d2 = JSON.parse(v2); } catch(e) { return; }
        const radarCtx = document.getElementById('compare-radarChart');
        if (!radarCtx) return;
        if (radarChart) radarChart.destroy();

        const norm = tpd => Math.max(0, 100 - Math.min(100, (tpd / 10000) * 100));
        const makeData = d => [
            norm(d.data.tpd), d.data.collection,
            Math.min(100, d.data.recycling * 3),
            Math.max(0, 100 - d.data.burden * 3),
            Math.min(100, d.data.collection * 0.9),
            Math.min(100, d.data.recycling * 2.8)
        ];

        radarChart = new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: ['Low Waste', 'Collection Rate', 'Recycling', 'Eco Score', 'Efficiency', 'Green Index'],
                datasets: [
                    { label: d1.city, data: makeData(d1), borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.15)', pointBackgroundColor: '#22c55e', pointRadius: 4 },
                    { label: d2.city, data: makeData(d2), borderColor: '#f59e0b', backgroundColor: 'rgba(245,158,11,0.15)', pointBackgroundColor: '#f59e0b', pointRadius: 4 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: 'rgba(0,0,0,0.1)' },
                        grid: { color: 'rgba(0,0,0,0.1)' },
                        pointLabels: { font: { size: 11 } },
                        ticks: { backdropColor: 'transparent', stepSize: 20 },
                        min: 0, max: 100
                    }
                },
                plugins: { legend: { } }
            }
        });

        const s1 = d1.data.collection + d1.data.recycling * 3;
        const s2 = d2.data.collection + d2.data.recycling * 3;
        const badge = document.getElementById('winner-badge');
        if (badge) {
            badge.classList.remove('hidden');
            badge.innerHTML = `🏆 ${s1 >= s2 ? d1.city : d2.city} performs better overall`;
        }
    }

    c1.addEventListener('change', updateRadar);
    c2.addEventListener('change', updateRadar);
    updateRadar();
}

// ════ HEATMAP CALENDAR ═══════════════════════════════

function initHeatmapCalendar() {
    const grid = document.getElementById('heatmap-grid');
    if (!grid) return;

    const heatByWeek = [];
    for (let w = 0; w < 52; w++) {
        if (w < 4 || w > 48)          heatByWeek.push(4);
        else if (w < 9)                heatByWeek.push(3);
        else if (w < 14)               heatByWeek.push(2);
        else if (w < 20)               heatByWeek.push(1);
        else if (w < 26)               heatByWeek.push(2);
        else if (w < 34)               heatByWeek.push(2);
        else if (w === 34 || w === 35) heatByWeek.push(3);
        else if (w >= 38 && w <= 41)   heatByWeek.push(5);
        else if (w >= 42 && w <= 44)   heatByWeek.push(6);
        else if (w === 45)             heatByWeek.push(3);
        else                           heatByWeek.push(3);
    }
    const weekEvents = { 1:'Makar Sankranti', 8:'Valentine Season', 11:'Holi', 38:'Navratri Starts', 42:'Navratri Peak', 43:'DIWALI PEAK', 44:'Diwali Celebrations', 50:'Christmas', 51:'New Year Eve' };

    const daysEl = document.getElementById('hm-days');
    if (daysEl) daysEl.innerHTML = ['Mon','','Wed','','Fri','','Sun'].map(d => `<span>${d}</span>`).join('');

    const monthsEl = document.getElementById('hm-months');
    if (monthsEl) {
        monthsEl.style.display = 'grid';
        monthsEl.style.gridTemplateColumns = 'repeat(24, 1fr)';
        monthsEl.innerHTML = ['Jan','','Feb','','Mar','','Apr','','May','','Jun','','Jul','','Aug','','Sep','','Oct','','Nov','','Dec',''].map(m => `<span>${m}</span>`).join('');
    }

    for (let w = 0; w < 52; w++) {
        for (let d = 0; d < 7; d++) {
            const sq = document.createElement('div');
            sq.className = `week-sq heat-${heatByWeek[w]}`;
            const event = weekEvents[w] ? ` | ${weekEvents[w]}` : '';
            sq.title = `Week ${w + 1}${event}`;
            sq.addEventListener('mouseover', function() { this.style.transform = 'scale(1.3)'; this.style.zIndex = '10'; });
            sq.addEventListener('mouseout',  function() { this.style.transform = ''; this.style.zIndex = ''; });
            grid.appendChild(sq);
        }
    }

    const lineCtx = document.getElementById('monthly-lineChart');
    if (lineCtx) {
        new Chart(lineCtx, {
            type: 'bar',
            data: {
                labels: monthlyWaste.labels,
                datasets: [{ label: 'National Avg (000 TPD)', data: monthlyWaste.data, backgroundColor: monthlyWaste.data.map(v => v > 80 ? '#ef4444' : v > 65 ? '#f97316' : '#22c55e'), borderRadius: 6, borderSkipped: false }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { callbacks: { afterLabel: ctx => monthlyWaste.events[ctx.dataIndex] ? `Event: ${monthlyWaste.events[ctx.dataIndex]}` : '' } } },
                scales: { y: { }, x: { grid: { display: false } } }
            }
        });
    }
}

// ════ SCHEME TIMELINE ════════════════════════════════

function initSchemeTimeline() {
    const container = document.getElementById('scheme-nodes');
    if (!container) return;

    schemesData.forEach((s, i) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'sch-wrapper';

        const node = document.createElement('div');
        node.className = 'sch-node';
        node.innerHTML = `<i class="fas ${s.icon}"></i>`;
        node.title = s.name;

        const label = document.createElement('div');
        label.className = 'sch-label';
        label.innerHTML = `<span class="sch-year">${s.year}</span><span class="sch-name">${s.name}</span>`;

        wrapper.appendChild(node);
        wrapper.appendChild(label);
        wrapper.addEventListener('click', () => showSchemeModal(s));
        container.appendChild(wrapper);

        setTimeout(() => node.classList.add('visible'), 400 + i * 180);
    });

    const tlSvg = document.querySelector('.timeline-line');
    if (tlSvg) {
        const pl = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        pl.setAttribute('x1', '0'); pl.setAttribute('y1', '50%');
        pl.setAttribute('x2', '100%'); pl.setAttribute('y2', '50%');
        pl.classList.add('progress-line');
        tlSvg.appendChild(pl);
    }

    const modal = document.getElementById('scheme-modal');
    if (modal) {
        const closeBtn = modal.querySelector('.close-modal');
        if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
        modal.addEventListener('click', e => { if (e.target === modal) modal.classList.add('hidden'); });
    }
}

function showSchemeModal(s) {
    const modal = document.getElementById('scheme-modal');
    const body  = document.getElementById('scheme-modal-body');
    if (!modal || !body) return;

    body.innerHTML = `
        <div style="text-align:center;margin-bottom:20px;">
            <i class="fas ${s.icon}" style="font-size:3rem;color:var(--accent-green);"></i>
        </div>
        <h3 style="color:var(--accent-green);margin-bottom:4px;">${s.name}</h3>
        <p style="font-family:var(--font-mono);color:var(--text-muted);margin-bottom:16px;">Launched ${s.year}</p>
        <p style="margin-bottom:20px;line-height:1.7;">${s.desc}</p>
        <div style="background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.2);padding:14px;border-radius:10px;margin-bottom:20px;">
            <strong style="color:var(--accent-green);">Key Achievement:</strong> ${s.stat}
        </div>
        <p style="margin-bottom:8px;font-weight:600;">Implementation Progress: ${s.impl}%</p>
        <div style="background:rgba(0,0,0,0.1);border-radius:4px;height:10px;margin-bottom:20px;">
            <div style="background:var(--accent-green);height:100%;width:${s.impl}%;border-radius:4px;transition:width 1s ease;"></div>
        </div>
        <a href="${s.link}" target="_blank" rel="noopener" class="btn btn-primary">
            Visit Official Site <i class="fas fa-external-link-alt"></i>
        </a>
    `;
    modal.classList.remove('hidden');
    if (typeof gsap !== 'undefined') gsap.from(modal, { scale: 0.85, opacity: 0, duration: 0.3, ease: 'back.out' });
}

// ════ ECON CHARTS ════════════════════════════════════

function initEconCharts() {
    const donutCtx = document.getElementById('econ-donut');
    if (donutCtx) {
        new Chart(donutCtx, {
            type: 'doughnut',
            data: {
                labels: ['Collection & Transport', 'Processing & Disposal'],
                datasets: [{ data: [80, 20], backgroundColor: ['#ef4444', '#22c55e'], borderWidth: 0 }]
            },
            options: {
                responsive: true, maintainAspectRatio: false, cutout: '75%',
                plugins: { legend: { position: 'bottom', labels: { padding: 20 } } }
            }
        });
    }

    const barCtx = document.getElementById('econ-bar');
    if (barCtx) {
        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['Health Costs', 'Land Degradation', 'Lost Recyclables', 'Env Cleanup', 'Tourism Loss'],
                datasets: [
                    { label: '2020', data: [8.2, 3.1, 11.2, 2.8, 1.4], backgroundColor: '#166534', borderRadius: 4 },
                    { label: '2023', data: [9.8, 3.6, 14.1, 3.2, 1.9], backgroundColor: '#16a34a', borderRadius: 4 },
                    { label: '2025', data: [11.5, 4.0, 15.0, 3.8, 2.2], backgroundColor: '#22c55e', borderRadius: 4 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { } },
                scales: {
                    y: { ticks: { callback: v => '$' + v + 'B' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    const lineCtx = document.getElementById('econ-line');
    if (lineCtx) {
        new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: ['2020','2021','2022','2023','2024','2025','2030 (proj)'],
                datasets: [
                    { label: 'Recycling Industry Value ($B)', data: [2.1, 2.4, 2.9, 3.4, 4.0, 4.8, 9.2], borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.1)', tension: 0.4, fill: true, pointBackgroundColor: '#22c55e', pointRadius: 5 },
                    { label: 'Green Jobs Created (Millions)', data: [1.2, 1.4, 1.7, 2.1, 2.5, 3.0, 6.8], borderColor: '#f59e0b', backgroundColor: 'rgba(245,158,11,0.1)', tension: 0.4, fill: true, pointBackgroundColor: '#f59e0b', pointRadius: 5 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: {  } },
                scales: {
                    y: {  },
                    x: { grid: { display: false } }
                }
            }
        });
    }
}

// ════ CALCULATOR ═════════════════════════════════════

function initCalculator() {
    const rangeVol = document.getElementById('range-volunteers');
    const rangeKg  = document.getElementById('range-kg');
    const calcState = document.getElementById('calc-state');
    const calcCity  = document.getElementById('calc-city');
    if (!rangeVol || !calcState) return;

    Object.keys(cityData).forEach(s => {
        const o = document.createElement('option'); o.value = o.textContent = s; calcState.appendChild(o);
    });

    rangeVol.addEventListener('input', e => { const el = document.getElementById('val-volunteers'); if(el) el.textContent = e.target.value; });
    rangeKg.addEventListener('input',  e => { const el = document.getElementById('val-kg');         if(el) el.textContent = e.target.value; });

    calcState.addEventListener('change', e => {
        calcCity.innerHTML = '';
        calcCity.disabled = false;
        Object.keys(cityData[e.target.value]?.cities || {}).forEach(c => {
            const o = document.createElement('option'); o.value = o.textContent = c; calcCity.appendChild(o);
        });
    });

    const btn = document.getElementById('btn-calculate');
    if (!btn) return;

    btn.addEventListener('click', () => {
        const state = calcState.value;
        const city  = calcCity.value;
        if (!state || !city) { alert('Please select both state and city!'); return; }

        const volPct = parseFloat(rangeVol.value);
        const kg     = parseFloat(rangeKg.value);
        const pop    = cityPopulation[city] || 1000000;

        const volunteers = Math.round(pop * (volPct / 100));
        const tonnesYear = (volunteers * kg * 12) / 1000;
        const cityTPD    = cityData[state]?.cities[city]?.tpd || 5000;
        const annualWaste = cityTPD * 365;
        const reductPct  = Math.min(100, (tonnesYear / annualWaste) * 100).toFixed(1);
        const co2        = Math.round(tonnesYear * 0.5);
        const trees      = Math.round(co2 * 45);
        const trucks     = Math.min(20, Math.round(tonnesYear / 365 / 5));
        const cleanScore = Math.min(99, Math.round(parseFloat(reductPct) * 1.8)) + '/100';
        const yearsText  = parseFloat(reductPct) > 0 ? (100 / (parseFloat(reductPct) * 1.2)).toFixed(1) + ' YEARS' : '∞ YEARS';

        const setEl = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
        setEl('res-cityname', `FOR ${city.toUpperCase()}`);
        setEl('res-volunteers', volunteers.toLocaleString());
        setEl('res-waste', Math.round(tonnesYear).toLocaleString() + ' TPY');
        setEl('res-score', cleanScore);
        setEl('res-percent', reductPct);
        setEl('res-co2', co2.toLocaleString());
        setEl('res-trees', trees.toLocaleString());
        setEl('res-years', yearsText);

        const progress = document.getElementById('res-progress');
        if (progress) progress.style.width = Math.min(100, parseFloat(reductPct) * 3) + '%';

        const truckContainer = document.getElementById('truck-container');
        if (truckContainer) {
            truckContainer.innerHTML = '';
            for (let i = 0; i < trucks; i++) {
                const icon = document.createElement('i');
                icon.className = 'fas fa-truck';
                icon.style.animationDelay = (i * 0.1) + 's';
                truckContainer.appendChild(icon);
            }
        }
        if (parseFloat(reductPct) > 20) fireCalcConfetti();
    });
}

function fireCalcConfetti() {
    const colors = ['#22c55e','#f59e0b','#16a34a'];
    for (let i = 0; i < 30; i++) {
        const dot = document.createElement('div');
        Object.assign(dot.style, {
            position: 'fixed', width: '8px', height: '8px', borderRadius: '50%',
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            left: Math.random() * 100 + 'vw', top: '0', zIndex: '9999',
            transition: `top 1.5s ease, opacity 1.5s, left ${0.5 + Math.random()}s ease`, opacity: '1'
        });
        document.body.appendChild(dot);
        setTimeout(() => { dot.style.top = (50 + Math.random() * 50) + 'vh'; dot.style.opacity = '0'; }, 50);
        setTimeout(() => dot.remove(), 2000);
    }
}

// ════ LEAFLET TRACKER ════════════════════════════════

function initLeafletTracker() {
    const mapDiv = document.getElementById('recycle-map');
    if (!mapDiv || typeof L === 'undefined') return;

    const map = L.map('recycle-map', { center: [20.5937, 78.9629], zoom: 5, scrollWheelZoom: false });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CartoDB', maxZoom: 18
    }).addTo(map);

    const typeConfig = {
        recycling:  { color: '#22c55e', emoji: '♻️' },
        composting: { color: '#eab308', emoji: '🌿' },
        ewaste:     { color: '#3b82f6', emoji: '💻' },
        wte:        { color: '#f59e0b', emoji: '⚡' }
    };

    const markerLayers = {};
    const allLayers = L.layerGroup().addTo(map);

    recyclingCenters.forEach(center => {
        const cfg = typeConfig[center.type] || { color: '#9ca3af', emoji: '📍' };
        const marker = L.circleMarker([center.lat, center.lng], {
            radius: 10, fillColor: cfg.color, color: '#fff', weight: 2, opacity: 1, fillOpacity: 0.9
        });
        marker.bindPopup(`
            <div style="font-family:'DM Sans',sans-serif;min-width:200px;">
                <div style="font-weight:700;font-size:1rem;margin-bottom:6px;color:#0f172a;">${cfg.emoji} ${center.name}</div>
                <div style="color:#334155;">📍 ${center.city}, ${center.state}</div>
                <div style="color:#334155;">📦 Capacity: ${center.capacity}</div>
                <div style="color:#334155;">📞 ${center.contact}</div>
                <a href="${center.mapsLink}" target="_blank" style="display:inline-block;margin-top:10px;padding:6px 14px;background:#22c55e;color:#fff;border-radius:20px;text-decoration:none;font-weight:600;font-size:0.85rem;">📍 Open in Maps</a>
            </div>
        `, { maxWidth: 260 });
        marker.addTo(allLayers);
        if (!markerLayers[center.type]) markerLayers[center.type] = [];
        markerLayers[center.type].push(marker);
    });

    document.querySelectorAll('.filter-pill').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const type = this.getAttribute('data-type');
            allLayers.clearLayers();
            if (type === 'all') {
                recyclingCenters.forEach(c => {
                    const cfg = typeConfig[c.type] || { color: '#9ca3af' };
                    L.circleMarker([c.lat, c.lng], { radius: 10, fillColor: cfg.color, color: '#fff', weight: 2, fillOpacity: 0.9 })
                     .addTo(allLayers);
                });
            } else {
                (markerLayers[type] || []).forEach(m => m.addTo(allLayers));
            }
        });
    });

    const stateList = document.getElementById('tracker-state-list');
    const stateCenters = {
        "Maharashtra": [19.7515, 75.7139, 6], "Delhi": [28.7041, 77.1025, 10],
        "Karnataka": [15.3173, 75.7139, 6],   "Tamil Nadu": [11.1271, 78.6569, 6],
        "West Bengal": [22.9868, 87.8550, 6], "Gujarat": [22.2587, 71.1924, 6],
        "Rajasthan": [27.0238, 74.2179, 6],   "Uttar Pradesh": [26.8467, 80.9462, 6],
        "Uttarakhand": [30.0668, 79.0193, 7]
    };
    if (stateList) {
        Object.entries(stateCenters).forEach(([state, coords]) => {
            const li = document.createElement('li');
            li.textContent = state;
            li.addEventListener('click', () => map.flyTo([coords[0], coords[1]], coords[2], { duration: 1.5 }));
            stateList.appendChild(li);
        });
    }
    setTimeout(() => map.invalidateSize(), 300);
}

// ════ TRUTH OR DARE WHEEL ════════════════════════════

function initTruthOrDare() {
    const canvas = document.getElementById('roulette-wheel');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const R = W / 2;
    const SEGMENTS = 8;
    const SEGMENT_ANGLE = (2 * Math.PI) / SEGMENTS;
    const segColors = ['#16a34a','#d97706','#15803d','#b45309','#14532d','#92400e','#166534','#78350f'];
    const segLabels = ['TRUTH','DARE','TRUTH','DARE','TRUTH','DARE','TRUTH','DARE'];

    function drawWheel(rotation) {
        ctx.clearRect(0, 0, W, H);
        ctx.save();
        ctx.translate(W/2, H/2);
        ctx.rotate(rotation);

        for (let i = 0; i < SEGMENTS; i++) {
            const start = i * SEGMENT_ANGLE;
            const end   = start + SEGMENT_ANGLE;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, R - 2, start, end);
            ctx.closePath();
            ctx.fillStyle = segColors[i];
            ctx.fill();
            ctx.strokeStyle = 'rgba(255,255,255,0.4)';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.save();
            ctx.rotate(start + SEGMENT_ANGLE / 2);
            ctx.textAlign = 'right';
            ctx.fillStyle = '#ffffff';
            ctx.font = `bold ${Math.floor(R * 0.13)}px 'Bebas Neue', sans-serif`;
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.shadowBlur = 4;
            ctx.fillText(segLabels[i], R - 16, 6);
            ctx.restore();
        }

        ctx.beginPath();
        ctx.arc(0, 0, R * 0.12, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.restore();
    }

    let currentRot = 0;
    let isSpinning = false;
    let playerScore = 0;
    drawWheel(0);

    const spinBtn = document.getElementById('btn-spin');
    if (!spinBtn) return;

    spinBtn.addEventListener('click', () => {
        if (isSpinning) return;
        isSpinning = true;
        spinBtn.disabled = true;
        spinBtn.textContent = '🌀 SPINNING...';

        const resultCard = document.getElementById('td-result-card');
        if (resultCard) resultCard.classList.add('hidden');

        const extraSpins  = (Math.floor(Math.random() * 5) + 6) * (2 * Math.PI);
        const snapAngle   = Math.floor(Math.random() * SEGMENTS) * SEGMENT_ANGLE;
        const startRot    = currentRot;
        const targetRot   = currentRot + extraSpins + snapAngle;
        const startTime   = performance.now();
        const duration    = 4000 + Math.random() * 1000;
        let lastSeg       = -1;

        function playTick() {
            try {
                const ac = new (window.AudioContext || window.webkitAudioContext)();
                const osc = ac.createOscillator(), gain = ac.createGain();
                osc.connect(gain); gain.connect(ac.destination);
                osc.frequency.setValueAtTime(800, ac.currentTime);
                gain.gain.setValueAtTime(0.08, ac.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.05);
                osc.start(); osc.stop(ac.currentTime + 0.05);
            } catch(e) {}
        }

        function easeOut(t) { return 1 - Math.pow(1 - t, 4); }

        function frame(now) {
            const elapsed  = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const rot      = startRot + (targetRot - startRot) * easeOut(progress);

            drawWheel(rot);

            const normRot = ((rot % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
            const seg = Math.floor(normRot / SEGMENT_ANGLE) % SEGMENTS;
            if (seg !== lastSeg && progress < 0.85) { playTick(); lastSeg = seg; }

            if (progress < 1) {
                requestAnimationFrame(frame);
            } else {
                currentRot = targetRot;
                drawWheel(currentRot);
                isSpinning = false;
                spinBtn.disabled = false;
                spinBtn.textContent = '🌀 SPIN AGAIN!';
                showTDResult();
            }
        }

        requestAnimationFrame(frame);
    });

    function getSegmentAtPointer(rotation) {
        const topAngle = ((3 * Math.PI / 2 - rotation) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
        return Math.floor(topAngle / SEGMENT_ANGLE) % SEGMENTS;
    }

    function showTDResult() {
        const segIndex = getSegmentAtPointer(currentRot);
        const isTruth  = (segIndex % 2 === 0);

        const resultCard = document.getElementById('td-result-card');
        const typeBadge  = document.getElementById('td-type');
        const qText      = document.getElementById('td-question');
        const truthOpts  = document.getElementById('td-truth-options');
        const dareActs   = document.getElementById('td-dare-actions');
        const explanBox  = document.getElementById('td-explanation');

        if (!resultCard) return;
        resultCard.classList.remove('hidden');
        if (explanBox) explanBox.classList.add('hidden');
        if (typeof gsap !== 'undefined') gsap.from(resultCard, { y: 30, opacity: 0, duration: 0.4, ease: 'back.out' });

        if (isTruth) {
            typeBadge.className = 'td-badge green';
            typeBadge.innerHTML = '🟢 TRUTH';
            resultCard.style.borderColor = '#22c55e';
            if (dareActs) dareActs.classList.add('hidden');
            if (truthOpts) {
                truthOpts.classList.remove('hidden');
                const q = truthQuestions[Math.floor(Math.random() * truthQuestions.length)];
                qText.textContent = q.q;
                truthOpts.innerHTML = '';
                q.options.forEach((opt, i) => {
                    const btn = document.createElement('button');
                    btn.className = 'truth-opt-btn';
                    btn.textContent = `${String.fromCharCode(65+i)}. ${opt}`;
                    btn.addEventListener('click', () => {
                        if (btn.dataset.answered) return;
                        truthOpts.querySelectorAll('button').forEach(b => b.dataset.answered = 'yes');
                        if (i === q.answer) {
                            btn.style.cssText += 'background:#dcfce7;border-color:#16a34a;color:#166534;';
                            playerScore += 15; updateScore();
                        } else {
                            btn.style.cssText += 'background:#fee2e2;border-color:#dc2626;color:#991b1b;';
                            truthOpts.querySelectorAll('button')[q.answer].style.cssText += 'background:#dcfce7;border-color:#16a34a;color:#166534;';
                        }
                        if (explanBox) {
                            explanBox.textContent = '💡 ' + q.explanation;
                            explanBox.style.cssText = 'background:#f0fdf4;border:1px solid #bbf7d0;padding:14px;border-radius:8px;color:#166534;font-size:0.9rem;line-height:1.6;';
                            explanBox.classList.remove('hidden');
                        }
                    });
                    truthOpts.appendChild(btn);
                });
            }
        } else {
            typeBadge.className = 'td-badge orange';
            typeBadge.innerHTML = '🔴 DARE';
            resultCard.style.borderColor = '#f59e0b';
            if (truthOpts) truthOpts.classList.add('hidden');
            if (dareActs) dareActs.classList.remove('hidden');

            const dare = dareTasks[Math.floor(Math.random() * dareTasks.length)];
            qText.innerHTML = `<span style="font-size:2rem;">${dare.icon}</span><br><strong>${dare.dare}</strong><br><span style="font-size:0.95rem;font-weight:normal;color:#64748b;">${dare.description}</span>`;

            const acceptBtn = document.getElementById('btn-dare-accept');
            const skipBtn   = document.getElementById('btn-dare-skip');
            if (acceptBtn) {
                acceptBtn.disabled = false;
                acceptBtn.textContent = '✅ I Accept';
                acceptBtn.style.background = '';
                acceptBtn.onclick = () => {
                    playerScore += dare.points; updateScore();
                    acceptBtn.textContent = `✅ Accepted! +${dare.points} pts`;
                    acceptBtn.style.background = '#166534';
                    acceptBtn.disabled = true;
                    if (skipBtn) skipBtn.disabled = true;
                    showConfettiAnim();
                };
            }
            if (skipBtn) {
                skipBtn.disabled = false;
                skipBtn.textContent = '😅 Skip (Coward)';
                skipBtn.style.background = '';
                skipBtn.onclick = () => {
                    playerScore = Math.max(0, playerScore - 10); updateScore();
                    skipBtn.textContent = '😅 Skipped (-10 pts)';
                    skipBtn.style.background = '#fee2e2';
                    skipBtn.style.color = '#991b1b';
                    skipBtn.disabled = true;
                    if (acceptBtn) acceptBtn.disabled = true;
                };
            }
        }
    }

    function updateScore() {
        const el = document.getElementById('p1-score');
        if (el) el.textContent = playerScore;
    }

    function showConfettiAnim() {
        const colors = ['#22c55e','#f59e0b','#16a34a','#ea580c'];
        for (let i = 0; i < 25; i++) {
            const dot = document.createElement('div');
            Object.assign(dot.style, {
                position: 'fixed', width: '10px', height: '10px', borderRadius: '50%',
                backgroundColor: colors[i % colors.length],
                left: (30 + Math.random() * 40) + 'vw', top: '40vh', zIndex: '9999',
                transition: 'all 1.2s ease', opacity: '1'
            });
            document.body.appendChild(dot);
            setTimeout(() => { dot.style.top = (20 + Math.random() * 40) + 'vh'; dot.style.left = (20 + Math.random() * 60) + 'vw'; dot.style.opacity = '0'; }, 50);
            setTimeout(() => dot.remove(), 1400);
        }
    }
}

// ════ VOLUNTEER CERTIFICATE ══════════════════════════

function initVolunteerCert() {
    const canvas = document.getElementById('cert-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
            this.classList.add('active');
            const target = document.getElementById('tab-' + this.getAttribute('data-tab'));
            if (target) target.classList.remove('hidden');
        });
    });

    function drawCertificate(name = '') {
        const W = 800, H = 600;
        ctx.clearRect(0, 0, W, H);
        const bg = ctx.createLinearGradient(0, 0, W, H);
        bg.addColorStop(0, '#f0fdf4'); bg.addColorStop(1, '#dcfce7');
        ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
        ctx.save(); ctx.globalAlpha = 0.04;
        for (let i = 0; i < W; i += 80) for (let j = 0; j < H; j += 80) {
            ctx.beginPath(); ctx.arc(i, j, 25, 0, Math.PI*2);
            ctx.fillStyle = '#22c55e'; ctx.fill();
        }
        ctx.restore();
        ctx.strokeStyle = '#166534'; ctx.lineWidth = 14; ctx.strokeRect(12, 12, W-24, H-24);
        ctx.strokeStyle = '#22c55e'; ctx.lineWidth = 3; ctx.strokeRect(22, 22, W-44, H-44);
        ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 1.5; ctx.strokeRect(28, 28, W-56, H-56);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#14532d'; ctx.font = 'bold 44px "Bebas Neue", sans-serif'; ctx.fillText('CLEAN INDIA PROJECT', W/2, 105);
        ctx.fillStyle = '#f59e0b'; ctx.font = 'italic 26px Georgia, serif'; ctx.fillText('Certificate of Commitment', W/2, 155);
        ctx.fillStyle = '#374151'; ctx.font = '18px "DM Sans", sans-serif'; ctx.fillText('This Certificate is Proudly Presented to', W/2, 210);
        if (name) {
            ctx.font = 'bold italic 52px Georgia, serif';
            ctx.fillStyle = '#166534'; ctx.shadowColor = 'rgba(0,0,0,0.15)'; ctx.shadowBlur = 8;
            ctx.fillText(name, W/2, 295); ctx.shadowBlur = 0;
        }
        ctx.fillStyle = '#374151'; ctx.font = '17px "DM Sans", sans-serif';
        ctx.fillText('Has pledged to segregate waste and work towards a Cleaner India.', W/2, 355);
        ctx.fillText('Officially a Certified Clean India Volunteer', W/2, 385);
        ctx.font = '30px serif';
        ['🌿','🌱','♻️','🌿'].forEach((e, i) => ctx.fillText(e, 80 + i*220, 430));
        ctx.strokeStyle = '#9ca3af'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(120, 490); ctx.lineTo(320, 490); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(480, 490); ctx.lineTo(680, 490); ctx.stroke();
        ctx.fillStyle = '#6b7280'; ctx.font = '14px "DM Sans", sans-serif';
        ctx.fillText('Susmit Choudhury', 220, 510); ctx.fillText('Swastik Das', 580, 510);
        ctx.fillText('LPU EVS Project 2026', 220, 528); ctx.fillText('LPU EVS Project 2026', 580, 528);
        const certID = 'CID-' + Math.floor(Math.random() * 900000 + 100000);
        ctx.fillStyle = '#9ca3af'; ctx.font = '12px monospace';
        ctx.fillText(`Date: ${new Date().toLocaleDateString('en-IN')}  |  ID: ${certID}`, W/2, 575);
    }

    drawCertificate();

    const generateBtn = document.getElementById('btn-generate-cert');
    const downloadBtn = document.getElementById('btn-download-cert');
    const nameInput   = document.getElementById('cert-name');

    if (generateBtn) generateBtn.addEventListener('click', () => {
        drawCertificate(nameInput?.value?.trim() || 'Eco Warrior');
        if (downloadBtn) downloadBtn.classList.remove('hidden');
    });
    if (downloadBtn) downloadBtn.addEventListener('click', () => {
        const name = nameInput?.value?.trim() || 'Certificate';
        const link = document.createElement('a');
        link.download = `CleanIndia_Certificate_${name}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}

// ════ SPARKLINES ═════════════════════════════════════

function initSparklines() {
    document.querySelectorAll('.sparkline').forEach(el => {
        const val  = parseInt(el.getAttribute('data-val') || '50');
        const card = el.closest('.zone-card');
        let color  = '#22c55e';
        if (card?.classList.contains('yellow')) color = '#eab308';
        if (card?.classList.contains('orange')) color = '#f97316';
        if (card?.classList.contains('red'))    color = '#ef4444';

        const bar = document.createElement('div');
        bar.style.cssText = `height:100%;width:0%;border-radius:4px;background:${color};transition:width 1.5s cubic-bezier(0.4,0,0.2,1);`;
        el.style.overflow = 'hidden';
        el.appendChild(bar);

        new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) bar.style.width = val + '%';
        }, { threshold: 0.5 }).observe(el);
    });
}

// ════ BACK TO TOP ════════════════════════════════════

function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => btn.classList.toggle('hidden', window.scrollY < 300), { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ════ FUTURE CITY CANVAS ═════════════════════════════

function initFutureCity() {
    const canvas = document.getElementById('future-city');
    if (!canvas) return;

    const parent = canvas.parentElement;
    canvas.width  = parent.offsetWidth  || 600;
    canvas.height = parent.offsetHeight || 500;

    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;

    const buildings = [
        { x: 30,  w: 55, h: 0.45, accent: '#22c55e' },
        { x: 95,  w: 40, h: 0.60, accent: '#3b82f6' },
        { x: 145, w: 65, h: 0.38, accent: '#22c55e' },
        { x: 220, w: 48, h: 0.72, accent: '#f59e0b' },
        { x: 278, w: 75, h: 0.48, accent: '#22c55e' },
        { x: 365, w: 52, h: 0.65, accent: '#3b82f6' },
        { x: 427, w: 62, h: 0.35, accent: '#22c55e' },
        { x: 500, w: 45, h: 0.55, accent: '#f59e0b' },
        { x: 555, w: 70, h: 0.68, accent: '#22c55e' },
    ].map(b => ({ ...b, hPx: Math.floor(b.h * (H - 60)) }));

    const iotNodes = [
        { x: W*0.15, y: H*0.18 }, { x: W*0.38, y: H*0.12 },
        { x: W*0.62, y: H*0.20 }, { x: W*0.85, y: H*0.15 }
    ];

    const drones = [
        { baseX: W*0.30, baseY: H*0.30, phase: 0.0 },
        { baseX: W*0.68, baseY: H*0.25, phase: 1.2 }
    ];

    let t = 0;

    function draw() {
        ctx.clearRect(0, 0, W, H);

        const sky = ctx.createLinearGradient(0, 0, 0, H * 0.7);
        sky.addColorStop(0, '#f8fafc');
        sky.addColorStop(1, '#e2e8f0');
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, W, H);

        ctx.save();
        ctx.strokeStyle = 'rgba(34,197,94,0.07)';
        ctx.lineWidth = 1;
        for (let gx = 0; gx < W; gx += 40) {
            ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
        }
        for (let gy = 0; gy < H; gy += 40) {
            ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
        }
        ctx.restore();

        ctx.save();
        ctx.setLineDash([5, 8]);
        ctx.strokeStyle = 'rgba(34,197,94,0.25)';
        ctx.lineWidth = 1;
        for (let i = 0; i < iotNodes.length - 1; i++) {
            const n1 = iotNodes[i], n2 = iotNodes[i+1];
            ctx.beginPath(); ctx.moveTo(n1.x, n1.y); ctx.lineTo(n2.x, n2.y); ctx.stroke();
        }
        ctx.setLineDash([]);
        ctx.restore();

        for (let i = 0; i < iotNodes.length - 1; i++) {
            const n1 = iotNodes[i], n2 = iotNodes[i+1];
            const p = ((t * 0.008 + i * 0.33) % 1);
            const px = n1.x + (n2.x - n1.x) * p;
            const py = n1.y + (n2.y - n1.y) * p;
            ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI*2);
            ctx.fillStyle = i % 2 === 0 ? '#22c55e' : '#f59e0b';
            ctx.fill();
        }

        iotNodes.forEach((n, i) => {
            const pulse = ((t * 0.025 + i * 0.6) % 1);
            ctx.beginPath(); ctx.arc(n.x, n.y, 6 + pulse * 28, 0, Math.PI*2);
            ctx.strokeStyle = `rgba(34,197,94,${0.55 - pulse * 0.55})`;
            ctx.lineWidth = 1.5; ctx.stroke();
            ctx.beginPath(); ctx.arc(n.x, n.y, 5, 0, Math.PI*2);
            ctx.fillStyle = '#22c55e'; ctx.fill();
            ctx.fillStyle = '#0f172a';
            ctx.font = 'bold 9px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('IoT', n.x, n.y + 18);
        });

        buildings.forEach((b, bi) => {
            const groundY = H - 40;
            const topY    = groundY - b.hPx;

            const bGrad = ctx.createLinearGradient(b.x, topY, b.x + b.w, groundY);
            bGrad.addColorStop(0, '#cbd5e1');
            bGrad.addColorStop(1, '#94a3b8');
            ctx.fillStyle = bGrad;
            ctx.fillRect(b.x, topY, b.w, b.hPx);

            ctx.fillStyle = b.accent;
            ctx.globalAlpha = 0.6;
            ctx.fillRect(b.x, topY, 2, b.hPx);
            ctx.fillRect(b.x + b.w - 2, topY, 2, b.hPx);
            ctx.globalAlpha = 1;

            for (let wy = topY + 12; wy < groundY - 10; wy += 20) {
                for (let wx = b.x + 6; wx < b.x + b.w - 6; wx += 14) {
                    const flicker = Math.sin(t * 0.04 + bi * 1.7 + wx * 0.1) > 0.2;
                    ctx.fillStyle = flicker
                        ? `rgba(${b.accent === '#3b82f6' ? '59,130,246' : b.accent === '#f59e0b' ? '245,158,11' : '34,197,94'},0.55)`
                        : 'rgba(255,255,255,0.4)';
                    ctx.fillRect(wx, wy, 9, 11);
                }
            }

            ctx.strokeStyle = b.accent;
            ctx.lineWidth = 1.5; ctx.globalAlpha = 0.8;
            ctx.beginPath(); ctx.moveTo(b.x + b.w/2, topY); ctx.lineTo(b.x + b.w/2, topY - 22); ctx.stroke();
            ctx.globalAlpha = 1;

            if (Math.sin(t * 0.06 + bi) > 0.4) {
                ctx.beginPath(); ctx.arc(b.x + b.w/2, topY - 24, 3.5, 0, Math.PI*2);
                ctx.fillStyle = '#ef4444'; ctx.fill();
            }

            if (bi % 2 === 0) {
                ctx.fillStyle = 'rgba(59,130,246,0.35)';
                ctx.fillRect(b.x + 4, topY - 7, b.w - 8, 5);
                ctx.strokeStyle = 'rgba(59,130,246,0.7)';
                ctx.lineWidth = 0.5;
                for (let sx = b.x + 4; sx < b.x + b.w - 4; sx += 10) {
                    ctx.beginPath(); ctx.moveTo(sx, topY - 7); ctx.lineTo(sx, topY - 2); ctx.stroke();
                }
            }
        });

        drones.forEach((d, di) => {
            const dx = d.baseX + Math.sin(t * 0.018 + d.phase) * 38;
            const dy = d.baseY + Math.cos(t * 0.013 + d.phase) * 22;

            ctx.fillStyle = 'rgba(0,0,0,0.1)';
            ctx.beginPath(); ctx.ellipse(dx, H - 42, 14, 5, 0, 0, Math.PI*2); ctx.fill();

            ctx.fillStyle = '#166534';
            ctx.beginPath(); ctx.roundRect(dx - 10, dy - 4, 20, 8, 3); ctx.fill();

            [-10, 10].forEach(ox => {
                ctx.strokeStyle = '#166534'; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(dx + ox * 0.5, dy); ctx.lineTo(dx + ox * 1.6, dy - 5); ctx.stroke();

                const propAngle = t * 0.28 * (di % 2 === 0 ? 1 : -1);
                ctx.save();
                ctx.translate(dx + ox * 1.6, dy - 5);
                ctx.rotate(propAngle);
                ctx.strokeStyle = 'rgba(22,163,74,0.7)'; ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.moveTo(-7, 0); ctx.lineTo(7, 0); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(0, -5); ctx.lineTo(0, 5); ctx.stroke();
                ctx.restore();
            });

            ctx.beginPath(); ctx.arc(dx, dy + 8, 3, 0, Math.PI*2);
            ctx.fillStyle = `rgba(245,158,11,${0.5 + 0.5 * Math.sin(t * 0.12 + di)})`;
            ctx.fill();

            ctx.save(); ctx.globalAlpha = 0.12;
            const beam = ctx.createLinearGradient(dx, dy + 8, dx, H - 40);
            beam.addColorStop(0, '#f59e0b'); beam.addColorStop(1, 'transparent');
            ctx.fillStyle = beam;
            ctx.beginPath(); ctx.moveTo(dx - 4, dy + 8); ctx.lineTo(dx + 4, dy + 8);
            ctx.lineTo(dx + 20, H - 40); ctx.lineTo(dx - 20, H - 40); ctx.closePath(); ctx.fill();
            ctx.restore();
        });

        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(0, H - 40, W, 40);

        ctx.save();
        ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 2;
        ctx.setLineDash([22, 16]);
        ctx.beginPath(); ctx.moveTo(0, H - 20); ctx.lineTo(W, H - 20); ctx.stroke();
        ctx.setLineDash([]); ctx.restore();

        [{ x: W*0.22, c: '#22c55e', label: 'WET' },
         { x: W*0.50, c: '#3b82f6', label: 'DRY' },
         { x: W*0.78, c: '#ef4444', label: 'HAZ' }].forEach(bin => {
            ctx.fillStyle = bin.c;
            ctx.globalAlpha = 0.9;
            ctx.beginPath(); ctx.roundRect(bin.x - 7, H - 40, 14, 30, 3); ctx.fill();
            ctx.globalAlpha = 1;
            if (Math.sin(t * 0.04 + bin.x) > 0.3) {
                ctx.beginPath(); ctx.arc(bin.x, H - 44, 9, Math.PI, 0);
                ctx.strokeStyle = 'rgba(34,197,94,0.6)'; ctx.lineWidth = 1.5; ctx.stroke();
            }
            ctx.font = 'bold 8px monospace'; ctx.fillStyle = '#fff';
            ctx.textAlign = 'center'; ctx.fillText(bin.label, bin.x, H - 22);
        });

        ctx.font = 'bold 13px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(15,23,42,0.8)';
        ctx.textAlign = 'right';
        ctx.fillText(`SMART CITY 2030  ●  ${new Date().getFullYear()}`, W - 12, 24);

        ctx.font = '11px monospace';
        ctx.fillStyle = 'rgba(51,65,85,0.7)';
        ctx.fillText(`IoT NODES: ${iotNodes.length}  DRONES: ${drones.length}  BINS: LIVE`, W - 12, 42);

        t++;
        requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener('resize', () => {
        canvas.width  = parent.offsetWidth  || 600;
        canvas.height = parent.offsetHeight || 500;
    });
}

// ════ SEGREGATION GAME ═══════════════════════════════

function initSegregationGame() {
    const spawner = document.getElementById('waste-spawner');
    if (!spawner) return;

    let score = 0;
    const items = [
        { emoji: '🍌', type: 'wet',    name: 'Banana Peel' },
        { emoji: '🍎', type: 'wet',    name: 'Apple Core' },
        { emoji: '📰', type: 'dry',    name: 'Newspaper' },
        { emoji: '📦', type: 'dry',    name: 'Cardboard Box' },
        { emoji: '🥤', type: 'dry',    name: 'Plastic Cup' },
        { emoji: '🔋', type: 'hazard', name: 'Dead Battery' },
        { emoji: '💊', type: 'hazard', name: 'Medicine Bottle' },
        { emoji: '💡', type: 'dry',    name: 'Light Bulb' }
    ];

    function renderItems() {
        spawner.innerHTML = '';
        items.forEach(item => {
            const el = document.createElement('div');
            el.className = 'draggable-item';
            el.draggable = true;
            el.dataset.type = item.type;
            el.innerHTML = `${item.emoji}<div style="font-size:0.55rem;margin-top:4px;color:var(--text-secondary);">${item.name}</div>`;
            el.addEventListener('dragstart', e => { e.dataTransfer.setData('type', item.type); el.style.opacity = '0.4'; });
            el.addEventListener('dragend', () => el.style.opacity = '1');
            spawner.appendChild(el);
        });
    }
    renderItems();

    document.querySelectorAll('.bin').forEach(bin => {
        bin.addEventListener('dragover',  e => { e.preventDefault(); bin.classList.add('open'); });
        bin.addEventListener('dragleave', () => bin.classList.remove('open'));
        bin.addEventListener('drop', e => {
            e.preventDefault(); bin.classList.remove('open');
            const droppedType = e.dataTransfer.getData('type');
            if (droppedType === bin.dataset.type) {
                score += 10;
                document.getElementById('game-score').textContent = score;
                bin.style.boxShadow = '0 0 25px rgba(34,197,94,0.8)';
                showGameFeedback('✅ Correct! +10 Points', '#16a34a');
                setTimeout(() => bin.style.boxShadow = '', 600);
            } else {
                bin.style.animation = 'shake 0.4s';
                setTimeout(() => bin.style.animation = '', 400);
                showGameFeedback('❌ Wrong Bin! Try Again.', '#dc2626');
            }
        });
    });

    function showGameFeedback(msg, color) {
        const feedback = document.createElement('div');
        feedback.textContent = msg;
        feedback.style.cssText = `position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(255,255,255,0.95);color:${color};padding:16px 32px;border-radius:12px;font-size:1.2rem;font-weight:bold;z-index:9999;border:2px solid ${color};box-shadow:0 4px 15px rgba(0,0,0,0.1);pointer-events:none;animation:fadeOut 1.5s forwards;`;
        document.body.appendChild(feedback);
        setTimeout(() => feedback.remove(), 1600);
    }

    if (!document.getElementById('game-style')) {
        const style = document.createElement('style');
        style.id = 'game-style';
        style.textContent = `@keyframes fadeOut { 0%{opacity:1;transform:translate(-50%,-60%)} 100%{opacity:0;transform:translate(-50%,-80%)} }`;
        document.head.appendChild(style);
    }
}