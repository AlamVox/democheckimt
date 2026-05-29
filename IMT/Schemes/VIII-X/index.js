// --- 0. SPLASH SCREEN LOGIC ---
window.addEventListener("load", () => {
    const splash = document.getElementById("splash-screen");
    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }

    setTimeout(() => {
        splash.style.opacity = "0";
        setTimeout(() => {
            splash.style.display = "none";
            document.body.classList.remove("splash-active");
            window.scrollTo(0, 0);
        }, 700);
    }, 1500);
});

// --- 1. PAGE ROUTING SYSTEM ---
function switchPage(pageId, pushToHistory = true) {
    const pages = document.querySelectorAll(".page-section");
    pages.forEach((page) => page.classList.add("hidden"));

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.remove("hidden");
    }

    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) =>
        link.classList.remove("text-yellow-300", "border-b-2", "border-yellow-300"),
    );

    const activeNavId = "nav-" + pageId.split("-")[0];
    const activeNav = document.getElementById(activeNavId);
    if (activeNav) {
        activeNav.classList.add(
            "text-yellow-300",
            "border-b-2",
            "border-yellow-300",
        );
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

    if (pushToHistory) {
        // Clear Route structure for home vs other pages
        let newUrl = (pageId === "home-page") ? "/" : "/" + pageId;
        window.history.pushState({ page: pageId }, "", newUrl);
    }
}

window.addEventListener("popstate", (event) => {
    if (event.state && event.state.page) {
        switchPage(event.state.page, false);
    } else {
        switchPage("home-page", false);
    }
});

window.addEventListener("DOMContentLoaded", () => {
    // 1. URL theke jekono Hash (#) thakle sora-sori clean kora
    if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    // 2. Path clean kora
    let path = window.location.pathname.replace(/^\/+/g, '');

    // 3. Perfect fallback checker setup (Tomar structure anujayi)
    if (path === "index.html" || path === "") {
        window.history.replaceState({ page: "home-page" }, "", "/");
        switchPage("home-page", false);
    }
    else if (document.getElementById(path)) {
        window.history.replaceState({ page: path }, "", "/" + path);
        switchPage(path, false);
    }
    else {
        // Kono vul link hole auto redirect to home without error
        window.history.replaceState({ page: "home-page" }, "", "/");
        switchPage("home-page", false);
    }
});


// // --- 2. GLOBAL REDIRECT & GENERIC SERVICE POPUP CONTROLLER ---
// window.redirectService = function (url) {
//     Swal.close(); // Popup bondho korbe
//     window.location.href = url; // Notun page e redirect korbe
// }

// function openServicePopup(event, serviceType) {
//     event.preventDefault();

//     let popupTitle = "";
//     let btn1Url, btn2Url, btn3Url, btn4Url;

//     if (serviceType === 'apply') {
//         popupTitle = "Apply For Which Scheme?";
//         // 📝 Registration Page Links
//         btn1Url = "/Registration/UpperPrimary/";
//         btn2Url = "/Registration/Secondary/";
//         btn3Url = "/Registration/HigherSecondary/";
//         btn4Url = "/Registration/Creative/";
//     }
//     else if (serviceType === 'admit') {
//         popupTitle = "Download Admit For?";
//         // 🎫 Admit Card Links (Parameter based currently)
//         btn1Url = "/Admit/UpperPrimary/";
//         btn2Url = "/Admit/Secondary/";
//         btn3Url = "/Admit/HigherSecondary/";
//         btn4Url = "/Admit/Creative/";
//     }
//     else if (serviceType === 'result') {
//         popupTitle = "Check Result For?";
//         // 📊 Result Page Links (Updated)
//         btn1Url = "/Result/UpperPrimary/";
//         btn2Url = "/Result/Secondary/";
//         btn3Url = "/Result/HigherSecondary/";
//         btn4Url = "/Result/Creative/";
//     }

//     // Timer er kono bishoy nei, direct popup show korbe
//     Swal.fire({
//         title: `<h3 class="text-2xl font-bold text-[#003366] dark:text-blue-400 border-b-2 border-yellow-400 pb-2">${popupTitle}</h3>`,
//         html: `
//       <div class="flex flex-col gap-3 mt-4">
//         <button onclick="redirectService('${btn1Url}')" class="w-full text-left px-5 py-3 bg-blue-50 hover:bg-blue-600 hover:text-white text-[#003366] font-bold rounded border border-blue-200 shadow-sm transition-colors duration-200">1. Upper Primary (Class 6-8)</button>
//         <button onclick="redirectService('${btn2Url}')" class="w-full text-left px-5 py-3 bg-blue-50 hover:bg-blue-600 hover:text-white text-[#003366] font-bold rounded border border-blue-200 shadow-sm transition-colors duration-200">2. Secondary / Madhyamik (Class 9-10)</button>
//         <button onclick="redirectService('${btn3Url}')" class="w-full text-left px-5 py-3 bg-blue-50 hover:bg-blue-600 hover:text-white text-[#003366] font-bold rounded border border-blue-200 shadow-sm transition-colors duration-200">3. Higher Secondary (Class 11-12)</button>
//         <button onclick="redirectService('${btn4Url}')" class="w-full text-left px-5 py-3 bg-blue-50 hover:bg-blue-600 hover:text-white text-[#003366] font-bold rounded border border-blue-200 shadow-sm transition-colors duration-200">4. Special Scheme (Class 8-10)</button>
//       </div>
//     `,
//         showConfirmButton: false,
//         showCloseButton: true,
//         background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#fff",
//     });
// }

// --- 3. ELIGIBILITY CHECKER ---
// function checkEligibility() {
//     const selectedClass = document.getElementById("studentClass").value;
//     const resultBox = document.getElementById("eligibilityResult");
//     const resultText = document.getElementById("resultText");
//     const resultSubtext = document.getElementById("resultSubtext");

//     resultBox.className = "mt-4 p-3 rounded border fade-in";

//     if (selectedClass === "none") {
//         resultBox.classList.add(
//             "bg-gray-100",
//             "dark:bg-gray-700",
//             "border-gray-300",
//             "dark:border-gray-600",
//             "text-gray-700",
//             "dark:text-gray-200",
//         );
//         resultText.innerText = "⚠️ Please select an option";
//         resultSubtext.innerText =
//             "You must select your current class from the dropdown.";
//     } else if (selectedClass === "6-7") {
//         resultBox.classList.add(
//             "bg-green-50",
//             "dark:bg-green-900/30",
//             "border-green-200",
//             "dark:border-green-800",
//             "text-green-800",
//             "dark:text-green-400",
//         );
//         resultText.innerText = "✅ You are Eligible!";
//         resultSubtext.innerText =
//             "You can register for the Class VIII to X level exam. Prepare well to secure the Top 3 ranks!";
//     } else {
//         resultBox.classList.add(
//             "bg-red-50",
//             "dark:bg-red-900/30",
//             "border-red-200",
//             "dark:border-red-800",
//             "text-red-800",
//             "dark:text-red-400",
//         );
//         resultText.innerText = "❌ Not Eligible";
//         resultSubtext.innerText =
//             "Currently, IEISAT 2026 is exclusively for Class VIII to X students.";
//     }
//     resultBox.classList.remove("hidden");
// }

function checkEligibility() {

    const category = document.getElementById("examCategory").value;
    const currentClass = parseInt(document.getElementById("currentClass").value);
    const recognizedSchool = document.getElementById("recognizedSchool").value;
    const passedClass = document.getElementById("passedClass").value;

    const resultBox = document.getElementById("eligibilityResult");
    const resultText = document.getElementById("resultText");
    const resultSubtext = document.getElementById("resultSubtext");

    resultBox.className = "mt-4 p-4 rounded border fade-in";

    // Validation
    if (
        !category ||
        !currentClass ||
        !recognizedSchool ||
        !passedClass
    ) {
        resultBox.classList.add(
            "bg-yellow-50",
            "dark:bg-yellow-900/20",
            "border-yellow-300",
            "dark:border-yellow-700"
        );

        resultText.innerText = "⚠️ Complete All Fields";
        resultSubtext.innerText =
            "Please answer all eligibility questions before proceeding.";

        resultBox.classList.remove("hidden");
        return;
    }

    // General Eligibility
    if (
        recognizedSchool !== "yes" ||
        passedClass !== "yes"
    ) {
        showNotEligible(
            "You must be studying in a recognized school and have passed your previous class."
        );
        return;
    }

    let eligible = false;

    switch (category) {
        case "6-8":
            eligible = currentClass >= 6 && currentClass <= 8;
            break;

        case "9-10":
            eligible = currentClass >= 9 && currentClass <= 10;
            break;

        case "8-10":
            eligible = currentClass >= 8 && currentClass <= 10;
            break;

        case "11-12":
            eligible = currentClass >= 11 && currentClass <= 12;
            break;
    }

    if (eligible) {

        resultBox.classList.add(
            "bg-green-50",
            "dark:bg-green-900/20",
            "border-green-300",
            "dark:border-green-700"
        );

        resultText.innerText = "✅ You Are Eligible!";
        resultSubtext.innerText =
            "Congratulations! You meet the eligibility criteria for the selected IMTSAT category.";

    } else {

        showNotEligible(
            "Your current class does not match the selected exam category."
        );

    }

    resultBox.classList.remove("hidden");

    function showNotEligible(reason) {

        resultBox.classList.add(
            "bg-red-50",
            "dark:bg-red-900/20",
            "border-red-300",
            "dark:border-red-700"
        );

        resultText.innerText = "❌ Not Eligible";
        resultSubtext.innerText = reason;

        resultBox.classList.remove("hidden");
    }
}

// --- 4. LIVE GOOGLE SHEET DATA FETCH ---
// const scriptUrl =
//   "https://script.google.com/macros/s/AKfycbwObzVzrmZZrK9-5jAOPDN_jO-JZeohd3Hw-OFO6AS5fFXwVLwOER96iK98XB7PkP1JbA/exec";
const scriptUrl = "";

async function fetchLiveStats() {
    const registrationCounter = document.getElementById("live-reg-count");
    try {
        if (scriptUrl.includes("YOUR_GOOGLE_APPS_SCRIPT") || scriptUrl === "")
            throw new Error("No URL Provided");
        let response = await fetch(scriptUrl);
        let data = await response.json();
        registrationCounter.setAttribute("data-target", data.total);
    } catch (error) {
        registrationCounter.setAttribute("data-target", "117");
    } finally {
        startCounterAnimation();
    }
}

function startCounterAnimation() {
    const counters = document.querySelectorAll(".counter");
    counters.forEach((counter) => {
        const updateCount = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText;
            const inc = target / 150;
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}
window.onload = fetchLiveStats;

// // --- 5. BULLETIN MODAL & ADVANCED PDF DOWNLOAD ---
// function openBulletin() {
//     document.getElementById("bulletin-modal").classList.remove("hidden");
//     document.body.style.overflow = "hidden";
// }

// function closeBulletin() {
//     document.getElementById("bulletin-modal").classList.add("hidden");
//     document.body.style.overflow = "auto";
// }

// --- 5. SPECIFIC SCHEME PDF DOWNLOADER ---
async function downloadSpecificPDF(event, contentId, fileName) {
    const btn = event.currentTarget; // Jei button tay click kora hoyeche seta dhorbe
    const originalText = btn.innerHTML;
    btn.innerHTML = "⏳ Processing...";

    const content = document.getElementById(contentId);

    if (!content) {
        console.error("PDF target element not found: ", contentId);
        btn.innerHTML = originalText;
        return;
    }

    // PDF-er jonno mobile layout (1 Column) korar logic
    const grids2 = Array.from(content.querySelectorAll('.md\\:grid-cols-2'));
    const grids3 = Array.from(content.querySelectorAll('.md\\:grid-cols-3'));

    grids2.forEach(el => el.classList.remove('md:grid-cols-2'));
    grids3.forEach(el => el.classList.remove('md:grid-cols-3'));

    try {
        const opt = {
            margin: [10, 10, 10, 10],
            filename: fileName, // Protita scheme er jonno alada alada PDF name pabe
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            pagebreak: { mode: ["avoid-all", "css", "legacy"] },
        };
        await html2pdf().set(opt).from(content).save();
    } catch (err) {
        Swal.fire('Error', 'Sorry, could not generate the PDF.', 'error');
    } finally {
        // PDF download howar por page-take aager obosthay firiye ana
        grids2.forEach(el => el.classList.add('md:grid-cols-2'));
        grids3.forEach(el => el.classList.add('md:grid-cols-3'));

        btn.innerHTML = originalText;
    }
}

// --- 6. DYNAMIC NOTICES ---
const API_URL = 'https://script.google.com/macros/s/AKfycbx_uHmivHC10GLZG02Yu3RHeD84HtOT-kXGEDk_Fwplo1GBSdldWZLH5jx-gBkaBPwpRg/exec';

function getCategoryStyles(category) {
    const cat = category ? category.toLowerCase() : '';
    if (cat.includes('scholarship')) return 'text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900';
    if (cat.includes('exam')) return 'text-blue-800 dark:text-blue-200 bg-blue-100 dark:bg-blue-900';
    if (cat.includes('important')) return 'text-purple-800 dark:text-purple-200 bg-purple-100 dark:bg-purple-900';
    return 'text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700';
}

async function fetchAndDisplayNotices() {
    const noticeContainer = document.getElementById('dynamic-notices');

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        noticeContainer.innerHTML = '';

        const groupedNotices = data.reduce((acc, notice) => {
            const cat = notice.Category || 'General Updates';
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(notice);
            return acc;
        }, {});

        for (const category in groupedNotices) {
            const categorySection = document.createElement('div');
            categorySection.className = 'mb-6 last:mb-0';

            const headingClass = getCategoryStyles(category);

            // Ekhane category-r nicher extra '}' ta soriye dewa hoyeche
            categorySection.innerHTML = `
        <div class="flex items-center mb-3">
            <h4 class="text-sm font-bold uppercase tracking-wider ${headingClass} px-3 py-1 rounded-full">
                ${category}
            </h4>
            <div class="flex-grow border-t border-gray-200 dark:border-gray-700 ml-3"></div>
        </div>
        <div class="space-y-4 pl-2" id="notices-${category.replace(/\s+/g, '-')}">
        </div>
    `;

            noticeContainer.appendChild(categorySection);
            const specificList = document.getElementById(`notices-${category.replace(/\s+/g, '-')}`);

            groupedNotices[category].reverse().forEach(notice => {
                let linkHtml = '';

                if (notice.Link) {
                    // Check korche link-ta Google Drive er kina
                    if (notice.Link.includes('drive.google.com')) {
                        // Drive link hole Modal open hobe
                        linkHtml = `<button onclick="previewNoticeAttachment(\`${notice.Link}\`)" class="text-xs text-blue-500 hover:underline font-bold mt-1 block flex items-center gap-1">
                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                        View Document
                                    </button>`;
                    } else {
                        // Sadharon link hole Notun Tab-e open hobe
                        linkHtml = `<a href="${notice.Link}" target="_blank" class="text-xs text-blue-500 hover:underline font-bold mt-1 block flex items-center gap-1">
                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                        Visit Link
                                    </a>`;
                    }
                }

                const item = `
            <div class="border-l-2 border-gray-100 dark:border-gray-700 pl-4 py-1">
                <p class="text-sm text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                    ${notice.Message}
                </p>
                ${linkHtml}
            </div>
        `;
                specificList.innerHTML += item;
            });
        }

    } catch (error) {
        if (noticeContainer) noticeContainer.innerHTML = '<div class="text-center text-sm text-red-500 py-4">Failed to sync notices.</div>';
    }
}

function previewNoticeAttachment(driveUrl) {
    const modal = document.getElementById('notice-preview-modal');
    const iframe = document.getElementById('preview-iframe');
    const loading = document.getElementById('preview-loading');
    const downloadBtn = document.getElementById('modal-download-btn');

    if (!driveUrl) return;

    // Direct Download URL Generate kora (Google Drive er jonno)
    let downloadUrl = driveUrl;
    // Regex diye drive link theke FILE_ID ber kora
    const fileIdMatch = driveUrl.match(/\/d\/(.+?)\//);
    if (fileIdMatch && fileIdMatch[1]) {
        const fileId = fileIdMatch[1];
        downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    }

    // Download button e link set kora ar show kora
    downloadBtn.href = downloadUrl;
    downloadBtn.classList.remove('hidden');

    // Convert Standard Google Drive Link to Embedded Link: `/view` -> `/preview`
    const embeddedUrl = driveUrl.replace('/view', '/preview');

    iframe.src = embeddedUrl;
    modal.classList.remove('hidden');

    // Handle loading state: hide spinner when iframe loads
    loading.classList.remove('hidden');
    iframe.classList.add('hidden');
    iframe.onload = () => {
        loading.classList.add('hidden');
        iframe.classList.remove('hidden');
    }
}

function closeNoticePreview() {
    const modal = document.getElementById('notice-preview-modal');
    const iframe = document.getElementById('preview-iframe');
    const loading = document.getElementById('preview-loading');

    modal.classList.add('hidden');
    iframe.src = ''; // Stop file loading in the background
    loading.classList.add('hidden');
    iframe.classList.add('hidden');
}

// Close modal by clicking outside
window.onclick = function (event) {
    const modal = document.getElementById('notice-preview-modal');
    if (event.target == modal) {
        closeNoticePreview();
    }
}

// Close modal by pressing Esc key
document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        closeNoticePreview();
    }
});

document.addEventListener('DOMContentLoaded', fetchAndDisplayNotices);



// --- 7. HOVER + CLICKABLE DROPDOWN LOGIC (MOBILE PERFECT) ---
function toggleDropdown(event) {
    event.preventDefault();
    event.stopPropagation(); // Event ke baire jete debe na

    const dropdownMenu = document.getElementById('dropdown-menu');
    const dropdownArrow = document.getElementById('dropdown-arrow');

    if (dropdownMenu.classList.contains('show-dropdown')) {
        // Jodi khola thake -> Bondho koro
        dropdownMenu.classList.remove('opacity-100', 'visible', 'show-dropdown');
        dropdownMenu.classList.add('opacity-0', 'invisible');
        if (dropdownArrow) dropdownArrow.classList.remove('rotate-180');
    } else {
        // Jodi bondho thake -> Khule dao
        dropdownMenu.classList.remove('opacity-0', 'invisible');
        dropdownMenu.classList.add('opacity-100', 'visible', 'show-dropdown');
        if (dropdownArrow) dropdownArrow.classList.add('rotate-180');
    }
}

// Baire kothao click korle Dropdown auto bondho kora
document.addEventListener('click', function (event) {
    const dropdown = document.getElementById('scholarship-dropdown');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const dropdownArrow = document.getElementById('dropdown-arrow');

    if (dropdown && dropdownMenu && !dropdown.contains(event.target)) {
        if (dropdownMenu.classList.contains('show-dropdown')) {
            dropdownMenu.classList.remove('opacity-100', 'visible', 'show-dropdown');
            dropdownMenu.classList.add('opacity-0', 'invisible');
            if (dropdownArrow) dropdownArrow.classList.remove('rotate-180');
        }
    }
});

// Page switch korle dropdown auto bondho kora
const originalSwitchPage = window.switchPage;
window.switchPage = function (pageId, pushToHistory = true) {
    originalSwitchPage(pageId, pushToHistory);

    const dropdownMenu = document.getElementById('dropdown-menu');
    const dropdownArrow = document.getElementById('dropdown-arrow');

    if (dropdownMenu && dropdownMenu.classList.contains('show-dropdown')) {
        dropdownMenu.classList.remove('opacity-100', 'visible', 'show-dropdown');
        dropdownMenu.classList.add('opacity-0', 'invisible');
        if (dropdownArrow) dropdownArrow.classList.remove('rotate-180');
    }
}
