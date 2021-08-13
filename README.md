# 支出記帳網頁
簡易支出記帳網站，可以新增、刪除、編輯個別項目。也可以依分類查詢記帳項目。
測試帳號：root@example.com
測試密碼：12345678

## 產品功能
- 查看所有記帳項目
- 查看總支出金額
- 查看特定類別支出項目
- 查看特定月份的支出
- 同時查看特定月份及類別之支出
- 更改支出資料

### 使用工具
- Visual Studio Code
- Node.js
- Express
- Express-Handlebars
- handlebars-helpers
- mongoDB
- mongoose

### 安裝步驟

- 藉由git clone將專案下載至本地
https://github.com/alex2116/expense-tracker.git
- 進入專案資料夾
cd expense-tracker
- 安裝套件
npm install
- 引入環境變數
- 將 .env.example 改為 .env
- 加入種子資料
npm run seed
- 啟動網頁伺服器
npm run dev
- 出現下列訊息，表示啟動成功，可點選連結開啟網頁
Server is running on http://localhost:3000