export type NavItem = {
  label: string;
  icon?: string;
  to?: string;
  children?: NavItem[];
  external?: boolean;
};
export type QuestionOption = {
  label: string;
  value: string | number | boolean;
  allowCustom?: boolean;
  children?: QuestionNode[];
};
export type QuestionNode =
  | {
      key: string;
      label: string;
      type: 'text' | 'number';
      placeholder?: string;
      options?: QuestionOption[];
    }
  | {
      key: string;
      label: string;
      type: 'radio' | 'checkbox' | 'toggle';
      layout?: 'row' | 'col' | `grid-${1 | 2 | 3 | 4 | 5 | 6}`;
      childrenLayout?: 'row' | 'col' | `grid-${1 | 2 | 3 | 4 | 5 | 6}`;
      labelPosition?: 'left' | 'right';
      options: Array<{
        label: string;
        value: any;
        children?: QuestionNode[];
        childrenLayout?: 'row' | 'col' | `grid-${1 | 2 | 3 | 4 | 5 | 6}`;
        allowCustom?: boolean;
      }>;
    };
