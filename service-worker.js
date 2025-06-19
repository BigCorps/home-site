const CACHE_NAME = 'bigcorps-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/favicon.ico'
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

// Fetch: cache first, network fallback
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
  );
});

// Offline fallback simples (opcional, pode criar um offline.html)
// Background Sync - envia ações pendentes quando online
self.addEventListener('sync', event => {
  if (event.tag === 'sync-actions') {
    event.waitUntil(syncActions());
  }
});

async function syncActions() {
  // Exemplo: reenviar ações guardadas no IndexedDB/localStorage
  // Aqui você implementa sua lógica de sincronização offline
  // Exemplo ilustrativo:
  // const actions = await getPendingActions();
  // for (const action of actions) { await fetch(...); }
}

// Periodic Sync - atualizar dados em background
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
