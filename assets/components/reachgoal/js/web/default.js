var Reachgoal = {
    initialize: {
        AddProduct: {},
        RemoveProduct: {},
        Order: {},
        Ajaxform: {},
    },
    goal: function (service, service_id, goal_name, goal_category) {
        switch (service) {
            case 'metrika': 
                if (typeof ym != 'undefined') {
                    ym(service_id, 'reachGoal', goal_name);
                } else {
                    window['yaCounter' + service_id].reachGoal(goal_name);
                }
                
            break;
            
            case 'gtag': 
                if (goal_category) {
                    gtag('event', goal_name, {event_category: goal_category});
                } else {
                    gtag('event', goal_name);
                }
            break;
            
            case 'gtm':
                if (goal_category) {
                    dataLayer.push({'event': 'event-to-ga', 'eventCategory' : goal_category, 'eventAction' : goal_name});
                } else {
                    dataLayer.push({'event': 'event-to-ga', 'eventAction' : goal_name});
                }
            break;
        }
    }
}

window.onload = function () {
    if (typeof miniShop2 != 'undefined') {
        miniShop2.Callbacks.Cart.add.response.success = function() {
            if (typeof Reachgoal.initialize.AddProduct != 'undefined') {
                Reachgoal.initialize.AddProduct.forEach(function(item) {
                    Reachgoal.goal(item.service, item.service_id, item.goal_name, item.goal_category);
                });
            }
        };

        miniShop2.Callbacks.Cart.remove.response.success = function() {
            if (typeof Reachgoal.initialize.RemoveProduct != 'undefined') {
                Reachgoal.initialize.RemoveProduct.forEach(function(item) {
                    Reachgoal.goal(item.service, item.service_id, item.goal_name, item.goal_category);
                });
            }
        };

        miniShop2.Callbacks.Order.submit.response.success = function() {
            if (typeof Reachgoal.initialize.Order != 'undefined') {
                Reachgoal.initialize.Order.forEach(function(item) {
                    Reachgoal.goal(item.service, item.service_id, item.goal_name, item.goal_category);
                });
            }
        }
    }

    $(document).on('af_complete', function(event, response) {
        if (response.success && typeof Reachgoal.initialize.AjaxForm != 'undefined') {
            Reachgoal.initialize.AjaxForm.forEach(function(item) {
                if (response.form.attr('id') == item.form_id) {
                    Reachgoal.goal(item.service, item.service_id, item.goal_name, item.goal_category);
                }
            });
        }
    });
};