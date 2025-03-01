export interface InputFieldProps {
    label: string;
    symbol: string;
    id: string;
    value: number | string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }