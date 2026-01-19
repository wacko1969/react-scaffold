import { MyButton, MyTooltip, MyTooltipContent, MyTooltipTrigger } from '@components';
import { PackageOpen } from 'lucide-react';

function Samples() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <PackageOpen className="mx-auto h-16 w-16 text-purple-500" />
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Shadcn Samples</h1>
        <p className="mt-2 text-lg text-gray-600">
          Examples for using Shadcn/ui components in your project
        </p>
      </div>

      <div className="rounded-lg bg-blue-50 p-6">
        <h3 className="pb-8 text-center text-2xl font-semibold text-blue-900">Components</h3>
        <MyTooltip>
          <MyTooltipTrigger asChild>
            <MyButton variant="primary">Hover Button</MyButton>
          </MyTooltipTrigger>
          <MyTooltipContent side="right">
            <p>You are hovering</p>
          </MyTooltipContent>
        </MyTooltip>
      </div>
    </div>
  );
}

export default Samples;
