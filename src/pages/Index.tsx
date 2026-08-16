import { useState } from 'react';
import { Search, Send, Phone, Video, MoreVertical, Plus, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Contact {
  id: string;
  name: string;
  status: 'online' | 'away' | 'offline';
  avatar: string;
  lastMessage?: string;
  timestamp?: string;
  unread?: number;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

const CONTACTS: Contact[] = [
  { id: '1', name: 'Alex Chen', status: 'online', avatar: 'AC', lastMessage: 'That sounds great!', timestamp: '2m', unread: 2 },
  { id: '2', name: 'Jordan Smith', status: 'online', avatar: 'JS', lastMessage: 'See you tomorrow', timestamp: '1h' },
  { id: '3', name: 'Casey Morgan', status: 'away', avatar: 'CM', lastMessage: 'Thanks for the update', timestamp: '3h' },
  { id: '4', name: 'Riley Davis', status: 'offline', avatar: 'RD', lastMessage: 'Perfect!', timestamp: '1d' },
  { id: '5', name: 'Taylor Brown', status: 'online', avatar: 'TB', lastMessage: 'Let me know', timestamp: '4h' },
];

const MESSAGES: Message[] = [
  { id: '1', sender: 'Alex Chen', content: 'Hey! How are you doing?', timestamp: '10:30 AM', isOwn: false },
  { id: '2', sender: 'You', content: 'Hi Alex! I\'m doing great, thanks for asking!', timestamp: '10:31 AM', isOwn: true },
  { id: '3', sender: 'Alex Chen', content: 'That\'s awesome! Want to grab coffee later?', timestamp: '10:32 AM', isOwn: false },
  { id: '4', sender: 'You', content: 'That sounds great! How about 3 PM at the usual place?', timestamp: '10:33 AM', isOwn: true },
  { id: '5', sender: 'Alex Chen', content: 'Perfect! See you then 😊', timestamp: '10:34 AM', isOwn: false },
];

export default function Index() {
  const [selectedContact, setSelectedContact] = useState<Contact>(CONTACTS[0]);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = CONTACTS.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar - Contacts List */}
      <div className="w-80 border-r border-border bg-card flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Messages</h1>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Contacts List */}
        <ScrollArea className="flex-1">
          <div className="space-y-1 p-2">
            {filteredContacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`w-full p-3 rounded-lg transition-colors text-left ${
                  selectedContact.id === contact.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback>{contact.avatar}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${getStatusColor(contact.status)}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{contact.name}</p>
                    <p className={`text-xs truncate ${selectedContact.id === contact.id ? 'opacity-80' : 'text-muted-foreground'}`}>
                      {contact.lastMessage}
                    </p>
                  </div>
                  {contact.unread && (
                    <div className="bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {contact.unread}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>

        {/* New Chat Button */}
        <div className="p-4 border-t border-border">
          <Button className="w-full gap-2">
            <Plus className="w-4 h-4" />
            New Chat
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback>{selectedContact.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{selectedContact.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{selectedContact.status}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4 max-w-2xl">
            {MESSAGES.map((message) => (
              <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.isOwn
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-muted text-foreground rounded-bl-none'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.isOwn ? 'opacity-70' : 'text-muted-foreground'}`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="h-20 border-t border-border bg-card px-6 py-4 flex items-center gap-3">
          <Input
            placeholder="Type a message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="bg-muted text-foreground placeholder:text-muted-foreground"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!messageInput.trim()}
            size="icon"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Right Sidebar - Placeholder for future features */}
      <div className="w-64 border-l border-border bg-card p-6 hidden lg:flex flex-col">
        <h3 className="font-semibold mb-4">Upcoming Features</h3>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="p-3 bg-muted rounded-lg">
            <p className="font-medium text-foreground mb-1">📞 Voice Calls</p>
            <p className="text-xs">High-quality audio calls</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <p className="font-medium text-foreground mb-1">📹 Video Calls</p>
            <p className="text-xs">Face-to-face conversations</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <p className="font-medium text-foreground mb-1">📁 File Sharing</p>
            <p className="text-xs">Send documents & media</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <p className="font-medium text-foreground mb-1">👥 Group Chats</p>
            <p className="text-xs">Communicate with teams</p>
          </div>
        </div>
      </div>
    </div>
  );
}
