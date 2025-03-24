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

```