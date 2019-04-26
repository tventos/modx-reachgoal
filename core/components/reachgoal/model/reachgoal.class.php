<?php

class Reachgoal
{
    /** @var modX $modx */
    public $modx;

    /**
     * @param modX $modx
     * @param array $config
     */
    function __construct(modX &$modx, array $config = [])
    {
        $this->modx =& $modx;
        $corePath = MODX_CORE_PATH . 'components/reachgoal/';
        $assetsUrl = MODX_ASSETS_URL . 'components/reachgoal/';

        $this->config = array_merge([
            'corePath' => $corePath,
            'modelPath' => $corePath . 'model/',
            'processorsPath' => $corePath . 'processors/',
            'version' => '1.0.0',
            'connectorUrl' => $assetsUrl . 'connector.php',
            'assetsUrl' => $assetsUrl,
            'cssUrl' => $assetsUrl . 'css/',
            'jsUrl' => $assetsUrl . 'js/',
        ], $config);

        $this->modx->addPackage('reachgoal', $this->config['modelPath']);
        $this->modx->lexicon->load('reachgoal:default');
    }
    
    private function services() {
        return [
            'metrika' => $this->modx->lexicon('reachgoal_service_metrika'),
            'gtag' => $this->modx->lexicon('reachgoal_service_gtag'),
        ];
    }
    
    private function types() {
        return [
            'AddCart' => $this->modx->lexicon('reachgoal_types_addcart'),
            'Order' => $this->modx->lexicon('reachgoal_types_order'),
            'AjaxForm' => $this->modx->lexicon('reachgoal_types_ajaxform')
        ];
    }
    
    public function getServiceName($service) {
        $list = $this->services();
        
        return $list[$service];
    }
    
    public function getTypeName($type) {
        $list = $this->types();
        
        return $list[$type];
    }
}
