// TypeScript declaration for workbox
declare const workbox: {
	skipWaiting(): void;
	clientsClaim(): void;
	routing: {
		registerRoute(
			route: RegExp | string,
			strategy: any
		): void;
	};
	strategies: {
		staleWhileRevalidate(options: { cacheName: string }): any;
	};
	precaching: {
		precacheAndRoute(manifest: any[]): void;
	};
};

// Adding an export to make this file a module
export {};

declare global {
	interface ServiceWorkerGlobalScope {
		__precacheManifest?: any[];
	}
}

workbox.skipWaiting();
workbox.clientsClaim();

workbox.routing.registerRoute(
	new RegExp("https:.*min\\.(css|js)"),
	workbox.strategies.staleWhileRevalidate({
		cacheName: "cdn-cache"
	})
);

workbox.precaching.precacheAndRoute((self as unknown as ServiceWorkerGlobalScope).__precacheManifest || []);
