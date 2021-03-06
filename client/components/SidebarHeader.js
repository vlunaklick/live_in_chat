import styled from 'styled-components'
import UserIcon from './UserIcon'
import SidebarHeaderDropdown from './SidebarHeaderDropdown'

export default function SidebarHeader({ user, socket, changeTheme }) {
	return (
		<HeaderWrapper>
			<div className='data-container'>
				<UserIcon profilePicture='/no-user.jpg' />
				<div className='container-data-user'>
					<p className='user-name-header'>{user.name}</p>
					<p className='user-email-header'>{user.email}</p>
				</div>
			</div>

			<SidebarHeaderDropdown socket={socket} changeTheme={changeTheme} />
		</HeaderWrapper>
	)
}

const HeaderWrapper = styled.header`
	background-color: ${({ theme }) => theme.sidebar.header};
	padding: 0.6rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	transition: border-rigth 0.5s ease-in-out, background-color 0.5s ease-in-out;
	position: relative;

	.data-container {
		display: flex;
		align-items: center;
		gap: 0.5rem;

		p {
			line-height: 1;
		}

		.container-data-user {
			display: flex;
			flex-direction: column;
			gap: 0.2rem;

			.user-name-header {
				font-weight: 600;
				color: ${({ theme }) => theme.sidebar.user};
				transition: color 0.5s ease-in-out;
			}

			.user-email-header {
				font-size: 0.8rem;
				color: ${({ theme }) => theme.sidebar.mail};
				transition: color 0.5s ease-in-out;
			}
		}
	}

	@media screen and (min-width: 768px) {
		width: 320px;
		border-right: ${({ theme }) => theme.sidebar.border};
		z-index: 5;
	}
`
