import styled from 'styled-components';

interface HeaderProps {
	className?: string;
}

const Header = ({ className }: HeaderProps) => {
	return (
		<div className={className}>
			<img src='' alt='' />
		</div>
	);
};

const StyledHeader = styled(Header)`
	display: flex;
	justify-content: start;
	padding: 40px;

	img {
		width: 100px;
		height: auto;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.small}) {
		padding: 20px 0 0;
	}
`;

export default StyledHeader;
