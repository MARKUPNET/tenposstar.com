# tenposstar.com

## 設定方法

##### 1.コマンドプロンプトを起動して対象フォルダへ移動する
```
cd tenposstar.com
```

##### 2.npmをインストールする
```
npm install --save-dev
```

##### 3.サーバーを起動する
```
npm run serve  
```

##### 4.node-sassを起動する
```
npm run sass
```
※必要に応じて各ページ用のコンパイルを設定しておく
```
"scripts": {
        "sass": "npm-run-all -p compile:*",
        "compile:sass": "node-sass common/sass/main.scss common/css/style.css --source-map common/css/style.css.map --source-map-contents -w",
        "compile:discovery": "node-sass discovery/sass/style.scss discovery/css/style.css --source-map discovery/css/style.css.map --source-map-contents -w",
        "compile:eatlist": "node-sass eatlist/sass/style.scss eatlist/css/style.css --source-map eatlist/css/style.css.map --source-map-contents -w",
        "compile:eattop": "node-sass eattop/sass/style.scss eattop/css/style.css --source-map eattop/css/style.css.map --source-map-contents -w",
        "compile:postdetail": "node-sass postdetail/sass/style.scss postdetail/css/style.css --source-map postdetail/css/style.css.map --source-map-contents -w",
        "compile:store": "node-sass store/sass/style.scss store/css/style.css --source-map store/css/style.css.map --source-map-contents -w",
        "compile:toppage": "node-sass toppage/sass/style.scss toppage/css/style.css --source-map toppage/css/style.css.map --source-map-contents -w",
        "compile:gourmet": "node-sass gourmet/sass/style.scss gourmet/css/style.css --source-map gourmet/css/style.css.map --source-map-contents -w",
        "compile:tags": "node-sass tag/sass/style.scss tag/css/style.css --source-map tag/css/style.css.map --source-map-contents -w",
        "compile:curator": "node-sass curator/sass/style.scss curator/css/style.css --source-map curator/css/style.css.map --source-map-contents -w",
        "compile:region": "node-sass region/sass/style.scss region/css/style.css --source-map region/css/style.css.map --source-map-contents -w",
        "compile:map": "node-sass map/sass/style.scss map/css/style.css --source-map map/css/style.css.map --source-map-contents -w",
        "compile:moved": "node-sass moved/sass/style.scss moved/css/style.css --source-map moved/css/style.css.map --source-map-contents -w",
        "compile:tour": "node-sass tour/sass/style.scss tour/css/style.css --source-map tour/css/style.css.map --source-map-contents -w",
        "compile:findjapan": "node-sass findjapan/sass/style.scss findjapan/css/style.css --source-map findjapan/css/style.css.map --source-map-contents -w",
        "compile:sightseeingjapan": "node-sass sightseeingjapan/sass/style.scss sightseeingjapan/css/style.css --source-map sightseeingjapan/css/style.css.map --source-map-contents -w",
        "compile:travelprep": "node-sass travelprep/sass/style.scss travelprep/css/style.css --source-map travelprep/css/style.css.map --source-map-contents -w",
        "compile:search": "node-sass search/sass/style.scss search/css/style.css --source-map search/css/style.css.map --source-map-contents -w",
        "compile:searchgourmet": "node-sass searchgourmet/sass/style.scss searchgourmet/css/style.css --source-map searchgourmet/css/style.css.map --source-map-contents -w",
        "compile:privacypolicy": "node-sass privacypolicy/sass/style.scss privacypolicy/css/style.css --source-map privacypolicy/css/style.css.map --source-map-contents -w",
        "compile:terms": "node-sass terms/sass/style.scss terms/css/style.css --source-map terms/css/style.css.map --source-map-contents -w",
        "compile:about": "node-sass about/sass/style.scss about/css/style.css --source-map about/css/style.css.map --source-map-contents -w",
        "serve": "serve"
    },
```

## 製作優先順

```
1.店舗詳細・・・store
2.食べる一覧・・・eatlist
3.発見する・・・discovery
4.トップページ・・・toppage
5.食べるTOP・・・eattop
6.記事詳細・・・postdetail

7.ご当地グルメ一覧・・・gourmet
8.タグ一覧・・・tag
9.キュレータ個別ページ・・・curator
10.地名検索・・・region
11.地図検索・・・map
12.移動する・・・moved
13.食体験ツアー詳細・・・tour

14.日本を見つける・・・findjapan
15.観光名所紹介・・・sightseeingjapan
16.旅の準備・・・travelprep
17.北海道　レストラン・・・search
18.北海道　ご当地グルメ・・・searchgourmet

19.プライバシーポリシー・・・privacypolicy
20.利用規約・・・terms
21.加盟店募集中・・・about
```