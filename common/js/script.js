document.addEventListener("DOMContentLoaded", () => {

    /**
     * ヘッダーフィルター選択ボックス
     */
    const headerWrap = document.querySelector('.headerWrap');
    const searchBoxSelectedButton = document.getElementById('searchBoxSelectedButton');

    if (searchBoxSelectedButton) {
        // searchBoxInnerを取得
        const searchBoxInner = searchBoxSelectedButton.closest('.searchBoxInner');

        searchBoxSelectedButton.addEventListener('click', function () {
            const filterSelector = this.nextElementSibling;
            
            if (filterSelector && filterSelector.classList.contains('filterSelector')) {
                filterSelector.classList.toggle('visible');
                
                // 🔥 追加: filterSelectorがvisibleになったら、searchBoxInnerにopenクラスをトグル
                if (searchBoxInner) {
                    searchBoxInner.classList.toggle('open', filterSelector.classList.contains('visible'));
                }
            }
        });

        document.addEventListener('click', function (event) {
            const clickedItem = event.target.closest('.filterSelector.visible .item');

            if (clickedItem) {
                const filterSelector = clickedItem.closest('.filterSelector');
                const clickedText = clickedItem.textContent;

                // 1. .filterSelector の item に selected クラスを付加
                const allFilterSelectors = [
                    ...(headerWrap?.querySelectorAll('.searchBoxInner .filterBox .filterSelector') || [])
                ];
                allFilterSelectors.forEach(selector => {
                    selector.querySelectorAll('.item').forEach(item => {
                        item.classList.remove('selected');
                        if (item.textContent === clickedText) {
                            item.classList.add('selected');
                        }
                    });
                });

                // 2. id="searchBoxSelectedButton" のテキストを置換
                searchBoxSelectedButton.textContent = clickedText;

                // 3. name="category" の value を更新
                const categoryInputs = [
                    ...(headerWrap?.querySelectorAll('.searchBoxInner input[name="category"]') || [])
                ];
                categoryInputs.forEach(input => {
                    input.value = clickedText;
                });

                // 4. クリックされたドロップダウンを閉じる
                filterSelector.classList.remove('visible');
                
                // 🔥 追加: ドロップダウンが閉じたら、searchBoxInnerからopenクラスを削除
                if (searchBoxInner) {
                    searchBoxInner.classList.remove('open');
                }
            }
        });

        // ドロップダウンの外側をクリックしたら閉じる処理
        document.addEventListener('click', function (event) {
            const openSelectors = document.querySelectorAll('.filterSelector.visible');
            openSelectors.forEach(selector => {
                if (!event.target.closest('.filterBox')) {
                    selector.classList.remove('visible');
                    
                    // 🔥 追加: 外側クリックでドロップダウンが閉じたら、searchBoxInnerからopenクラスを削除
                    if (searchBoxInner) {
                        searchBoxInner.classList.remove('open');
                    }
                }
            });
        });

        // フォーカスアウトで閉じる処理
        searchBoxSelectedButton.addEventListener('blur', function () {
            const filterSelector = this.nextElementSibling;
            setTimeout(() => {
                if (filterSelector && filterSelector.classList.contains('filterSelector') && !filterSelector.matches(':hover')) {
                    filterSelector.classList.remove('visible');
                    
                    // 🔥 追加: フォーカスアウトでドロップダウンが閉じたら、searchBoxInnerからopenクラスを削除
                    if (searchBoxInner) {
                        searchBoxInner.classList.remove('open');
                    }
                }
            }, 100);
        });
    }




    /**
     * ヘッダーナビゲーションの幅を調整（PC時）
     */
    function adjustNaviBoxWidth() {
        // 768pxを境界として、それ以上の幅をPCサイズと見なします
        const PC_MIN_WIDTH = 768; 
        const currentWindowWidth = window.innerWidth;

        // 必要な要素を取得
        const headerFlexBox = document.querySelector('.headerFlexBox');
        const logo = document.querySelector('.logo');
        const naviBox = document.querySelector('.naviBox');
        const rightBox = document.querySelector('.rightBox');
        const searchBox = document.querySelector('.searchBox');

        if (!headerFlexBox || !logo || !naviBox || !rightBox) {
            console.error("必要な要素が見つかりません。セレクタを確認してください。");
            return;
        }

        // --- パディングの取得 ---
        const computedStyle = window.getComputedStyle(headerFlexBox);
        const paddingLeft = parseFloat(computedStyle.paddingLeft);
        const paddingRight = parseFloat(computedStyle.paddingRight);
        const totalPadding = paddingLeft + paddingRight;

        // 各要素の現在の幅をピクセル単位で取得
        const headerWidth = headerFlexBox.offsetWidth;
        const logoWidth = logo.offsetWidth;
        const rightBoxWidth = rightBox.offsetWidth;

        // naviBoxの新しい幅を計算
        // - 20 はおそらくロゴとナビゲーションの間のマージンまたはギャップ
        let newNaviBoxWidth = headerWidth - logoWidth - rightBoxWidth - totalPadding - 20;

        // 計算結果が負の値になるのを防ぐ
        if (newNaviBoxWidth < 0) {
            newNaviBoxWidth = 0;
        }

        // --- naviBoxに新しい幅を設定 ---
        // naviBox自体の幅調整は、ウィンドウサイズに関わらず実行されます
        naviBox.style.width = `${newNaviBoxWidth}px`;

        // 💡 修正箇所: searchBoxの幅設定に条件分岐を追加
        // ウィンドウサイズが768px以上の場合にのみ、searchBoxに幅を適用する
        if (searchBox) {
            if (currentWindowWidth >= PC_MIN_WIDTH) {
                // PCサイズ時: 計算された幅を適用
                searchBox.style.width = `${newNaviBoxWidth}px`;
            } else {
                // SPサイズ時: width設定を解除（CSSのデフォルトやメディアクエリに任せる）
                searchBox.style.width = ''; 
            }
        }
    }

    // ページロード完了時に実行
    window.addEventListener('load', adjustNaviBoxWidth);

    // ウィンドウサイズが変更された時にも実行
    window.addEventListener('resize', adjustNaviBoxWidth);





    /**
     * ヘッダーの「食べる」ボタンクリック時のドロップダウンメニュー開閉処理と
     * ウィンドウ幅に基づくメニュー状態の制御
     */
    function setupEatMenuToggle() {
        // 768pxをPCとSPの境界とします
        const PC_MIN_WIDTH = 768; 
        
        // 必要な要素を取得
        const eatButton = document.getElementById('eatButton');
        const eatMenuContent = document.querySelector('.eatMenuContent');

        if (!eatButton || !eatMenuContent) {
            // console.error("「食べる」メニュー開閉に必要な要素が見つかりません。");
            return;
        }

        /**
         * 現在のウィンドウ幅に基づいてメニューの状態を調整する関数
         * SP幅になった場合、メニューを強制的に閉じます。
         */
        const adjustEatMenuState = () => {
            const currentWindowWidth = window.innerWidth;
            const isPC = currentWindowWidth >= PC_MIN_WIDTH;

            if (isPC) {
                // PC時: 何もしない (クリックイベントに任せる)
            } else {
                // SP時 (768px未満): メニューを強制的に閉じる
                if (eatMenuContent.classList.contains('is-open')) {
                    eatMenuContent.classList.remove('is-open');
                    eatButton.classList.remove('is-active');
                    eatButton.setAttribute('aria-expanded', 'false');
                }
            }
        };
        
        /**
         * クリックイベントハンドラ
         */
        const handleEatButtonClick = () => {
            const currentWindowWidth = window.innerWidth;
            const isPC = currentWindowWidth >= PC_MIN_WIDTH;
            
            // PC (768px以上) の場合のみ開閉をトグルする
            if (isPC) {
                eatMenuContent.classList.toggle('is-open');
                eatButton.classList.toggle('is-active');

                // WAI-ARIA対応
                const isExpanded = eatMenuContent.classList.contains('is-open');
                eatButton.setAttribute('aria-expanded', isExpanded);
            }
            // SP時は何もしない（クリックしても開かない）
        };


        // 1. クリックイベントリスナーを設定
        eatButton.addEventListener('click', handleEatButtonClick);

        // 2. ページロード時とウィンドウリサイズ時にメニュー状態を調整する関数を適用
        window.addEventListener('load', adjustEatMenuState);
        window.addEventListener('resize', adjustEatMenuState);

        // 💡 初期状態を確実に適用するため、load時以外にも即時実行する
        // adjustEatMenuState();
    }

    // ページロード完了時に実行
    window.addEventListener('load', setupEatMenuToggle);
    

    /**
     * 検索ボタンクリック時の .searchKeywordForm の表示/非表示を切り替える処理
     */
    function setupSearchKeywordFormToggle() {
        // 必要な要素を取得
        const searchBtn = document.getElementById('searchBtn'); // 検索ボタン
        
        // ターゲット要素を取得。存在しない場合は null になる。
        // ※HTMLの最下部に追加されている <div class="searchKeywordForm"> がターゲット
        const targetElement = document.querySelector('.searchKeywordForm'); 

        if (!searchBtn) {
            // 検索ボタンがない場合は処理を中断
            // console.error("検索ボタン (#searchBtn) が見つかりません。");
            return;
        }
        
        // ターゲット要素（.searchKeywordForm）が存在しない場合、この機能はスキップ
        if (!targetElement) {
            // console.log(".searchKeywordForm 要素が見つかりませんでした。トグル機能はスキップします。");
            return;
        }

        // クリックイベントリスナーを設定
        searchBtn.addEventListener('click', () => {
            // targetElement 要素に 'is-hidden' クラスをトグル（追加・削除）する
            targetElement.classList.toggle('is-hidden');
            
            // オプション: ボタン自体に状態を示すクラスを付与
            searchBtn.classList.toggle('is-active');
        });
    }

    // ページロード完了時に実行
    window.addEventListener('load', setupSearchKeywordFormToggle);


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
    const filterButtons = document.querySelectorAll('.filterButton');
    const modalWrappers = document.querySelectorAll('.modalWrapper');
    const overflowThreshold = 260; // ウィンドウの高さから引く固定値

    /**
     * モーダル要素のメインコンテンツが閾値を超えた場合に overflow クラスを付与/削除する
     * @param {HTMLElement} modalWrapper - モーダルラッパー要素
     */
    const toggleOverflowClass = (modalWrapper) => {
        const modalMain = modalWrapper.querySelector('.modalMain');
        if (!modalMain) {
            console.error('.modalMain というクラス名を持つ要素が見つかりません。');
            return;
        }

        const threshold = window.innerHeight - overflowThreshold;
        if (modalMain.offsetHeight > threshold) {
            modalMain.classList.add('overflow');
        } else {
            modalMain.classList.remove('overflow');
        }
    };

    /**
     * モーダルを表示する
     * @param {string} modalId - 表示するモーダルのID
     */
    const showModal = (modalId) => {
        const modalElement = document.querySelector(`#${modalId}`);
        if (modalElement) {
            modalElement.classList.add('visible');
            const modalWrapper = modalElement.closest('.modalWrapper');
            if (modalWrapper) {
                toggleOverflowClass(modalWrapper);
            }
        }
    };

    /**
     * モーダルを非表示にする
     * @param {HTMLElement} modalWrapper - 非表示にするモーダルラッパー要素
     */
    const hideModal = (modalWrapper) => {
        modalWrapper.classList.remove('visible');
    };

    // フィルターボタンのイベントリスナー
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modalId = this.dataset.modal;
            showModal(modalId);
        });
    });

    // モーダルラッパーのイベントリスナー（閉じる処理）
    modalWrappers.forEach(modalWrapper => {
        const modalCloseButton = modalWrapper.querySelector('.modalCloseButton');
        const modalBackground = modalWrapper.querySelector('.modalBackground');

        if (modalCloseButton) {
            modalCloseButton.addEventListener('click', () => {
                hideModal(modalWrapper);
            });
        }

        if (modalBackground) {
            modalBackground.addEventListener('click', () => {
                hideModal(modalWrapper);
            });
        }
    });

    // ウィンドウリサイズ時の処理
    window.addEventListener('resize', () => {
        modalWrappers.forEach(toggleOverflowClass);
    });


    /**
     * リセットボタンのイベント
     */
    const resetButton = document.querySelector('.resetButton');
    const prefectureRadios = document.querySelectorAll('input[name="prefecture"]');
    
    resetButton.addEventListener('click', () => {
      prefectureRadios.forEach(radio => {
        radio.checked = false;
      });
    });

    
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
