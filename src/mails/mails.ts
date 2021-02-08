import sgMail, { MailDataRequired } from '@sendgrid/mail';
import sgClient from '@sendgrid/client';
import { formatDateLG, formatDate } from '../utils/formatDate';


import { Booking } from '../entity/Booking';
import { User } from "../entity/User";
import { minutesToHour } from '../utils/minutesToHour';

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

export const sendMailNotificationCustomer = (booking: Booking, to: string, status: string) => {
  console.log('booking email', booking);
  console.log('booking TO', to);
  
  const msg : MailDataRequired = { 
    from: 'Reserly <hola@reserly.mx>',
    to,
    templateId: 'd-d90e2c1ff1a3489693fe135d0b2180da',
    dynamicTemplateData: {
      subject: `Notificación: Tu reservación fue ${status}`,
      businessName: booking.business.name,
      customerName: `${booking.customer.firstName}`,
      bookingDate: formatDateLG(booking.bookingDate),
      time: minutesToHour(booking.totalTime),
      price: `$${booking.totalPrice}MXN`,
      urlDetail: `https://reserly.mx/bookings`,
      status: status,
    }
  }

  sgMail.send(msg).then(() => {
    console.log('Email sent to', to)
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