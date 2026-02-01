# Aluminate
**Alumni–Student Engagement Platform**

Live Demo: https://aluminate-syvf.onrender.com

<p align="center"> 
  <img src="client/public/demo-picture.png" alt="Aluminate Demo" width="800"/> 
</p>

## About the Project
Aluminate is a MERN-based alumni networking platform designed to strengthen engagement between college students and alumni.

**Key Features**
- JWT-based authentication using HTTP-only cookies
- Alumni–student interaction and networking
- Well-structured MongoDB schemas
- Optimized database queries using indexes
- Full-stack MERN architecture (React + Express + MongoDB + Node.js)

## Project Setup Guide
### Install Dependencies

**Install dependencies:**
```bash
npm run install:all
```

## Scripts & Commands
Run from the *root directory* 

Starts the React frontend   
```bash
npm run dev:client
```

Starts the Express backend       
```bash
npm run dev:server
```

Starts both frontend and backend concurrently (if configured) 
```bash
npm run dev:all
```

> Make sure `concurrently` is installed if using `npm run dev:all`.
