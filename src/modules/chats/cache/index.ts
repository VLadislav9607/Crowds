import { addMessage } from './addMessage';
import { removeMessage } from './removeMessage';
import { addOrReplaceMessage } from './addOrReplaceMessage';
import { updateChat } from './updateChat';

export const messagesCache = {
  addMessage,
  removeMessage,
  addOrReplaceMessage,
};

export const chatsCache = {
  updateChat,
};
