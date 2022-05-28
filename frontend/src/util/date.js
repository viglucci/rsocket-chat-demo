import { format } from 'date-fns';

export const timeFromMillis = (millis) => {
    return format(millis, 'hh:mm');
}
