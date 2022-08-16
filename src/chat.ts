const messages: string[] = [];

const addMessage = (message: string) => {
  messages.push(message);
};

const getMessages = (): string[] => messages;

export default { addMessage, getMessages };
