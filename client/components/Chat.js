import styled from 'styled-components'
import ChatHeader from './ChatHeader'
import ChatInputMessage from './ChatInputMessage'
import { useEffect } from 'react'
import ChatContent from './ChatContent'

export default function Chat(props) {
	useEffect(() => {
		props.scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [props.messages, props.chatSelected])

	return (
		<ChatWrapper>
			{props.chatSelected === false ? (
				''
			) : (
				<>
					<ChatHeader
						user={props.user}
						name={props.title}
						profilePicture='/no-user.jpg'
						closeChat={props.closeChat}
						chatId={props.chatSelected}
						setLastChats={props.setLastChats}
						lastChats={props.lastChats}
						setMessages={props.setMessages}
						socket={props.socket}
						userConnecteds={props.userConnecteds}
						receiver={props.receiver}
						isTypingUser={props.isTypingUser}
						setSureDelete={props.setSureDelete}
					/>
					<ChatContent
						messages={props.messages}
						user={props.user}
						scrollRef={props.scrollRef}
						setModal={props.setModal}
						setMessageSelected={props.setMessageSelected}
						socket={props.socket}
					/>
					<ChatInputMessage
						messages={props.messages}
						setMessages={props.setMessages}
						chatId={props.chatSelected}
						email={props.user.email}
						name={props.title}
						setLastChats={props.setLastChats}
						lastChats={props.lastChats}
						otherEmail={props.receiver}
						socket={props.socket}
					/>
				</>
			)}
		</ChatWrapper>
	)
}

const ChatWrapper = styled.section`
	width: 100%;
	background-color: ${({ theme }) => theme.chat.no_chat};
	display: flex;
	flex-direction: column;
	position: fixed;
	transition: background-color 0.5s ease-in-out;

	@media screen and (min-width: 786px) {
		position: relative;
	}
`
