import { writable } from 'svelte/store';
export const NAME: string = 'AGARAM';
export const ADMIN_PASSWORD: string = 'admin';
export let LOGGED_IN = writable<boolean>(false);
export let USER_TYPE = writable<'ADMIN' | 'CLIENT' | null>(null);
const PASSWORD_TIMEOUT: number = 30; // In minutes

const SHEET_ID: string = '1YkREKvEnK_Iz3mSLTL2UFy_g0dWcYZT-i-CpbxZWLjQ';
export const USER_DATA_URL: string = `https://access-sheets-api-backend.vercel.app/sheet/?id=${SHEET_ID}`;

export let ERROR = writable<string[]>(['']);
export const RESET_ERROR = () => {
	setTimeout(() => {
		ERROR.set(['']);
	}, 3000);
};

export const SET_PASSWORD_TRUE = (type: 'ADMIN' | 'CLIENT') => {
	LOGGED_IN.set(true);
	USER_TYPE.set(type);
	setTimeout(() => {
		LOGGED_IN.set(false);
		USER_TYPE.set(null);
	}, PASSWORD_TIMEOUT * 60 * 1000);
};
