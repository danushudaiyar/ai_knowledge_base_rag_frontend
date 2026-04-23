# AI Knowledge Base RAG Frontend

A production-ready React frontend for an AI-Powered Knowledge Base & Q&A system using Retrieval-Augmented Generation (RAG).

## 🚀 Features

- **Document Management**: Upload and manage PDFs, documents, and web URLs
- **Intelligent Q&A**: Ask questions and get accurate answers based on your documents
- **Real-time Chat**: Interactive chat interface with streaming responses
- **Document Explorer**: Browse and search through uploaded documents
- **Source Citations**: View source documents for each answer
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Vite** - Build tool & dev server
- **CSS3** - Styling

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai_knowledge_base_rag_frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and configure:
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_API_TIMEOUT=30000
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── AnswerCard.jsx
│   ├── FileList.jsx
│   ├── Loader.jsx
│   ├── Navbar.jsx
│   ├── QueryInput.jsx
│   └── UploadBox.jsx
├── context/          # React Context providers
│   └── AppContext.jsx
├── hooks/            # Custom React hooks
│   └── useQuery.js
├── pages/            # Page components
│   ├── Chat.jsx
│   ├── Dashboard.jsx
│   └── Documents.jsx
├── services/         # API services
│   └── api.js
├── styles/           # Global styles
│   └── globals.css
├── utils/            # Utility functions
│   └── helpers.js
├── App.jsx           # Root component
├── main.jsx          # Entry point
└── routes.jsx        # Route configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Integration

The frontend expects a backend API running at `http://localhost:8000` by default.

### API Endpoints Used:

**Documents:**
- `POST /api/v1/documents/upload` - Upload documents
- `GET /api/v1/documents` - Get all documents
- `GET /api/v1/documents/:id` - Get document by ID
- `DELETE /api/v1/documents/:id` - Delete document
- `PATCH /api/v1/documents/:id` - Update document

**Query:**
- `POST /api/v1/query/ask` - Ask a question
- `GET /api/v1/query/history` - Get query history
- `GET /api/v1/query/:id` - Get query by ID

**Auth:**
- `POST /api/v1/auth/register` - Register user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/logout` - Logout user
- `GET /api/v1/auth/me` - Get current user

## 📱 Pages

### Dashboard (`/`)
Main landing page with quick access to upload documents and ask questions.

### Chat (`/chat`)
Interactive chat interface for asking questions about your documents.

### Documents (`/documents`)
Manage all uploaded documents, view details, and delete files.

## 🎨 Styling

The project uses vanilla CSS with CSS variables for theming. All styles are in `src/styles/globals.css`.

### Color Scheme:
- Primary: `#4f46e5` (Indigo)
- Background: `#f9fafb` (Light gray)
- Text: `#111827` (Dark gray)

## 🔒 Authentication

The app supports JWT-based authentication. Tokens are stored in `localStorage` and automatically included in API requests.

## 🚀 Deployment

### Build for production:
```bash
npm run build
```

The optimized build will be in the `dist/` folder.

### Deploy to common platforms:

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

**Docker:**
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue in the repository.
