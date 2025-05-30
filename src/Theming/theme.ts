const theme = {
	fonts: {
		primary: 'Poppins, sans-serif',
	},
	fontSizes: { sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem' },
	spacings: { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px' },
	colors: {
		primary: '#FB6664',
		grey1: '#413F49',
		grey2: '#1C1B22',
		grey3: '#807E84',
		grey4: '#101014',
		text: '#ffffff',
	},
	zLayers: {
		hidden: -999,
		behind: -1,
		default: 1,
		overlay: 10,
	},
	breakpoints: {
		mobile: '450px',
		small: '750px',
		large: '1000px',
	},
	transitions: {
		default: '0.25s ease',
	},
};

export type ThemeType = typeof theme;

export default theme;
