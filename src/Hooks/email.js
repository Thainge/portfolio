const NODE_URL = 'https://simply-cyber.herokuapp.com/sendemail';
// const NODE_URL = 'http://localhost:3080/sendemail';

const sendEmail = async (data) => {
    return await fetch(`${NODE_URL}`, {
        method: "post",
        body: data,
    });
}

export {
    sendEmail
}