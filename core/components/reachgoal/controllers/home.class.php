<?php
/**
 * Home 
 */
class ReachgoalHomeManagerController extends modExtraManagerController {
    /** @var modExtra $Reachgoal */
    public $Reachgoal;
    
    /**
     *
     */
    public function initialize()
    {
        $this->Reachgoal = $this->modx->getService('Reachgoal', 'Reachgoal', MODX_CORE_PATH . 'components/reachgoal/model/');
        parent::initialize();
    }
    
    /**
     * 
     * @return string
     */
    public function getPageTitle()
    {
        return $this->modx->lexicon('reachgoal');
    }
    
    public function loadCustomCssJs() {
        $this->addCss($this->Reachgoal->config['cssUrl'] . 'mgr/reachgoal.css?v='.$this->Reachgoal->config['version']);
        $this->addJavascript($this->Reachgoal->config['jsUrl'] . 'mgr/reachgoal.js?v='.$this->Reachgoal->config['version']);
        $this->addJavascript($this->Reachgoal->config['jsUrl'] . 'mgr/utils/utils.js?v='.$this->Reachgoal->config['version']);
        $this->addJavascript($this->Reachgoal->config['jsUrl'] . 'mgr/sections/home.js?v='.$this->Reachgoal->config['version']);
        
        
        $this->addJavascript($this->Reachgoal->config['jsUrl'] . 'mgr/widgets/goals.grid.js?v='.$this->Reachgoal->config['version']);
       /* $this->addJavascript($this->Reachgoal->config['jsUrl'] . 'mgr/widgets/goals.windows.js?v='.$this->Reachgoal->config['version']);
        */
        $this->addHtml('<script>
            Ext.onReady(function() {
                Reachgoal.config.connector_url = "' . $this->Reachgoal->config['connectorUrl'] . '";
                MODx.add({
                    xtype: "reachgoal-panel-home"
                });
            });
        </script>');
    }
    
    public function getLanguageTopics()
    {
        return ['Reachgoal:default'];
    }
    
    public function getTemplateFile()
    {
        return '';
    }
}