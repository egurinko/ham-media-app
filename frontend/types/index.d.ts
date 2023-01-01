type NoProps =
  | Record<string, never>
  | {
      children?: ReactNode;
    };

type GenericChangeEvent<T> = React.ChangeEvent<{ value: T }>;

type UseStateAction<S> = React.Dispatch<React.SetStateAction<S>>;

declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGElement>>;
  export default content;
}
