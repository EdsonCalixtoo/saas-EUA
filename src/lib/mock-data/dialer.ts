export interface DialerContact {
  id: string
  name: string
  phone: string
  avatarUrl: string
  company?: string
  lastCalled?: string
}

export interface CallHistoryItem {
  id: string
  name: string
  phone: string
  avatarUrl: string
  timestamp: string
  duration: string
  type: 'outbound' | 'inbound' | 'missed'
  status: 'completed' | 'no-answer' | 'voicemail'
}

export const initialNextCall: DialerContact = {
  id: 'next-1',
  name: 'Sarah Williams',
  phone: '(214) 505-0192',
  company: 'Exata Ltda',
  avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
}

export const initialCallQueue: DialerContact[] = [
  {
    id: 'queue-1',
    name: 'Robert Johnson',
    phone: '(201) 555-0198',
    company: 'Baker Johnson',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'queue-2',
    name: 'David Brown',
    phone: '(562) 555-0214',
    company: 'Green Forest',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'queue-3',
    name: 'James Miller',
    phone: '(713) 555-0147',
    company: 'Nova KEM',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'queue-4',
    name: 'Sophia Davis',
    phone: '(415) 555-0182',
    company: 'Ibarra HOME',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'queue-5',
    name: 'Daniel Thompson',
    phone: '(305) 555-0199',
    company: 'Animex Corp',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
]

export const initialCallHistory: CallHistoryItem[] = [
  {
    id: 'hist-1',
    name: 'Robert Johnson',
    phone: '(201) 555-0198',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    timestamp: 'Hoje, 14:10',
    duration: '04:15',
    type: 'outbound',
    status: 'completed',
  },
  {
    id: 'hist-2',
    name: 'Laura Vickers',
    phone: '(312) 555-0144',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    timestamp: 'Hoje, 13:45',
    duration: '02:30',
    type: 'outbound',
    status: 'completed',
  },
  {
    id: 'hist-3',
    name: 'Gonzál Álvarez',
    phone: '(415) 555-0812',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    timestamp: 'Hoje, 11:20',
    duration: '00:00',
    type: 'missed',
    status: 'no-answer',
  },
  {
    id: 'hist-4',
    name: 'Maria Müller',
    phone: '(212) 555-0922',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    timestamp: 'Ontem, 16:50',
    duration: '01:05',
    type: 'inbound',
    status: 'voicemail',
  },
]
