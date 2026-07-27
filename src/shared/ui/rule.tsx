import { cn } from "@/shared/lib/cn";

interface RuleProps {
  className?: string;
}

export function Rule({ className }: RuleProps) {
  return <hr className={cn("border-t border-sand", className)} />;
}
