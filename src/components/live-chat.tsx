"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, User, Bot } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/constants";

export function LiveChat() {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState([
		{
			id: 1,
			text: "Hi! Welcome to BangaloreCabs. How can I help you today?",
			sender: "bot",
			timestamp: new Date(),
		},
	]);
	const [inputMessage, setInputMessage] = useState("");

	const sendMessage = () => {
		if (!inputMessage.trim()) return;

		const newMessage = {
			id: messages.length + 1,
			text: inputMessage,
			sender: "user",
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, newMessage]);
		setInputMessage("");

		// Simulate bot response
		setTimeout(() => {
			const botResponse = {
				id: messages.length + 2,
				text: `Thanks for your message! Our team will get back to you shortly. For immediate assistance, please call +91 ${WHATSAPP_NUMBER} or book directly via WhatsApp.`,
				sender: "bot",
				timestamp: new Date(),
			};
			setMessages((prev) => [...prev, botResponse]);
		}, 1000);
	};

	if (!isOpen) {
		return (
			<Button
				onClick={() => setIsOpen(true)}
				className="fixed bottom-24 right-6 z-40 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-110"
				size="lg"
			>
				<MessageCircle className="h-6 w-6" />
			</Button>
		);
	}

	return (
		<Card className="fixed bottom-6 right-6 z-40 w-80 h-96 shadow-2xl border-2 border-blue-200 dark:border-blue-800">
			<CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-lg p-4">
				<div className="flex items-center justify-between">
					<CardTitle className="flex items-center gap-2 text-lg">
						<MessageCircle className="h-5 w-5" />
						Live Chat
					</CardTitle>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setIsOpen(false)}
						className="text-white hover:bg-white/20"
					>
						<X className="h-4 w-4" />
					</Button>
				</div>
			</CardHeader>

			<CardContent className="p-0 flex flex-col h-80">
				<div className="flex-1 overflow-y-auto p-4 space-y-3">
					{messages.map((message) => (
						<div
							key={message.id}
							className={`flex ${
								message.sender === "user"
									? "justify-end"
									: "justify-start"
							}`}
						>
							<div
								className={`max-w-[80%] p-3 rounded-lg ${
									message.sender === "user"
										? "bg-blue-500 text-white"
										: "bg-gray-100 dark:bg-gray-800 text-foreground"
								}`}
							>
								<div className="flex items-center gap-2 mb-1">
									{message.sender === "user" ? (
										<User className="h-3 w-3" />
									) : (
										<Bot className="h-3 w-3" />
									)}
									<span className="text-xs opacity-70">
										{message.sender === "user"
											? "You"
											: "Support"}
									</span>
								</div>
								<p className="text-sm">{message.text}</p>
							</div>
						</div>
					))}
				</div>

				<div className="p-4 border-t border-border">
					<div className="flex gap-2">
						<Input
							placeholder="Type your message..."
							value={inputMessage}
							onChange={(e) => setInputMessage(e.target.value)}
							onKeyPress={(e) =>
								e.key === "Enter" && sendMessage()
							}
							className="flex-1"
						/>
						<Button
							onClick={sendMessage}
							size="icon"
							className="bg-blue-500 hover:bg-blue-600"
						>
							<Send className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
