import { browser } from '$app/environment';

function createTheme() {
	let dark = $state(false);

	return {
		get dark() {
			return dark;
		},
		/** Call once on mount — reads the class already set by app.html inline script. */
		init() {
			if (!browser) return;
			dark = document.documentElement.classList.contains('dark');
		},
		toggle() {
			dark = !dark;
			document.documentElement.classList.toggle('dark', dark);
			try {
				localStorage.setItem('theme', dark ? 'dark' : 'light');
			} catch {
				// private browsing or storage quota — silent fail
			}
		},
	};
}

export const theme = createTheme();
