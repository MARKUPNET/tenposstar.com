document.addEventListener("DOMContentLoaded", () => {

    /**
     * ヘッダーフィルター選択ボックス
     */
    const headerWrap = document.querySelector('.headerWrap');
    const headerScrollNavi = document.getElementById('scrollNavi');

    const selectedItems = [
        ...(headerWrap?.querySelectorAll('.searchBoxInner .filterBox .selectedItem') || []),
        ...(headerScrollNavi?.querySelectorAll('.searchBoxInner .filterBox .selectedItem') || [])
    ];

    selectedItems.forEach(selectedItem => {
        selectedItem.addEventListener('click', function () {
            const filterSelector = this.nextElementSibling;
            if (filterSelector && filterSelector.classList.contains('filterSelector')) {
                filterSelector.classList.toggle('visible');
            }
        });
    });

    document.addEventListener('click', function (event) {
        const clickedItem = event.target.closest('.filterSelector.visible .item');

        if (clickedItem) {
            const filterSelector = clickedItem.closest('.filterSelector');
            const clickedText = clickedItem.textContent;

            // 1. 両方の .filterSelector の item に selected クラスを付加
            const allFilterSelectors = [
                ...(headerWrap?.querySelectorAll('.searchBoxInner .filterBox .filterSelector') || []),
                ...(headerScrollNavi?.querySelectorAll('.searchBoxInner .filterBox .filterSelector') || [])
            ];
            allFilterSelectors.forEach(selector => {
                selector.querySelectorAll('.item').forEach(item => {
                    item.classList.remove('selected');
                    if (item.textContent === clickedText) {
                        item.classList.add('selected');
                    }
                });
            });

            // 2. 両方の .selectedItem のテキストを置換
            selectedItems.forEach(button => {
                button.textContent = clickedText;
            });

            // 3. 両方の name="category" の value を更新
            const categoryInputs = [
                ...(headerWrap?.querySelectorAll('.searchBoxInner input[name="category"]') || []),
                ...(headerScrollNavi?.querySelectorAll('.searchBoxInner input[name="category"]') || [])
            ];
            categoryInputs.forEach(input => {
                input.value = clickedText;
            });

            // 4. クリックされたドロップダウンを閉じる
            filterSelector.classList.remove('visible');
        }
    });

    // ドロップダウンの外側をクリックしたら閉じる処理
    document.addEventListener('click', function (event) {
        const openSelectors = document.querySelectorAll('.filterSelector.visible');
        openSelectors.forEach(selector => {
            if (!event.target.closest('.filterBox') && !event.target.closest('.selectedItem')) {
                selector.classList.remove('visible');
            }
        });
    });

    // フォーカスアウトで閉じる処理（必要に応じて）
    selectedItems.forEach(selectedItem => {
        selectedItem.addEventListener('blur', function () {
            const filterSelector = this.nextElementSibling;
            setTimeout(() => {
                if (filterSelector && filterSelector.classList.contains('filterSelector') && !filterSelector.matches(':hover')) {
                    filterSelector.classList.remove('visible');
                }
            }, 100);
        });
    });




    /**
     * クラス "thumbs" 内の要素を繰り返す
     */
    const thumbs = document.querySelector('.thumbs');
    if (thumbs) {
        const thumbsWidth = thumbs.offsetWidth; // thumbs の幅を取得
        const browserWidth = window.innerWidth; // ブラウザの幅を取得 (ウィンドウの幅)
        const repeatCount = Math.floor(browserWidth / thumbsWidth); // 繰り返す回数を計算

        // ul 内の li 要素を複製して追加
        const items = [...thumbs.querySelectorAll('li')];
        const fragment = document.createDocumentFragment();

        items.forEach(item => {
            const clone = item.cloneNode(true); // li 要素を複製
            fragment.appendChild(clone); // フラグメントに追加
        });

        for (let i = 0; i < repeatCount; i++) {
            thumbs.appendChild(fragment.cloneNode(true)); // フラグメントをクローンして追加
        }
    } else {
        console.log("thumbs 要素が見つかりませんでした。");
    }

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
     * フィルター検索を表示する
     */
    const modalFilterButton = document.getElementById('modalFilterButton');
    const modalFilterWrap = document.getElementById('modalFilterWrap');
    const modalCloseButton = modalFilterWrap.querySelector('.modalCloseButton');
    const modalBackground = modalFilterWrap.querySelector('.modalBackground');

    // モーダルを開く関数
    modalFilterButton.addEventListener('click', () => {
        modalFilterWrap.classList.add('visible');
    });

    // モーダルを閉じる関数
    const closeModal = () => {
        modalFilterWrap.classList.remove('visible');
    };

    // 閉じるボタンをクリックしたときにモーダルを閉じる
    modalCloseButton.addEventListener('click', closeModal);

    // 背景をクリックしたときにモーダルを閉じる
    modalBackground.addEventListener('click', closeModal);
});

/**
 * 店舗詳細ページ・・・すべて表示ボタンのクリックイベント
 */
function reviewMoreview() {
    const reviewCommentWrapper = document.querySelector('.reviewCommentWrapper');
    if (reviewCommentWrapper) {
        reviewCommentWrapper.classList.add('viewAll');
    }
}    