const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

let lang = "ar";
let activeLanguage = "html";
let activeLesson = 0;
let selectedAnswer = null;
let chatHistory = [];
let requestNumber = 0;

const words = {
  ar: {
    languageButton: "🇬🇧 English", lessons: "الدروس", lesson: "الموضوع",
    explanation: "شرح الموضوع", example: "مثال برمجي بالإنجليزية", output: "النتيجة المتوقعة",
    note: "معلومة برمجية مهمة", quiz: "اختبري فهمك", check: "تحققي من الإجابة",
    project: "تطبيق عملي", copy: "نسخ الكود", copied: "تم النسخ ✓",
    correct: "إجابة صحيحة! أحسنتِ 🎉", wrong: "إجابة غير صحيحة، حاولي مرة أخرى.",
    choose: "اختاري إجابة أولًا.", previous: "الموضوع السابق",
    next: "الموضوع التالي", finish: "أكملتِ هذا المسار! أحسنتِ 🎉",
    progress: "تقدمك في المسار",
    welcome: "أهلاً! 👋 أنا مساعد سفير الكود الذكي. يمكنكِ الضغط على أي زر لغة في الأسفل أو كتابة أي سؤال وسأجيبكِ فوراً!",
    typing: "جاري كتابة الرد..."
  },
  en: {
    languageButton: "🇸🇦 العربية", lessons: "Lessons", lesson: "Topic",
    explanation: "Topic explanation", example: "Code example (English)", output: "Expected output",
    note: "Important note", quiz: "Test your knowledge", check: "Check answer",
    project: "Practice project", copy: "Copy code", copied: "Copied ✓",
    correct: "Correct answer! Well done 🎉", wrong: "Incorrect answer. Try again.",
    choose: "Choose an answer first.", previous: "Previous topic",
    next: "Next topic", finish: "You completed this path! Well done 🎉",
    progress: "Your course progress",
    welcome: "Hello! 👋 I'm the Code Ambassador AI assistant. Click any language option below or type your question!",
    typing: "Typing..."
  }
};

/* 12 موضوعاً متكاملاً بكل لغة مع الأكواد وشارحة مفصلة */
const courses = {
  html: {
    name: "HTML",
    desc: { ar: "12 موضوعاً شاملاً لهيكل صفحات الويب والعناوين والوسوم.", en: "12 comprehensive topics on web structure and headings." },
    lessons: [
      {
        title: { ar: "1. هيكل صفحة HTML الأساسي", en: "1. Basic HTML Document Structure" },
        text: { ar: "كل صفحة ويب تبدأ بملصق التعريف <!DOCTYPE html> ثم وسم <html> الحاضن لبقية العناصر.", en: "Every web page starts with <!DOCTYPE html> and the <html> wrapper." },
        code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <title>My First Page</title>\n</head>\n<body>\n    <h1>Hello World</h1>\n</body>\n</html>',
        output: { ar: "إنشاء الهيكل العظمي لصفحة الويب.", en: "Creates the web page skeleton." },
        note: { ar: "هيكل HTML هو الأساس الذي يُبنى عليه أي موقع إلكتروني.", en: "HTML structure is the foundation of any website." },
        q: { ar: "بأي وسيلة يبدأ ملف HTML عادةً؟", en: "What tag starts an HTML document?" },
        options: [{ ar: "<!DOCTYPE html>", en: "<!DOCTYPE html>" }, { ar: "<body>", en: "<body>" }, { ar: "<head>", en: "<head>" }], a: 0,
        project: { ar: "أنشئي ملف HTML جديد مع الوسوم الأساسية.", en: "Create a new HTML file with basic tags." }
      },
      {
        title: { ar: "2. العناوين (Headings H1-H6)", en: "2. Headings (H1-H6)" },
        text: { ar: "نستخدم الوسوم من <h1> حتى <h6> لترتيب العناوين حسب الأهمية في الصفحة.", en: "We use tags from <h1> to <h6> to order headings by importance." },
        code: '<h1>Main Title (H1)</h1>\n<h2>Sub Heading (H2)</h2>\n<h3>Section Title (H3)</h3>',
        output: { ar: "عرض عناوين بتدرجات أحجام مختلفة.", en: "Displays headings with varying sizes." },
        note: { ar: "استخدمي H1 مرة واحدة في الصفحة للعنوان الرئيسي.", en: "Use H1 once per page for the main title." },
        q: { ar: "ما هو الوسم الأكبر حجماً بين العناوين؟", en: "Which heading tag is the largest?" },
        options: [{ ar: "<h6>", en: "<h6>" }, { ar: "<h1>", en: "<h1>" }, { ar: "<h3>", en: "<h3>" }], a: 1,
        project: { ar: "أضيفي عنوان رئيسي وعنوانين فرعيين لصفحتك.", en: "Add a main heading and two subheadings." }
      },
      {
        title: { ar: "3. الفقرات والأسطر (Paragraphs & Breaks)", en: "3. Paragraphs & Line Breaks" },
        text: { ar: "نستخدم الوسم <p> للفقرات النصية، والوسم <br> لعمل فواصل أسطر جديدة.", en: "We use <p> for text paragraphs and <br> for line breaks." },
        code: '<p>This is a normal text paragraph.</p>\n<p>Second paragraph with a <br> line break inside.</p>',
        output: { ar: "طباعة النصوص في فقرات مرتبة.", en: "Prints text in organized paragraphs." },
        note: { ar: "الفقرات تفصل بين النصوص بمسافات علوية وسفلية تلقائية.", en: "Paragraphs add automatic vertical spacing." },
        q: { ar: "أي وسم يُستخدَم لإنشاء فقرة نصية؟", en: "Which tag creates a text paragraph?" },
        options: [{ ar: "<p>", en: "<p>" }, { ar: "<br>", en: "<br>" }, { ar: "<b>", en: "<b>" }], a: 0,
        project: { ar: "اكتبي فقرتين تعريفيتين عن نفسكِ.", en: "Write two introductory paragraphs about yourself." }
      },
      {
        title: { ar: "4. الروابط التشعبية (Links)", en: "4. Hyperlinks (<a>)" },
        text: { ar: "نستخدم الوسم <a> مع خاصية href لربط الصفحات ببعضها أو الانتقال لمواقع خارجية.", en: "We use the <a> tag with href to link pages or external sites." },
        code: '<a href="https://www.google.com" target="_blank">Visit Google</a>',
        output: { ar: "رابط أزرق قابل للنقر يفتح في نافذة جديدة.", en: "A clickable blue link opening in a new tab." },
        note: { ar: "target='_blank' تجعل الرابط يفتح في تبويب جديد.", en: "target='_blank' opens the link in a new tab." },
        q: { ar: "ما هي الخاصية المسؤولة عن تحديد وجهة الرابط في <a>؟", en: "Which attribute specifies the link URL?" },
        options: [{ ar: "src", en: "src" }, { ar: "href", en: "href" }, { ar: "link", en: "link" }], a: 1,
        project: { ar: "أضيفي رابطاً لموقعك المفضل.", en: "Add a link to your favorite website." }
      },
      {
        title: { ar: "5. عرض الصور (Images)", en: "5. Displaying Images (<img>)" },
        text: { ar: "لعرض الصور نستخدم الوسم <img> ونحدد مصدرها عبر src ووصفها عبر alt.", en: "To display images we use <img> with src and alt attributes." },
        code: '<img src="avatar.png" alt="Profile Picture" width="150">',
        output: { ar: "عرض الصورة بالعرض المحدد.", en: "Displays the image with specified width." },
        note: { ar: "خاصية alt تصف الصورة للمكفوفين وعند تعذر تحميلها.", en: "The alt attribute describes the image." },
        q: { ar: "أي خاصية تحدد مصدر مسار الصورة؟", en: "Which attribute specifies the image source?" },
        options: [{ ar: "href", en: "href" }, { ar: "src", en: "src" }, { ar: "alt", en: "alt" }], a: 1,
        project: { ar: "أضيفي صورة شخصية أو شعار لصفحتك.", en: "Add an image or logo to your page." }
      },
      {
        title: { ar: "6. القوائم غير المرتبة (Unordered Lists)", en: "6. Unordered Lists (<ul>)" },
        text: { ar: "نستخدم <ul> للقوائم النقطية و<li> لعناصر القائمة.", en: "We use <ul> for bulleted lists and <li> for list items." },
        code: '<ul>\n    <li>HTML</li>\n    <li>CSS</li>\n    <li>JavaScript</li>\n</ul>',
        output: { ar: "قائمة منقطة بثلاث لغات برمجة.", en: "A bulleted list of three languages." },
        note: { ar: "<ul> تعني Unordered List.", en: "<ul> stands for Unordered List." },
        q: { ar: "ما هو الوسم المستخدم لعنصر داخل القائمة؟", en: "What is the tag for a list item?" },
        options: [{ ar: "<li>", en: "<li>" }, { ar: "<ul-item>", en: "<ul-item>" }, { ar: "<item>", en: "<item>" }], a: 0,
        project: { ar: "أنشئي قائمة بهواياتك المفضلة.", en: "Create a list of your favorite hobbies." }
      },
      {
        title: { ar: "7. القوائم المرتبة (Ordered Lists)", en: "7. Ordered Lists (<ol>)" },
        text: { ar: "نستخدم <ol> لإنشاء قوائم مرتبة بأرقام تسلسلية.", en: "We use <ol> to create numbered ordered lists." },
        code: '<ol>\n    <li>First Step</li>\n    <li>Second Step</li>\n    <li>Third Step</li>\n</ol>',
        output: { ar: "قائمة مرتبة بالأرقام 1 و 2 و 3.", en: "A numbered list 1, 2, 3." },
        note: { ar: "<ol> تعني Ordered List.", en: "<ol> stands for Ordered List." },
        q: { ar: "أي وسم ينشئ قائمة ذات ترقيم رقمي؟", en: "Which tag creates a numbered list?" },
        options: [{ ar: "<ul>", en: "<ul>" }, { ar: "<ol>", en: "<ol>" }, { ar: "<list>", en: "<list>" }], a: 1,
        project: { ar: "أنشئي خطوات المذاكرة بترتيب رقمي.", en: "Create your study steps numerically." }
      },
      {
        title: { ar: "8. الجداول (HTML Tables)", en: "8. HTML Tables" },
        text: { ar: "لتصميم الجداول نستخدم <table> للصفوف <tr> والخلايا <td> وخلية العناوين <th>.", en: "We use <table>, <tr>, <td>, and <th> for tables." },
        code: '<table>\n    <tr><th>Name</th><th>Grade</th></tr>\n    <tr><td>Rema</td><td>95</td></tr>\n</table>',
        output: { ar: "جدول يعرض اسم الطالبة ودرجتها.", en: "A table showing student name and grade." },
        note: { ar: "<th> تعني Table Header وتظهر بخط عريض.", en: "<th> stands for Table Header." },
        q: { ar: "أي وسم يمثل صفاً داخل الجدول؟", en: "Which tag represents a table row?" },
        options: [{ ar: "<tr>", en: "<tr>" }, { ar: "<td>", en: "<td>" }, { ar: "<table>", en: "<table>" }], a: 0,
        project: { ar: "أنشئي جدولاً لموادك الدراسية وأوقاتها.", en: "Create a table for your courses." }
      },
      {
        title: { ar: "9. النماذج وحقول الإدخال (Forms)", en: "9. HTML Forms & Inputs" },
        text: { ar: "نستخدم <form> لجمع بيانات المستخدمين، وحقول <input> للإدخال.", en: "We use <form> to collect user data and <input> fields." },
        code: '<form>\n    <label>Username:</label>\n    <input type="text" placeholder="Enter name">\n    <button type="submit">Submit</button>\n</form>',
        output: { ar: "نموذج إدخال اسم مع زر إرسال.", en: "A text input form with a submit button." },
        note: { ar: "type='text' يخصص الحقل لاستقبال نصوص.", en: "type='text' specifies text input." },
        q: { ar: "ما هو الوسم الأساسي لإنشاء نموذج إدخال بيانات؟", en: "What is the main tag for a form?" },
        options: [{ ar: "<form>", en: "<form>" }, { ar: "<input>", en: "<input>" }, { ar: "<button>", en: "<button>" }], a: 0,
        project: { ar: "أنشئي نموذج تسجيل دخول بسيط.", en: "Create a simple login form." }
      },
      {
        title: { ar: "10. الحاويات (Div & Span)", en: "10. Containers (Div & Span)" },
        text: { ar: "نستخدم <div> كحاوية كتلة عامة لتجميع العناصر، و<span> لتنسيق أجزاء داخل النص.", en: "We use <div> as a block container and <span> for inline styling." },
        code: '<div class="card">\n    <h3>Card Title</h3>\n    <p>This is <span style="color:red">highlighted</span> text.</p>\n</div>',
        output: { ar: "تجميع العناصر داخل بطاقة واحدة.", en: "Grouping elements inside a card." },
        note: { ar: "div عنصر كتلي بينما span عنصر ضمني.", en: "div is block-level while span is inline." },
        q: { ar: "أي عنصر يعتبر حاوية كتلة عامة (Block)?", en: "Which element is a general block container?" },
        options: [{ ar: "<div>", en: "<div>" }, { ar: "<span>", en: "<span>" }, { ar: "<a>", en: "<a>" }], a: 0,
        project: { ar: "صممي حاوية تحتوي على صورة ونص.", en: "Design a container with an image and text." }
      },
      {
        title: { ar: "11. الوسوم الدلالية (Semantic Tags)", en: "11. Semantic Tags" },
        text: { ar: "الوسوم مثل <header> و <section> و <footer> تعطي معنى واضح لهيكل الصفحة.", en: "Semantic tags like <header> and <footer> give clear structure meaning." },
        code: '<header>\n    <h1>Site Header</h1>\n</header>\n<footer>\n    <p>&copy; 2026 Code Ambassador</p>\n</footer>',
        output: { ar: "ترتيب رأس وتذييل الصفحة بوضوح.", en: "Organizes header and footer clearly." },
        note: { ar: "الوسوم الدلالية تحسن قراءة المتصفحات ومحركات البحث.", en: "Semantic tags improve SEO." },
        q: { ar: "أي وسم يُستخدَم لتذييل الصفحة (Footer)؟", en: "Which tag is used for page footer?" },
        options: [{ ar: "<footer>", en: "<footer>" }, { ar: "<bottom>", en: "<bottom>" }, { ar: "<end>", en: "<end>" }], a: 0,
        project: { ar: "أضيفي وسم header و footer لصفحتك.", en: "Add header and footer tags to your page." }
      },
      {
        title: { ar: "12. مشروع تخرج مسار HTML", en: "12. HTML Capstone Project" },
        text: { ar: "قومي بدمج كل ما تعلمته من عناوين، صور، روابط، وقوائم لبناء صفحتك الاحترافية الأولى.", en: "Combine headings, images, links, and lists to build your first page." },
        code: '<!-- Complete portfolio page -->\n<h1>Welcome to Rema Portfolio</h1>\n<p>Computer Science Student</p>\n<ul>\n    <li>Skills: HTML, CSS, JS</li>\n</ul>',
        output: { ar: "صفحة ويب متكاملة وجاهزة للنشر.", en: "A complete, ready-to-publish web page." },
        note: { ar: "هذا المشروع هو ثمرة مسار HTML بالكامل!", en: "This project crowns your HTML journey!" },
        q: { ar: "ما هو امتداد ملف صفحات الويب؟", en: "What is the web page file extension?" },
        options: [{ ar: ".html", en: ".html" }, { ar: ".java", en: ".java" }, { ar: ".txt", en: ".txt" }], a: 0,
        project: { ar: "قومي بإنشاء صفحتك الشخصية الكاملة وحفظها باسم index.html", en: "Create and save your complete personal page as index.html" }
      }
    ]
  },

  css: {
    name: "CSS",
    desc: { ar: "12 موضوعاً في ستايل وتنسيق وتخطيط صفحات الويب.", en: "12 topics in web styling and layouts." },
    lessons: [
      {
        title: { ar: "1. مقدمة لغة CSS وتحديد العناصر", en: "1. Introduction to CSS Selectors" },
        text: { ar: "تستخدم CSS لتنسيق مظهر عناصر HTML عبر اختيار العنصر وتطبيق الخصائص.", en: "CSS is used to style HTML elements by selecting them and applying properties." },
        code: 'body {\n    background-color: #fbf6ef;\n    font-family: "Cairo", sans-serif;\n}',
        output: { ar: "تغيير خلفية ونوع خط الصفحة بالكامل.", en: "Changes background and font family." },
        note: { ar: "CSS تعني Cascading Style Sheets.", en: "CSS stands for Cascading Style Sheets." },
        q: { ar: "ما هي الوظيفة الأساسية للغة CSS؟", en: "What is the primary function of CSS?" },
        options: [{ ar: "تنسيق ومظهر الصفحة", en: "Styling the page" }, { ar: "بناء الهيكل", en: "Building structure" }, { ar: "إدارة قواعد البيانات", en: "Managing databases" }], a: 0,
        project: { ar: "طبقي لون خلفية مخصص لموقعك.", en: "Apply a custom background color." }
      },
      {
        title: { ar: "2. ألوان النصوص والخلفيات (Colors)", en: "2. Text Colors & Backgrounds" },
        text: { ar: "نستطيع التحكم بلون النص باستخدام color ولون الخلفية بـ background-color.", en: "We control text color using color and background using background-color." },
        code: 'h1 {\n    color: #4b3027;\n    background-color: #e8cba9;\n}',
        output: { ar: "تلوين العنوان وخلفيته بدرجات أنيقة.", en: "Colors the heading and its background." },
        note: { ar: "يمكن استخدام قيم HEX مثل #4b3027 أو أسماء الألوان.", en: "You can use HEX values." },
        q: { ar: "أي خاصية تغير لون النص في CSS؟", en: "Which property changes text color?" },
        options: [{ ar: "color", en: "color" }, { ar: "background", en: "background" }, { ar: "text-color", en: "text-color" }], a: 0,
        project: { ar: "اجعل لون العناوين بنياً دافئاً.", en: "Make heading colors warm brown." }
      },
      {
        title: { ar: "3. خطوط النصوص وحجمها (Typography)", en: "3. Font Family & Size" },
        text: { ar: "نستخدم font-family لنوع الخط و font-size لحجم الخط و font-weight لثخانته.", en: "We use font-family, font-size, and font-weight." },
        code: 'p {\n    font-size: 18px;\n    font-weight: 600;\n    line-height: 1.8;\n}',
        output: { ar: "جعل النصوص واضحة ومقروءة بشكل مريح.", en: "Makes text readable and comfortable." },
        note: { ar: "line-height يتحكم بالمسافة بين السطور.", en: "line-height controls line spacing." },
        q: { ar: "أي خاصية تتحكم بحجم الخط؟", en: "Which property controls font size?" },
        options: [{ ar: "font-size", en: "font-size" }, { ar: "text-size", en: "text-size" }, { ar: "size", en: "size" }], a: 0,
        project: { ar: "كبري حجم خط الفقرات إلى 18 بكسل.", en: "Increase paragraph font size to 18px." }
      },
      {
        title: { ar: "4. الهوامش الخارجية والداخلية (Box Model)", en: "4. Margin & Padding" },
        text: { ar: "Margin هو المسافة خارج العنصر، بينما Padding هو المسافة الداخلية حول المحتوى.", en: "Margin is outer spacing, padding is inner spacing." },
        code: '.box {\n    margin: 20px;\n    padding: 15px;\n    border: 1px solid #b98b63;\n}',
        output: { ar: "إضافة مسافات وإطار حول الصندوق.", en: "Adds spacing and border around the box." },
        note: { ar: "الـ Box Model هو أساس تنسيق العناصر في CSS.", en: "Box Model is fundamental in CSS." },
        q: { ar: "ما هو الفرق الأساسي بين margin و padding؟", en: "What is the main difference between margin and padding?" },
        options: [{ ar: "Margin خارجي و Padding داخلي", en: "Margin is outer, padding is inner" }, { ar: "كلاهما نفس الشيء", en: "They are identical" }, { ar: "Padding للألوان فقط", en: "Padding is for colors only" }], a: 0,
        project: { ar: "أضيفي مسافة داخلية وخارجية لبطاقة تعريفية.", en: "Add margin and padding to a card." }
      },
      {
        title: { ar: "5. الحدود الدائرية والظل (Borders & Shadows)", en: "5. Border Radius & Shadows" },
        text: { ar: "نستخدم border-radius لتدوير الزوايا و box-shadow لإضافة ظل جذاب.", en: "We use border-radius for rounded corners and box-shadow for shadows." },
        code: '.card {\n    border-radius: 16px;\n    box-shadow: 0 10px 30px rgba(0,0,0,0.08);\n}',
        output: { ar: "بطاقة ذات حواف ناعمة وظل أنيق.", en: "Card with smooth borders and elegant shadow." },
        note: { ar: "الظواهر البصرية الناعمة تعطي طابعاً احترافياً للموقع.", en: "Soft shadows give a professional look." },
        q: { ar: "أي خاصية تقوم بتدوير زوايا العنصر؟", en: "Which property rounds element corners?" },
        options: [{ ar: "border-radius", en: "border-radius" }, { ar: "corner-round", en: "corner-round" }, { ar: "radius", en: "radius" }], a: 0,
        project: { ar: "دوري زوايا صورك بـ 12 بكسل.", en: "Round your image corners by 12px." }
      },
      {
        title: { ar: "6. المحاذاة وتوسيط العناصر (Alignment)", en: "6. Text & Element Alignment" },
        text: { ar: "نستخدم text-align لمحاذاة النصوص (center, right, left).", en: "We use text-align to align text." },
        code: '.center-text {\n    text-align: center;\n}',
        output: { ar: "وضع النص في منتصف الشاشة.", en: "Centers the text on the screen." },
        note: { ar: "text-align: center يعمل مع النصوص والعناصر الضمنية.", en: "text-align: center works with text." },
        q: { ar: "كيف تجعلين النص في منتصف السطر؟", en: "How do you center text?" },
        options: [{ ar: "text-align: center;", en: "text-align: center;" }, { ar: "align: middle;", en: "align: middle;" }, { ar: "position: center;", en: "position: center;" }], a: 0,
        project: { ar: "اجعلي عنوان الموقع الرئيسي في المنتصف.", en: "Center your main site title." }
      },
      {
        title: { ar: "7. تخطيط Flexbox الأساسي", en: "7. Introduction to Flexbox" },
        text: { ar: "خاصية display: flex تسهل ترتيب العناصر في صف أو عمود بمرونة فائقة.", en: "display: flex makes arranging items in rows or columns easy." },
        code: '.container {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}',
        output: { ar: "توزيع العناصر أفقياً بمسافات متساوية.", en: "Distributes items horizontally with equal spacing." },
        note: { ar: "Flexbox حل ثوري لتخطيطات الويب الحديثة.", en: "Flexbox is revolutionary for modern layouts." },
        q: { ar: "ما الذي يفعّل نظام Flexbox للعنصر الحاضن؟", en: "What enables Flexbox on a container?" },
        options: [{ ar: "display: flex;", en: "display: flex;" }, { ar: "flex: true;", en: "flex: true;" }, { ar: "layout: flex;", en: "layout: flex;" }], a: 0,
        project: { ar: "رتبي عناصر القائمة العلوية أفقياً.", en: "Arrange top menu items horizontally." }
      },
      {
        title: { ar: "8. الفراغات بين العناصر في Flexbox (Gap)", en: "8. Flexbox Gap" },
        text: { ar: "خاصية gap تحدد المسافة الفاصلة بين العناصر المرنة دون الحاجة لهوامش معقدة.", en: "The gap property sets spacing between flexible items easily." },
        code: '.grid-flex {\n    display: flex;\n    gap: 20px;\n}',
        output: { ar: "فراغ ثابت ومريح بين كل عنصر وآخر.", en: "Consistent spacing between items." },
        note: { ar: "تغنينا خاصية gap عن حساب الهوامش يدوياً.", en: "gap saves us from manual margin calculations." },
        q: { ar: "ما وظيفة خاصية gap في Flexbox؟", en: "What is the function of gap?" },
        options: [{ ar: "تحديد المسافة بين العناصر", en: "Sets spacing between items" }, { ar: "تكبير العناصر", en: "Enlarges items" }, { ar: "إخفاء الفراغات", en: "Hides spaces" }], a: 0,
        project: { ar: "أضيفي مسافة 16 بكسل بين بطاقات لغات البرمجة.", en: "Add 16px gap between language cards." }
      },
      {
        title: { ar: "9. تخطيط الشبكات (CSS Grid)", en: "9. CSS Grid Layout" },
        text: { ar: "نظام CSS Grid يتيح إنشاء شبكات أعمدة وصفوف متقدمة.", en: "CSS Grid allows creating advanced column and row grids." },
        code: '.language-grid {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 20px;\n}',
        output: { ar: "تقسيم الشاشة إلى 3 أعمدة متساوية.", en: "Splits screen into 3 equal columns." },
        note: { ar: "1fr تعني جزء مرن واحد (Fractional unit).", en: "1fr means one fractional unit." },
        q: { ar: "كيف نقوم بتفعيل نظام Grid؟", en: "How do you enable Grid?" },
        options: [{ ar: "display: grid;", en: "display: grid;" }, { ar: "grid: on;", en: "grid: on;" }, { ar: "layout: grid;", en: "layout: grid;" }], a: 0,
        project: { ar: "أنشئي شبكة من 3 أعمدة لعرض المنتجات.", en: "Create a 3-column grid for products." }
      },
      {
        title: { ar: "10. المؤثرات الحركية والتفاعل (Hover Effects)", en: "10. Hover Effects & Transitions" },
        text: { ar: "نستخدم :hover لتغيير شكل العنصر عند مرور الماوس عليه مع transition لنعومة الحركة.", en: "We use :hover to change element style on mouseover with smooth transition." },
        code: '.btn:hover {\n    background-color: #674536;\n    transform: translateY(-3px);\n    transition: 0.2s ease;\n}',
        output: { ar: "ارتفاع الزر قليلاً وتغيير لونه عند تمرير المؤشر.", en: "Button lifts slightly and changes color on hover." },
        note: { ar: "المؤثرات الحركية تزيد من تفاعلية الموقع وجماله.", en: "Animations increase interactivity." },
        q: { ar: "أي شبه فئة (Pseudo-class) تستخدم لتفاعل الماوس؟", en: "Which pseudo-class is used for mouse hover?" },
        options: [{ ar: ":hover", en: ":hover" }, { ar: ":active", en: ":active" }, { ar: ":focus", en: ":focus" }], a: 0,
        project: { ar: "أضيفي تأثير تحليق (Hover) لبطاقات موقعك.", en: "Add hover effect to your cards." }
      },
      {
        title: { ar: "11. التصميم المتجاوب (Media Queries)", en: "11. Responsive Design (Media Queries)" },
        text: { ar: "نستخدم @media لتغيير تصميم الموقع تلقائياً ليتناسب مع شاشات الجوال والهواتف الذكية.", en: "We use @media to adapt design for mobile screens automatically." },
        code: '@media (max-width: 768px) {\n    .language-grid {\n        grid-template-columns: 1fr;\n    }\n}',
        output: { ar: "تحويل الأعمدة إلى عمود واحد في الشاشات الصغيرة.", en: "Converts columns to a single column on small screens." },
        note: { ar: "التصميم المتجاوب ضروري جداً لتجربة المستخدم.", en: "Responsive design is essential." },
        q: { ar: "ما هي القاعدة المستخدمة في CSS للتصميم المتجاوب؟", en: "What CSS rule is used for responsive design?" },
        options: [{ ar: "@media", en: "@media" }, { ar: "@screen", en: "@screen" }, { ar: "@responsive", en: "@responsive" }], a: 0,
        project: { ar: "اجعلي موقعك يتوافق مع شاشات الهواتف.", en: "Make your site mobile-friendly." }
      },
      {
        title: { ar: "12. مشروع تخرج مسار CSS", en: "12. CSS Capstone Project" },
        text: { ar: "قومي بتنسيق صفحتك بالكامل بالألوان، الخطوط، وFlexbox لتبدو كأنها موقع تجاري احترافي.", en: "Style your complete page with colors, fonts, and Flexbox." },
        code: '/* Final CSS Styling */\n:root { --main-bg: #fbf6ef; }\nbody { background: var(--main-bg); }\n.container { display: flex; justify-content: center; }',
        output: { ar: "موقع بتصميم فريد وألوان جذابة.", en: "A website with a unique, attractive design." },
        note: { ar: "تهانينا! لقد أتقنت تنسيق وتصميم الويب بالكامل.", en: "Congratulations! You mastered web styling." },
        q: { ar: "ما هي فائدة المتغيرات (:root) في CSS؟", en: "What is the benefit of CSS variables?" },
        options: [{ ar: "توحيد وتسهيل تغيير الألوان والـقيم", en: "Unifying and easing color updates" }, { ar: "حذف الأكواد الزائدة", en: "Deleting extra code" }, { ar: "تسريع التحميل فقط", en: "Speeding load only" }], a: 0,
        project: { ar: "احفظي ملف style.css واربطيه بصفحتك.", en: "Save and link your style.css file." }
      }
    ]
  },

  javascript: {
    name: "JavaScript",
    desc: { ar: "12 موضوعاً في المتغيرات، المصفوفات، الدوال، والتفاعل.", en: "12 topics in variables, arrays, functions, and interaction." },
    lessons: [
      {
        title: { ar: "1. مقدمة في JavaScript وعرض النتائج", en: "1. Introduction to JavaScript & Console" },
        text: { ar: "تتيح JavaScript إضافة المنطق والتفاعل عبر طباعة النتائج في وحدة التحكم console.log().", en: "JavaScript adds logic and interaction via console.log()." },
        code: 'console.log("Hello, Code Ambassador!");\nalert("Welcome to JavaScript course!");',
        output: { ar: "طباعة رسالة ترحيبية في وحدة التحكم ونافذة تنبيه.", en: "Prints greeting and alert." },
        note: { ar: "JavaScript هي لغة البرمجة الأكثر شهرة للويب.", en: "JavaScript is the most popular web programming language." },
        q: { ar: "ما الأمر المستخدم لطباعة الرسائل في وحدة التحكم؟", en: "What prints messages to the console?" },
        options: [{ ar: "console.log()", en: "console.log()" }, { ar: "print()", en: "print()" }, { ar: "display()", en: "display()" }], a: 0,
        project: { ar: "اكتبي أمرًا يطبع اسمك في الـ Console.", en: "Write a command to print your name." }
      },
      {
        title: { ar: "2. المتغيرات (Let & Const)", en: "2. Variables (Let & Const)" },
        text: { ar: "نستخدم let للقيم المتغيرة و const للقيم الثابتة لحفظ البيانات في الذاكرة.", en: "We use let for changing values and const for constants." },
        code: 'let studentName = "Rema";\nconst courseYear = 2026;\nconsole.log(studentName, courseYear);',
        output: { ar: "تخزين اسم الطالبة والسنة وطباعتهما.", en: "Stores and prints student name and year." },
        note: { ar: "دائماً استخدمي const ما لم تحتاجِ لتغيير القيمة لاحقاً.", en: "Always use const unless value changes." },
        q: { ar: "أي كلمة مفتاحية تُستخدم لتعريف قيمة ثابتة لا تتغير؟", en: "Which keyword defines a constant?" },
        options: [{ ar: "const", en: "const" }, { ar: "let", en: "let" }, { ar: "var", en: "var" }], a: 0,
        project: { ar: "عرفي متغيرين لمدينتك وتخصصك.", en: "Define two variables for your city and major." }
      },
      {
        title: { ar: "3. العمليات الحسابية والرياضيات", en: "3. Arithmetic Operations" },
        text: { ar: "ندعم العمليات الأساسية كالجمع (+) والطرح (-) والضرب (*) والقسمة (/).", en: "Supports basic operations like +, -, *, /." },
        code: 'let num1 = 10;\nlet num2 = 5;\nlet sum = num1 + num2;\nconsole.log("Total: " + sum);',
        output: { ar: "طباعة المجموع (Total: 15).", en: "Prints sum (Total: 15)." },
        note: { ar: "تتم العمليات الحسابية بأسبقية الرياضيات المعروفة.", en: "Calculations follow math precedence." },
        q: { ar: "ما ناتج 5 + 3 * 2 في البرمجة؟", en: "What is 5 + 3 * 2 in programming?" },
        options: [{ ar: "11", en: "11" }, { ar: "16", en: "16" }, { ar: "8", en: "8" }], a: 0,
        project: { ar: "قومي بحساب معدلك التراكمي باستخدام العمليات الحسابية.", en: "Calculate your GPA." }
      },
      {
        title: { ar: "4. المصفوفات في JavaScript (Arrays)", en: "4. JavaScript Arrays" },
        text: { ar: "المصفوفة (Array) تخزن عدة قيم في متغير واحد داخل أقواس مربعة []، ويبدأ الفهرس من 0.", en: "An array stores multiple values inside [] with indexing starting at 0." },
        code: 'const languages = ["HTML", "CSS", "JavaScript", "Python"];\nconsole.log(languages[0]); // HTML\nconsole.log(languages.length); // 4',
        output: { ar: "عرض العنصر الأول وطول المصفوفة.", en: "Shows first item and array length." },
        note: { ar: "المصفوفات ضرورية جداً لحفظ وقوائم البيانات.", en: "Arrays are essential for data lists." },
        q: { ar: "كيف نصل للعنصر الأول في المصفوفة languages؟", en: "How to access the first item?" },
        options: [{ ar: "languages[0]", en: "languages[0]" }, { ar: "languages[1]", en: "languages[1]" }, { ar: "languages.first", en: "languages.first" }], a: 0,
        project: { ar: "أنشئي مصفوفة لثلاث مواد دراسية وطبعي العنصر الثاني.", en: "Create an array of three subjects and print the second." }
      },
      {
        title: { ar: "5. طرق تعديل المصفوفات (Array Methods)", en: "5. Array Methods (Push & Pop)" },
        text: { ar: "نستخدم .push() لإضافة عنصر للنهاية و .pop() لحذف آخر عنصر.", en: "We use .push() to add and .pop() to remove items." },
        code: 'const fruits = ["Apple", "Banana"];\nfruits.push("Orange");\nconsole.log(fruits); // ["Apple", "Banana", "Orange"]',
        output: { ar: "إضافة برتقال للمصفوفة وطباعتها محدثة.", en: "Adds orange to the array." },
        note: { ar: "تعديل المصفوفات بمرونة يسهل إدارة البيانات.", en: "Array methods ease data management." },
        q: { ar: "أي دالة تضيف عنصرًا جديدًا لنهاية المصفوفة؟", en: "Which method adds an item to the end?" },
        options: [{ ar: "push()", en: "push()" }, { ar: "pop()", en: "pop()" }, { ar: "shift()", en: "shift()" }], a: 0,
        project: { ar: "أضيفي لغة برمجة جديدة لمصفوفتك عبر push.", en: "Add a new language using push." }
      },
      {
        title: { ar: "6. الشروط (If / Else Statements)", en: "6. Conditional Statements (If / Else)" },
        text: { ar: "نستخدم الجمل الشرطية لتنفيذ أكواد مختلفة بناءً على تحقق شرط معين.", en: "We use conditionals to run code based on conditions." },
        code: 'let score = 85;\nif (score >= 60) {\n    console.log("Passed successfully!");\n} else {\n    console.log("Try again.");\n}',
        output: { ar: "طباعة (Passed successfully!).", en: "Prints (Passed successfully!)." },
        note: { ar: "== للمقارنة و === للمقارنة الصارمة مع نوع البيانات.", en: "Use === for strict comparison." },
        q: { ar: "متى يتم تنفيذ محتوى كتلة if؟", en: "When does if block execute?" },
        options: [{ ar: "عندما يكون الشرط صحيحاً (true)", en: "When condition is true" }, { ar: "دائماً", en: "Always" }, { ar: "عند إغلاق الصفحة", en: "When page closes" }], a: 0,
        project: { ar: "اكتبي شرطاً يتحقق إذا كانت درجتك أكبر من 90.", en: "Write a condition checking if score > 90." }
      },
      {
        title: { ar: "7. الحلقات التكرارية (For Loop)", en: "7. For Loop" },
        text: { ar: "تستخدم حلقة for لتكرار تنفيذ كود معين عدة مرات بكفاءة.", en: "A for loop repeats code execution efficiently." },
        code: 'for (let i = 1; i <= 5; i++) {\n    console.log("Number: " + i);\n}',
        output: { ar: "طباعة الأرقام من 1 إلى 5.", en: "Prints numbers 1 through 5." },
        note: { ar: "الحلقات تمنع تكرار كتابة الكود يدوياً.", en: "Loops prevent code duplication." },
        q: { ar: "ما هو العنصر الثالث في تعريف حلقة for؟", en: "What is the third part of a for loop?" },
        options: [{ ar: "تحديث العداد (Increment)", en: "Increment" }, { ar: "الشرط", en: "Condition" }, { ar: "البداية", en: "Initialization" }], a: 0,
        project: { ar: "اطبعي الأرقام الزوجية من 2 إلى 10.", en: "Print even numbers from 2 to 10." }
      },
      {
        title: { ar: "8. الدوال (JavaScript Functions)", en: "8. JavaScript Functions" },
        text: { ar: "الدالة هي كتلة كود قابلة لإعادة الاستخدام لإنجاز مهمة محددة.", en: "A function is a reusable block of code for a specific task." },
        code: 'function calculateSum(a, b) {\n    return a + b;\n}\nconsole.log(calculateSum(5, 10)); // 15',
        output: { ar: "إرجاع مجموع الرقمين (15).", en: "Returns sum of two numbers (15)." },
        note: { ar: "استخدمي return لإرجاع النتيجة من الدالة.", en: "Use return to output results." },
        q: { ar: "بأي كلمة مفتاحية نبدأ تعريف دالة في جافا سكريبت؟", en: "Which keyword defines a function?" },
        options: [{ ar: "function", en: "function" }, { ar: "def", en: "def" }, { ar: "fun", en: "fun" }], a: 0,
        project: { ar: "أنشئي دالة تحسب مساحة المستطيل.", en: "Create a function calculating rectangle area." }
      },
      {
        title: { ar: "9. كائنات جافا سكريبت (JavaScript Objects)", en: "9. JavaScript Objects" },
        text: { ar: "الكائن (Object) يجمع خصائص متعددة تصف شيئاً واحداً باستخدام مفتاح وقيمة.", en: "An object groups multiple properties using key-value pairs." },
        code: 'const student = {\n    name: "Rema",\n    major: "Computer Science",\n    gpa: 4.8\n};\nconsole.log(student.name);',
        output: { ar: "طباعة اسم الطالبة (Rema).", en: "Prints student name (Rema)." },
        note: { ar: "نصل لخصائص الكائن عبر النقطة (object.property).", en: "Access properties via dot notation." },
        q: { ar: "كيف نصل لخاصية name داخل الكائن student؟", en: "How to access name in student object?" },
        options: [{ ar: "student.name", en: "student.name" }, { ar: "student[name]", en: "student[name]" }, { ar: "name.student", en: "name.student" }], a: 0,
        project: { ar: "أنشئي كائناً يمثل كتاباً له عنوان ومؤلف.", en: "Create a book object with title and author." }
      },
      {
        title: { ar: "10. التعامل مع DOM وتغيير النصوص", en: "10. DOM Manipulation" },
        text: { ar: "نستطيع اختيار عناصر HTML وتعديل محتواها باستخدام document.querySelector().", en: "We can select HTML elements and modify content using DOM." },
        code: 'const title = document.querySelector("h1");\ntitle.textContent = "Welcome to Code Ambassador!";',
        output: { ar: "تغيير عنوان الصفحة ديناميكياً عبر الجافا سكريبت.", en: "Dynamically changes page title." },
        note: { ar: "DOM تربط لغة JavaScript بصفحة HTML.", en: "DOM connects JS to HTML." },
        q: { ar: "أي دالة تستخدم لاختيار عنصر من الصفحة في DOM؟", en: "Which function selects an element?" },
        options: [{ ar: "document.querySelector()", en: "document.querySelector()" }, { ar: "document.getElement()", en: "document.getElement()" }, { ar: "window.find()", en: "window.find()" }], a: 0,
        project: { ar: "قومي بتغيير نص فقرة عند تحميل الصفحة.", en: "Change paragraph text on load." }
      },
      {
        title: { ar: "11. الاستماع للأحداث (Event Listeners)", en: "11. Event Listeners (click)" },
        text: { ar: "نستمع لأحداث المستخدم مثل النقر (click) لتنفيذ أكواد تفاعلية.", en: "We listen to user events like clicks to run interactive code." },
        code: 'const btn = document.querySelector("#myBtn");\nbtn.addEventListener("click", function() {\n    alert("Button clicked!");\n});',
        output: { ar: "إظهار تنبيه عند النقر على الزر.", en: "Shows an alert when button is clicked." },
        note: { ar: "addEventListener أساس التفاعل الحديث في الويب.", en: "addEventListener is the basis of web interactivity." },
        q: { ar: "ما الحدث المستخدم للاستجابة لنقر الزر؟", en: "What event responds to button clicks?" },
        options: [{ ar: "click", en: "click" }, { ar: "hover", en: "hover" }, { ar: "press", en: "press" }], a: 0,
        project: { ar: "اجعي زر يغير لون خلفية الصفحة عند النقر.", en: "Make a button change background color on click." }
      },
      {
        title: { ar: "12. مشروع تخرج مسار JavaScript", en: "12. JavaScript Capstone Project" },
        text: { ar: "قومي ببناء آلة حاسبة مصغرة أو نظام مهام (To-Do List) تفاعلي باستخدام الدوال والمصفوفات والـ DOM.", en: "Build a mini calculator or interactive To-Do List." },
        code: '// Interactive Task Manager\nconst tasks = ["Study JS", "Build Project"];\ntasks.push("Practice Coding");\nconsole.log(tasks);',
        output: { ar: "تطبيق ويب تفاعلي بالكامل.", en: "A fully interactive web application." },
        note: { ar: "تهانينا! لقد أتقنت أساسيات ومنطق البرمجة بلغة جافا سكريبت.", en: "Congratulations! You mastered JavaScript logic." },
        q: { ar: "ماذا تفعل الدالة push في مصفوفة المهام؟", en: "What does push do in tasks array?" },
        options: [{ ar: "تضيف مهمة جديدة للنهاية", en: "Adds a new task to the end" }, { ar: "تحذف كل المهام", en: "Deletes all tasks" }, { ar: "تبحث عن مهمة", en: "Searches for a task" }], a: 0,
        project: { ar: "أنشئي تطبيق قائمة مهام مصغر.", en: "Create a mini task list app." }
      }
    ]
  },

  python: {
    name: "Python",
    desc: { ar: "12 موضوعاً في بايثون، المتغيرات، الدوال، وهياكل البيانات.", en: "12 topics in Python variables, functions, and data structures." },
    lessons: [
      {
        title: { ar: "1. أول برنامج بايثون والطباعة", en: "1. First Python Program & Print" },
        text: { ar: "نستخدم الأمر print() في بايثون لعرض النصوص والمخرجات.", en: "We use print() in Python to display text." },
        code: 'print("Hello from Python, Rema!")\nprint(2026)',
        output: { ar: "طباعة النص ورقم السنة.", en: "Prints text and year." },
        note: { ar: "بايثون تتميز ببساطة وسهولة قراءة أكوادها.", en: "Python is readable and clean." },
        q: { ar: "ما الأمر المستخدم للطباعة في بايثون؟", en: "What command prints in Python?" },
        options: [{ ar: "print()", en: "print()" }, { ar: "echo()", en: "echo()" }, { ar: "console.print()", en: "console.print()" }], a: 0,
        project: { ar: "اطبعي رسالة ترحيبية باسمك.", en: "Print a welcome message with your name." }
      },
      {
        title: { ar: "2. المتغيرات وأنواع البيانات", en: "2. Variables & Data Types" },
        text: { ar: "بايثون تحدد أنواع البيانات تلقائياً مثل النص (str) والعدد الصحيح (int) والعشري (float).", en: "Python infers types like str, int, and float automatically." },
        code: 'name = "Rema"        # str\nage = 20           # int\ngpa = 4.85         # float\nis_active = True   # bool',
        output: { ar: "تخزين متغيرات بأنواع مختلفة.", en: "Stores variables of different types." },
        note: { ar: "لا داعي لتعريف نوع المتغير صراحة في بايثون.", en: "No need to declare data types explicitly." },
        q: { ar: "ما نوع البيانات لمتغير age = 20؟", en: "What is the data type of age = 20?" },
        options: [{ ar: "int", en: "int" }, { ar: "str", en: "str" }, { ar: "float", en: "float" }], a: 0,
        project: { ar: "عرفي متغيرات لاسمك وعمرك وطبعيها.", en: "Define variables for your name and age." }
      },
      {
        title: { ar: "3. استقبال إدخال المستخدم (Input)", en: "3. User Input (input())" },
        text: { ar: "نستخدم الدالة input() لقراءة بيانات يدخلها المستخدم من لوحة المفاتيح.", en: "We use input() to read user keyboard input." },
        code: 'username = input("Enter your name: ")\nprint("Welcome, " + username)',
        output: { ar: "يطلب البرنامج الاسم ثم يرحب بالمستخدم.", en: "Prompts for name then greets user." },
        note: { ar: "البيانات المستلمة عبر input تعتبر دائماً نصوصاً (str).", en: "input() always returns a string." },
        q: { ar: "ما نوع البيانات الذي ترجعه دالة input() عادةً؟", en: "What data type does input() return?" },
        options: [{ ar: "str (نص)", en: "str" }, { ar: "int (عدد)", en: "int" }, { ar: "bool", en: "bool" }], a: 0,
        project: { ar: "اكتبي برنامجاً يسأل المستخدم عن مدينته ويرحب به.", en: "Write a program asking for user city." }
      },
      {
        title: { ar: "4. العمليات الحسابية في بايثون", en: "4. Python Arithmetic" },
        text: { ar: "تدعم بايثون العمليات الرياضية مثل الجمع والطرح والقسمة والأسس (**).", en: "Python supports math operations like exponents (**)." },
        code: 'x = 5\ny = 3\nprint(x + y)  # 8\nprint(x ** y) # 125 (5 أس 3)',
        output: { ar: "طباعة المجموع ونتيجة الأس.", en: "Prints sum and exponent result." },
        note: { ar: "** تستخدم لحساب الأسس في بايثون.", en: "** is used for exponents." },
        q: { ar: "ما ناتج 2 ** 3 في بايثون؟", en: "What is 2 ** 3 in Python?" },
        options: [{ ar: "8", en: "8" }, { ar: "6", en: "6" }, { ar: "9", en: "9" }], a: 0,
        project: { ar: "احسبي مربع ومكعب رقم معين.", en: "Calculate square and cube of a number." }
      },
      {
        title: { ar: "5. الشروط (If, Elif, Else)", en: "5. Conditional Statements (If, Elif, Else)" },
        text: { ar: "تتخذ بايثون القرارات بناءً على الشروط مع الاعتماد الدقيق على المسافات البادئة (Indentation).", en: "Python makes decisions using indentation." },
        code: 'score = 90\nif score >= 90:\n    print("Grade: A")\nelif score >= 80:\n    print("Grade: B")\nelse:\n    print("Grade: C")',
        output: { ar: "طباعة (Grade: A).", en: "Prints (Grade: A)." },
        note: { ar: "المسافات البادئة إجبارية في بايثون لتحديد الكتل البرمجية.", en: "Indentation is mandatory in Python." },
        q: { ar: "ما الكلمة المستخدمة لاختبار شرط إضافي بعد if؟", en: "What keyword tests an extra condition?" },
        options: [{ ar: "elif", en: "elif" }, { ar: "else if", en: "else if" }, { ar: "elseif", en: "elseif" }], a: 0,
        project: { ar: "اكتبي برنامجاً لتصنيف درجات الطلاب.", en: "Write a grading classifier." }
      },
      {
        title: { ar: "6. القوائم في بايثون (Python Lists)", en: "6. Python Lists" },
        text: { ar: "القائمة في بايثون تخزن عناصر متعددة، ويمكن الوصول لها بالفهرس الذي يبدأ من 0.", en: "Python lists store multiple items with indexing from 0." },
        code: 'languages = ["Python", "Java", "C++"]\nprint(languages[0])\nlanguages.append("HTML")\nprint(len(languages))',
        output: { ar: "طباعة أول لغة ثم طول القائمة الجديد (4).", en: "Prints first language and new length (4)." },
        note: { ar: "append() تضيف عنصراً لنهاية القائمة.", en: "append() adds an item to the end." },
        q: { ar: "أي دالة تضيف عنصراً جديداً للقائمة في بايثون؟", en: "Which function adds an item to a list?" },
        options: [{ ar: "append()", en: "append()" }, { ar: "add()", en: "add()" }, { ar: "push()", en: "push()" }], a: 0,
        project: { ar: "أنشئي قائمة بأكلاتها المفضلة وأضيفي أكلة جديدة.", en: "Create a list of favorite foods." }
      },
      {
        title: { ar: "7. الحلقات التكرارية (For Loop & Range)", en: "7. For Loop & Range" },
        text: { ar: "نستخدم for مع range لتكرار العمليات لعدد محدد من المرات.", en: "We use for with range to repeat operations." },
        code: 'for i in range(1, 6):\n    print("Count:", i)',
        output: { ar: "طباعة الأرقام من 1 إلى 5.", en: "Prints numbers 1 through 5." },
        note: { ar: "قيمة التوقف في range غير مشمولة (تتوقف قبلها).", en: "Stop value in range is exclusive." },
        q: { ar: "ما الأرقام التي تنتجها range(1, 4)؟", en: "What does range(1, 4) produce?" },
        options: [{ ar: "1, 2, 3", en: "1, 2, 3" }, { ar: "1, 2, 3, 4", en: "1, 2, 3, 4" }, { ar: "0, 1, 2, 3", en: "0, 1, 2, 3" }], a: 0,
        project: { ar: "اطبعي جدول الضرب لرقم 5.", en: "Print multiplication table of 5." }
      },
      {
        title: { ar: "8. الحلقات الشرطية (While Loop)", en: "8. While Loop" },
        text: { ar: "تستمر حلقة while في التكرار طالما أن الشرط المرفق صحيح (True).", en: "A while loop runs as long as its condition is True." },
        code: 'count = 3\nwhile count > 0:\n    print(count)\n    count -= 1\nprint("Blast off!")',
        output: { ar: "طباعة 3 ثم 2 ثم 1 ثم رسالة الإطلاق.", en: "Counts down from 3." },
        note: { ar: "تأكدي من تحديث متغير الشرط لتجنب الحلقة اللانهائية.", en: "Update condition to avoid infinite loops." },
        q: { ar: "متى تتوقف حلقة while عن العمل؟", en: "When does a while loop stop?" },
        options: [{ ar: "عندما يصبح الشرط False", en: "When condition becomes False" }, { ar: "عندما ينتهي الكود تماماً", en: "When code ends" }, { ar: "تتوقف تلقائياً بعد ثانية", en: "Stops after 1 second" }], a: 0,
        project: { ar: "اكتبي عداداً تنازلياً من 5 إلى 1.", en: "Write a countdown from 5 to 1." }
      },
      {
        title: { ar: "9. الدوال في بايثون (Def)", en: "9. Python Functions (def)" },
        text: { ar: "نستخدم الكلمة المفتاحية def لتعريف دالة جديدة تستقبل معاملات وترجع نتائج.", en: "We use def to define new Python functions." },
        code: 'def greet_student(name):\n    return "Hello, " + name + "!"\n\nprint(greet_student("Rema"))',
        output: { ar: "طباعة (Hello, Rema!).", en: "Prints (Hello, Rema!)." },
        note: { ar: "الدوال تنظم الكود وتمنع تكراره.", en: "Functions organize code." },
        q: { ar: "ما الكلمة المستخدمة لتعريف دالة في بايثون؟", en: "What keyword defines a function in Python?" },
        options: [{ ar: "def", en: "def" }, { ar: "function", en: "function" }, { ar: "fun", en: "fun" }], a: 0,
        project: { ar: "اكتبي دالة تحسب مجموع ثلاثة أرقام.", en: "Write a function summing three numbers." }
      },
      {
        title: { ar: "10. القواميس في بايثون (Dictionaries)", en: "10. Python Dictionaries" },
        text: { ar: "القاموس (Dictionary) يخزن بيانات بنظام المفتاح والقيمة (Key-Value).", en: "A dictionary stores data in Key-Value pairs." },
        code: 'student_info = {\n    "name": "Rema",\n    "id": "461004437",\n    "major": "CS"\n}\nprint(student_info["name"])',
        output: { ar: "طباعة اسم الطالبة من القاموس.", en: "Prints student name from dict." },
        note: { ar: "القواميس مفيدة جداً لربط المعلومات ببعضها.", en: "Dictionaries are great for mapping data." },
        q: { ar: "بأي أقواس يُعرّف القاموس (Dictionary) في بايثون؟", en: "What brackets define a dictionary?" },
        options: [{ ar: "أقواس معقوفة {}", en: "Curly braces {}" }, { ar: "أقواس مربعة []", en: "Square brackets []" }, { ar: "أقواس دائرية ()", en: "Parentheses ()" }], a: 0,
        project: { ar: "أنشئي قاموساً لمعلومات مادة دراسية.", en: "Create a course info dictionary." }
      },
      {
        title: { ar: "11. معالجة الأخطاء (Try / Except)", en: "11. Error Handling (Try / Except)" },
        text: { ar: "نستخدم try و except لحماية البرنامج من الانهيار عند حدوث أخطاء.", en: "We use try and except to catch runtime errors." },
        code: 'try:\n    num = int(input("Enter number: "))\n    print(10 / num)\nexcept ZeroDivisionError:\n    print("Cannot divide by zero!")',
        output: { ar: "منع انهيار البرنامج عند القسمة على صفر.", en: "Prevents crash on division by zero." },
        note: { ar: "معالجة الأخطاء تجعل البرامج أكثر استقراراً.", en: "Error handling makes programs robust." },
        q: { ar: "ما الكتلة المسؤولة عن التقاط الخطأ في بايثون؟", en: "Which block catches errors?" },
        options: [{ ar: "except", en: "except" }, { ar: "catch", en: "catch" }, { ar: "error", en: "error" }], a: 0,
        project: { ar: "حماية برنامج قسمة من إدخال غير صالح.", en: "Protect a division program." }
      },
      {
        title: { ar: "12. مشروع تخرج مسار Python", en: "12. Python Capstone Project" },
        text: { ar: "قومي ببناء نظام إدارة طلاب جامعي باستخدام القواميس، الدوال، والشروط.", en: "Build a student management system using dicts and functions." },
        code: '# Student Grade Manager\nstudents = {"Rema": 95, "Sara": 88}\nfor name, grade in students.items():\n    print(name, "->", grade)',
        output: { ar: "عرض أسماء الطلاب ودرجاتهم بمرونة.", en: "Displays student names and grades." },
        note: { ar: "تهانينا! لقد أتقنت أساسيات وخوارزميات بايثون.", en: "Congratulations! You mastered Python fundamentals." },
        q: { ar: "ما الدالة المستخدمة للحصول على المفاتيح والقيم في القاموس؟", en: "What method gets items from a dict?" },
        options: [{ ar: "items()", en: "items()" }, { ar: "get()", en: "get()" }, { ar: "keys()", en: "keys()" }], a: 0,
        project: { ar: "أنشئي برنامجاً متكاملاً لإدارة درجات المواد.", en: "Create a grade management program." }
      }
    ]
  },

  cpp: {
    name: "C++",
    desc: { ar: "12 موضوعاً في لغة C++، المدخلات، الشروط، والكائنات.", en: "12 topics in C++ input, conditionals, and objects." },
    lessons: [
      {
        title: { ar: "1. هيكل برنامج C++ وطباعة النصوص", en: "1. C++ Structure & Output (cout)" },
        text: { ar: "يبدأ تنفيذ برنامج C++ من دالة main ونستخدم cout مع << لعرض النصوص.", en: "C++ execution starts at main and uses cout with << for output." },
        code: '#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello, C++ World!";\n    return 0;\n}',
        output: { ar: "طباعة (Hello, C++ World!).", en: "Prints (Hello, C++ World!)." },
        note: { ar: "كل تعليمة برمجية يجب أن تنتهي بفاصلة منقوطة (;).", en: "Every statement must end with a semicolon." },
        q: { ar: "ما الأمر المستخدم للطباعة في C++؟", en: "What prints output in C++?" },
        options: [{ ar: "cout", en: "cout" }, { ar: "print", en: "print" }, { ar: "printf", en: "printf" }], a: 0,
        project: { ar: "اطبعي اسمك وتخصصك بلغة C++.", en: "Print your name and major in C++." }
      },
      {
        title: { ar: "2. المتغيرات وأنواع البيانات الأساسية", en: "2. Variables & Data Types" },
        text: { ar: "في C++ يجب تحديد نوع المتغير صراحة مثل int للأعداد و double للعشارية و char للحرف.", en: "In C++ data types must be declared explicitly." },
        code: '#include <iostream>\nusing namespace std;\nint main() {\n    int age = 20;\n    double gpa = 4.8;\n    char grade = \'A\';\n    cout << age << " " << gpa << " " << grade;\n}',
        output: { ar: "عرض العمر والمعدل والتقدير.", en: "Displays age, GPA, and grade." },
        note: { ar: "تحديد الأنواع يحسن كفاءة استخدام الذاكرة.", en: "Type declaration improves memory efficiency." },
        q: { ar: "ما هو النوع المناسب لتخزين عدد صحيح في C++؟", en: "Which type stores integers in C++?" },
        options: [{ ar: "int", en: "int" }, { ar: "double", en: "double" }, { ar: "string", en: "string" }], a: 0,
        project: { ar: "عرفي متغيرات لعمرك وطولي وطبعيها.", en: "Define variables for age and height." }
      },
      {
        title: { ar: "3. استقبال الإدخال من المستخدم (cin)", en: "3. User Input (cin)" },
        text: { ar: "نستخدم cin مع العامل >> لبناء تفاعل مع لوحة المفاتيح.", en: "We use cin with >> to read user input." },
        code: '#include <iostream>\nusing namespace std;\nint main() {\n    int age;\n    cout << "Enter your age: ";\n    cin >> age;\n    cout << "You are " << age << " years old.";\n}',
        output: { ar: "يطلب العمر ثم يعرضه في الجملة.", en: "Asks for age then displays it." },
        note: { ar: "cin تستخدم العامل >> بينما cout تستخدم <<.", en: "cin uses >> while cout uses <<." },
        q: { ar: "ما هو العامل المستخدم مع cin لقراءة البيانات؟", en: "What operator is used with cin?" },
        options: [{ ar: ">>", en: ">>" }, { ar: "<<", en: "<<" }, { ar: "->", en: "->" }], a: 0,
        project: { ar: "اكتبي برنامجاً يقرأ رقمين ويجمعهم.", en: "Write a program reading two numbers." }
      },
      {
        title: { ar: "4. العمليات الحسابية في C++", en: "4. C++ Arithmetic Operations" },
        text: { ar: "تدعم C++ العمليات الحسابية القياسية وحساب باقي القسمة (%).", en: "C++ supports standard arithmetic and modulus (%)." },
        code: '#include <iostream>\nusing namespace std;\nint main() {\n    int a = 10, b = 3;\n    cout << "Remainder: " << (a % b);\n}',
        output: { ar: "طباعة باقي القسمة (1).", en: "Prints remainder (1)." },
        note: { ar: "عامل المودلس (%) مفيد لمعرفة الأعداد الزوجية والفردية.", en: "Modulus is useful for even/odd checks." },
        q: { ar: "ما ناتج 10 % 3 في C++؟", en: "What is 10 % 3 in C++?" },
        options: [{ ar: "1", en: "1" }, { ar: "3", en: "3" }, { ar: "0", en: "0" }], a: 0,
        project: { ar: "تحققي إذا كان الرقم زوجياً أم فردياً.", en: "Check if a number is even or odd." }
      },
      {
        title: { ar: "5. الشروط (If / Else in C++)", en: "5. C++ Conditionals" },
        text: { ar: "تستخدم if و else لتنفيذ تفريعات برمجية حسب تحقق الشروط.", en: "Use if and else for branching based on conditions." },
        code: '#include <iostream>\nusing namespace std;\nint main() {\n    int score = 75;\n    if (score >= 60) cout << "Passed";\n    else cout << "Failed";\n}',
        output: { ar: "طباعة (Passed).", en: "Prints (Passed)." },
        note: { ar: "الأقواس المعقوفة {} تحدد الكتل البرمجية التابعة للشرط.", en: "Braces {} define condition blocks." },
        q: { ar: "ما الرمز المستخدم للتحقق من التساوي في C++؟", en: "What symbol checks equality in C++?" },
        options: [{ ar: "==", en: "==" }, { ar: "=", en: "=" }, { ar: "===", en: "===" }], a: 0,
        project: { ar: "اكتبي شرطاً يتحقق إذا كان الرقم موجباً أم سالباً.", en: "Check if number is positive or negative." }
      },
      {
        title: { ar: "6. جملة الاختيار المتعدد (Switch Statement)", en: "6. Switch Statement" },
        text: { ar: "نستبدل الشروط المتعددة بجملة switch لاختيار حالة مطابقة بقيمة المتغير.", en: "Switch selects matching cases based on a variable value." },
        code: '#include <iostream>\nusing namespace std;\nint main() {\n    int day = 2;\n    switch(day) {\n        case 1: cout << "Sunday"; break;\n        case 2: cout << "Monday"; break;\n        default: cout << "Other";\n    }\n}',
        output: { ar: "طباعة (Monday).", en: "Prints (Monday)." },
        note: { ar: "لا تنسي كتابة break بعد كل حالة لمنع استمرار التنفيذ.", en: "Don't forget break after each case." },
        q: { ar: "ما الكلمة المستخدمة لإنهاء الحالة في switch؟", en: "What keyword ends a switch case?" },
        options: [{ ar: "break", en: "break" }, { ar: "stop", en: "stop" }, { ar: "exit", en: "exit" }], a: 0,
        project: { ar: "صممي قائمة أيام الأسبوع باستخدام switch.", en: "Design a days of week menu using switch." }
      },
      {
        title: { ar: "7. الحلقات التكرارية (For Loop in C++)", en: "7. C++ For Loop" },
        text: { ar: "تستخدم حلقة for في C++ لتكرار تنفيذ الكود بعدد مرات معلوم.", en: "C++ for loop repeats code a known number of times." },
        code: '#include <iostream>\nusing namespace std;\nint main() {\n    for(int i = 1; i <= 4; i++) {\n        cout << i << " ";\n    }\n}',
        output: { ar: "طباعة (1 2 3 4).", en: "Prints (1 2 3 4)." },
        note: { ar: "يمكن تعريف متغير العد داخل حلقة for مباشرة.", en: "Counter can be defined inside for loop." },
        q: { ar: "كيف نزيد قيمة العداد بمقدار 1 في C++؟", en: "How to increment counter by 1?" },
        options: [{ ar: "i++", en: "i++" }, { ar: "i+1", en: "i+1" }, { ar: "add(i)", en: "add(i)" }], a: 0,
        project: { ar: "اطبعي الأعداد التنازلية من 10 إلى 1.", en: "Print countdown from 10 to 1." }
      },
      {
        title: { ar: "8. المصفوفات في C++ (C++ Arrays)", en: "8. C++ Arrays" },
        text: { ar: "المصفوفة في C++ تخزن مجموعة عناصر من نفس النوع بحجم ثابت.", en: "A C++ array stores elements of the same type of fixed size." },
        code: '#include <iostream>\nusing namespace std;\nint main() {\n    int scores[3] = {90, 85, 95};\n    cout << scores[0];\n}',
        output: { ar: "طباعة العنصر الأول (90).", en: "Prints first element (90)." },
        note: { ar: "حجم المصفوفة ثابت ويُحدد عند إنشائها.", en: "Array size is fixed upon creation." },
        q: { ar: "ما الفهرس الذي يبدأ منه ترقيم المصفوفات في C++؟", en: "What index do C++ arrays start at?" },
        options: [{ ar: "0", en: "0" }, { ar: "1", en: "1" }, { ar: "-1", en: "-1" }], a: 0,
        project: { ar: "أنشئي مصفوفة لثلاث درجات وطبعي مجموعها.", en: "Create array of three grades." }
      },
      {
        title: { ar: "9. الدوال في C++ (Functions)", en: "9. C++ Functions" },
        text: { ar: "نعرف الدالة بتحديد نوع القيمة المُرجَعة، اسمها، والمعاملات.", en: "We define functions specifying return type, name, and parameters." },
        code: '#include <iostream>\nusing namespace std;\nint multiply(int a, int b) {\n    return a * b;\n}\nint main() {\n    cout << multiply(4, 5);\n}',
        output: { ar: "طباعة حاصل الضرب (20).", en: "Prints product (20)." },
        note: { ar: "يجب الإعلان عن الدالة قبل استخدامها.", en: "Declare function before use." },
        q: { ar: "ما هو نوع الإرجاع لدالة لا ترجع شيئاً في C++؟", en: "What return type means 'no return'?" },
        options: [{ ar: "void", en: "void" }, { ar: "null", en: "null" }, { ar: "empty", en: "empty" }], a: 0,
        project: { ar: "اكتبي دالة تحسب مساحة مربع.", en: "Write a function calculating square area." }
      },
      {
        title: { ar: "10. المؤشرات في C++ (Pointers)", en: "10. C++ Pointers" },
        text: { ar: "المؤشر (Pointer) هو متغير يخزن عنوان الذاكرة لمتغير آخر.", en: "A pointer stores the memory address of another variable." },
        code: '#include <iostream>\nusing namespace std;\nint main() {\n    int x = 10;\n    int* ptr = &x;\n    cout << ptr;\n}',
        output: { ar: "عرض عنوان الذاكرة للمتغير x.", en: "Displays memory address of x." },
        note: { ar: "المؤشرات ميزة قوية في C++ للتحكم بالذاكرة.", en: "Pointers give power over memory." },
        q: { ar: "ما الرمز المستخدم للحصول على عنوان الذاكرة (&)؟", en: "What symbol gets memory address?" },
        options: [{ ar: "&", en: "&" }, { ar: "*", en: "*" }, { ar: "#", en: "#" }], a: 0,
        project: { ar: "جربي إنشاء مؤشر لمتغير نصي أو عددي.", en: "Try creating a pointer." }
      },
      {
        title: { ar: "11. الكائنات والبرمجة كائنية التوجه (OOP)", en: "11. Classes & Objects (OOP)" },
        text: { ar: "نستخدم class لإنشاء قالب يجمع البيانات والدوال معاً (Object-Oriented).", en: "We use class to create blueprints combining data and methods." },
        code: '#include <iostream>\nusing namespace std;\nclass Student {\npublic:\n    string name;\n    void introduce() {\n        cout << "Hi, I am " << name;\n    }\n};\nint main() {\n    Student s1;\n    s1.name = "Rema";\n    s1.introduce();\n}',
        output: { ar: "طباعة (Hi, I am Rema).", en: "Prints (Hi, I am Rema)." },
        note: { ar: "OOP هي الركيزة الأساسية لتطوير البرمجيات كبرى.", en: "OOP is the backbone of software engineering." },
        q: { ar: "ما الكلمة المفتاحية المستخدمة لتعريف صنف في C++؟", en: "What keyword defines a class?" },
        options: [{ ar: "class", en: "class" }, { ar: "object", en: "object" }, { ar: "struct", en: "struct" }], a: 0,
        project: { ar: "صممي كلاس لسيارة لها لون وسرعة.", en: "Design a Car class." }
      },
      {
        title: { ar: "12. مشروع تخرج مسار C++", en: "12. C++ Capstone Project" },
        text: { ar: "قومي بإنشاء برنامج متكامل لإدارة درجات الطلاب باستخدام الكلاسات والدوال.", en: "Build a student grade manager using C++ classes." },
        code: '#include <iostream>\nusing namespace std;\nint main() {\n    cout << "C++ Capstone Project Completed!";\n    return 0;\n}',
        output: { ar: "تشغيل البرنامج بنجاح.", en: "Runs program successfully." },
        note: { ar: "تهانينا! لقد أتقنت برمجة الأنظمة وكائنات C++.", en: "Congratulations! You mastered C++ systems programming." },
        q: { ar: "ما الدالة الرئيسية التي يبدأ منها أي برنامج C++؟", en: "What is the main function in C++?" },
        options: [{ ar: "main()", en: "main()" }, { ar: "start()", en: "start()" }, { ar: "init()", en: "init()" }], a: 0,
        project: { ar: "قومي بتجميع وتشغيل مشروعك النهائي.", en: "Compile and run your final C++ project." }
      }
    ]
  },

  java: {
    name: "Java",
    desc: { ar: "12 موضوعاً في جافا، الكلاسات، الكائنات، والشروط.", en: "12 topics in Java classes, objects, and conditions." },
    lessons: [
      {
        title: { ar: "1. أول برنامج Java وطباعة النصوص", en: "1. First Java Program & Output" },
        text: { ar: "في جافا يجب أن يكون كل كود داخل صنف (Class)، ويتم الطباعة عبر System.out.println().", en: "In Java all code resides in a class, printed via System.out.println()." },
        code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java World!");\n    }\n}',
        output: { ar: "طباعة (Hello, Java World!).", en: "Prints (Hello, Java World!)." },
        note: { ar: "اسم الملف العام في جافا يجب أن يتطابق مع اسم الـ Class.", en: "Filename must match public class name." },
        q: { ar: "ما الأمر المستخدم للطباعة في جافا؟", en: "What prints output in Java?" },
        options: [{ ar: "System.out.println()", en: "System.out.println()" }, { ar: "cout", en: "cout" }, { ar: "print()", en: "print()" }], a: 0,
        project: { ar: "اطبعي رسالة ترحيبية بلغة جافا.", en: "Print a Java welcome message." }
      },
      {
        title: { ar: "2. المتغيرات وأنواع البيانات في Java", en: "2. Java Variables & Types" },
        text: { ar: "تدعم جافا أنواع بيانات مثل int, double, boolean, و String للنصوص.", en: "Java supports types like int, double, boolean, and String." },
        code: 'public class Variables {\n    public static void main(String[] args) {\n        String name = "Rema";\n        int age = 20;\n        System.out.println(name + " - " + age);\n    }\n}',
        output: { ar: "طباعة اسم الطالبة وعمرها.", en: "Prints student name and age." },
        note: { ar: "String تبدأ بحرف كبير S في لغة جافا.", en: "String starts with uppercase S in Java." },
        q: { ar: "كيف يُكتب نوع البيانات النصي في جافا؟", en: "How is text data type written in Java?" },
        options: [{ ar: "String", en: "String" }, { ar: "string", en: "string" }, { ar: "text", en: "text" }], a: 0,
        project: { ar: "عرفي متغيرات لمعلوماتك الجامعية وطبعيها.", en: "Define variables for university info." }
      },
      {
        title: { ar: "3. استقبال الإدخال في Java (Scanner)", en: "3. Java Scanner (User Input)" },
        text: { ar: "نستخدم مكتبة Scanner لاستقبال المدخلات من المستخدم عبر لوحة المفاتيح.", en: "We use Scanner to read user keyboard input." },
        code: 'import java.util.Scanner;\npublic class InputTest {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        String name = scanner.nextLine();\n        System.out.println("Hello " + name);\n    }\n}',
        output: { ar: "يطلب الاسم ثم يرد بالترحيب.", en: "Asks for name then greets." },
        note: { ar: "يجب استيراد المكتبة import java.util.Scanner في أعلى الملف.", en: "Must import java.util.Scanner." },
        q: { ar: "ما المكتبة المستخدمة لاستقبال المدخلات في جافا؟", en: "What library is used for input?" },
        options: [{ ar: "java.util.Scanner", en: "java.util.Scanner" }, { ar: "java.io.Input", en: "java.io.Input" }, { ar: "java.net.Input", en: "java.net.Input" }], a: 0,
        project: { ar: "اكتبي برنامجاً يسأل عن عمرك.", en: "Write a program asking for age." }
      },
      {
        title: { ar: "4. الشروط (If / Else in Java)", en: "4. Java Conditionals" },
        text: { ar: "تستخدم جملة if و else لاتخاذ القرارات بناءً على الشروط المنطقية.", en: "Use if and else for decision making." },
        code: 'int score = 88;\nif (score >= 90) {\n    System.out.println("A");\n} else {\n    System.out.println("Good");\n}',
        output: { ar: "طباعة (Good).", en: "Prints (Good)." },
        note: { ar: "نفس منطق الشروط في لغات C++ و JavaScript.", en: "Same conditional logic as C++." },
        q: { ar: "أي جملة تستخدم لتنفيذ كود بديل إذا لم يتحقق الشرط؟", en: "Which statement runs alternative code?" },
        options: [{ ar: "else", en: "else" }, { ar: "otherwise", en: "otherwise" }, { ar: "default", en: "default" }], a: 0,
        project: { ar: "تحققي إذا كان الرقم المدخل زوجياً أم فردياً.", en: "Check even or odd." }
      },
      {
        title: { ar: "5. جملة الاختيار (Switch Case in Java)", en: "5. Java Switch Case" },
        text: { ar: "نستخدم switch لاختبار عدة حالات لمتغير واحد بكل تنظيم.", en: "We use switch to test multiple cases cleanly." },
        code: 'int day = 3;\nswitch(day) {\n    case 1: System.out.println("Sat"); break;\n    case 3: System.out.println("Mon"); break;\n    default: System.out.println("Other");\n}',
        output: { ar: "طباعة (Mon).", en: "Prints (Mon)." },
        note: { ar: "تعتبر بديلاً أنيقاً لتعدد جمل if-else.", en: "An elegant alternative to multiple if-else." },
        q: { ar: "ما الكلمة التي تمنع استمرار التنفيذ للحالات التالية في switch؟", en: "What prevents falling through cases?" },
        options: [{ ar: "break", en: "break" }, { ar: "stop", en: "stop" }, { ar: "end", en: "end" }], a: 0,
        project: { ar: "صممي قائمة خيارات برمجية بـ switch.", en: "Design a menu using switch." }
      },
      {
        title: { ar: "6. الحلقات التكرارية (For Loop in Java)", en: "7. Java For Loop" },
        text: { ar: "تستخدم حلقة for للتكرار المحسوب بعدد مرات معلوم في جافا.", en: "For loop is used for counted repetition in Java." },
        code: 'for(int i = 1; i <= 3; i++) {\n    System.out.println("Iteration: " + i);\n}',
        output: { ar: "طباعة التكرارات من 1 إلى 3.", en: "Prints iterations 1 to 3." },
        note: { ar: "بنية الحلقة مشابهة جداً للغة C++.", en: "Syntax is very similar to C++." },
        q: { ar: "ما هي بنية حلقة التكرار الأكثر استخداماً لعدد مرات معلوم؟", en: "Most used counted loop?" },
        options: [{ ar: "for loop", en: "for loop" }, { ar: "repeat loop", en: "repeat loop" }, { ar: "loop-to", en: "loop-to" }], a: 0,
        project: { ar: "اطبعي جدول الضرب للرقم 4.", en: "Print multiplication table of 4." }
      },
      {
        title: { ar: "7. حلقة التكرار الشرطية (While Loop)", en: "7. Java While Loop" },
        text: { ar: "تستمر حلقة while في العمل طالما الشرط محقق.", en: "While loop runs as long as condition holds." },
        code: 'int x = 5;\nwhile(x > 0) {\n    System.out.println(x);\n    x--;\n}',
        output: { ar: "طباعة الأرقام من 5 تنازلياً إلى 1.", en: "Prints countdown 5 to 1." },
        note: { ar: "تأكدي من تحديث العداد لتفادي الحلقات اللانهائية.", en: "Update counter to avoid infinite loops." },
        q: { ar: "متى تتوقف حلقة while؟", en: "When does while stop?" },
        options: [{ ar: "عندما يصبح الشرط false", en: "When condition becomes false" }, { ar: "عند نهاية الصنف", en: "At class end" }], a: 0,
        project: { ar: "اكتبي عداداً تنازلياً باستخدام while.", en: "Write a while countdown." }
      },
      {
        title: { ar: "8. المصفوفات في Java (Java Arrays)", en: "8. Java Arrays" },
        text: { ar: "المصفوفة في جافا كائن يخزن عناصر من نفس النوع بحجم محدد مسبقاً.", en: "An array in Java is an object storing fixed-size elements." },
        code: 'int[] grades = {95, 88, 92};\nSystem.out.println("First grade: " + grades[0]);',
        output: { ar: "طباعة الدرجة الأولى (95).", en: "Prints first grade (95)." },
        note: { ar: "نستخدم .length لمعرفة طول المصفوفة في جافا.", en: "We use .length to get array size." },
        q: { ar: "كيف نعرف طول المصفوفة grades في جافا؟", en: "How to get array length in Java?" },
        options: [{ ar: "grades.length", en: "grades.length" }, { ar: "grades.size()", en: "grades.size()" }, { ar: "length(grades)", en: "length(grades)" }], a: 0,
        project: { ar: "أنشئي مصفوفة لأسماء 3 أصدقاء وطبعيهم.", en: "Create an array of 3 friend names." }
      },
      {
        title: { ar: "9. الدوال في Java (Methods)", en: "9. Java Methods" },
        text: { ar: "الدوال في جافا (تسمى Methods) تُعرف داخل الكلاس وتؤدي مهاماً محددة.", en: "Methods in Java are defined inside classes." },
        code: 'public class MathUtils {\n    public static int add(int a, int b) {\n        return a + b;\n    }\n    public static void main(String[] args) {\n        System.out.println(add(10, 20));\n    }\n}',
        output: { ar: "طباعة مجموع الرقمين (30).", en: "Prints sum (30)." },
        note: { ar: "static تعني أن الدالة تنتمي للصنف مباشرة.", en: "static means method belongs to class." },
        q: { ar: "ما الكلمة التي تعني أن الدالة لا ترجع قيمة في جافا؟", en: "Keyword for no return value?" },
        options: [{ ar: "void", en: "void" }, { ar: "null", en: "null" }, { ar: "none", en: "none" }], a: 0,
        project: { ar: "اكتبي دالة تحسب معدلك التراكمي.", en: "Write a GPA calculation method." }
      },
      {
        title: { ar: "10. البرمجة كائنية التوجه (Classes & Objects)", en: "10. Java OOP (Classes & Objects)" },
        text: { ar: "جافا لغة كائنية بالكامل، وتعتمد على بناء أصناف (Classes) وإنشاء كائنات (Objects) منها.", en: "Java is fully object-oriented using classes and objects." },
        code: 'class Car {\n    String brand = "Toyota";\n    void start() {\n        System.out.println("Car is starting...");\n    }\n}\npublic class MainOOP {\n    public static void main(String[] args) {\n        Car myCar = new Car();\n        myCar.start();\n    }\n}',
        output: { ar: "طباعة (Car is starting...).", en: "Prints (Car is starting...)." },
        note: { ar: "نستخدم كلمة new لإنشاء كائن جديد من الصنف.", en: "We use new to instantiate objects." },
        q: { ar: "ما الكلمة المستخدمة لإنشاء كائن جديد في الذاكرة؟", en: "What keyword instantiates a new object?" },
        options: [{ ar: "new", en: "new" }, { ar: "create", en: "create" }, { ar: "make", en: "make" }], a: 0,
        project: { ar: "أنشئي كลาส Student بخصائص وطبعي كائناً منه.", en: "Create a Student class." }
      },
      {
        title: { ar: "11. الوراثة في Java (Inheritance)", en: "11. Java Inheritance (extends)" },
        text: { ar: "الوراثة تمكن صنفاً جديداً (Subclass) من أخذ خصائص ودوال صنف آخر (Superclass).", en: "Inheritance lets a subclass inherit properties of a superclass." },
        code: 'class Animal {\n    void eat() { System.out.println("Eating..."); }\n}\nclass Dog extends Animal {\n    void bark() { System.out.println("Barking..."); }\n}',
        output: { ar: "طباعة (Eating...) ثم (Barking...).", en: "Prints eating and barking." },
        note: { ar: "نستخدم كلمة extends لتطبيق الوراثة في جافا.", en: "We use extends for inheritance." },
        q: { ar: "ما الكلمة المفتاحية للوراثة في جافا؟", en: "Keyword for inheritance in Java?" },
        options: [{ ar: "extends", en: "extends" }, { ar: "inherits", en: "inherits" }, { ar: "implements", en: "implements" }], a: 0,
        project: { ar: "طبقي مثال وراثة بين صنف رئيسي وفرعي.", en: "Apply inheritance example." }
      },
      {
        title: { ar: "12. مشروع تخرج مسار Java", en: "12. Java Capstone Project" },
        text: { ar: "قومي ببناء تطبيق نظام إدارة بنكي مصغر باستخدام الكلاسات، الكائنات، والدوال في جافا.", en: "Build a mini bank management system using Java OOP." },
        code: 'public class BankApp {\n    public static void main(String[] args) {\n        System.out.println("Java Banking System Initialized!");\n    }\n}',
        output: { ar: "تشغيل النظام بنجاح.", en: "System initialized successfully." },
        note: { ar: "تهانينا! لقد أتقنت هندسة البرمجيات بلغة جافا.", en: "Congratulations! You mastered Java software engineering." },
        q: { ar: "ما أساس بناء البرمجيات الضخمة في جافا؟", en: "What is the basis of large Java apps?" },
        options: [{ ar: "البرمجة كائنية التوجه (OOP)", en: "Object-Oriented Programming" }, { ar: "الصور المتحركة", en: "Animations" }, { ar: "الروابط الثابتة", en: "Static links" }], a: 0,
        project: { ar: "أنشئي مشروعك النهائي بلغة جافا.", en: "Create your final Java project." }
      }
    ]
  },

  emu8086: {
    name: "EMU8086",
    desc: { ar: "12 موضوعاً في سجلات معالج 8086 ولغة التجميع (Assembly).", en: "12 topics in 8086 registers and assembly." },
    lessons: [
      {
        title: { ar: "1. مقدمة لغة التجميع ومعالج 8086", en: "1. Introduction to 8086 Assembly" },
        text: { ar: "لغة التجميع تقترب جداً من لغة الآلة، وتساعدنا في فهم كيفية تفاعل المعالج مع الذاكرة.", en: "Assembly is close to machine language, showing processor interaction." },
        code: 'ORG 100h\nMOV AX, 5\nMOV BX, 3\nRET',
        output: { ar: "تحميل قيم داخل مسجلات المعالج AX و BX.", en: "Loads values into AX and BX registers." },
        note: { ar: "EMU8086 محاكي تعليمي ممتاز لمعالج 8086.", en: "EMU8086 is an educational 8086 emulator." },
        q: { ar: "ماذا تعني تعليمة ORG 100h عادةً في برامج 8086؟", en: "What does ORG 100h mean?" },
        options: [{ ar: "تحديد عنوان بداية البرنامج في الذاكرة", en: "Sets program origin address" }, { ar: "طباعة شاشة", en: "Print screen" }, { ar: "إنهاء البرنامج", en: "End program" }], a: 0,
        project: { ar: "اكتبي برنامج تجميعي بسيط يحمل قيمتين.", en: "Write a simple assembly program." }
      },
      {
        title: { ar: "2. سجلات العامّة (AX, BX, CX, DX)", en: "2. General Purpose Registers" },
        text: { ar: "سجلات المعالج هي مواقع تخزين داخلية فائقة السرعة، وأشهرها AX (المراكم) و BX (الأساس).", en: "Registers are ultrafast storage, like AX (accumulator) and BX (base)." },
        code: 'MOV AX, 1200h\nMOV BX, 3400h',
        output: { ar: "تخزين 1200h في AX و 3400h في BX.", en: "Stores values in AX and BX." },
        note: { ar: "حرف h يشير إلى النظام السداسي عشر (Hexadecimal).", en: "h indicates Hexadecimal system." },
        q: { ar: "أي سجل يسمى عادة بمراكم البيانات الأساسي (Accumulator)؟", en: "Which register is the Accumulator?" },
        options: [{ ar: "AX", en: "AX" }, { ar: "CX", en: "CX" }, { ar: "DX", en: "DX" }], a: 0,
        project: { ar: "خزني قيمتين سداسية عشرية في AX و DX.", en: "Store hex values in AX and DX." }
      },
      {
        title: { ar: "3. تعليمة النقل (MOV Instruction)", en: "3. The MOV Instruction" },
        text: { ar: "تعليمة MOV تنقل أو تنسخ قيمة من مصدر إلى وجهة (Destination <- Source).", en: "MOV copies value from source to destination." },
        code: 'MOV AX, 55\nMOV CX, AX\n; الآن CX يحمل القيمة 55 أيضاً',
        output: { ar: "نسخ القيمة 55 من AX إلى CX.", en: "Copies 55 from AX to CX." },
        note: { ar: "لا يمكن نقل قيمة من ذاكرة إلى ذاكرة مباشرة بـ MOV.", en: "Cannot move memory-to-memory directly." },
        q: { ar: "ما هو اتجاه النقل في تعليمة MOV AX, BX؟", en: "What is the direction in MOV AX, BX?" },
        options: [{ ar: "من BX إلى AX", en: "From BX to AX" }, { ar: "من AX إلى BX", en: "From AX to BX" }, { ar: "تبادل القيم", en: "Swap values" }], a: 0,
        project: { ar: "انقلي محتوى سجل إلى سجل آخر.", en: "Move contents between registers." }
      },
      {
        title: { ar: "4. عملية الجمع (ADD Instruction)", en: "4. The ADD Instruction" },
        text: { ar: "تستخدم تعليمة ADD لجمع قيمة المصدر مع الوجهة وتخزين الناتج في الوجهة.", en: "ADD adds source to destination and stores result." },
        code: 'MOV AX, 10\nMOV BX, 20\nADD AX, BX\n; AX تصبح قيمته 30',
        output: { ar: "تصبح قيمة AX مساوية لـ 30.", en: "AX becomes 30." },
        note: { ar: "الناتج يتم تخزينه دائماً في المعامل الأول (الوجهة).", en: "Result is stored in the first operand." },
        q: { ar: "أين يُخزن ناتج العملية ADD AX, BX؟", en: "Where is the result of ADD stored?" },
        options: [{ ar: "في السجل AX", en: "In register AX" }, { ar: "في السجل BX", en: "In register BX" }, { ar: "في الذاكرة العشوائية", en: "In RAM" }], a: 0,
        project: { ar: "اكتبي برنامجا يجمع ثلاثة أرقام عبر السجلات.", en: "Write a program adding three numbers." }
      },
      {
        title: { ar: "5. عملية الطرح (SUB Instruction)", en: "5. The SUB Instruction" },
        text: { ar: "تستخدم تعليمة SUB لطرح قيمة المصدر من الوجهة.", en: "SUB subtracts source from destination." },
        code: 'MOV AX, 50\nSUB AX, 15\n; AX تصبح 35',
        output: { ar: "تصبح قيمة AX مساوية لـ 35.", en: "AX becomes 35." },
        note: { ar: "تؤثر عمليات الحساب على أعلام الحالة (Flags).", en: "Arithmetic operations affect status flags." },
        q: { ar: "ماذا تفعل تعليمة SUB AX, 10؟", en: "What does SUB AX, 10 do?" },
        options: [{ ar: "تطرح 10 من قيمة AX", en: "Subtracts 10 from AX" }, { ar: "تجمع 10 مع AX", en: "Adds 10 to AX" }, { ar: "تقسم AX على 10", en: "Divides AX by 10" }], a: 0,
        project: { ar: "اطرحي رقمين باستخدام السجلات.", en: "Subtract two numbers using registers." }
      },
      {
        title: { ar: "6. عمليات الزيادة والنقصان (INC & DEC)", en: "6. Increment & Decrement (INC, DEC)" },
        text: { ar: "تعليمة INC تزيد قيمة السجل بواحد، بينما DEC تنقصها بواحد.", en: "INC increases register by 1, DEC decreases by 1." },
        code: 'MOV CX, 5\nINC CX  ; CX تصبح 6\nDEC CX  ; CX تعود 5',
        output: { ar: "زيادة ثم نقصان قيمة السجل CX.", en: "Increments then decrements CX." },
        note: { ar: "أسرع وأكثر كفاءة من استخدام ADD أو SUB بقيمة 1.", en: "Faster than ADD/SUB 1." },
        q: { ar: "ما وظيفة تعليمة INC AX؟", en: "What is the function of INC AX?" },
        options: [{ ar: "زيادة قيمة AX بمقدار 1", en: "Increments AX by 1" }, { ar: "زيادة AX بمقدار 10", en: "Increments AX by 10" }, { ar: "ضرب AX في نفسه", en: "Squares AX" }], a: 0,
        project: { ar: "استخدمي INC لزيادة عداد 3 مرات.", en: "Use INC to increment a counter 3 times." }
      },
      {
        title: { ar: "7. العمليات المنطقية (AND, OR, XOR)", en: "7. Logical Operations (AND, OR, XOR)" },
        text: { ar: "تنفذ العمليات المنطقية بتصنيف البتات (Bitwise) لكل سجل.", en: "Performs bitwise logical operations." },
        code: 'MOV AX, 00F0h\nAND AX, 0F0Fh\n; عملية بتية تقاطعية',
        output: { ar: "تصفية البتات الناتجة.", en: "Filters resulting bits." },
        note: { ar: "تستخدم XOR أحياناً لتصفير السجل بسرعة (XOR AX, AX).", en: "XORing a register with itself clears it." },
        q: { ar: "ماذا ينتج عن تنفيذ XOR AX, AX لأي سجل؟", en: "What does XOR AX, AX produce?" },
        options: [{ ar: "تصفير السجل تماماً (يصبح صفر)", en: "Clears register to zero" }, { ar: "جعل قيمته 1", en: "Makes it 1" }, { ar: "لا شيء", en: "Nothing" }], a: 0,
        project: { ar: "جربي تصفير سجل باستخدام XOR.", en: "Clear a register using XOR." }
      },
      {
        title: { ar: "8. عمليات الضرب والقسمة (MUL & DIV)", en: "8. Multiplication & Division (MUL, DIV)" },
        text: { ar: "تستخدم MUL للضرب غير الإشاري و DIV للقسمة، وغالباً تعتمد على السجل AX.", en: "MUL and DIV handle multiplication and division." },
        code: 'MOV AL, 4\nMOV BL, 5\nMUL BL  ; AX تصبح 20',
        output: { ar: "ضرب 4 في 5 وتخزين الناتج 20 في AX.", en: "Multiplies 4 by 5 resulting in 20." },
        note: { ar: "الضرب في 8-bit يضرب AL في المعامل ويحفظ الناتج في AX.", en: "8-bit multiplication uses AL and AX." },
        q: { ar: "أي سجل يستقبل ناتج ضرب AL في المعامل غالباً؟", en: "Which register stores multiplication result?" },
        options: [{ ar: "AX", en: "AX" }, { ar: "DX", en: "DX" }, { ar: "SP", en: "SP" }], a: 0,
        project: { ar: "اضربي رقمين باستخدام السجلات.", en: "Multiply two numbers." }
      },
      {
        title: { ar: "9. القفز غير الشرطى (JMP Instruction)", en: "9. Unconditional Jump (JMP)" },
        text: { ar: "تستخدم JMP لنقل تنفيذ البرنامج إلى عنوان (Label) محدد مباشرة بدون شروط.", en: "JMP transfers execution to a label unconditionally." },
        code: 'START:\n    MOV AX, 1\n    JMP START  ; حلقة تكرارية لا نهائية',
        output: { ar: "القفز المستمر للعنوان START.", en: "Jumps continuously to START." },
        note: { ar: "تستخدم لإنشاء الحلقات وتغيير مسار الكود.", en: "Used to create loops and route code." },
        q: { ar: "ماذا تفعل تعليمة JMP؟", en: "What does JMP do?" },
        options: [{ ar: "تقفز لعنوان محدد مباشرة", en: "Jumps directly to a label" }, { ar: "تجمع رقمين", en: "Adds two numbers" }, { ar: "تطرح رقمين", en: "Subtracts two numbers" }], a: 0,
        project: { ar: "أنشئي حلقة تكرارية باستخدام JMP و Label.", en: "Create a loop using JMP." }
      },
      {
        title: { ar: "10. القفز المشروط (Conditional Jumps)", en: "10. Conditional Jumps (JZ, JNZ)" },
        text: { ar: "القفز المشروط يفحص الأعلام (Flags) مثل JZ (القفز إذا كان الناتج صفراً) أو JNZ.", en: "Conditional jumps check flags like JZ and JNZ." },
        code: 'SUB AX, AX\nJZ IS_ZERO  ; سيتم القفز لأن الناتج صفر',
        output: { ar: "القفز للعنوان نظراً لتساوي الناتج مع صفر.", en: "Jumps because result is zero." },
        note: { ar: "تعتبر أساس بناء الجمل الشرطية في لغة التجميع.", en: "Forms the basis of conditionals in assembly." },
        q: { ar: "ماذا تعني تعليمة JZ؟", en: "What does JZ mean?" },
        options: [{ ar: "Jump if Zero (قفز إذا كان الناتج صفر)", en: "Jump if Zero" }, { ar: "Jump if Positive (قفز إذا موجب)", en: "Jump if Positive" }, { ar: "Jump if Negative (قفز إذا سالب)", en: "Jump if Negative" }], a: 0,
        project: { ar: "افحصي ناتج طرح رقمين وقفزي بناءً عليه.", en: "Check subtraction result." }
      },
      {
        title: { ar: "11. المكدس (Stack: PUSH & POP)", en: "11. The Stack (PUSH & POP)" },
        text: { ar: "المكدس منطقة ذاكرة تعمل بنظام LIFO (Last In, First Out) عبر PUSH و POP.", en: "The stack works on LIFO principle via PUSH and POP." },
        code: 'MOV AX, 100\nPUSH AX   ; حفظ القيمة في المكدس\nPOP BX    ; استرجاع القيمة في BX',
        output: { ar: "حفظ واسترجاع القيمة 100 عبر المكدس.", en: "Saves and restores 100 via stack." },
        note: { ar: "LIFO تعني الأخير دخولاً هو الأول خروجاً.", en: "LIFO stands for Last In, First Out." },
        q: { ar: "ما النظام الذي يعمل وفقه المكدس (Stack)؟", en: "What principle does Stack follow?" },
        options: [{ ar: "LIFO (الأخير دخولاً أول خروجاً)", en: "LIFO" }, { ar: "FIFO (الأول دخولاً أول خروجاً)", en: "FIFO" }, { ar: "عشوائي", en: "Random" }], a: 0,
        project: { ar: "احفظي واسترجعي قيمتين عبر المكدس.", en: "Save and restore two values." }
      },
      {
        title: { ar: "12. مشروع تخرج مسار EMU8086", en: "12. EMU8086 Capstone Project" },
        text: { ar: "قومي بكتابة برنامج تجميعي متكامل يقوم بجمع رقمين وتخزين الناتج وفحصه عبر محاكي 8086.", en: "Write an assembly program adding two numbers and checking the result." },
        code: 'ORG 100h\nMOV AX, 25\nMOV BX, 15\nADD AX, BX\nRET',
        output: { ar: "تنفيذ البرنامج بنجاح داخل المحاكي وحساب الناتج 40.", en: "Runs successfully, resulting in 40." },
        note: { ar: "تهانينا! لقد أتممت رحلة معالج 8086 وتجميع الأكواد بنجاح.", en: "Congratulations! You mastered 8086 assembly." },
        q: { ar: "ما هو الرمز السداسي عشر الذي يبدأ منه برنامج .COM في EMU8086؟", en: "What origin address starts .COM programs?" },
        options: [{ ar: "100h", en: "100h" }, { ar: "000h", en: "000h" }, { ar: "FFFFh", en: "FFFFh" }], a: 0,
        project: { ar: "شغلي مشروعك النهائي في محاكي EMU8086.", en: "Run your final project in EMU8086." }
      }
    ]
  }
};

/* تفعيل اللغة واتجاه الصفحة */
function applyLanguage(nextLanguage) {
  lang = nextLanguage;
  const english = lang === "en";
  document.documentElement.lang = lang;
  document.documentElement.dir = english ? "ltr" : "rtl";
  document.body.classList.toggle("english", english);
  $("#languageToggle").textContent = words[lang].languageButton;

  $$("[data-ar][data-en]").forEach((element) => {
    element.textContent = element.dataset[english ? "en" : "ar"];
  });

  const chatInput = $("#chatInput");
  if (chatInput) {
    chatInput.placeholder = chatInput.dataset[english ? "placeholderEn" : "placeholderAr"];
  }

  renderCourse();
  renderChat();
  try { localStorage.setItem("ambassador-language", lang); } catch (_) {}
}

$("#languageToggle").addEventListener("click", () => {
  applyLanguage(lang === "ar" ? "en" : "ar");
});

/* قائمة الجوال */
$("#menuToggle").addEventListener("click", () => {
  $("#navLinks").classList.toggle("open");
});
$$(".nav-links a").forEach(link => link.addEventListener("click", () => {
  $("#navLinks").classList.remove("open");
}));

/* تفعيل أزرار "استكشف اللغة" لفتح الـ 12 موضوعاً */
$$(".explore-btn").forEach(button => {
  button.addEventListener("click", () => openCourse(button.dataset.language));
});

function openCourse(key) {
  if (!courses[key]) return;
  activeLanguage = key;
  activeLesson = 0;
  $("#learningArea").hidden = false;
  renderCourse();
  $("#learningArea").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderCourse() {
  const course = courses[activeLanguage];
  if (!course || $("#learningArea").hidden) return;

  $("#learningTitle").textContent = course.name;
  $("#learningDescription").textContent = course.desc[lang];

  const list = $("#lessonList");
  list.innerHTML = "";

  course.lessons.forEach((lesson, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.classList.toggle("active", index === activeLesson);

    const number = document.createElement("span");
    number.className = "lesson-number";
    number.textContent = String(index + 1);

    const title = document.createElement("span");
    title.textContent = lesson.title[lang];

    button.append(number, title);
    button.addEventListener("click", () => {
      activeLesson = index;
      renderCourse();
    });
    list.appendChild(button);
  });

  const total = course.lessons.length;
  const percent = Math.round(((activeLesson + 1) / total) * 100);
  $("#progressText").textContent = `${words[lang].progress} · ${activeLesson + 1}/${total}`;
  $("#progressPercent").textContent = `${percent}%`;
  $("#progressBar").style.width = `${percent}%`;

  renderLesson(course.lessons[activeLesson], total);
}

function renderLesson(lesson, total) {
  const t = words[lang];
  const content = $("#lessonContent");

  content.innerHTML = `
    <div class="lesson-topline">
      <span class="eyebrow">${escapeHTML(courses[activeLanguage].name)}</span>
      <span class="lesson-count">${escapeHTML(t.lesson)} ${activeLesson + 1} / ${total}</span>
    </div>
    <h3>${escapeHTML(lesson.title[lang])}</h3>
    <h4>${escapeHTML(t.explanation)}</h4>
    <p>${escapeHTML(lesson.text[lang])}</p>

    <h4>${escapeHTML(t.example)}</h4>
    <div class="lesson-code">
      <div class="code-toolbar">
        <span>${escapeHTML(courses[activeLanguage].name)}</span>
        <button class="copy-code" id="copyCode" type="button">${escapeHTML(t.copy)}</button>
      </div>
      <pre><code id="codeText">${escapeHTML(lesson.code)}</code></pre>
    </div>

    <div class="lesson-info">
      <strong>◉ ${escapeHTML(t.output)}</strong>
      <p>${escapeHTML(lesson.output[lang])}</p>
    </div>

    <div class="lesson-info">
      <strong>✦ ${escapeHTML(t.note)}</strong>
      <p>${escapeHTML(lesson.note[lang])}</p>
    </div>

    <div class="quiz-box">
      <h4>✎ ${escapeHTML(t.quiz)}</h4>
      <p><strong>${escapeHTML(lesson.q[lang])}</strong></p>
      <div class="quiz-options" id="quizOptions">
        ${lesson.options.map((option, index) => `
          <button type="button" class="quiz-option" data-index="${index}">
            ${escapeHTML(option[lang])}
          </button>
        `).join("")}
      </div>
      <button type="button" class="check-answer" id="checkAnswer">${escapeHTML(t.check)}</button>
      <p class="quiz-feedback" id="quizFeedback" aria-live="polite"></p>
    </div>

    <div class="lesson-info">
      <strong>🚀 ${escapeHTML(t.project)}</strong>
      <p>${escapeHTML(lesson.project[lang])}</p>
    </div>

    <div class="lesson-navigation">
      <button type="button" class="btn btn-outline" id="prevLesson" ${activeLesson === 0 ? "disabled" : ""}>← ${escapeHTML(t.previous)}</button>
      <button type="button" class="btn btn-primary" id="nextLesson">${activeLesson === total - 1 ? escapeHTML(t.finish) : escapeHTML(t.next + " →")}</button>
    </div>
  `;

  selectedAnswer = null;
  $("#copyCode").addEventListener("click", copyCode);

  $$("#quizOptions .quiz-option").forEach(button => {
    button.addEventListener("click", () => {
      selectedAnswer = Number(button.dataset.index);
      $$("#quizOptions .quiz-option").forEach(item => item.classList.remove("selected"));
      button.classList.add("selected");
    });
  });

  $("#checkAnswer").addEventListener("click", () => {
    const feedback = $("#quizFeedback");
    if (selectedAnswer === null) {
      feedback.textContent = t.choose;
      return;
    }
    $$("#quizOptions .quiz-option").forEach((button, index) => {
      button.classList.remove("correct", "incorrect");
      if (index === lesson.a) button.classList.add("correct");
      else if (index === selectedAnswer) button.classList.add("incorrect");
    });
    feedback.textContent = selectedAnswer === lesson.a ? t.correct : t.wrong;
    feedback.style.color = selectedAnswer === lesson.a ? "#527b4c" : "#a94e42";
  });

  $("#prevLesson").addEventListener("click", () => {
    if (activeLesson > 0) {
      activeLesson--;
      renderCourse();
    }
  });

  $("#nextLesson").addEventListener("click", () => {
    if (activeLesson < total - 1) {
      activeLesson++;
      renderCourse();
      $("#learningArea").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

async function copyCode() {
  const code = $("#codeText").textContent;
  const button = $("#copyCode");
  try {
    await navigator.clipboard.writeText(code);
    button.textContent = words[lang].copied;
  } catch (_) {
    const area = document.createElement("textarea");
    area.value = code;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
    button.textContent = words[lang].copied;
  }
  setTimeout(() => {
    if ($("#copyCode")) $("#copyCode").textContent = words[lang].copy;
  }, 1600);
}

$("#closeLearning").addEventListener("click", () => {
  $("#learningArea").hidden = true;
  $("#languages").scrollIntoView({ behavior: "smooth", block: "start" });
});

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, ch => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  })[ch]);
}

/* المساعد الذكي مع خيارات الأسئلة السريعة (HTML, CSS, JS, Python, C++, Java) */
const launcher = $("#chatLauncher");
const widget = $("#chatWidget");

function setChatOpen(open) {
  widget.hidden = !open;
  launcher.setAttribute("aria-expanded", String(open));
  launcher.querySelector(".launcher-label").textContent = open
    ? (lang === "ar" ? "إغلاق" : "Close")
    : (lang === "ar" ? "اسأليني" : "Ask me");

  if (open) {
    renderChat();
    $("#chatInput").focus();
  }
}

launcher.addEventListener("click", () => setChatOpen(widget.hidden));
$("#closeChat").addEventListener("click", () => setChatOpen(false));

$("#newChat").addEventListener("click", () => {
  requestNumber++;
  chatHistory = [];
  renderChat();
});

function renderChat() {
  const container = $("#chatMessages");
  if (!container) return;

  if (chatHistory.length === 0) {
    chatHistory.push({ role: "assistant", content: words[lang].welcome });
  }

  container.innerHTML = "";
  chatHistory.forEach(message => {
    const row = document.createElement("div");
    row.className = `chat-message ${message.role}`;

    const avatar = document.createElement("div");
    avatar.className = "chat-message-avatar";
    avatar.textContent = message.role === "user" ? "R" : "✦";

    const bubble = document.createElement("div");
    bubble.className = "chat-bubble";
    bubble.textContent = message.content;

    row.append(avatar, bubble);
    container.appendChild(row);
  });
  container.scrollTop = container.scrollHeight;
}

/* الاستجابة التفاعلية للمساعد الذكي */
function getAiReply(query) {
  const q = query.toLowerCase();
  if (q.includes("html")) {
    return lang === "ar" ? "لغة HTML تُستخدم لبناء هيكل صفحات الويب باستخدام الوسوم مثل <h1> و <p>." : "HTML is used to structure web pages using tags like <h1> and <p>.";
  }
  if (q.includes("css")) {
    return lang === "ar" ? "لغة CSS تُستخدم لتنسيق وتزيين صفحات الويب والتحكم بالألوان والخطوط." : "CSS is used to style web pages and manage colors and fonts.";
  }
  if (q.includes("javascript") || q.includes("js")) {
    return lang === "ar" ? "لغة JavaScript تضفي الحيوية والتفاعل على المواقع وتدعم المصفوفات والدوال." : "JavaScript adds interactivity to websites and supports arrays and functions.";
  }
  if (q.includes("python")) {
    return lang === "ar" ? "لغة Python تتميز بوضوحها وقوتها في تحليل البيانات وبناء الخوارزميات." : "Python is clear and powerful for data analysis and algorithms.";
  }
  if (q.includes("cpp") || q.includes("c++")) {
    return lang === "ar" ? "لغة C++ مخصصة لبرمجة الأنظمة والأداء العالي وتدعم البرمجة كائنية التوجه." : "C++ is for systems programming and high performance.";
  }
  if (q.includes("java")) {
    return lang === "ar" ? "لغة Java تستخدم لبناء التطبيقات الكبرى وتعتمد بشكل كامل على الكلاسات والكائنات." : "Java is used for large applications and relies on classes and objects.";
  }
  return lang === "ar"
    ? `سؤال رائع حول "${query}"! البرمجة ممتعة وتحتاج للتطبيق العملي. هل ترغبين بمزيد من التوضيح؟`
    : `Great question about "${query}"! Programming is fun and requires practice. Would you like more details?`;
}

/* تفعيل الأزرار السريعة داخل المساعد الذكي */
$$(".quick-opt").forEach(btn => {
  btn.addEventListener("click", () => {
    const topic = btn.dataset.topic;
    chatHistory.push({ role: "user", content: `أسأل عن ${topic.toUpperCase()}` });
    const reply = getAiReply(topic);
    chatHistory.push({ role: "assistant", content: reply });
    renderChat();
  });
});

$("#chatForm").addEventListener("submit", event => {
  event.preventDefault();

  const input = $("#chatInput");
  const send = $("#sendButton");
  const message = input.value.trim();
  if (!message) return;

  chatHistory.push({ role: "user", content: message });
  input.value = "";
  send.disabled = true;

  const typingId = "typing-" + Date.now();
  chatHistory.push({ role: "assistant", content: words[lang].typing, id: typingId });
  renderChat();

  setTimeout(() => {
    chatHistory = chatHistory.filter(m => m.id !== typingId);
    const reply = getAiReply(message);
    chatHistory.push({ role: "assistant", content: reply });
    send.disabled = false;
    renderChat();
    input.focus();
  }, 600);
});

/* تهيئة التطبيق */
$("#currentYear").textContent = new Date().getFullYear();
try {
  const saved = localStorage.getItem("ambassador-language");
  if (saved === "ar" || saved === "en") lang = saved;
} catch (_) {}

applyLanguage(lang);
renderChat();