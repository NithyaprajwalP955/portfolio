# Nithya Prajwal P - Portfolio

Modern full-stack portfolio website built with **React (Vite)** on the frontend and **Django REST Framework** on the backend.

- **Live Frontend**: [https://nithyaprajwalp.vercel.app](https://nithyaprajwalp.vercel.app)
- **Backend API**: [https://nithyaprajwalp-backend.vercel.app](https://nithyaprajwalp-backend.vercel.app)

---

## 🚀 Deployment on Vercel

This repository is structured as a monorepo containing both the frontend and backend. You can deploy both to Vercel in two separate projects from the same GitHub repository:

### 1. Deploy Frontend (`nithyaprajwalp.vercel.app`)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New"** > **"Project"**.
2. Select your repository `portfolio`.
3. In **Project Settings**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
4. In **Environment Variables**, add:
   - `VITE_API_URL` = `https://nithyaprajwalp-backend.vercel.app/api`
5. Click **Deploy**.
6. Set custom domain to `nithyaprajwalp.vercel.app` in project settings.

### 2. Deploy Backend (`nithyaprajwalp-backend.vercel.app`)

1. In Vercel Dashboard, click **"Add New"** > **"Project"**.
2. Select the same repository `portfolio`.
3. In **Project Settings**:
   - **Framework Preset**: `Other`
   - **Root Directory**: `backend`
4. In **Environment Variables**, add:
   - `SECRET_KEY` = `<your-production-secret-key>`
   - `DEBUG` = `False`
   - `ALLOWED_HOSTS` = `nithyaprajwalp-backend.vercel.app,.vercel.app`
   - *(Optional)* `DATABASE_URL` = `<your-postgres-connection-string>`
5. Click **Deploy**.
6. Set custom domain to `nithyaprajwalp-backend.vercel.app` in project settings.

---

## 💻 Local Development

### Backend (Django)
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_data
python manage.py runserver
```

### Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.
