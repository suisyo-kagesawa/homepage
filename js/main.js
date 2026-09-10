// ========================================
// 影沢家 Webサイト 共通処理
// ========================================


// ----------------------------------------
// サイトのルートを取得
// ----------------------------------------

const scriptUrl = new URL(document.currentScript.src);

// js/main.js の1つ上がサイトルート
const SITE_ROOT = new URL("../", scriptUrl);


// ----------------------------------------
// ページURL
// ----------------------------------------

const pageUrls = {
    home: "index.html",

    profile: "pages/profile.html",
    hobby: "pages/hobby.html",
    "kss-cup": "pages/kss-cup.html",
    links: "pages/links.html",

    contact: "pages/contact.html",
    site_map: "pages/site_map.html"
};


// ----------------------------------------
// 共通HTMLを読み込む
// ----------------------------------------

async function loadComponent(elementId, file) {

    const element =
        document.getElementById(elementId);

    if (!element) {
        return;
    }

    try {

        const response =
            await fetch(
                new URL(file, SITE_ROOT)
            );

        if (!response.ok) {
            throw new Error(
                `${file} の読み込みに失敗しました`
            );
        }

        element.innerHTML =
            await response.text();

    } catch (error) {

        console.error(error);

    }
}


// ----------------------------------------
// 共通リンクのURLを設定
// ----------------------------------------

function setupCommonLinks() {

    document
        .querySelectorAll("[data-page]")
        .forEach(link => {

            const pageName =
                link.dataset.page;

            if (!pageUrls[pageName]) {
                return;
            }

            link.href =
                new URL(
                    pageUrls[pageName],
                    SITE_ROOT
                ).href;
        });
}


// ----------------------------------------
// 現在のページを判定
// ----------------------------------------

function getCurrentPage() {

    const currentUrl =
        new URL(window.location.href);

    for (const [name, path] of Object.entries(pageUrls)) {

        const pageUrl =
            new URL(path, SITE_ROOT);

        if (currentUrl.pathname === pageUrl.pathname) {
            return name;
        }
    }

    return "home";
}


// ----------------------------------------
// ナビゲーションの現在位置
// ----------------------------------------

function updateNavigation() {

    const currentPage =
        getCurrentPage();

    document
        .querySelectorAll(".head_tab_item")
        .forEach(item => {

            item.classList.toggle(
                "active",
                item.dataset.page === currentPage
            );

        });
}


// ----------------------------------------
// 初期化
// ----------------------------------------

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadComponent(
            "header",
            "components/header.html"
        );

        await loadComponent(
            "footer",
            "components/footer.html"
        );

        setupCommonLinks();
        setupProfileTabs();
        updateNavigation();

    }
);

// ----------------------------------------
// プロフィールタブ
// ----------------------------------------

function setupProfileTabs() {

    const tabs =
        document.querySelectorAll(".profile-tab");

    const panels =
        document.querySelectorAll(".profile-panel");

    if (!tabs.length || !panels.length) {
        return;
    }

    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const targetId =
                tab.dataset.target;

            // タブのactive状態を切り替え
            tabs.forEach(item => {
                item.classList.toggle(
                    "active",
                    item === tab
                );
            });

            // プロフィール表示を切り替え
            panels.forEach(panel => {
                panel.classList.toggle(
                    "active",
                    panel.id === targetId
                );
            });

        });

    });

}