if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then(registration => {
          console.log('Service Worker registrado con éxito:', registration);
  
          // Solicitar permiso para notificaciones
          if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
              if (permission === 'granted') {
                console.log('Notification permission granted.');
              } else {
                console.log('Notification permission denied.');
              }
            });
          }
        })
        .catch(error => {
          console.log('Error al registrar el Service Worker:', error);
        });
    });
  }

  function displayNotification(){
    if(Notification.permission === 'granted'){
      navigator.serviceWorker.getRegistrations()
      .then(reg =>{
        reg.showNotification('hello world')
      })
    }
  }