# Recipe Finder App

A full-stack TypeScript application demonstrating modern web development practices through a recipe discovery platform, implementing React with custom hooks and context for state management, styled-components for dynamic theming, and responsive design patterns on the frontend. The backend architecture utilizes Node.js with Express, featuring RESTful API integration with request caching and rate limiting, custom middleware for API optimization, and type-safe development practices across the entire application stack.

## 🌐 Live Demo

Check out the live demo of the project: [Recipe Finder](https://sehunrecipefinder.netlify.app/recipes)

## ✨ Features

- 🔍 Advanced recipe search with multiple filtering options
- 🥗 Detailed nutritional information for each recipe
- 🌓 Dark/Light theme support
- 📱 Fully responsive design
- ⚡ Performance optimized with caching
- 🗂️ Sort recipes by various criteria (calories, protein, time, etc.)
- 📋 Pagination for better result navigation
- 🏷️ Filter by dietary restrictions and preferences

## 🛠️ Tech Stack

### Frontend

- React with TypeScript
- Styled Components for styling
- React Router for navigation
- Lucide React for icons
- Context API for state management

### Backend

- Node.js with Express
- TypeScript
- Node-Cache for caching
- Winston for logging
- Zod for validation

## 📁 Project Structure

```
src/
├── client/
│   ├── components/     # Reusable React components
│   ├── pages/         # Main page components
│   ├── types/         # TypeScript interfaces
│   ├── apis/          # API integration
│
└── server/
    ├── config/        # Server configuration
    ├── middleware/    # Express middleware
    ├── routes/        # API routes
    ├── services/      # Business logic
    └── utils/         # Helper functions
```

## 🧩 Key Components

- `RecipeSearch`: Advanced search component with filters
- `RecipeCard`: Displays recipe information with nutritional data
- `RecipeSort`: Sorting functionality for search results
- `ThemeProvider`: Handles dark/light theme switching
- `ApiLimitNotice`: Displays API usage limitations
- `RecipePagination`: Handles result pagination

## 🔧 API Integration

- Integrates with the Edamam Recipe API
- Implements caching to optimize API usage
- Rate limiting to prevent API abuse
- Error handling and logging

## 📱 Responsive Design

The application is optimized for various screen sizes:

- 🖥️ Desktop (1024px and above)
- 💻 Tablet (768px to 1023px)
- 📱 Mobile (below 768px)

## ⚙️ Installation

1. Clone the repository

```bash
git clone https://github.com/sehundpark/recipe-finder.git
```

2. Install dependencies

```bash
# Install server dependencies
cd recipe-finder/server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Set up environment variables

```bash
# Create .env file in server directory
EDAMAM_APP_ID=your_app_id
EDAMAM_APP_KEY=your_app_key
EDAMAM_BASE_URL=https://api.edamam.com/api/recipes/v2
```

4. Start the development servers

```bash
# Start server (from server directory)
npm run dev

# Start client (from client directory)
npm run dev
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 Note

This project uses the free tier of the Edamam API, which has the following limitations:

- 10 requests per minute
- 10,000 requests per month

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
