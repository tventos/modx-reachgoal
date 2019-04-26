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

/** @var modExtra $Geosales */
$Seodomains = $modx->getService('Seodomains', 'Seodomains', MODX_CORE_PATH . 'components/seodomains/model/');
$modx->lexicon->load('seodomains:default');

// handle request
$corePath = $modx->getOption('seodomains_core_path', null, $modx->getOption('core_path') . 'components/seodomains/');
$path = $modx->getOption('processorsPath', $Seodomains->config, $corePath . 'processors/');
$modx->getRequest();

/** @var modConnectorRequest $request */
$request = $modx->request;
$request->handleRequest([
    'processors_path' => $path,
    'location' => '',
]);