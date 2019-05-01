var Reachgoal = {
    initialize: {
        AddProduct: {},
        RemoveProduct: {},
        Order: {},
        Ajaxform: {},
    },
    goal: function (service, service_id, goal_name) {
        switch (service) {
            case 'metrika': 
                ym(service_id, 'reachGoal', goal_name);
            break;
            
            case 'ga': 
                console.log('Ga triggered: '+ goal_name);
            break;
            
            case 'gtag': 
                console.log('Gtag triggered: '+ goal_name);
            break;
        }
    }
}

window.onload = function () {
    if (typeof miniShop2 != 'undefined') {
        miniShop2.Callbacks.Cart.add.response.success = function() {
            Reachgoal.initialize.AddProduct.forEach(function(item) {
                Reachgoal.goal(item.service, item.service_id, item.goal_name);
            });
        };

        miniShop2.Callbacks.Cart.remove.response.success = function() {
            Reachgoal.initialize.RemoveProduct.forEach(function(item) {
                Reachgoal.goal(item.service, item.service_id, item.goal_name);
            });
        };

        miniShop2.Callbacks.Order.submit.response.success = function() {
            Reachgoal.initialize.Order.forEach(function(item) {
                Reachgoal.goal(item.service, item.service_id, item.goal_name);
            });
        }
    }

    $(document).on('af_complete', function(event, response) {
        if (response.success) {
            Reachgoal.initialize.AjaxForm.forEach(function(item) {
                if (response.form.attr('id') == item.form_id) {
                    Reachgoal.goal(item.service, item.service_id, item.goal_name);
                }
            });
        }
    });
};