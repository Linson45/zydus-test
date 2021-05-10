import firebase from 'react-native-firebase';
import type { Notification, NotificationOpen } from 'react-native-firebase';

class FCMService {
  register = (onRegister, onNotification, onOpenNotification) => {
    this.checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    );
  };

  checkPermission = (onRegister) => {
    firebase
      .messaging()
      .hasPermission()
      .then((enable) => {
        if (enable) {
          this.getToken(onRegister);
        } else {
          this.requestPermission(onRegister);
        }
      })
      .catch((error) => {
        console.log(`permission Rejected${error}`);
      });
  };

  getToken = (onRegister) => {
    firebase
      .messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          onRegister(fcmToken);
        } else {
          console.log('user does not have token for this device');
        }
      })
      .catch((error) => {
        console.log(`Token Rejected${error}`);
      });
  };

  requestPermission = (onRegister) => {
    firebase
      .messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch((error) => {
        console.log(`Request permission Rejected${error}`);
      });
  };

  deleteToken = () => {
    firebase
      .messaging()
      .deleteToken()
      .catch((error) => {
        console.log(`Delete Token error${error}`);
      });
  };

  createNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification,
  ) => {
    this.notificationListener = firebase
      .notifications()
      .onNotification((notification: Notification) => {
        onNotification(notification);
      });

    this.notificationOpenListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen: NotificationOpen) => {
        if (notificationOpen) {
          const { notification } = notificationOpen;
          onOpenNotification(notification);
          this.removeDeliveredNotification(notification);
        }
      });

    firebase
      .notifications()
      .getInitialNotification()
      .then((notificationOpen) => {
        if (notificationOpen) {
          const { notification } = notificationOpen;
          onOpenNotification(notification);
          this.removeDeliveredNotification(notification);
        }
      });

    this.messageListener = firebase.messaging().onMessage((message) => {
      onNotification(message);
    });

    this.onTokenRefreshListener = firebase
      .messaging()
      .onTokenRefresh((fcmToken) => {
        console.log('new token refresh', fcmToken);
        onRegister(fcmToken);
      });
  };

  unRegister = () => {
    this.notificationListener();
    this.notificationOpenListener();
    this.messageListener();
    this.onTokenRefreshListener();
  };

  buildChannel = (obj) => new firebase.notifications.Android.Channel(
    obj.channelId,
    obj.channelName,
    firebase.notifications.Android.Importance.High,
  ).setDescription(obj.channelDes);

  buildNotification = (obj) => {
    // For Android
    firebase.notifications().android.createChannel(obj.channel);

    // For Android and IOS
    return (
      new firebase.notifications.Notification()
        .setSound(obj.sound)
        .setNotificationId(obj.dataId)
        .setTitle(obj.title)
        .setBody(obj.content)
        .setData(obj.data)

        // For Android
        .android.setChannelId(obj.channel.channelId)
        .android.setLargeIcon(obj.largeIcon)
        .android.setSmallIcon(obj.smallIcon)
        .android.setColor(obj.colorBgIcon)
        .android.setPriority(firebase.notifications.Android.Priority.High)
        .android.setVibrate(obj.vibrate)
    );
  };

  scheduleNotification = (notification, days, minutes) => {
    const date = new Date();
    if (days) {
      date.setDate(date.getDate() + days);
    }
    if (minutes) {
      date.setMinutes(date.getMinutes());
    }
    firebase
      .notifications()
      .scheduleNotification(notification, { fireDate: date.getTime() });
  };

  displayNotification = (notification) => {
    firebase
      .notifications()
      .displayNotification(notification)
      .catch((error) => console.log(`Display Notification error${error}`));
  };

  removeDeliveredNotification = (notification) => {
    firebase
      .notifications()
      .removeDeliveredNotification(notification.notificationId);
  };
}

export const fcmService = new FCMService();
