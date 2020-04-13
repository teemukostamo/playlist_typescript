export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';

export interface NotificationState {
  message: string | null;
  type: 'success' | 'fail' | null;
}

interface NotificationData {
  message: string;
  type: 'success' | 'fail';
}

interface SetNotification {
  type: typeof SET_NOTIFICATION;
  data: NotificationData;
}

interface ClearNotification {
  type: typeof CLEAR_NOTIFICATION;
}

export type NotificationActionTypes = ClearNotification | SetNotification;
