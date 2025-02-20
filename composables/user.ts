import { useState } from '#app';

export const useUser = () => useState('user', () => null);
export const useSession = () => useState('session', () => null);
export const useAccessToken = () => useState('accessToken', () => '');
export const useRefreshToken = () => useState('refreshToken', () => '');

export function getAccessToken() {
	const accessToken = useAccessToken();

	if (!accessToken.value) return null;

	const cookie_accessToken = useCookie('accessToken');
	if (cookie_accessToken.value != accessToken.value) {
		accessToken.value = cookie_accessToken.value;
	}

	return accessToken.value;
}

export function getRefreshToken() {
	const refreshToken = useRefreshToken();

	if (!refreshToken.value) return null;

	const cookie_refreshToken = useCookie('refreshToken');
	if (cookie_refreshToken.value != refreshToken.value) {
		refreshToken.value = cookie_refreshToken.value;
	}

	return refreshToken.value;
}

export function setStates(response: any) {
	const user = useUser();
	const cookie_user = <any>useCookie('user');
	user.value = response?.user ?? null;
	cookie_user.value = user.value;

	const session = useSession();
	const cookie_session = <any>useCookie('session');
	session.value = response?.session ?? null;
	cookie_session.value = session.value;

	const accessToken = useAccessToken();
	const cookie_accessToken = useCookie('accessToken');
	accessToken.value = response?.access_token ?? null;
	cookie_accessToken.value = accessToken.value;

	const refreshToken = useRefreshToken();
	const cookie_refreshToken = useCookie('refreshToken');
	refreshToken.value = response?.refresh_token ?? null;
	cookie_refreshToken.value = refreshToken.value;

	if (response == null) {
		const router = useRouter();
		router.push('/');
	}
}

export const isAuth = computed((): boolean => {
	const accessToken = useAccessToken();
	return Boolean(accessToken.value);
});

export const hasEmail = computed((): boolean => {
	const user = <any>useUser();
	return Boolean(user.value?.email ?? '');
});

export async function getUser() {
	const user = <any>useUser();
	let user_id = user?.value?.id ?? null;

	try {
		if (!user_id) {
			throw { data: 'Invalid User Id' };
		}
		const response = await GET(`/auth/users/${user_id}`);

		const user = useUser();
		const cookie_user = <any>useCookie('user');
		user.value = response ?? null;
		cookie_user.value = user.value;

		return [response, null];
	} catch (error: any) {
		return [null, error.data];
	}
}
