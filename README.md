# 🚀 Task Flow Management System API
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens)

![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

![API](https://img.shields.io/badge/REST-API-orange?style=for-the-badge)

A secure and scalable RESTful API for managing workspaces, projects, tasks, comments, notifications, and file attachments. Built with **Node.js**, **Express.js**, and **MongoDB** following modern backend development practices.

---

## ✨ Features

* 🔐 JWT Authentication
* 👥 Role-Based Access Control (Admin, Manager, Member)
* 🏢 Workspace Management
* 👤 Workspace Members Management
* 📁 Project Management
* ✅ Task Management
* 💬 Task Comments
* 📎 File Attachments Upload
* 🔔 Notifications System
* 📊 Dashboard Statistics
* 📝 Activity Logs
* 🔍 Filtering
* 🔎 Searching
* 📄 Pagination
* ↕️ Sorting
* 🛡️ Security Best Practices

---

## 🛠️ Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Multer
* Express Validator
* Nodemailer

---

## 🔒 Security

* Helmet
* Express Rate Limit
* Mongo Sanitize
* XSS Protection
* HPP Protection
* CORS
* Input Validation
* Global Error Handling

---

## 📂 Project Structure

```
config/
middlewares/
models/
routes/
services/
utils/
server.js
```

---

## 📌 Main API Modules

* Authentication
* Workspaces
* Workspace Members
* Projects
* Tasks
* Comments
* File Attachments
* Notifications
* Dashboard
* Activity Logs

---

## ⚙️ Installation

```bash
git clone https://github.com/Youssef33715/task-flow-management-system-api.git

cd task-flow-management-system-api

npm install

npm start
```

---

## 🔑 Environment Variables

Create a `config.env` file and add:

```env
PORT=8000

DB_URI=your_mongodb_connection

JWT_SECRET_KEY=your_secret_key

JWT_EXPIRE_TIME=30d

EMAIL_HOST=...

EMAIL_PORT=...

EMAIL_USER=...

EMAIL_PASS=...
```

---

## 📬 API Testing

All endpoints were tested using **Postman**.

---

## 👨‍💻 Author

**Youssef Mohamed**

GitHub:
https://github.com/Youssef33715
