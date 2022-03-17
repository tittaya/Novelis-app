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
3.2) สร้างไฟล์ชื่อ ".env" ในโฟลเดอร์ "/server" และสร้างตัวแปรในไฟล์ ".env" ชื่อ MONGO_URI, REACT_APP_GOOGLE_CLIENT_ID, SERVER_URI และ CLOUDINARY_URL ดังรูป
![env-edit](https://user-images.githubusercontent.com/46591132/158824435-decf0d66-309d-4030-9ef9-8d96f887bb1f.JPG)
ใส่ค่าตัวแปร ดังนี้<br/>
MONGO_URI คือ connection string ของ MongoDB <br/>
REACT_APP_GOOGLE_CLIENT_ID คือ client ID ของ Google API<br/>
SERVER_URI คือ http://localhost/4000/graphql<br/>
CLOUDINARY_URL คือ url ของ Clondinary API สำหรับ upload รูปภาพ<br/>
## 4. Set up ส่วน client
