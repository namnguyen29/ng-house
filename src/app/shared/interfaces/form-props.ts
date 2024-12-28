export interface TextInputProps {
  id: string;
  label: string;
  name: string;
  type: 'text' | 'password';
  placeholder: string;
  error?: string;
  multi?: boolean;
  autocomplete?: string;
  autofocus?: boolean;
}
