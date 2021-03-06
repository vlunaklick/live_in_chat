import prisma from '../utils/prisma.js'
import { lastMessage } from './message.service.js'

export async function createChat(sender, receiver) {
	const chatExistence = await prisma.chat.findMany({
		where: {
			members: {
				hasEvery: [sender, receiver],
			},
		},
	})

	if (chatExistence.length === 0) {
		const chat = await prisma.chat.create({
			data: {
				members: [sender, receiver],
			},
		})

		return chat
	}

	return false
}

export async function userChats(user) {
	const conversations = await prisma.chat.findMany({
		where: {
			members: {
				has: user,
			},
		},
	})

	return conversations
}

export async function chatExist(id) {
	const chat = await prisma.chat.findUnique({
		where: {
			id,
		},
	})

	if (chat) {
		return true
	}

	return false
}

export async function lastMessageChats(user) {
	const conversations = await userChats(user)
	let array = []

	for (let i = 0; i < conversations.length; i++) {
		array.push(
			await lastMessage(
				conversations[i].id,
				user,
				conversations[i].members,
				conversations[i].updatedAt
			)
		)
	}

	return array
}

export async function deleteChat(chatId, user) {
	const existance = await chatExist(chatId)

	if (!existance) {
		return false
	}

	try {
		await prisma.message.updateMany({
			where: {
				chatId: chatId,
			},
			data: {
				notSee: {
					push: user,
				},
			},
		})

		await prisma.chat.delete({
			where: {
				id: chatId,
			},
		})
	} catch (err) {
		console.log(err)
		return false
	}

	return true
}
