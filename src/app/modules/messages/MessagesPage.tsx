import React, { useState } from 'react';
import { MessageCircle, Send, Paperclip, Search, Users, User } from 'lucide-react';
import { MOCK_CONVERSATIONS, MOCK_MESSAGES, MOCK_USERS } from '../../../shared/mockData';
import type { Conversation, Message } from '../../../shared/types';
import { useAuth } from '../../global-context/AuthContext';
import { format } from 'date-fns';

export const MessagesPage = () => {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const conversations = MOCK_CONVERSATIONS;
  const currentConversation = conversations.find(c => c.id === selectedConversation);
  const messages = selectedConversation ? (MOCK_MESSAGES[selectedConversation] || []) : [];

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // In real app, this would send to API
      setNewMessage('');
    }
  };

  const getOtherParticipant = (conversation: Conversation) => {
    if (conversation.type === 'DIRECT') {
      const otherId = conversation.participants.find(p => p !== user?.id);
      return MOCK_USERS.find(u => u.id === otherId);
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <MessageCircle className="w-12 h-12 text-indigo-600" />
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Messages</h1>
            <p className="text-slate-500 mt-1">Connect with teachers, classmates, and study groups</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
        {/* Conversations List */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => {
              const otherUser = getOtherParticipant(conversation);
              return (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`w-full p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors text-left ${
                    selectedConversation === conversation.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      {conversation.type === 'DIRECT' && otherUser ? (
                        <img
                          src={otherUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${otherUser.name}`}
                          alt={otherUser.name}
                          className="w-12 h-12 rounded-full"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                          {conversation.type === 'GROUP' ? <Users className="w-6 h-6" /> : <User className="w-6 h-6" />}
                        </div>
                      )}
                      {conversation.unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-slate-800 truncate">
                          {conversation.type === 'DIRECT' ? otherUser?.name : conversation.name}
                        </h3>
                        {conversation.lastMessage && (
                          <span className="text-xs text-slate-500">
                            {format(new Date(conversation.lastMessage.timestamp), 'HH:mm')}
                          </span>
                        )}
                      </div>
                      {conversation.lastMessage && (
                        <p className="text-sm text-slate-600 truncate">
                          {conversation.lastMessage.content}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          {selectedConversation && currentConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {currentConversation.type === 'DIRECT' && getOtherParticipant(currentConversation) ? (
                    <>
                      <img
                        src={getOtherParticipant(currentConversation)?.avatar || ''}
                        alt={getOtherParticipant(currentConversation)?.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-slate-800">{getOtherParticipant(currentConversation)?.name}</h3>
                        <p className="text-xs text-slate-500">Online</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                        {currentConversation.type === 'GROUP' ? <Users className="w-5 h-5" /> : <User className="w-5 h-5" />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">{currentConversation.name}</h3>
                        <p className="text-xs text-slate-500">{currentConversation.participants.length} members</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => {
                  const isOwn = message.senderId === user?.id;
                  return (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}
                    >
                      <img
                        src={message.senderAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${message.senderName}`}
                        alt={message.senderName}
                        className="w-8 h-8 rounded-full flex-shrink-0"
                      />
                      <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-[70%]`}>
                        <div className={`px-4 py-2 rounded-2xl ${
                          isOwn
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 text-slate-800'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <span className="text-xs text-slate-500 mt-1">
                          {format(new Date(message.timestamp), 'HH:mm')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Paperclip className="w-5 h-5 text-slate-500" />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <div>
                <MessageCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-700 mb-2">Select a conversation</h3>
                <p className="text-slate-500">Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
