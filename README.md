# 📚 Link Saver + Auto Summary

A modern, animated full-stack web app to **save, auto-summarize, and organize** web links with tags, filters, and drag-and-drop reordering — built with **Next.js**, **Tailwind CSS**, and **Jina AI**.

---

## 🚀 Live Demo

🌐 [Visit Live Site](https://linksaveromvads.netlify.app/)  

<img width="1920" height="1080" alt="login" src="https://github.com/user-attachments/assets/4c14e389-3eb8-485e-bc86-b0767353e0f5" />
<img width="1920" height="1080" alt="homeom" src="https://github.com/user-attachments/assets/ca27ae4e-d723-44cb-89ed-51ba1d88419c" />
<img width="1920" height="1080" alt="dashboard" src="https://github.com/user-attachments/assets/1f864654-195c-4775-b9b8-01fb76400b40" />

---

## ⚙️ Tech Stack

| Layer       | Tech Used                                |
|-------------|-------------------------------------------|
| Frontend    | Next.js (Pages Router), React, Tailwind CSS, Framer Motion |
| Backend     | Next.js API Routes (custom), bcrypt, JWT  |
| Storage     | `localStorage` (demo-only)                |
| Auth        | Custom email + password (bcrypt + JWT)    |
| Summary API | Jina AI (free summarization endpoint)     |
| Drag & Drop | `@hello-pangea/dnd`                       |
| Animations  | Framer Motion                             |

---

## 📦 Features

✅ Sign up & Login with secure local session  
✅ Save links with auto-fetched title, favicon, and summary  
✅ Free summarization using [Jina AI](https://r.jina.ai)  
✅ Tag your bookmarks and filter by tags  
✅ Drag-and-drop to reorder bookmarks  
✅ Delete any saved link  
✅ Responsive dark/light theme toggle  
✅ Animations for a modern experience  
✅ Data saved to localStorage (no external DB required)

---

## 🧪 Testing

- Unit tests written with **Jest + React Testing Library**
- Tested core components like `BookmarkCard` and `DashboardClient`
- Tests include:
  - Rendering of bookmarks
  - Add/delete functionality
  - Tag filter logic

> 🧪 Tests located in `__tests__/` folder

---

## 🛠️ Setup Instructions

1. **Clone the repo**
   git clone https://github.com/yourusername/link-saver.git
   cd link-saver
2. **Install dependencies**
   npm install
3. **Run locally**
   npm run dev

---

## 💡 What I'd Do Next

⏳ Add proper database support (Supabase / MongoDB)
🔐 Use real authentication provider (Supabase Auth / Firebase)
📱 Add mobile drag-and-drop support
🗃️ Add export/import bookmarks as JSON
🔍 Add fuzzy search over titles & summaries
🪄 Add OpenGraph preview thumbnails

---

