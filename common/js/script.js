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

    /**
     * 言語選択メニュー開閉、選択イベント
     */
    addCloseOnClick(".languages a", document.querySelector(".languages"));
    addCloseOnClick(".languages_sub a", document.querySelector(".languages_sub"));

    /**
     * ハンバーガーメニュー開閉イベント
     */
    const menuBtn = document.getElementById('hamburgerMenuBtn');
    const closeBtn = document.getElementById('hamburgerMenuCloseBtn');
    const hamburgerWrapper = document.querySelector('.hamburgerWrapper');
    const hamburgerBg = document.querySelector('.hamburgerBg');

    // メニューボタンをクリックしたとき
    menuBtn.addEventListener('click', () => {
        hamburgerWrapper.classList.add('visible'); // visible クラスを追加
    });

    // 閉じるボタンをクリックしたとき
    closeBtn.addEventListener('click', () => {
        hamburgerWrapper.classList.remove('visible'); // visible クラスを削除
    });

    // 背景をクリックしたとき
    hamburgerBg.addEventListener('click', () => {
        hamburgerWrapper.classList.remove('visible'); // visible クラスを削除
    });

    /**
     * サブメニューボタンを取得
     */
    const subMenuButtons = document.querySelectorAll('.subMenuBtn');
    subMenuButtons.forEach(button => {
        button.addEventListener('click', () => {
            const parentItem = button.closest('.hamburgerItem');
            if (parentItem) {
            parentItem.classList.toggle('visible');
            }
        });
    });

    /**
     * 料理ジャンルから探すを表示する
     */
    const modalGenreBtn = document.getElementById('modalGenreBtn');
    const modalGenreWrap = document.getElementById('modalGenreWrap');
    const modalCloseButton = modalGenreWrap.querySelector('.modalCloseButton');
    const modalBackground = modalGenreWrap.querySelector('.modalBackground');

    // モーダルを開く関数
    modalGenreBtn.addEventListener('click', () => {
        modalGenreWrap.classList.add('visible');
    });

    // モーダルを閉じる関数
    const closeModal = () => {
        modalGenreWrap.classList.remove('visible');
    };

    // 閉じるボタンをクリックしたときにモーダルを閉じる
    modalCloseButton.addEventListener('click', closeModal);

    // 背景をクリックしたときにモーダルを閉じる
    modalBackground.addEventListener('click', closeModal);
    
});
