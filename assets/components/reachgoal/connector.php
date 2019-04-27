<?php
ini_set('display_errors', 'On');
if (file_exists(dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php')) {
    /** @noinspection PhpIncludeInspection */
    require_once dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php';
} else {
    require_once dirname(dirname(dirname(dirname(dirname(__FILE__))))) . '/config.core.php';
}

/** @noinspection PhpIncludeInspection */
require_once MODX_CORE_PATH . 'config/' . MODX_CONFIG_KEY . '.inc.php';

/** @noinspection PhpIncludeInspection */
require_once MODX_CONNECTORS_PATH . 'index.php';

/** @var modExtra $Reachgoal */
$Reachgoal = $modx->getService('Reachgoal', 'Reachgoal', MODX_CORE_PATH . 'components/reachgoal/model/');
$modx->lexicon->load('reachgoal:default');

// handle request
$corePath = $modx->getOption('reachgoal_core_path', null, $modx->getOption('core_path') . 'components/reachgoal/');
$path = $modx->getOption('processorsPath', $Reachgoal->config, $corePath . 'processors/');
$modx->getRequest();

/** @var modConnectorRequest $request */
$request = $modx->request;
$request->handleRequest([
    'processors_path' => $path,
    'location' => '',
]);