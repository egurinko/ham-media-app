export type FormStateBase<T> = {
  errors?: {
    [K in keyof T]?: string[];
  };
  message: string;
};
