const getWorker = async () => {
     if('serviceWorker' in navigator) {
          const worker = await navigator.serviceWorker.register('../../service-workers.js');
          console.log('Service worker berhasil di dafarkan' + worker);
     }else {
          alert('Browser anda tidak support service worker...');
     }
}

getWorker();