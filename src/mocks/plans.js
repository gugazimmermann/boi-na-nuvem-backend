const plans = [
    {
        id: 'a3a3f8e3-5f8d-4b1c-9a2b-1a2b3c4d5e6f',
        name: 'Intro',
        price: 24.99,
        annualPrice: 239.90,
        description: 'Para pequenas propriedades que querem começar a otimizar o gerenciamento rural.',
        features: [
            '1 propriedade',
            'Até 5 localizações',
            'Até 50 animais',
            'Relatórios básicos',
            'Suporte por email',
            'Backup automático'
        ],
    },
    {
        id: 'b4b4f9f4-6a9e-4c2d-8b3c-2b3c4d5e6f7a',
        name: 'Base',
        price: 49.99,
        annualPrice: 479.90,
        description: 'Para propriedades médias que precisam de mais recursos de gerenciamento.',
        features: [
            '1 propriedade',
            'Até 15 localizações',
            'Até 100 animais',
            'Relatórios avançados',
            'Alertas e notificações',
            'Suporte por email',
            'Backup automático'
        ],
    },
    {
        id: 'c5c50a05-7baf-4d3e-9c4d-3c4d5e6f7a8b',
        name: 'Avançado',
        price: 99.99,
        annualPrice: 959.90,
        description: 'Para grandes fazendas que precisam de gerenciamento completo e profissional.',
        features: [
            '1 propriedade',
            'Localizações ilimitadas',
            'Animais ilimitados',
            'Relatórios avançados',
            'Alertas e notificações',
            'Suporte por chat',
            'Backup automático',
        ],
        isPopular: true,
    },
    {
        id: 'd6d61b16-8cc0-4e4f-ad5e-4d5e6f7a8b9c',
        name: 'Enterprise',
        price: 249.99,
        annualPrice: 2399.90,
        description: 'Para grandes empresas rurais que precisam de soluções personalizadas.',
        features: [
            'Propriedades ilimitadas',
            'Localizações ilimitadas',
            'Animais ilimitados',
            'Relatórios avançados',
            'Alertas e notificações',
            'API para integrações',
            'Suporte por WhatsApp',
            'Treinamento personalizado',
            'Backup automático',
        ],
    }
];

module.exports = plans;