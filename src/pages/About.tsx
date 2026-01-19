import { MyButton, Tooltip, TooltipContent, TooltipTrigger } from '@components';
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
    "ShadCn/ui's Radix UI Components",
    'Class Variance Authority',
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
        <Tooltip>
          <TooltipTrigger asChild>
            <MyButton variant="primary">Hover Button</MyButton>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>You are hovering</p>
          </TooltipContent>
        </Tooltip>{' '}
      </div>
    </div>
  );
}

export default About;
