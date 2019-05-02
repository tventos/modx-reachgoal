<?php
class ReachgoalGoalsUpdateProcessor extends modObjectUpdateProcessor {
    public $classKey = 'ReachgoalGoals';
    
    /**
     * var modX
     */
    public function beforeSet() {
        if ($this->getProperty('service') == 'metrika' && empty($this->getProperty('service_id'))) {
            if ($yacounterDefault = $this->modx->getOption('reachgoal_yacounter_default')) {
                $this->setProperty('service_id', $yacounterDefault);
            } else {
                $this->modx->error->addField('service_id', $this->modx->lexicon('reachgoal_err_service_id_null'));
            }
        }
        
        if ($this->getProperty('event') == 'AjaxForm' && empty($this->getProperty('form_id'))) {
            $this->modx->error->addField('form_id', $this->modx->lexicon('reachgoal_err_form_id_null'));
        } 
        
        return parent::beforeSet();
    }
}

return "ReachgoalGoalsUpdateProcessor";