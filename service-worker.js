const CACHE_NAME = 'bigcorps-v2';
const urlsToCache = [
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/favicon.ico'
  // Adicione outros arquivos que quer garantir offline aqui
];

// Instalação: cache inicial
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Ativação: limpeza de caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch: cache first, network fallback, fallback para offline (se quiser)
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return; // Não cacheie POST etc

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) return cachedResponse;
        return fetch(event.request)
          .then(networkResponse => {
            // Opcional: salva no cache para futuros acessos
            // Só faz cache se for um request bem-sucedido (status 200)
            if (
              networkResponse &&
              networkResponse.status === 200 &&
              networkResponse.type === 'basic'
            ) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseClone));
            }
            return networkResponse;
          })
          .catch(() => {
            // Se quiser, devolve uma página offline customizada
            // return caches.match('/offline.html');
          });
      })
  );
});

// Background Sync - envia ações pendentes quando voltar online
self.addEventListener('sync', event => {
  if (event.tag === 'sync-actions') {
    event.waitUntil(syncActions());
  }
});

async function syncActions() {
  // Sua lógica aqui para reenviar ações guardadas offline
  // Exemplo:
  // const actions = await getPendingActions();
  // for (const action of actions) { await fetch(...); }
}

// Periodic Sync - atualizar dados em background (cheque suporte!)
self.addEventListener('periodicsync', event => {
  if (event.tag === 'update-data') {
    event.waitUntil(updateData());
  }
});

async function updateData() {
  // Exemplo: faça fetch de dados e salve no cache ou IndexedDB
  // await fetch('/api/atualizar');
}

// Push notification
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "Notificação BigCorps";
  const options = {
    body: data.body || "",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-192x192.png"
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
