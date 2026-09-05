// ========================================
// 影沢家 Webサイト ページ切り替え
// ========================================

const pages = {
    home: "pages/home.html",
    profile: "pages/profile.html",
    hobby: "pages/hobby.html",
    "kss-cup": "pages/kss-cup.html",
    links: "pages/links.html",
    contact: "pages/contact.html",
    "site_map": "pages/site_map.html",

    "survival_game": "pages/hobby/survival_game.html",
    "survival_game_rule": "pages/hobby/survival_game/survival_game_rule.html",
    "survival_game_cost": "pages/hobby/survival_game/survival_game_cost.html",
    "survival_game_field": "pages/hobby/survival_game/survival_game_field.html",
    photo: "pages/hobby/photo.html",
    "photo_equipment": "pages/hobby/photo/photo_equipment.html",
    "photo_exposure": "pages/hobby/photo/photo_exposure.html",
    "photo_framing": "pages/hobby/photo/photo_framing.html",
};

const pageTitles = {
    home: "影沢家 | アサシン系VTuber影沢翠松の公式HP",
    profile: "プロフィール | 影沢家",
    hobby: "趣味部屋 | 影沢家",
    "kss-cup": "KSSカップ | 影沢家",
    links: "リンク集 | 影沢家",
    contact: "お問い合わせ | 影沢家",
    "site_map": "サイトマップ | 影沢家",

    "survival_game": "サバゲー | 趣味部屋 | 影沢家",
    "survival_game_rule": "サバゲーのルール | 影沢家",
    "survival_game_cost": "サバゲーの費用 | 影沢家",
    photo: "写真 | 趣味部屋 | 影沢家",
    "photo_equipment": "カメラ関連機材 | 影沢家",
    "photo_exposure": "露出三要素 | 影沢家",
    "photo_framing": "写真の構図 | 影沢家",
};

const content = document.getElementById("content");


// ----------------------------------------
// ページを読み込む
// ----------------------------------------
async function loadPage(pageName) {

    // 存在しないページの場合はホームへ
    if (!pages[pageName]) {
        pageName = "home";
    }

    // ページタイトルを変更
    document.title =
       pageTitles[pageName] || "影沢家 | 影沢翠松VTuber";
    
    try {

        const response = await fetch(pages[pageName]);

        if (!response.ok) {
            throw new Error("ページの読み込みに失敗しました");
        }

        const html = await response.text();

        content.innerHTML = html;

        // 現在のメニューをハイライト
        updateNavigation(pageName);

        // ページ内のJavaScript処理
        initializePage(pageName);

        // ページ先頭へ
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (error) {

        console.error(error);

        content.innerHTML = `
            <div class="box">
                <h2>ページを読み込めませんでした</h2>
                <p>
                    ページの読み込み中にエラーが発生しました。
                </p>
            </div>
        `;
    }
}


// ----------------------------------------
// ナビゲーションの現在位置を変更
// ----------------------------------------
function updateNavigation(pageName) {

    const navigationItems =
        document.querySelectorAll(".head_tab_item");

    navigationItems.forEach(item => {

        const target =
            item.getAttribute("href").replace("#", "");

        item.classList.toggle(
            "active",
            target === pageName
        );
    });
}


// ----------------------------------------
// ページごとの初期化
// ----------------------------------------
function initializePage(pageName) {

    // ------------------------------------
    // プロフィール
    // ------------------------------------
    if (pageName === "profile") {

        const profileTabs =
            document.querySelectorAll(".profile-tab");

        const profilePanels =
            document.querySelectorAll(".profile-panel");

        profileTabs.forEach(tab => {

            tab.addEventListener("click", () => {

                const target =
                    tab.dataset.target;

                profileTabs.forEach(item => {
                    item.classList.remove("active");
                });

                profilePanels.forEach(panel => {
                    panel.classList.remove("active");
                });

                tab.classList.add("active");

                const targetPanel =
                    document.getElementById(target);

                if (targetPanel) {
                    targetPanel.classList.add("active");
                }
            });
        });

        // 最初のプロフィールを表示
        if (profileTabs.length > 0) {
            profileTabs[0].click();
        }
    }

}


// ----------------------------------------
// URLのハッシュからページを決定
// ----------------------------------------
function getPageFromHash() {

    const hash =
        window.location.hash.substring(1);

    return hash || "home";
}


// ----------------------------------------
// ハッシュ変更時
// ----------------------------------------
window.addEventListener("hashchange", () => {

    loadPage(getPageFromHash());

});


// ----------------------------------------
// 初回読み込み
// ----------------------------------------
document.addEventListener("DOMContentLoaded", () => {

    loadPage(getPageFromHash());

});
