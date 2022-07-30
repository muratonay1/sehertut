window.addEventListener('DOMContentLoaded', event => {
    var oneSection = false;

    function beforeVisit(callback) {
        getCounter((responseCounter) => {
            setCounter(responseCounter);
        })
    }
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            offset: 74,
        });
    };

    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function(responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    beforeVisit(function(params) {

    })

    function getCounter(callback) {
        firebase.database().ref('counter/').on('value', data => {
            callback(data.val());
        })
    }

    function setCounter(val) {
        if (!oneSection) {
            var intCounter = (parseInt(val) + 1).toString();
            document.getElementById('visitorsCounter').innerHTML = intCounter;
            oneSection = true;
            firebase.database().ref('counter/').set(intCounter);
        }
    }
});