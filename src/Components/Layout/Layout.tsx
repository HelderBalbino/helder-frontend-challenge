import { createGlobalStyle, ThemeProvider } from 'styled-components';
import theme from '../../Theming/theme';
import { Reset } from 'styled-reset';
import { ReactNode } from 'react';

// The GlobalStyle component is used to apply global styles to the application.
const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;600&display=swap');
    html {
        background-color: ${(props) => props.theme.colors.grey2};
        font-family: ${(props) =>
			props.theme.fonts
				.primary}, sans-serif !important; // why is this important?
        color: ${(props) => props.theme.colors.text};
    }
    * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        box-sizing: border-box;
    }
	`;

// LayoutProps interface defines the props for the Layout component.
interface LayoutProps {
	children?: ReactNode;
}

// The Layout component wraps the application with a ThemeProvider and applies global styles.
const Layout = ({ children }: LayoutProps) => {
	return (
		// wrapping the children with ThemeProvider to provide the theme context
		<ThemeProvider theme={theme}>
			{/* reset first, then apply global rules to override the reset, not vice-versa: */}
			<Reset />
			<GlobalStyle />
			{children}
		</ThemeProvider>
	);
};

export default Layout;
