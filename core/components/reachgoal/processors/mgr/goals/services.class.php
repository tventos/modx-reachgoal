<?php

class ReachgoalsGoalsServicesProcessor extends modProcessor {
    public function process() {
        return $this->outputArray([
            [
                'value' => 'metrika',
                'name' => $this->modx->Reachgoal->getServiceName('metrika')
            ],
            [
                'value' => 'gtag',
                'name' => $this->modx->Reachgoal->getServiceName('gtag')
            ]
        ]);
    }
}

return 'ReachgoalsGoalsServicesProcessor';