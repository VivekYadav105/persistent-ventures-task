const prismaClient = require('@prisma/client')

const client = new prismaClient.PrismaClient()

client.$connect().then(() => {
    console.log("connected to database");
}).catch(err=>{
    console.log(err);
})

function getPrismaClient() {
    return client
}

module.exports = {client, getPrismaClient}