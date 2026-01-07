import {
  differenceInMinutes,
  format,
  isToday,
  isValid,
  isYesterday,
} from 'date-fns';

import type { ChatMessage, IChatParticipant } from '@actions';
import type { IMessageSection } from '../components';
import type { IMessageData } from '../ui';

const getSectionTitle = (date: Date) => {
  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  return format(date, 'MMM d, yyyy');
};

const formatMessageTime = (date: Date) => format(date, 'hh:mm a');

type BuildMessageSectionsParams = {
  messages: ChatMessage[];
  participants: IChatParticipant[];
};

export const buildMessageSections = ({
  messages,
  participants,
}: BuildMessageSectionsParams): IMessageSection[] => {
  const sortedMessages = [...messages].sort((a, b) => {
    const aTime = new Date(a.created_at).getTime();
    const bTime = new Date(b.created_at).getTime();
    return bTime - aTime;
  });

  const sections: IMessageSection[] = [];
  let currentSectionKey = '';
  let lastMessageDate: Date | null = null;

  sortedMessages.forEach(message => {
    const messageDate = new Date(message.created_at);
    if (!isValid(messageDate)) return;
    const sectionKey = format(messageDate, 'yyyy-MM-dd');

    if (sectionKey !== currentSectionKey) {
      currentSectionKey = sectionKey;
      lastMessageDate = null;
      sections.push({
        title: getSectionTitle(messageDate),
        data: [],
      });
    }

    const participant = participants.find(
      p => p.id === message.sender_identity_id,
    );

    const isMe = message.is_mine;

    const senderName = participant
      ? [participant.first_name, participant.last_name]
          .filter(Boolean)
          .join(' ')
          .trim()
      : '';

    const showTime =
      !lastMessageDate ||
      differenceInMinutes(lastMessageDate, messageDate) >= 1;

    const messageData: IMessageData = {
      id: message.id,
      text: message.text ?? '',
      time: formatMessageTime(messageDate),
      sender: isMe ? 'me' : 'other',
      showTime,
      senderName,
      senderAvatar: participant?.avatar_url ?? undefined,
    };

    sections[sections.length - 1].data.push(messageData);
    lastMessageDate = messageDate;
  });

  return sections;
};
