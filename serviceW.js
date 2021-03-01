const VERSION = "v1"

self.addEventListener("install", event => {
    event.waitUntil(preCache()).catch(e => {
        console.log(e.message)
    })
})

self.addEventListener("fetch", event => {
    const request = event.request
    if (request.method !== "GET" || request.destination === "video") {
        return;
    }
    
    event.respondWith(Responder(request))

    event.waitUntil(Update(request))
})

async function preCache() {
    const cache = await caches.open(VERSION)
    return cache.addAll([
        "/",
        
    ])
}

 async function Responder(request) {
    const cache =  await caches.open(VERSION)
    const response = await cache.match(request)
    return response || await fetch(request)
}

async function Update(request) {
    const cache =  await caches.open(VERSION)
    const response = await fetch(request)
    
    return cache.put(request, response)
}