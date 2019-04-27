<?php
/* If event not a OnLoadWebDocument skip */
if ($modx->event->name != 'OnLoadWebDocument') return;

/* Load services */
$pdo = $modx->getService('pdoFetch');
$modx->getService('Reachgoal', 'Reachgoal', MODX_CORE_PATH . 'components/reachgoal/model/');

/* Register Javascript */
$modx->regClientScript(MODX_ASSETS_URL . 'components/reachgoal/js/web/default.js');

$goals = $pdo->getCollection('ReachgoalGoals');

foreach ($goals as $goal) {
    $goals_list[$goal['event']][] = [
        'service' => $goal['service'],
        'service_id' => $goal['service_id'],
        'goal_name' => $goal['goal_name']
    ];
}


$modx->regClientHTMLBlock('
<script>
    Reachgoal.list = '. json_encode($goals_list) .'
</script>');