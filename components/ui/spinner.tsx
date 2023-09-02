import { Loader2, LucideProps } from 'lucide-react';

export const Spinner = (props: LucideProps) => (
  <Loader2 className="animate-spin" {...props} />
);
