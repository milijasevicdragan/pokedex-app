# Modern React Pokedex Application 📱

## AI-Generated!

![React](https://img.shields.io/badge/React-18-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38bdf8) ![Vite](https://img.shields.io/badge/Build-Vite-646cff)

A comprehensive, high-performance Pokedex application built with modern React. This project brings the classic handheld experience to the desktop, featuring a clean UI, infinite scrolling, and deep data integration including detailed stats, branching evolutions, and mega-evolutions.

**Authors:** Dragan Milijasevic & Lucas Kaufmann

---

## 📖 Project Overview

This application serves as a digital encyclopedia for Pokemon data. Unlike cluttered wiki pages, this Pokedex focuses on a clean, distraction-free user experience. It solves the problem of accessing game-relevant data (Stats, Catch Rates, Moves, Evolutions) quickly while playing or strategizing.

### Key Goals

- **Data Integrity:** Accurate representation of complex API data (PokeAPI).
- **Performance:** Utilizing `Promise.all` for parallel requests and local caching strategies.
- **Persistence:** Keeping User Favorites and Teams saved across sessions using LocalStorage.

---

## ✨ Key Features

- **🔍 Infinite Scroll Pokedex:** Efficiently loads Pokemon in chunks to minimize network bandwidth.
- **📊 Detailed Stats & Info:** Visual representation of Base Stats, Types, and Abilities.
- **🧬 Complex Evolution Trees:** Handles linear evolutions as well as branching evolutions (e.g., Eevee) using recursive tree traversal.
- **✨ Mega Evolutions:** Dynamic form switching within the details page to view stats for Mega-Evolutions.
- **❤️ Team Builder:** Add up to 6 Pokemon to your team. The team is persisted in LocalStorage and synced across tabs via an Event-Driven architecture.
- **⭐ Favorites System:** Quickly mark Pokemon as favorites for easy access.

---

## 🛠️ Tech Stack

- **Core:** React 18 (Functional Components & Hooks)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM (v6 Data Router & Layout Pattern)
- **State Management:**
  - _App State:_ Custom Hooks & In-Memory Cache
  - _Global State:_ Event-Driven Architecture (Custom Event Listeners) + LocalStorage
- **Data Fetching:** Axios with Interceptors & `Promise.all` patterns

---

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1.  **cd in Project**

    ```bash
    cd pokedex-app
    ```

2.  **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the development server**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  **Open in Browser** The app should now be running at `http://localhost:5173`.

---

## 📂 Project Structure

We utilized a **Feature-Based Architecture** to ensure scalability and separation of concerns.

```text
src/
├── app/                 # App entry point & main router setup
├── assets/              # Static assets (Images, Fonts)
├── features/            # Feature-specific logic & components
│   ├── pokedex/         # Logic for the main list (Infinite Scroll, Cards)
│   └── team/            # Logic for Team Management (Hooks, Dock)
├── pages/               # Page components (HomePage, PokemonPage)
├── shared/              # Reusable UI components (Buttons, Badges, Layout)
│   ├── api/             # API configuration & Mappers
│   ├── components/      # Shared Atoms (Layout.jsx, Badge.jsx)
│   └── utils/           # Helper functions
└── main.jsx             # Root render
```
