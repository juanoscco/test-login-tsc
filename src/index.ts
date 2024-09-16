import { createConnection } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

import app from './app';

const PORT = process.env.PORT || 8080;


createConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log('%cerror src/index.ts line:14 ', 'color: red; display: block; width: 100%;', err))