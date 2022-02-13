import styled from 'styled-components'

export default function Spinner() {
	return <SpinnerWrapper></SpinnerWrapper>
}

const SpinnerWrapper = styled.div`
	border: 4px solid rgba(0, 0, 0, 0.1);
	border-left-color: transparent;
	border-radius: 50%;
	width: 36px;
	height: 36px;

	animation: spin 1s linear infinite;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
`
