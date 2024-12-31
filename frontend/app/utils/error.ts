import { isApolloError } from '@apollo/client';

const isError = (error: unknown): error is Error => error instanceof Error;

type SerializedError = {
  message: string;
};

export const serializeError = (e: unknown): SerializedError => {
  if (isError(e)) {
    if (isApolloError(e)) {
      if (e.graphQLErrors.length >= 1) {
        return {
          message: e.graphQLErrors[0].message,
        };
      }
    }
  }

  return {
    message: 'システムエラーが発生しました。',
  };
};
