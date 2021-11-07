type NoProps = Record<string, never>;

type GenericChangeEvent<T> = React.ChangeEvent<{ value: T }>;

type UseStateAction<S> = React.Dispatch<React.SetStateAction<S>>;
