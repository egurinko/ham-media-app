import { objectType } from 'nexus';

export const batchPayloadType = objectType({
  name: 'BatchPayload',
  definition(t) {
    t.nonNull.int('count');
  },
});
