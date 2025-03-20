# tenposstar.com

# 設定方法

##### 1.コマンドプロンプトを起動して対象フォルダへ移動する
```
cd tenposstar.com
```

##### 2.npmをインストールする
```
npm install --save-dev
```

3##### .サーバーを起動する
```
npm run serve  
```

##### 4.node-sassを起動する
```
npm run compile:sass
```
※必要に応じて各ページ用のコンパイルも起動する
例）npm run compile:store

##### 5.コンパイルを増やしたいときはpackafe.jsonを編集する。
```
"scripts": {
    "compile:sass": "node-sass common/sass/main.scss common/css/style.css --source-map common/css/style.css.map --source-map-contents -w",
    "compile:store": "node-sass store/sass/style.scss store/css/style.css --source-map store/css/style.css.map --source-map-contents -w",
    "serve": "serve"
},
```