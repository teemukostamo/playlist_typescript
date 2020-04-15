import React from 'react';
import { NotificationState } from '../../../store/notification/types';

interface Props {
  notification: NotificationState;
}
const ModalNotification: React.FC<Props> = ({ notification }) => {
  if (notification.type === 'success') {
    return <span style={{ color: 'green' }}>{notification.message}</span>;
  }
  if (notification.type === 'fail') {
    return <span style={{ color: 'red' }}>{notification.message}</span>;
  }
  return null;
};

export default ModalNotification;
