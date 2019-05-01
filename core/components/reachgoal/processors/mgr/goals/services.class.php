<?php

class ReachgoalsGoalsServicesProcessor extends modProcessor {
    public function process() {
        return $this->outputArray([
            [
                'label' => $this->modx->Reachgoal->getServiceName('metrika'),
                'value' => 'metrika'
            ],
            [
                'label' => $this->modx->Reachgoal->getServiceName('ga'),
                'value' => 'ga'
            ],
            [
                'label' => $this->modx->Reachgoal->getServiceName('gtag'),
                'value' => 'gtag'
            ]
        ]);
    }
}

return 'ReachgoalsGoalsServicesProcessor';