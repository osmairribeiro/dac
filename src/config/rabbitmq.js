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

        const queueName = 'saga.autocadastro.customer-res';

        channel.consume(queueName, async (message) => {
          if (message !== null) {
            const data = JSON.parse(message.content.toString());
            const { name, email, password, type } = data;
            const user = await User.create({
                name,
                email,                    
                password,
                type: 'customer'
            });
                
            channel.ack(message);
          }
        });

    } catch (error) {
        console.error(`ERROR: ${error.message}`);
    }
}

module.exports = connectAMQP;