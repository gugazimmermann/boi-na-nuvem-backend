import { parseISO, subDays } from 'date-fns';

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  type: 'trial' | 'monthly' | 'yearly';
  value: number;
  createdAt: Date;
  status: 'active' | 'inactive' | 'expired';
}

const subscriptions: Subscription[] = [
  {
    id: 'a1b2c3d4-e5f6-4789-a012-3456789abcde',
    userId: '550e8400-e29b-41d4-a716-446655440001',
    planId: 'd6d61b16-8cc0-4e4f-ad5e-4d5e6f7a8b9c',
    type: 'trial',
    value: 0,
    createdAt: subDays(new Date(), 7), // 7 dias atrás para garantir trial ativo
    status: 'active'
  },
  {
    id: 'b2c3d4e5-f6a7-4890-b123-456789abcdef',
    userId: '550e8400-e29b-41d4-a716-446655440002',
    planId: 'd6d61b16-8cc0-4e4f-ad5e-4d5e6f7a8b9c',
    type: 'yearly',
    value: 2399.90,
    createdAt: parseISO('2024-01-20T14:20:00Z'),
    status: 'active'
  },
  {
    id: 'c3d4e5f6-a7b8-4901-c234-56789abcdef0',
    userId: '550e8400-e29b-41d4-a716-446655440003',
    planId: 'd6d61b16-8cc0-4e4f-ad5e-4d5e6f7a8b9c',
    type: 'trial',
    value: 0,
    createdAt: parseISO('2024-01-15T09:50:00Z'),
    status: 'expired'
  },
  {
    id: 'd4e5f6a7-b8c9-4012-d345-6789abcdef01',
    userId: '550e8400-e29b-41d4-a716-446655440004',
    planId: 'd6d61b16-8cc0-4e4f-ad5e-4d5e6f7a8b9c',
    type: 'yearly',
    value: 2399.90,
    createdAt: parseISO('2024-02-10T16:25:00Z'),
    status: 'active'
  },
  {
    id: 'e5f6a7b8-c9d0-4123-e456-789abcdef012',
    userId: '550e8400-e29b-41d4-a716-446655440005',
    planId: 'b4b4f9f4-6a9e-4c2d-8b3c-2b3c4d5e6f7a',
    type: 'monthly',
    value: 49.99,
    createdAt: parseISO('2024-02-15T11:35:00Z'),
    status: 'inactive'
  },
  {
    id: 'f6a7b8c9-d0e1-4234-f567-89abcdef0123',
    userId: '550e8400-e29b-41d4-a716-446655440006',
    planId: 'c5c50a05-7baf-4d3e-9c4d-3c4d5e6f7a8b',
    type: 'yearly',
    value: 959.90,
    createdAt: parseISO('2024-02-20T13:50:00Z'),
    status: 'active'
  },
  {
    id: 'a7b8c9d0-e1f2-4345-0678-9abcdef01234',
    userId: '550e8400-e29b-41d4-a716-446655440007',
    planId: 'a3a3f8e3-5f8d-4b1c-9a2b-1a2b3c4d5e6f',
    type: 'monthly',
    value: 24.99,
    createdAt: parseISO('2024-03-01T08:20:00Z'),
    status: 'inactive'
  },
  {
    id: 'b8c9d0e1-f2a3-4456-1789-abcdef012345',
    userId: '550e8400-e29b-41d4-a716-446655440008',
    planId: 'b4b4f9f4-6a9e-4c2d-8b3c-2b3c4d5e6f7a',
    type: 'yearly',
    value: 479.90,
    createdAt: parseISO('2024-03-05T15:35:00Z'),
    status: 'active'
  }
];

export const getSubscriptionByUserId = (userId: string): Subscription | undefined => {
  return subscriptions.find(sub => sub.userId === userId);
};

export default subscriptions;
