var Reachgoal = {
    list: {
        AddProduct: {},
        RemoveProduct: {},
        Order: {},
        Ajaxform: {},
    },
    goal: function (service, service_id, goal_name) {
        switch (service) {
            case 'metrika': 
                ym(service_id, 'reachGoal', goal_name);
                console.log('Metrika triggered: '+ service_id);
            break;
            
            case 'gtag': 
                console.log('Gtag triggered: '+ goal_name);
            break;
        }
    }
}

window.onload = function () {
    /* Minishop2 events */
    miniShop2.Callbacks.Cart.add.response.success = function() {
        Reachgoal.list.AddProduct.forEach(function(item) {
            Reachgoal.goal(item.service, item.service_id, item.goal_name);
        });
    };
    
    miniShop2.Callbacks.Cart.remove.response.success = function() {
        Reachgoal.list.RemoveProduct.forEach(function(item) {
            Reachgoal.goal(item.service, item.service_id, item.goal_name);
        });
    };
    
    miniShop2.Callbacks.Order.submit.response.success = function() {
        Reachgoal.list.Order.forEach(function(item) {
            Reachgoal.goal(item.service, item.service_id, item.goal_name);
        });
    }
};