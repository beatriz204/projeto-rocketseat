import nodemailer from 'nodemailer';
import express from 'express'; 
import { prisma } from './prisma';


const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "8eed378982e027",
      pass: "b2d696ca0c8790"
    }
  });


app.post('/feedbacks', async (req, res) =>{

const {type, comment, screenshot} = req.body;

const feedback = await prisma.feedback.create({
    data:{
        type,
        comment,
        screenshot,
    }
})


await transport.sendMail({

  from: 'Equipe: Feedget <oi@feedget.com>',  
  to: 'Beatriz Vieira rojo <bvieirarojo@gmail.com>',
  subject: 'novo feedback',
  html: [
      `<div style="font-family: sans-serif; font-size:16px;color:#111;">`,
      `<p> Tipo do feedback ${type}</p>`,
      `<p> Comentario: ${comment} </p>`,
      `</div>`
  ].join('\n')
});

return res.status(201).json({data: feedback});
});


app.listen(3333, () => {
    console.log('HTTP server running!');
});