<?php

class ReachgoalsGoalsServicesProcessor extends modProcessor {
    public function process() {
        return $this->outputArray([
            [
                'label' => $this->modx->Reachgoal->getServiceName('metrika'),
                'value' => 'metrika'
            ],
            [
                'label' => $this->modx->Reachgoal->getServiceName('gtag'),
                'value' => 'gtag'
            ],
            [
                'label' => $this->modx->Reachgoal->getServiceName('gtm'),
                'value' => 'gtm'
            ]
        ]);
    }
}

return 'ReachgoalsGoalsServicesProcessor';