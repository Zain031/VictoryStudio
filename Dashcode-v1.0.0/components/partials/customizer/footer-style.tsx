"use client";
import { useConfig } from "@/hooks/use-config";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const FooterStyle = () => {
  const [config, setConfig] = useConfig();

  const { footer } = config;

  return (
    <div className="-mx-6 p-6 pb-0">
      <div className="text-sm font-medium mb-3">Footer Type</div>

      <RadioGroup
        defaultValue={footer}
        className="flex flex-wrap items-center gap-3"
        onValueChange={(value) => {
          setConfig({ ...config, footer: value as any });
        }}

      >
        {["sticky", "hidden", "default"].map((value, index) => {
          return (
            <div className="flex items-center space-x-2" key={index}>
              <RadioGroupItem value={value} id={`footer-style-${value}`} disabled={config.layout === 'compact' && value !== 'sticky'} />
              <Label className={cn('capitalize', {
                'opacity-50 cursor-not-allowed': config.layout === 'compact' && value !== 'sticky'
              })} htmlFor={`footer-style-${value}`}>
                {value}
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default FooterStyle;
