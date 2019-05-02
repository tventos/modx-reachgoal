<?php
/* If event not a OnLoadWebDocument skip */
if ($modx->event->name != 'OnLoadWebDocument') return;

/* Load services */
$pdo = $modx->getService('pdoFetch');
$modx->getService('Reachgoal', 'Reachgoal', MODX_CORE_PATH . 'components/reachgoal/model/');

/* Register Javascript */
$modx->regClientScript(MODX_ASSETS_URL . 'components/reachgoal/js/web/default.js');

/* Get goals */
$goals = $pdo->getCollection('ReachgoalGoals');

/* Parse goals to array */
foreach ($goals as $goal) {
    $goals_list[$goal['event']][] = [
        'service' => $goal['service'],
        'service_id' => $goal['service_id'] ?:$modx->getOption('reachgoal_yacounter_default'),
        'goal_name' => $goal['goal_name'],
        'form_id' => $goal['form_id']
    ];
}

/* Output goals in JSON */
$modx->regClientHTMLBlock('
<script>
    Reachgoal.initialize = '. json_encode($goals_list) .'
</script>');