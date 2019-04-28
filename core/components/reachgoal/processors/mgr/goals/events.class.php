<?php

class ReachgoalsGoalsEventsProcessor extends modProcessor {
    public function process() {
        return $this->outputArray([
            [
                'value' => 'AddProduct',
                'name' => $this->modx->Reachgoal->getTypeName('AddProduct')
            ],
            [
                'value' => 'RemoveProduct',
                'name' => $this->modx->Reachgoal->getTypeName('RemoveProduct')
            ],
            [
                'value' => 'Order',
                'name' => $this->modx->Reachgoal->getTypeName('Order')
            ],
            [
                'value' => 'AjaxForm',
                'name' => $this->modx->Reachgoal->getTypeName('AjaxForm')
            ]
        ]);
    }
}

return 'ReachgoalsGoalsEventsProcessor';