# ขั้นตอนการติดตั้ง Novelis
## 1. Download หรือ Clone
download Zip file หรือ ใช้คำสั่ง `git clone https://github.com/tittaya/Novelis-app.git`
## 2. Set up MongoDB, Cloudinary และ Google OAuth
ดูวิธี set up MongoDB, Cloudinary และ Google OAuth ได้ที่ https://docs.google.com/document/d/1vMIoYL8KNosGPaj_twvBXL-Z4dXrPOLm2Tym41bevFg/edit?usp=sharing
## 3. Set up ส่วน server
3.1) ไปที่โฟลเดอร์ "/server" แล้วรันคำสั่ง
```
npm install
```
จะเป็นการติดตั้ง package ทั้งหมดที่อยู่ในไฟล์ package.json ของ server<br/>
3.2) สร้างไฟล์ชื่อ ".env" ในโฟลเดอร์ "/server" และสร้างตัวแปรในไฟล์ ".env" ชื่อ MONGO_URI, REACT_APP_GOOGLE_CLIENT_ID, SERVER_URI และ CLOUDINARY_URL ดังรูป
![env-edit](https://user-images.githubusercontent.com/46591132/158824435-decf0d66-309d-4030-9ef9-8d96f887bb1f.JPG)
ใส่ค่าตัวแปร ดังนี้<br/>
MONGO_URI คือ connection string ของ MongoDB <br/>
REACT_APP_GOOGLE_CLIENT_ID คือ client ID ของ Google API<br/>
SERVER_URI คือ http://localhost:4000/graphql<br/>
CLOUDINARY_URL คือ url ของ Clondinary API สำหรับ upload รูปภาพ<br/>
3.3) start ส่วน server โดยไปที่โฟลเดอร์ "/server" แล้วรันคำสั่ง
```
node app.js
```
3.4) server จะเรื่มทำงานที่ port 4000 โดยสามารถทดสอบ graphql queries ได้ที่ http://localhost:4000/graphql
## 4. Set up ส่วน client
4.1) ไปที่โฟลเดอร์ "/client" แล้วรันคำสั่ง
```
npm install
```
จะเป็นการติดตั้ง package ทั้งหมดที่อยู่ในไฟล์ package.json ของ client<br/>
4.2) สร้างไฟล์ชื่อ "config.json" ในโฟลเดอร์ "/client/src" และสร้างตัวแปรในไฟล์ "config.json" ชื่อ GOOGLE_CLIENT_ID และ CLOUDINARY_URL ดังรูป<br/>

ใส่ค่าตัวแปร ดังนี้<br/>
GOOGLE_CLIENT_ID คือ client ID ของ Google API<br/>
CLOUDINARY_URL คือ url ของ Clondinary API สำหรับ upload รูปภาพ<br/>
4.3) start ส่วน client โดยไปที่โฟลเดอร์ "/client" แล้วรันคำสั่ง
```
npm start
```
4.4) เปิดหน้าเว็บ โดยไปที่ http://localhost:3000
