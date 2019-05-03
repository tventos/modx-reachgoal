<?php

class ReachgoalsGoalsEventsProcessor extends modProcessor {
    public function process() {
        return $this->outputArray([
            [
                'label' => $this->modx->Reachgoal->getTypeName('AjaxForm'),
                'value' => 'AjaxForm'
            ],
            [
                'label' => $this->modx->Reachgoal->getTypeName('AddProduct'),
                'value' => 'AddProduct'
            ],
            [
                'label' => $this->modx->Reachgoal->getTypeName('RemoveProduct'),
                'value' => 'RemoveProduct'
            ],
            [
                'label' => $this->modx->Reachgoal->getTypeName('Order'),
                'value' => 'Order'
            ]
        ]);
    }
}

return 'ReachgoalsGoalsEventsProcessor';