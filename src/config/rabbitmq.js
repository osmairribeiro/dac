const amqp = require('amqplib');
const User = require('../models/User');

const connectAMQP = async () => {
    const user = 'guest';
    const password = 'guest';
    const hostname = 'localhost';
    const port = 5672;

    try {
        const connection = await amqp.connect(`amqp://${user}:${password}@${hostname}:${port}`);
        const channel = await connection.createChannel();

        console.log(`AMQP CONNECTED: ${connection.connection.serverProperties.host} 🥳`);

        const queueNameRead = 'saga.autocadastro.auth-req';
        const queueNameWriter = 'saga.autocadastro.auth-res';

        channel.consume(queueNameRead, async (message) => {
          if (message !== null) {
            const data = JSON.parse(message.content.toString());
            const { name, email, password } = data;
            const user = await User.create({
                name,
                email,                    
                password,
                type: 'customer'
            });
                
            channel.ack(message);
            channel.sendToQueue(queueNameWriter, message.content);
          }
        });


    } catch (error) {
        console.error(`ERROR: ${error.message}`);
    }
}

module.exports = connectAMQP;