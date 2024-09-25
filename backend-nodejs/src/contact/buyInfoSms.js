import twilio from 'twilio';

const accountSid = 'xx';
const authToken =  'xx';

const client = twilio(accountSid, authToken);

const sendInfoSms = async(products, email) => {
    const productHtml = products.map((product) => {
        return `- ${product.title} - ${product.price} -`;
      }).join('');

    try {

        const smsOptions = {
            from: '+14346088383',
            to: '+543515144695',
            body: `Su pedido ha sido recibido y se encuentra en proceso. Productos seleccionados: ${productHtml} ///// Registrado con el email: ${email}`,
        };

        const message = await client.messages.create(smsOptions);

        console.log(message);

    } catch (error) {
        console.log(error)
    }
}

export default sendInfoSms;