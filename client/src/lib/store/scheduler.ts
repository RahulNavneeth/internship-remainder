import { writable } from 'svelte/store';
import { schedule_data, type schedule } from '../schedule';
type array = {
	id: number;
	schedules: schedule[] | null;
	input_toggle: boolean;
	input: string;
};
const data: array[] = [...Array(24).keys()].map((i) => {
	const s = schedule_data.filter((j) => j?.at == i + 1);
	return { id: i + 1, schedules: s.length != 0 ? s : null, input: '', input_toggle: false };
});

export const scheduler = writable<array[]>(data);
