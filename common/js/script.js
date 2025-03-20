document.addEventListener("DOMContentLoaded", () => {
    // 共通の toggleVisibility 関数
    const toggleVisibility = (element, visibleClass) => {
        element.classList.toggle(visibleClass);
    };

    // 任意の要素のクラスを切り替えるイベントリスナーを設定する関数
    const addToggleEvent = (button, target, visibleClass) => {
        if (button && target) {
            button.addEventListener("click", () => {
                toggleVisibility(target, visibleClass);
            });
        }
    };

    // スクロールに応じたクラス制御
    const scrollNavi = document.getElementById("scrollNavi");
    const handleScroll = () => {
        if (scrollNavi) {
            scrollNavi.classList.toggle("visible", window.scrollY > 100);
        }
    };
    window.addEventListener("scroll", handleScroll);

    // 言語選択メニューや検索ボックスの制御
    addToggleEvent(
        document.getElementById("searchBtn"),
        document.querySelector(".searchBox"),
        "visible"
    );
    addToggleEvent(
        document.getElementById("langBtn"),
        document.querySelector(".languages"),
        "visible"
    );
    addToggleEvent(
        document.getElementById("langBtn_sub"),
        document.querySelector(".languages_sub"),
        "visible"
    );

    // メニュー内のリンクがクリックされたときに非表示にする関数
    const addCloseOnClick = (linksSelector, menu) => {
        const links = document.querySelectorAll(linksSelector);
        links.forEach(link => {
            link.addEventListener("click", () => {
                if (menu && menu.classList.contains("visible")) {
                    menu.classList.remove("visible");
                }
            });
        });
    };

    // メニュー項目にクリックイベントを設定
    addCloseOnClick(".languages a", document.querySelector(".languages"));
    addCloseOnClick(".languages_sub a", document.querySelector(".languages_sub"));
});
