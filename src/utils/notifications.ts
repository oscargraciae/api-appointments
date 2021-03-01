import OneSignal from 'onesignal-node';
import { Booking } from '../entity/Booking';

const createNotification = async (booking: Booking) => {
  const client = new OneSignal.Client('21792b91-5514-4525-8925-fef85c09b43a', 'NjA1YmVmOGEtMTYzYy00YmI5LTlmNDUtMGE0OTY5MDAwOGQw');
  // const userClient = new OneSignal.UserClient('Mjg1ZWJjZGMtYTI3Ni00OTg0LWIyMTktN2E2ZDdlMjkzODM2');
  // Encuesta Mar del Zur Mesero : (105) Ismael Perez - Mesa : 15

  console.log('Enviando notificación PUSH', booking.createdAt);
  
  const notification = {
    contents: {
      'tr': 'Yeni bildirim',
      'en': 'New notification',
    },
    included_segments: ['Subscribed Users'],
    filters: [
      { field: 'tag', key: 'level', relation: '>', value: 10 }
    ]
  };
  
  const response = await client.createNotification(notification);
  console.log(response.body.id);

  // const firstNotification = new OneSignal.Notification({
  //   contents: {
  //     en: message,
  //   },
  //   // included_segments: ['Active Users'],
  //   filters: [
  //     {
  //       field: 'tag', key: 'userId', relation: '=', value: `${userId}`,
  //     },
  //     {
  //       field: 'tag', key: 'schemakey', relation: '=', value: schemakey,
  //     },
  //   ],
  // });

}

export { createNotification };