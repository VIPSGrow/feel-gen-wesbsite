"use client";

import React, { useMemo, useState } from "react";

type FaqItem = {
    n: number;
    q: string;
    aHtml: string;
};

function makeNumberedHtml(label: string) {
    return <span style={{ fontWeight: 800 }}>{label}</span>;
}

function renderAnswerParagraphs(html: string) {
    // Input is expected to use <br/> for line breaks.
    return { __html: html };
}

export default function FaqPage() {
    const [lang, setLang] = useState<"en" | "hi">("en");

    const faqEnglish: FaqItem[] = useMemo(
        () =>
            [
                {
                    n: 1,
                    q: 'How can I become a "Feel Safe Sakhi"?',
                    aHtml:
                        'You can join by clicking the <b>\"Register\"</b> button on our website or app, filling in your basic details, and choosing your preferred business level (Level 1, 2, or 3).',
                },
                {
                    n: 2,
                    q: 'Which documents are required for registration?',
                    aHtml:
                        'You will need to upload self-attested copies of your Aadhaar Card, PAN Card, and a Cancelled Cheque or Bank Passbook to complete your KYC.',
                },
                {
                    n: 3,
                    q: 'Is there any joining fee for registration?',
                    aHtml:
                        'No, there is absolutely no joining fee to partner with the company. Any payment made is strictly for the purchase of "FEEL SAFE" brand products.',
                },
                {
                    n: 4,
                    q: 'What is a Referral Code and why is it necessary?',
                    aHtml:
                        'A Referral Code is the unique ID of the person who introduced you to this scheme. Once the application is processed, the Referral Code cannot be changed.',
                },
                {
                    n: 5,
                    q: 'Can women under the age of 21 join?',
                    aHtml:
                        'According to the application form, a minimum age of 21 years is required to become a distributor.',
                },
                {
                    n: 6,
                    q: 'How do I log in to my account?',
                    aHtml:
                        'You can log in using your registered Mobile Number/User ID and Password. If you have forgotten your password, click on <b>\"Forgot Password\"</b>.',
                },
                {
                    n: 7,
                    q: 'What should I do if I am unable to log in?',
                    aHtml:
                        'First, check your internet connection. If the problem persists, please email us at <b>support@feelsafeco.in</b> or contact our helpline.',
                },
                {
                    n: 8,
                    q: 'What is special about Feel Safe Sanitary Pads?',
                    aHtml:
                        'Our pads adhere to <b>IS 5405</b> standards. They feature <b>Anion Chip</b> technology and super absorbency, providing a <b>100% rash-free</b> and hygienic experience.',
                },
                {
                    n: 9,
                    q: 'Can I sell pads from other companies as well?',
                    aHtml:
                        'While serving as a Feel Safe distributor, you are prohibited from engaging in the promotion or sale of any competing sanitary napkin brands.',
                },
                {
                    n: 10,
                    q: 'Can I sell the products on Amazon or Flipkart?',
                    aHtml:
                        'Selling products on e-commerce platforms without prior written consent from the company is strictly prohibited.',
                },
                {
                    n: 11,
                    q: 'What are the different business levels?',
                    aHtml:
                        'You can choose from three levels based on your business goals:<br/>' +
                        '<b>Level 1 (Basic Sakhi)</b>: Initial start with a minimum order of ₹2,000.<br/>' +
                        '<b>Level 2 (Professional Sakhi)</b>: Small business stock of ₹25,000.<br/>' +
                        '<b>Level 3 (Master Sakhi/Distributor)</b>: Large-scale stockist at ₹1,00,000.',
                },
                {
                    n: 12,
                    q: 'Can I change my level later?',
                    aHtml:
                        'Yes, you have the right to upgrade your level in the future based on your performance and financial capacity.',
                },
                {
                    n: 13,
                    q: 'Does the company provide a fixed salary?',
                    aHtml:
                        'No, you are an Independent Representative (IR). Your income is based solely on your actual sales performance.',
                },
                {
                    n: 14,
                    q: 'When will I receive my commission?',
                    aHtml:
                        'Commissions are processed in the first week of the following month, only after the 30-day cooling-off period is complete.',
                },
                {
                    n: 15,
                    q: 'Do I get commission on cancelled orders?',
                    aHtml:
                        'No, commissions are not payable on orders that are returned, cancelled, or refunded within the 30-day cooling-off period.',
                },
                {
                    n: 16,
                    q: 'How can I check my team status?',
                    aHtml:
                        'By logging in with your User ID, you can view your entire team structure and their sales details in the <b>My Tree</b> or <b>Genealogy</b> section.',
                },
                {
                    n: 17,
                    q: 'Is this company legally registered?',
                    aHtml:
                        'Yes, the company strictly adheres to the <b>"Consumer Protection (Direct Selling) Rules, 2021"</b> issued by the Government of India.',
                },
                {
                    n: 18,
                    q: 'What should I keep in mind during field work?',
                    aHtml:
                        'You must always carry and display your Official ID Card and Authorization Letter. Additionally, you must wear hand gloves while handling products to maintain hygiene.',
                },
                {
                    n: 19,
                    q: 'Is the company liable for any risks during field work?',
                    aHtml:
                        'Field activities are voluntary and performed at your own risk. The company is not legally or financially liable for any accidents or injuries incurred during field work.',
                },
                {
                    n: 20,
                    q: 'What happens to my stock if I want to stop working?',
                    aHtml:
                        'If you terminate within 30 days, the company will buy back unsold stock that is in marketable condition under our Buy-Back Policy.',
                },
                {
                    n: 21,
                    q: 'Can men work in the "Sakhi Yojna"?',
                    aHtml:
                        'No, men cannot work as part of the "Sakhi Yojna" as it is exclusively for women. However, they can become Distributors to sell products to local shops and retail outlets in their vicinity.',
                },
                {
                    n: 22,
                    q: 'When is the Demo Kit provided and what does it include?',
                    aHtml:
                        'The Demo Kit is provided free of cost upon reaching <b>Level 2: Professional Sakhi</b> (₹25,000 stock). It includes a bag, Feel brand pads, a 60ml syringe, color (for testing), and disposable hand gloves. Your Digital ID Card and Welcome Letter will be uploaded to your dashboard for you to print.',
                },
                {
                    n: 23,
                    q: 'Can I work outside my allotted area?',
                    aHtml:
                        'You are required to get an area allotted during registration. However, you can work outside your allotted area as long as no other distributor has been appointed by the company in that specific location.',
                },
                {
                    n: 24,
                    q: 'Can I work part-time?',
                    aHtml:
                        'Yes, the best part of Feel Safe Sakhi Yojna is that you can do it part-time along with your household chores or job.',
                },
                {
                    n: 25,
                    q: 'Do I have to complete any targets?',
                    aHtml:
                        'The company has not imposed any mandatory targets. You can work according to your own will and capacity.',
                },
                {
                    n: 26,
                    q: 'What is the expiry of Feel Safe Pads?',
                    aHtml:
                        'Our pads have a shelf life of <b>3 years</b> from the date of manufacturing. Store them in a clean, dry place.',
                },
                {
                    n: 27,
                    q: 'Can I change my address or phone number later?',
                    aHtml:
                        'Yes, you can submit an <b>\"Edit Profile\"</b> request in your profile section, which will be updated after verification.',
                },
                {
                    n: 28,
                    q: 'What should I do if the product delivery is delayed?',
                    aHtml:
                        'If the order is not received within <b>7 to 14 working days</b>, please raise a <b>\"Support Ticket\"</b> in the App or check the tracking status of our logistics partner.',
                },
                {
                    n: 29,
                    q: 'Will I receive any training?',
                    aHtml:
                        'Yes, the company regularly conducts online webinars and offline meetings to provide product and sales training.',
                },
                {
                    n: 30,
                    q: 'What is the process to change a Nominee?',
                    aHtml:
                        'You can update the nominee details in your account by sending a written request along with the new nominee’s ID proof.',
                },
            ],
        []
    );

    const faqHindi: FaqItem[] = useMemo(
        () =>
            [
                {
                    n: 1,
                    q: 'मैं "Feel Safe Sakhi" कैसे बन सकती हूँ?',
                    aHtml:
                        "आप हमारी वेबसाइट या ऐप पर 'पंजीकरण' (Register) बटन पर क्लिक करें, अपना मूल विवरण भरें और अपना पसंदीदा बिजनेस लेवल (लेवल 1, 2, या 3) चुनें।",
                },
                {
                    n: 2,
                    q: 'पंजीकरण के लिए कौन से दस्तावेजों की आवश्यकता है?',
                    aHtml:
                        "आपको अपना आधार कार्ड, पैन कार्ड और एक कैंसिल चेक या बैंक पासबुक की स्व-सत्यापित प्रतियां (self-attested copies) अपलोड करनी होंगी।",
                },
                {
                    n: 3,
                    q: 'क्या पंजीकरण के लिए कोई शुल्क देना होगा?',
                    aHtml:
                        "नहीं, कंपनी के साथ जुड़ने के लिए कोई पंजीकरण शुल्क नहीं है. कोई भी भुगतान केवल 'FEEL SAFE' ब्रांड के उत्पादों की खरीद के लिए है।",
                },
                {
                    n: 4,
                    q: 'रेफरल कोड (Referral Code) क्या है और यह क्यों आवश्यक है?',
                    aHtml:
                        "रेफरल कोड उस व्यक्ति की विशिष्ट आईडी है जिसने आपको इस योजना से परिचित कराया है. एक बार पंजीकरण हो जाने के बाद, इसे बदला नहीं जा सकता।",
                },
                {
                    n: 5,
                    q: 'क्या 21 वर्ष से कम उम्र की महिलाएं जुड़ सकती हैं?',
                    aHtml:
                        'आवेदन पत्र के अनुसार, वितरक (Distributor) बनने के लिए न्यूनतम आयु 21 वर्ष होनी अनिवार्य है।',
                },
                {
                    n: 6,
                    q: 'मैं अपने अकाउंट में लॉगिन कैसे करूँ?',
                    aHtml:
                        "आप अपने पंजीकृत मोबाइल नंबर/यूजर आईडी और पासवर्ड का उपयोग करके लॉगिन कर सकती हैं। यदि आप पासवर्ड भूल गई हैं, तो 'Forgot Password' पर क्लिक करें।",
                },
                {
                    n: 7,
                    q: 'यदि मैं लॉगिन करने में असमर्थ हूँ तो मुझे क्या करना चाहिए?',
                    aHtml:
                        'सबसे पहले अपना इंटरनेट कनेक्शन जांचें। यदि समस्या बनी रहती है, तो हमें support@feelsafeco.in पर ईमेल करें या हमारी हेल्पलाइन पर संपर्क करें।',
                },
                {
                    n: 8,
                    q: 'Feel Safe सेनेटरी पैड्स में क्या खास है?',
                    aHtml:
                        'हमारे पैड्स <b>IS 5405</b> मानकों का पालन करते हैं. इनमें एनिओन चिप (Anion Chip) तकनीक और सुपर एब्जॉर्बेंसी है, जो <b>100% रैश-मुक्त</b> अनुभव प्रदान करती है।',
                },
                {
                    n: 9,
                    q: 'क्या मैं अन्य कंपनियों के पैड भी बेच सकती हूँ?',
                    aHtml:
                        'जब तक आप Feel Safe की वितरक हैं, आप किसी भी अन्य प्रतिस्पर्धी ब्रांड के सेनेटरी नैपकिन के प्रचार या बिक्री नहीं कर सकतीं।',
                },
                {
                    n: 10,
                    q: 'क्या मैं उत्पादों को Amazon या Flipkart पर बेच सकती हूँ?',
                    aHtml:
                        'कंपनी की पूर्व लिखित अनुमति के बिना ई-कॉमर्स प्लेटफॉर्म पर उत्पाद बेचना सख्त वर्जित है।',
                },
                {
                    n: 11,
                    q: 'विभिन्न बिजनेस लेवल क्या हैं?',
                    aHtml:
                        'आप अपने लक्ष्यों के आधार पर तीन स्तरों में से चुन सकती हैं:<br/>' +
                        '<b>लेवल 1 (Basic Sakhi)</b>: न्यूनतम ₹2,000 के ऑर्डर के साथ शुरुआत।<br/>' +
                        '<b>लेवल 2 (Professional Sakhi)</b>: ₹25,000 का स्टॉक।<br/>' +
                        '<b>लेवल 3 (Master Sakhi/Distributor)</b>: ₹1,00,000 का बड़े स्तर का स्टॉक।',
                },
                {
                    n: 12,
                    q: 'क्या मैं बाद में अपना लेवल बदल सकती हूँ?',
                    aHtml:
                        'हाँ, आपके पास अपने प्रदर्शन और वित्तीय क्षमता के आधार पर भविष्य में अपने स्तर को अपग्रेड करने का अधिकार है।',
                },
                {
                    n: 13,
                    q: 'क्या कंपनी निश्चित वेतन (Fixed Salary) देती है?',
                    aHtml:
                        'नहीं, आप एक स्वतंत्र प्रतिनिधि (Independent Representative) हैं. आपकी आय पूरी तरह से आपकी वास्तविक बिक्री प्रदर्शन पर आधारित है।',
                },
                {
                    n: 14,
                    q: 'मुझे मेरा कमीशन कब मिलेगा?',
                    aHtml:
                        'कमीशन अगले महीने के पहले सप्ताह में प्रोसेस किया जाता है, जो केवल 30 दिनों की कूलिंग-ऑफ अवधि पूरी होने के बाद ही संभव है।',
                },
                {
                    n: 15,
                    q: 'क्या मुझे रद्द (Cancelled) किए गए ऑर्डर पर कमीशन मिलता है?',
                    aHtml:
                        'नहीं, उन ऑर्डर्स पर कोई कमीशन देय नहीं है जो 30 दिनों के भीतर वापस, रद्द या रिफंड किए जाते हैं।',
                },
                {
                    n: 16,
                    q: 'मैं अपनी टीम की स्थिति कैसे देख सकती हूँ?',
                    aHtml:
                        "अपनी यूजर आईडी के साथ लॉगिन करके, आप 'My Tree' या 'Genealogy' सेक्शन में अपनी पूरी टीम की संरचना और उनकी बिक्री विवरण देख सकती हैं।",
                },
                {
                    n: 17,
                    q: 'क्या यह कंपनी कानूनी रूप से पंजीकृत है?',
                    aHtml:
                        'हाँ, कंपनी भारत सरकार द्वारा जारी "उपभोक्ता संरक्षण (प्रत्यक्ष बिक्री) नियम, 2021" का सख्ती से पालन करती है।',
                },
                {
                    n: 18,
                    q: 'फील्ड वर्क के दौरान मुझे किन बातों का ध्यान रखना चाहिए?',
                    aHtml:
                        "आपको हमेशा अपना आधिकारिक आईडी कार्ड और प्राधिकरण पत्र (Authorization Letter) साथ रखना चाहिए. साथ ही, स्वच्छता बनाए रखने के लिए उत्पादों को संभालते समय दस्ताने पहनना अनिवार्य है।",
                },
                {
                    n: 19,
                    q: 'क्या फील्ड वर्क के दौरान किसी भी जोखिम के लिए कंपनी जिम्मेदार है?',
                    aHtml:
                        'फील्ड गतिविधियाँ स्वैच्छिक हैं और आपके अपने जोखिम पर की जाती हैं. फील्ड वर्क के दौरान होने वाली किसी भी दुर्घटना या चोट के लिए कंपनी कानूनी या वित्तीय रूप से उत्तरदायी नहीं है।',
                },
                {
                    n: 20,
                    q: 'यदि मैं काम बंद करना चाहूँ तो मेरे स्टॉक का क्या होगा?',
                    aHtml:
                        'यदि आप 30 दिनों के भीतर काम बंद करती हैं, तो कंपनी हमारी बाय-बैक पॉलिसी के तहत बेचने योग्य स्थिति में मौजूद बिना बिके स्टॉक को वापस खरीद लेगी।',
                },
                {
                    n: 21,
                    q: 'क्या पुरुष (Men) "सखी योजना" में काम कर सकते हैं?',
                    aHtml:
                        'नहीं, पुरुष "सखी योजना" का हिस्सा बनकर काम नहीं कर सकते क्योंकि यह विशेष रूप से महिलाओं के लिए है। हालांकि, वे Distributor बन सकते हैं और अपने आसपास की दुकानों या रिटेल काउंटरों पर उत्पाद बेचने के लिए काम कर सकते हैं।',
                },
                {
                    n: 22,
                    q: 'डेमो किट (Demo Kit) कब मिलती है और इसमें क्या-क्या होता है?',
                    aHtml:
                        'डेमो किट <b>Level 2: Professional Sakhi</b> (₹25,000 स्टॉक) पर बिल्कुल फ्री दी जाती है। इसमें एक बैग, फील (Feel) ब्रांड के पैड्स, एक 60ml सिरिंज, कलर (टेस्ट के लिए), और डिस्पोजेबल हैंड ग्लव्स शामिल होते हैं। आपका डिजिटल आईडी कार्ड और वेलकम लेटर आपके डैशबोर्ड पर अपलोड कर दिया जाएगा, जिसे आप खुद प्रिंट करवा सकते हैं।',
                },
                {
                    n: 23,
                    q: 'क्या मैं अपने अलॉटेड एरिया (Allotted Area) के बाहर काम कर सकती हूँ?',
                    aHtml:
                        'पंजीकरण के समय आपको अपना एरिया अलॉट करवाना होता है। हालांकि, आप अपने अलॉटेड एरिया के बाहर भी तब तक काम कर सकती हैं जब तक कि उस दूसरी जगह पर Feel Safe Company का कोई अपना अधिकृत वितरक (Distributor) नियुक्त नहीं हो जाता।',
                },
                {
                    n: 24,
                    q: 'क्या मैं पार्ट-टाइम काम कर सकती हूँ?',
                    aHtml:
                        'हाँ, फील सेफ सखी योजना की सबसे अच्छी बात यह है कि आप इसे अपने घर के कामकाज या नौकरी के साथ पार्ट-टाइम भी कर सकती हैं।',
                },
                {
                    n: 25,
                    q: 'क्या मुझे कोई निश्चित टारगेट (Target) पूरा करना होगा?',
                    aHtml:
                        'कंपनी ने कोई अनिवार्य (Mandatory) टारगेट नहीं रखा है। आप अपनी इच्छा और क्षमता के अनुसार काम कर सकती हैं।',
                },
                {
                    n: 26,
                    q: 'फील सेफ पैड्स की एक्सपायरी (Expiry) कितनी होती है?',
                    aHtml:
                        'हमारे पैड्स की शेल्फ लाइफ निर्माण की तारीख (Date of Manufacturing) से 3 साल तक होती है। इन्हें सूखी और साफ जगह पर स्टोर करें।',
                },
                {
                    n: 27,
                    q: 'क्या मैं अपना पता या फोन नंबर बाद में बदल सकती हूँ?',
                    aHtml:
                        "हाँ, आप अपने प्रोफाइल सेक्शन में 'Edit Profile' रिक्वेस्ट सबमिट कर सकती हैं, जो वेरिफिकेशन के बाद अपडेट हो जाएगी।",
                },
                {
                    n: 28,
                    q: 'अगर प्रोडक्ट डिलीवरी में देरी हो तो मुझे क्या करना चाहिए?',
                    aHtml:
                        'यदि ऑर्डर 7 to 14 दिनों के भीतर प्राप्त नहीं होता है, तो कृपया ऐप में <b>\"Support Ticket\"</b> रेज (Raise) करें या हमारे लॉजिस्टिक्स पार्टनर का ट्रैकिंग स्टेटस चेक करें।',
                },
                {
                    n: 29,
                    q: 'क्या मुझे कोई ट्रेनिंग (Training) दी जाएगी?',
                    aHtml:
                        'हाँ, कंपनी उत्पाद और बिक्री की ट्रेनिंग प्रदान करने के लिए नियमित रूप से ऑनलाइन वेबिनार और ऑफलाइन मीटिंग आयोजित करती है।',
                },
                {
                    n: 30,
                    q: 'नॉमिनी (Nominee) बदलने की प्रक्रिया क्या है?',
                    aHtml:
                        'आप एक लिखित अनुरोध के साथ नए नॉमिनी का आईडी प्रूफ भेजकर अपने अकाउंट में नॉमिनी का विवरण अपडेट करवा सकती हैं।',
                },
            ],
        []
    );

    const faqToRender = lang === "en" ? faqEnglish : faqHindi;

    const sections = useMemo(
        () =>
            [
                {
                    key: "phase1",
                    titleEn: "Phase 1: Registration & Login (Onboarding)",
                    titleHi: "चरण 1: पंजीकरण और लॉगिन (Onboarding)",
                    from: 1,
                    to: 7,
                },
                {
                    key: "phase2",
                    titleEn: "Phase 2: Product & Quality Information",
                    titleHi: "चरण 2: उत्पाद और गुणवत्ता की जानकारी",
                    from: 8,
                    to: 10,
                },
                {
                    key: "phase3",
                    titleEn: "Phase 3: Business Model & Levels",
                    titleHi: "चरण 3: बिजनेस मॉडल और स्तर",
                    from: 11,
                    to: 13,
                },
                {
                    key: "phase4",
                    titleEn: "Phase 4: Payouts & Commissions",
                    titleHi: "चरण 4: भुगतान और कमीशन",
                    from: 14,
                    to: 16,
                },
                {
                    key: "phase5",
                    titleEn: "Phase 5: Safety, Legal & Returns",
                    titleHi: "चरण 5: सुरक्षा, कानूनी और रिटर्न",
                    from: 17,
                    to: 30,
                },
            ],
        []
    );

    return (
        <main>
            <section
                className="py-5"
                style={{ background: "linear-gradient(90deg, #e3f8ff 0%, #ffffff 70%)" }}
            >
                <div className="container-fluid">
                    <div className="row align-items-end mb-4 g-3">
                        <div className="col-lg-8">
                            <h1 className="mb-2" style={{ lineHeight: 1.2 }}>
                                {lang === "en" ? "Feel Safe - FAQ" : "फील सेफ - अक्सर पूछे जाने वाले सवाल"}
                            </h1>
                            <p className="mb-0" style={{ color: "#747474" }}>
                                {lang === "en"
                                    ? "Quick answers about joining, products, and commission policy."
                                    : "जॉइनिंग, उत्पादों और कमीशन नीति से जुड़े त्वरित उत्तर।"}
                            </p>
                        </div>

                        <div className="col-lg-4 text-lg-end">
                            <div className="d-inline-flex gap-2 align-items-center">
                                <button
                                    type="button"
                                    className={`btn ${lang === "en" ? "btn-primary" : "btn-outline-primary"}`}
                                    onClick={() => setLang("en")}
                                >
                                    English
                                </button>
                                <button
                                    type="button"
                                    className={`btn ${lang === "hi" ? "btn-primary" : "btn-outline-primary"}`}
                                    onClick={() => setLang("hi")}
                                >
                                    हिंदी
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container-fluid">
                    {sections.map((s) => {
                        const items = faqToRender.filter((f) => f.n >= s.from && f.n <= s.to);
                        const accordionId = `${lang}-faq-${s.key}`;
                        return (
                            <div key={s.key} className="mb-5">
                                <div className="mb-3">
                                    <h2 className="h5 mb-2" style={{ color: "#222", fontWeight: 900 }}>
                                        {lang === "en" ? s.titleEn : s.titleHi}
                                    </h2>
                                    <div style={{ height: 1, background: "#f0f0f0" }} />
                                </div>

                                <div className="accordion" id={accordionId}>
                                    {items.map((f, idx) => {
                                        const collapseId = `${accordionId}-collapse-${idx}`;
                                        const headingId = `${accordionId}-heading-${idx}`;

                                        return (
                                            <div
                                                key={f.n}
                                                className="accordion-item"
                                                style={{ border: "1px solid #f0f0f0" }}
                                            >
                                                <h2 className="accordion-header" id={headingId}>
                                                    <button
                                                        className="accordion-button"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target={`#${collapseId}`}
                                                        aria-expanded={idx === 0}
                                                        aria-controls={collapseId}
                                                        style={{
                                                            fontWeight: 800,
                                                            background: idx === 0 ? "#e3f8ff" : "#fff",
                                                        }}
                                                    >
                                                        <span style={{ marginRight: 10 }}>{makeNumberedHtml(String(f.n))}</span>
                                                        {f.q}
                                                    </button>
                                                </h2>

                                                <div
                                                    id={collapseId}
                                                    className={`accordion-collapse collapse ${idx === 0 ? "show" : ""}`}
                                                    aria-labelledby={headingId}
                                                    data-bs-parent={`#${accordionId}`}
                                                >
                                                    <div
                                                        className="accordion-body"
                                                        style={{ color: "#747474" }}
                                                        dangerouslySetInnerHTML={renderAnswerParagraphs(f.aHtml)}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}

