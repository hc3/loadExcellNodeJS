import server from './app';

async function start() {
    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
    }

    console.log('Server running at: ' + server.info.uri)
}

export default start;