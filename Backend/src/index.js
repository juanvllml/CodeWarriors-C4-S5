import { server } from './server';
import './database';

const listen_port = process.env.PORT || 5100

server.start({port: listen_port}, ({port}) => {
    console.log('Server on port', port);
})