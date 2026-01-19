# React TypeScript Webpack Project - Complete Build Guide

This document contains everything needed to recreate this exact React v19+ project with TypeScript, Webpack 5, TailwindCSS v4.1+, and modern tooling from scratch.

## Project Overview

Create a modern React application with the following specifications:

- **React**: v19+
- **TypeScript**: v5.9+
- **Webpack**: v5 with esbuild-loader for fast builds
- **TailwindCSS**: v4.1+ with PostCSS
- **React Router DOM**: For client-side routing
- **Lucide React**: For icons
- **ESLint & Prettier**: For code quality and formatting

## Directory Structure

Create the following directory structure:

```
project-root/
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── package.json
├── postcss.config.mjs
├── tsconfig.json
├── webpack.config.js
├── .github/
│   └── copilot-instructions.md
├── public/
│   └── index.html
└── src/
    ├── App.tsx
    ├── index.tsx
    ├── types.d.ts
    ├── components/
    │   ├── index.ts
    │   └── MyButton/
    │       ├── index.ts
    │       └── MyButton.tsx
    ├── pages/
    │   ├── About.tsx
    │   ├── Home.tsx
    │   └── index.ts
    ├── styles/
    │   └── main.css
    ├── types/
    │   └── global.d.ts
    └── utils/
        ├── index.ts
        └── utilities.ts
```

## Step-by-Step File Creation

### 1. package.json

```json
{
  "name": "react-typescript-webpack",
  "version": "1.0.0",
  "description": "React v19+ with TypeScript, Webpack 5, and TailwindCSS v4.1+",
  "main": "index.js",
  "scripts": {
    "start": "webpack serve --mode development",
    "debug": "webpack serve --config webpack.config.js --mode development --port 3000",
    "build:prod": "webpack --mode production",
    "build:dev": "prettier --write src/**/*.{ts,tsx,css,html} && webpack --mode development",
    "prettier": "prettier --write src/**/*.{ts,tsx,css,html}",
    "browsersList": "npx update-browserslist-db@latest -y && node ./buildBrowsersListFormatted.js",
    "updates": "ncu -u && npm i",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix"
  },
  "keywords": ["react", "typescript", "webpack", "tailwindcss"],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "lucide-react": "^0.468.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.1.3",
    "tailwind-merge": "^2.6.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.18",
    "@tailwindcss/vite": "^4.1.6",
    "@types/node": "^25.0.9",
    "@types/react": "^19.0.6",
    "@types/react-dom": "^19.0.2",
    "@typescript-eslint/eslint-plugin": "^8.19.1",
    "@typescript-eslint/parser": "^8.19.1",
    "autoprefixer": "^10.4.23",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "css-loader": "^7.1.2",
    "esbuild-loader": "^4.3.0",
    "eslint": "^9.18.0",
    "eslint-plugin-react": "^7.37.3",
    "eslint-plugin-react-hooks": "^5.1.0",
    "file-loader": "^6.2.0",
    "globals": "^17.0.0",
    "html-webpack-plugin": "^5.6.3",
    "mini-css-extract-plugin": "^2.10.0",
    "postcss": "^8.5.1",
    "postcss-loader": "^8.1.1",
    "prettier": "^3.4.2",
    "prettier-plugin-tailwindcss": "^0.6.11",
    "speed-measure-webpack-v5-plugin": "^1.5.2",
    "style-loader": "^4.0.0",
    "tailwind-merge": "^3.4.0",
    "tailwindcss": "^4.1.6",
    "typescript": "^5.9.0",
    "typescript-eslint": "^8.53.1",
    "webpack": "^5.98.0",
    "webpack-cli": "^6.0.1",
    "webpack-dev-server": "^5.2.0"
  }
}
```

### 2. webpack.config.js

```javascript
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { fileURLToPath } from 'url';
import SpeedMeasurePlugin from 'speed-measure-webpack-v5-plugin';

const smp = new SpeedMeasurePlugin({ disable: false });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config = {
  entry: './src/index.tsx',
  devtool: 'eval-source-map',
  stats: {
    errorDetails: true,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js',
    clean: true,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'esbuild-loader',
        options: {
          target: 'es2020',
          loader: 'tsx',
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].chunk.css',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: Infinity,
    maxAssetSize: Infinity,
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
};

const smpconfig = smp.wrap(config, ['MiniCssExtractPlugin']);

export default smpconfig;
```

### 3. tsconfig.json

```jsonc
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "typeRoots": ["node_modules/@types"],
    "resolveJsonModule": true,
    "paths": {
      "@components": ["./src/components"],
      "@assets": ["./src/assets"],
      "@pages": ["./src/pages"],
      "@styles": ["./src/styles"],
      "@utils": ["./src/utils"],
    },
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"],
}
```

### 4. eslint.config.mjs

```javascript
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
```

### 5. postcss.config.mjs

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

### 6. .prettierrc

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### 7. .gitignore

```ignore
node_modules
dist
.DS_Store
*.log
.env
.env.local
.vscode
.idea
```

### 8. .github/copilot-instructions.md

```markdown
# React TypeScript Project with Webpack and TailwindCSS

## Project Overview

React v19+ application with TypeScript, Webpack 5, TailwindCSS v4.1+, and modern tooling.

## Tech Stack

- React v19+
- TypeScript v5.9+
- Webpack v5 with esbuild-loader
- TailwindCSS v4.1+
- React Router DOM
- Lucide React Icons
- ESLint & Prettier

## Development Guidelines

- Use TypeScript for all files
- Follow React 19 best practices
- Use Tailwind utility classes with tailwind-merge for conditional styling
- Use Lucide React for icons
- Follow ESLint and Prettier configurations
```

### 10. public/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React TypeScript App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

### 11. src/index.tsx

```tsx
import '@styles/main.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

### 12. src/App.tsx

```tsx
import { About, Home } from '@pages';
import { Link, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex space-x-8">
              <Link
                to="/"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
```

### 13. src/styles/main.css

```css
@import 'tailwindcss';

:root {
  --primary: #3b82f6;
  --secondary: #8b5cf6;
}
```

### 14. src/types.d.ts

```typescript
// Create a custom type definition file for image imports
declare module '*.jpg' {
  const src: string;
  export default src;
}
declare module '*.png' {
  const src: string;
  export default src;
}
declare module '*.jpeg' {
  const src: string;
  export default src;
}
declare module '*.gif' {
  const src: string;
  export default src;
}
declare module '*.svg' {
  const src: string;
  export default src;
}
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
```

### 15. src/types/global.d.ts

```typescript
declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}
```

### 16. src/utils/utilities.ts

```typescript
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 17. src/utils/index.ts

```typescript
export { cn } from './utilities';
```

### 18. src/components/MyButton/MyButton.tsx

```tsx
import { cn } from '@utils';
import React from 'react';

export type MyButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
};

const variantClasses = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  secondary: 'bg-gray-500 text-white hover:bg-gray-600',
  danger: 'bg-red-500 text-white hover:bg-red-600',
};
const MyButton = ({ variant = 'primary', className, ...props }: MyButtonProps) => {
  return (
    <button className={cn(variantClasses[variant], className)} {...props}>
      {props.children}
    </button>
  );
};

export default MyButton;
```

### 19. src/components/MyButton/index.ts

```typescript
export { default as MyButton } from './MyButton';
export type { MyButtonProps } from './MyButton';
```

### 20. src/components/index.ts

```typescript
export { default as MyButton } from './MyButton/MyButton';
```

### 21. src/pages/Home.tsx

```tsx
import { Code, Heart, Zap } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

function Home() {
  const features = [
    {
      icon: Heart,
      title: 'React v19+',
      description: 'Built with the latest React features',
      color: 'text-red-500',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized with Webpack 5 and esbuild-loader',
      color: 'text-yellow-500',
    },
    {
      icon: Code,
      title: 'TypeScript',
      description: 'Fully typed for better developer experience',
      color: 'text-blue-500',
    },
  ];

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Welcome to React TypeScript
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          A modern starter template with Webpack 5, TailwindCSS v4.1+, and TypeScript v5.9+
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <Icon className={twMerge('h-12 w-12', feature.color)} />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
```

### 22. src/pages/About.tsx

```tsx
import { MyButton } from '@components';
import { Package } from 'lucide-react';

function About() {
  const technologies = [
    'React v19+',
    'TypeScript v5.9+',
    'Webpack v5',
    'esbuild-loader',
    'TailwindCSS v4.1+',
    'React Router DOM',
    'Lucide React Icons',
    'tailwind-merge',
    'ESLint',
    'Prettier',
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Package className="mx-auto h-16 w-16 text-purple-500" />
        <h1 className="mt-4 text-3xl font-bold text-gray-900">About This Project</h1>
        <p className="mt-2 text-lg text-gray-600">
          A comprehensive React starter with modern tooling
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">Technologies Used</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {technologies.map((tech) => (
            <div key={tech} className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-gray-700">{tech}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-blue-50 p-6">
        <h3 className="font-semibold text-blue-900">Getting Started</h3>
        <ul className="mt-3 space-y-2 text-sm text-blue-800">
          <li>• Run `npm install` to install dependencies</li>
          <li>• Run `npm run dev` to start development server</li>
          <li>• Run `npm run build` to build for production</li>
          <li>• Run `npm run lint` to check code quality</li>
        </ul>
      </div>
      <div>
        <MyButton>Does Nothing</MyButton>
      </div>
    </div>
  );
}

export default About;
```

### 23. src/pages/index.ts

```typescript
export { default as About } from './About';
export { default as Home } from './Home';
```

## Installation & Setup Commands

After creating all files above, run these commands in order:

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm start

# 3. Verify the app opens at http://localhost:3000
```

## Build Commands

```bash
# Development build
npm run build:dev

# Production build
npm run build:prod

# Run linter
npm run lint

# Fix lint errors automatically
npm run lint:fix

# Format code with Prettier
npm run prettier
```

## Key Features

1. **Module Aliases**: Path aliases configured in both tsconfig.json and webpack.config.js
   - `@components` → src/components
   - `@pages` → src/pages
   - `@styles` → src/styles
   - `@utils` → src/utils
   - `@assets` → src/assets

2. **Fast Builds**: Uses esbuild-loader instead of babel for 10-20x faster builds

3. **TailwindCSS v4.1+**: Latest version with PostCSS integration

4. **Code Splitting**: Automatic vendor chunk splitting for optimal performance

5. **React Router**: Client-side routing with Home and About pages

6. **Lucide Icons**: Modern icon library with tree-shaking support

7. **Utility Function**: `cn()` function for conditional class merging with tailwind-merge

## Verification Steps

After setup, verify:

1. ✅ Development server starts without errors
2. ✅ App opens in browser at http://localhost:3000
3. ✅ Navigation between Home and About pages works
4. ✅ Icons render properly on both pages
5. ✅ TailwindCSS styles are applied correctly
6. ✅ MyButton component renders on About page
7. ✅ No TypeScript errors in the editor
8. ✅ `npm run lint` passes without errors
9. ✅ `npm run build:prod` creates a dist folder successfully

## Project Characteristics

- **Type**: ES Modules (all config files use .mjs or import/export syntax)
- **Package Manager**: npm (package-lock.json expected)
- **Build Tool**: Webpack 5 with custom configuration
- **Development Port**: 3000
- **Output Directory**: dist/
- **Entry Point**: src/index.tsx

## Notes

- The project uses ES module syntax (`import`/`export`) throughout, including config files
- TypeScript strict mode is enabled for better type safety
- Prettier is configured to work with TailwindCSS (automatic class sorting)
- Webpack dev server has hot module replacement (HMR) enabled
- The project includes speed measurement plugin for build performance monitoring
- Path aliases must match between tsconfig.json and webpack.config.js for consistency

---

**Last Updated**: January 2026
**React Version**: 19.0.0
**TypeScript Version**: 5.9.0
**TailwindCSS Version**: 4.1.6

## AI Prompt Usage Instructions

To use this document as an AI prompt to recreate the project:

1. **Copy this entire build.md file**
2. **Provide it to an AI assistant with the prompt**:
   ```
   Please recreate this React TypeScript project exactly as specified in this build.md file.
   Create all the files with the exact content shown, maintaining the directory structure.
   ```
3. **The AI should create files in this order**:
   - Configuration files first (package.json, webpack.config.js, tsconfig.json, etc.)
   - Public files (index.html)
   - Source utility files (types, utils)
   - Components (MyButton)
   - Pages (Home, About)
   - Main app files (App.tsx, index.tsx)
   - Styles (main.css)

4. **After all files are created, run**:

   ```bash
   npm install
   npm start
   ```

5. **The project should**:
   - Install all dependencies without errors
   - Start the dev server on port 3000
   - Display a working React app with routing
   - Pass linting checks
