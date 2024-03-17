import { isApolloError } from '@apollo/client';

const isError = (error: unknown): error is Error => error instanceof Error;

type SerializedError = {
  message: string;
};

export const serializeError = (e: unknown): SerializedError => {
  if (isError(e)) {
    console.log('isERROR');
    if (isApolloError(e)) {
      console.log('isApolloError');
      if (e.graphQLErrors.length >= 1) {
        console.log('graphQLErrors');
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
