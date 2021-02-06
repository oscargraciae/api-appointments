import sgMail, { MailDataRequired } from '@sendgrid/mail';
import sgClient from '@sendgrid/client';
import { formatDateLG, formatDate } from '../utils/formatDate';


import { Booking } from '../entity/Booking';
import { User } from "../entity/User";
import { minutesToHour } from '../utils/minutesToHour';

// export const mailWelcomeUser = (user: User) => {
//   console.log('Enviando correo');
  
//   const msg : MailDataRequired = {
//     from: 'hola@reserly.mx', // Change to your verified sender
//     to: 'oscar.graciae@gmail.com', // Change to your recipient
//     // subject: 'Sending with SendGrid is Fun',
//     // text: 'and easy to do anywhere, even with Node.js',
//     // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//     templateId: 'd-26e72218c47145bcbdccaffa5d741d11',
//   }

//   sgMail.send(msg).then(() => {
//     console.log('Email sent')
//   }).catch((error) => {
//     console.log('Email ERROR', error.message)
//     console.error(error)
//   })
// }

export const sendMailWelcomeUser = (user: User) => {
  const msg : MailDataRequired = { 
    from: 'Reserly <hola@reserly.mx>',
    to: user.email,
    templateId: 'd-26e72218c47145bcbdccaffa5d741d11',
    dynamicTemplateData: {
      name: user.firstName,
    },
  }

  sgMail.send(msg).then(() => {
    console.log('Email sent')
  }).catch((error) => {
    console.log('Email ERROR', error.message)
    console.error(error)
  })
}

export const sendMailWelcomeStore = (email: string) => {
  const msg : MailDataRequired = { 
    from: 'Reserly <hola@reserly.mx>',
    to: email,
    templateId: 'd-244b404bc2ab4ba08b8d283a302dafff',
  }

  sgMail.send(msg).then(() => {
    console.log('Email sent', email)
  }).catch((error) => {
    console.log('Email ERROR', error.message)
    console.error(error)
  })
}

export const sendMailReservation = (booking: Booking) => {
  const msg : MailDataRequired = { 
    from: 'Reserly <hola@reserly.mx>',
    to: booking.business.businessUser[0].user.email,
    templateId: 'd-a7359a9f17f64692a28c15093c7ea0b7',
    dynamicTemplateData: {
      customerName: `${booking.customer.firstName} ${booking.customer.lastName}`,
      createdAt: formatDate(booking.createdAt),
      bookingDate: formatDateLG(booking.bookingDate),
      time: minutesToHour(booking.totalTime),
      price: `$${booking.totalPrice}MXN`,
      urlDetail: `https://reserly.mx/manager/bookings/${booking.id}`
    }
  }

  sgMail.send(msg).then(() => {
    console.log('Email sent to', booking.business.businessUser[0].user.email)
  }).catch((error) => {
    console.log('Email ERROR', error.message)
    console.error(error)
  })
}

export const sendMailChangePassword = (user: User, token: string) => {
  const msg : MailDataRequired = { 
    from: 'Reserly <hola@reserly.mx>',
    to: user.email,
    templateId: 'd-7146674ba15c432196fceaadd2ef990d',
    dynamicTemplateData: {
      name: `${user.firstName}`,
      url: `https://reserly.mx/change-password/${token}`
    }
  }

  sgMail.send(msg).then(() => {
    console.log('Email sent to', user.email)
  }).catch((error) => {
    console.log('Email ERROR', error.message)
    console.error(error)
  })
}

export const addContact = (user: User) => {
  const request : any = {
    method: 'PUT',
    url: '/v3/marketing/contacts',
    body: {
      list_ids: ['83afac0f-14e3-460e-abd8-55efc7eafa1a'],
      contacts: [
        {
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email
        }
      ]
    }
  };

  sgClient.request(request)
    .then(([response, body]) => {
      console.log(response.statusCode);
      console.log(body);
  }).catch((error) => {
    console.log('ERror add cliente', error);
  })
}

export const addContactBusiness = (user: User) => {
  const request : any = {
    method: 'PUT',
    url: '/v3/marketing/contacts',
    body: {
      list_ids: ['d3daf161-1187-4cc1-b7b6-8b7fd107999f'],
      contacts: [
        {
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email
        }
      ]
    }
  };

  sgClient.request(request)
    .then(([response, body]) => {
      console.log(response.statusCode);
      console.log(body);
  }).catch((error) => {
    console.log('ERror add cliente', error);
  })
}