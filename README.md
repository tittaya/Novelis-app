# ขั้นตอนการติดตั้ง Novelis
## 1. Download หรือ Clone
download Zip file หรือ ใช้คำสั่ง `git clone https://github.com/tittaya/Novelis-app.git`
## 2. Set up MongoDB, Cloudinary และ Google OAuth
## 3. Set up ส่วน server
3.1) ไปที่โฟลเดอร์ "/server" แล้วรันคำสั่ง
```
npm install
```
จะเป็นการติดตั้ง package ทั้งหมดที่อยู่ในไฟล์ package.json ของ server
3.2) สร้างไฟล์ชื่อ ".env" ในโฟลเดอร์ "/server" และสร้างตัวแปรในไฟล์ ".env" ชื่อ MONGO_URI, REACT_APP_GOOGLE_CLIENT_ID, SERVER_URI และ CLOUDINARY_URL
![env](https://drive.google.com/file/d/1b6zhVgB6vIGdNLfz1iCpCKvKM6LSRQNN/view?usp=sharing)
`node app.js`
`npm start`
## 4. Set up ส่วน client
