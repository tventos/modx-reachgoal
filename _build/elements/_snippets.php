<?php

return [
    'SeoDomainsList' => [
        'file' => 'SeoDomainsList',
        'description' => '',
        'properties' => [
            'tplRow' => [
                'type' => 'textfield',
                'value' => 'SeoDomains.City.row',
            ],
            'tplOuter' => [
                'type' => 'textfield',
                'value' => 'SeoDomains.City.outer',
            ],
            'activeClass' => [
                'type' => 'textfield',
                'value' => 'active',
            ],
            'sortby' => [
                'type' => 'textfield',
                'value' => 'city',
            ],
            'sortdir' => [
                'type' => 'list',
                'options' => [
                    ['text' => 'ASC', 'value' => 'ASC'],
                    ['text' => 'DESC', 'value' => 'DESC'],
                ],
                'value' => 'ASC',
            ],
        ],
    ],
];