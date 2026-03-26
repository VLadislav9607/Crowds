import { addMessage } from './addMessage';
import { removeMessage } from './removeMessage';
import { addOrReplaceMessage } from './addOrReplaceMessage';
import { updateMessage } from './updateMessage';
import { updateChat } from './updateChat';

export const messagesCache = {
  addMessage,
  removeMessage,
  addOrReplaceMessage,
  updateMessage,
};

export const chatsCache = {
  updateChat,
};
