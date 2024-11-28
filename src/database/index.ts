import { connect, ConnectOptions, set } from 'mongoose';
import { NODE_ENV, DB_HOST, DB_PORT, DB_DATABASE } from '@config';

export const dbConnection = async () => {
  const dbConfig = {
    url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as unknown as ConnectOptions,
  };

  if (NODE_ENV !== 'production') {
    set('debug', true);
  }

  await connect(dbConfig.url, dbConfig.options);
}
