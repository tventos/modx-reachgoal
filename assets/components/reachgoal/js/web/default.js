var Reachgoal = {
    initialize: {
        AddProduct: {},
        RemoveProduct: {},
        Order: {},
        Ajaxform: {},
        FetchIt: [],
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

    if (
        (window.$ || window.jQuery)
        && Reachgoal.initialize.Ajaxform
    ) {
        $(document).on('af_complete', function(event, response) {
            if (!response.success) {
                return;
            }

            Reachgoal.initialize.AjaxForm.forEach(function(item) {
                if (response.form.attr('id') !== item.form_id) {
                    return;
                }

                Reachgoal.goal(item.service, item.service_id, item.goal_name, item.goal_category);
            });
        });
    }
};

if (Reachgoal.initialize.FetchIt) {
    document.addEventListener('fetchit:success', ({ detail }) => {
        const { form } = detail;

        Reachgoal.initialize.FetchIt.forEach((item) => {
            if (!form.matches(item.form_selector)) {
                return;
            }

            Reachgoal.goal(item.service, item.service_id, item.goal_name, item.goal_category);
        })
    })
}
