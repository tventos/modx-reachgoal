<?php

class ReachgoalGoalsGetListProcessor extends modObjectGetListProcessor {
    public $classKey = 'ReachgoalGoals';
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'ASC';
    
    /**
     * @param xPDOQuery $c
     *
     * @return array
     */
    public function prepareQueryBeforeCount(xPDOQuery $c) {
        $query = trim($this->getProperty('query'));
        if ($query) {
            $c->where(array(
                'name:LIKE' => "%{$query}%",
                'OR:goal_name:LIKE' => "%{$query}%",
            ));
        }

        return $c;
    }
    
     /**
     * @param xPDOObject $object
     *
     * @return array
     */
    public function prepareRow(xPDOObject $object) {
        $array = $object->toArray();
        
        $array['actions'] = [];

        // Edit
        $array['actions'][] = [
            'cls' => 'seodomains-update',
            'icon' => 'icon icon-edit',
            'title' => $this->modx->lexicon('update'),
            //'multiple' => $this->modx->lexicon('view'),
            'action' => 'updateItem',
            'button' => true,
            'menu' => true,
        ];

        // Remove
        $array['actions'][] = [
            'cls' => 'seodomains-remove',
            'icon' => 'icon icon-trash-o action-red',
            'title' => $this->modx->lexicon('remove'),
            'multiple' => $this->modx->lexicon('remove'),
            'action' => 'removeItem',
            'button' => true,
            'menu' => true,
        ];

        return $array;
    }
}

return "ReachgoalGoalsGetListProcessor";