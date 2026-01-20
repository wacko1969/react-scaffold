import { Shadcn } from '@assets';
import { cn } from '@utils';
import { Code, Heart, Zap } from 'lucide-react';

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
    {
      svg: Shadcn,
      title: 'Shadcn/ui',
      description: 'Includes examples using Shadcn/ui components',
      color: 'text-purple-500',
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

      <div className="grid grid-cols-4 gap-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          const Svg = feature.svg;
          return (
            <div
              key={feature.title}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              {Icon ? (
                <Icon className={cn('h-12 w-12', feature.color)} />
              ) : Svg ? (
                <img
                  src={Svg}
                  alt={`${feature.title} logo`}
                  className={cn('h-12 w-12', feature.color)}
                />
              ) : null}
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
