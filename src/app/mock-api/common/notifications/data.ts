/* eslint-disable */
import { DateTime } from 'luxon';

/* Get the current instant */
const now = DateTime.now();

export const notifications = [
    {
        id         : '493190c9-5b61-4912-afe5-78c21f1044d7',
        icon       : 'mat_solid:meeting_room',
        title      : 'Daily challenges',
        description: 'Your submission has been accepted',
        time       : now.minus({minute: 25}).toISO(), // 25 minutes ago
        read       : false
    },
   
];
