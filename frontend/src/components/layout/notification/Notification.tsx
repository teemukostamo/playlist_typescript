import React from 'react';
import { Message } from 'semantic-ui-react';
import { NotificationState } from '../../../store/notification/types';

interface Props {
  notification: NotificationState;
}

const Notification: React.FC<Props> = ({ notification }) => {
  if (notification.type === 'success') {
    return (
      <div className='fixedTop'>
        <Message floating success header={notification.message} />
      </div>
    );
  }

  if (notification.type === 'fail') {
    return (
      <div className='fixedTop'>
        <Message floating negative header={notification.message} />
      </div>
    );
  }

  return null;
};

export default Notification;
