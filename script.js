const translations={
ar:{brand:"رفيق دربي",tagline:"رفيقك إلى الطمأنينة",welcome:"أهلًا بك",heroTitle:"رفيق دربي",heroText:"مساحة هادئة للذكر، والقرآن، والدعاء، والرقية الشرعية.",search:"ابحث في الأقسام...",today:"ورد اليوم",dailyTitle:"ألا بذكر الله تطمئن القلوب",dailyText:"خذ لحظة هادئة، وابدأ يومك بذكر الله.",start:"ابدأ وردك",explore:"استكشف",sections:"أقسام رفيق دربي",quote:"«فاذكروني أذكركم واشكروا لي ولا تكفرون»",footer:"نسخة أولى مجانية — قابلة للتطوير",soon:"سيتم تفعيل هذا القسم في النسخة القادمة."},
en:{brand:"My Companion",tagline:"Your companion to tranquility",welcome:"Welcome",heroTitle:"My Companion",heroText:"A peaceful space for remembrance, Quran, supplication, and Ruqyah.",search:"Search sections...",today:"Daily Wird",dailyTitle:"Surely in the remembrance of Allah do hearts find rest",dailyText:"Take a quiet moment and begin your day with remembrance.",start:"Start your Wird",explore:"Explore",sections:"My Companion Sections",quote:"“So remember Me; I will remember you.”",footer:"Free first version — ready to grow",soon:"This section will be enabled in the next version."}
};
const cards=[
["🌅","morning","أذكار الصباح","Morning Adhkar"],["🌙","evening","أذكار المساء","Evening Adhkar"],["😴","sleep","أذكار النوم","Sleep Adhkar"],["📖","quran","القرآن الكريم","The Holy Quran"],["📚","tafsir","التفسير","Tafsir"],["🛡️","ruqyah","الرقية الشرعية","Ruqyah"],["🤲","duas","الأدعية","Duas"],["🎧","audio","التلاوات الصوتية","Audio Recitations"]
];
let lang=localStorage.getItem("lang")||"ar";
function t(k){return translations[lang][k]||k}
function renderCards(){
 const el=document.getElementById("cards"); el.innerHTML="";
 cards.forEach(c=>{const d=document.createElement("article");d.className="card";d.dataset.search=(c[2]+" "+c[3]).toLowerCase();d.innerHTML=`<div class="emoji">${c[0]}</div><h3>${lang==="ar"?c[2]:c[3]}</h3><p>${lang==="ar"?"افتح القسم واستكشف محتواه":"Open the section and explore its content"}</p>`;d.onclick=()=>showToast(t("soon"));el.appendChild(d)})
}
function applyLang(){
 document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr";
 document.getElementById("langBtn").textContent=lang==="ar"?"English":"العربية";
 document.querySelectorAll("[data-i18n]").forEach(e=>e.textContent=t(e.dataset.i18n));
 document.querySelectorAll("[data-i18n-placeholder]").forEach(e=>e.placeholder=t(e.dataset.i18nPlaceholder));
 renderCards();localStorage.setItem("lang",lang)
}
function showToast(msg){const x=document.getElementById("toast");x.textContent=msg;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),2200)}
document.getElementById("langBtn").onclick=()=>{lang=lang==="ar"?"en":"ar";applyLang()};
document.getElementById("themeBtn").onclick=()=>{document.body.classList.toggle("dark");localStorage.setItem("dark",document.body.classList.contains("dark"))};
if(localStorage.getItem("dark")==="true")document.body.classList.add("dark");
document.getElementById("search").addEventListener("input",e=>{const q=e.target.value.toLowerCase();document.querySelectorAll(".card").forEach(c=>c.style.display=c.dataset.search.includes(q)?"block":"none")});
document.getElementById("year").textContent=new Date().getFullYear();
applyLang();
if("serviceWorker" in navigator) window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
