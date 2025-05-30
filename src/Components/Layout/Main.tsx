import styled from 'styled-components';

const Container = styled.section`
	display: block;
	width: 100%;
	max-width: 980px;
	margin: 0 auto;
	padding: 0 32px;

	@media (max-width: ${(props) => props.theme.breakpoints.small}) {
		padding: 24px 16px;
	}
`;

export default Container;
