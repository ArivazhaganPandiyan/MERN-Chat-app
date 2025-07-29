# Quick-Talk 💬

**Quick-Talk** is a modern, responsive real-time chat application built using the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to register, log in, and chat with others in real time. The app features JWT authentication, custom CSS UI styling, dark mode, emoji support, and mobile responsiveness.

---

## 🚀 Features

- 🔐 **Authentication**: Register/Login with secure JWT authentication
- 💬 **Real-time Chat**: Send and receive messages instantly
- 🌙 **Dark Mode**: Toggle dark mode for a better user experience
- 😀 **Emoji Support**: Add emojis to your messages
- ✅ **Seen/Read Indicators** *(Coming soon)*
- ✏️ **Edit/Delete Messages** *(Coming soon)*
- 📱 **Fully Responsive**: Mobile-first layout with desktop support
- 🧭 **Sidebar Navigation**: Access users and settings quickly
- 🎨 **Custom CSS UI**: Styled without Tailwind or Material UI

---

## 🛠 Tech Stack

**Frontend:**
- React (Vite)
- Axios
- React Router
- Custom CSS

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- Socket.IO for real-time messaging

---

## 📂 Folder Structure

Quick-Talk/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── utils/
│ └── server.js
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── styles/
│ │ ├── App.jsx
│ │ └── main.jsx
├── .env
├── README.md




---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/quick-talk.git
cd quick-talk
git clone https://github.com/your-username/quick-talk.git
cd quick-talk

**Backend Setup**
cd backend
npm install

Create a .env file inside /backend with the following:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

Start the server: npm run dev

**Frontend Setup**
cd ../frontend
npm install

Update the base URL in Axios to point to your backend (Render/localhost):
// example in axios.js or inside fetch calls
baseURL: "https://your-backend-url.com/api"
Start the frontend:npm run dev
for development : npm run build

🌐 Deployment
Backend (Render)
Push your backend to GitHub

Go to Render

Create a new Web Service → connect to GitHub

Set environment variables (same as .env)

Deploy

Frontend (Netlify)
Push your frontend to GitHub

Go to Netlify

Create a new site → import from GitHub

Set the build command: npm run build

Set the publish directory: dist

Update API URLs in code to match your Render backend

🧪 Future Enhancements
✅ Seen/read message indicators

🟢 Online/offline user status

📷 Media support (images/audio)

📌 Pinned chats

🔕 Notifications

👨‍💻 Developer
Arivazhagan Pandiyan
MERN Stack Developer
Email: [arivutamizhan@icloud.com]
Portfolio: [your-portfolio-link]
LinkedIn: [your-linkedin-url]

📜 License
This project is open source and available under the MIT License.
