import http from 'http';
import { port } from './src/config/config';
import app from './app';
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
