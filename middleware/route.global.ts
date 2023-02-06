export default defineNuxtRouteMiddleware((to, from) => {
	if (to.path !== from.path && process.client) {
		setTimeout(() => {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth',
			});
		}, 450);
	}

	// const cookie_accessToken = useCookie('accessToken');
	// if (to.path.includes('/') && !!cookie_accessToken.value) {
	// 	return navigateTo('/dashboard');
	// }
});
