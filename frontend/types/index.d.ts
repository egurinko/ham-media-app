type NoProps = Record<string, never>;

type GenericChangeEvent<T> = React.ChangeEvent<{ value: T }>;
