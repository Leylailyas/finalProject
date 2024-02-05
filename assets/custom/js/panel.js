$(function () {
    let user = localStorage.getItem('user')
    if (!user) {
        window.location = projectFolder + '/login.html'
    } else {
        user = JSON.parse(user)
        let status = 'İstifadəçi'
        if (user.is_admin) {
            status = '<span class="text-success">Admin</span>'
        }
        $('.main-content header h3').html(`${user.name} ${user.surname}`)
        $('.main-content header li.heading span').html(status)
    }

    $('.main-content #mobile-sidebar-toggler').on('click', function (e) {
        $('aside').toggleClass('mobile-show')
    })

    $('.sidebar #sidebar-btn').on('click', function (e) {
        $('aside').toggleClass('short')
        $('aside .sidebar').toggleClass('short-sidebar')
    })

    $('aside').mouseenter(function () {
        if ($(this).hasClass('short')) {
            $('aside .sidebar').removeClass('short-sidebar')
        }
    });

    $('aside').mouseleave(function () {
        if ($(this).hasClass('short')) {
            $('aside .sidebar').addClass('short-sidebar')
        }
    });

    $('.sidebar nav a.nav-link').on('click', function (e) {
        e.preventDefault()
        const el = $(this)
        const parent = el.parent()
        parent.toggleClass('opened')
        // if (parent.hasClass('opened')) {
        //     parent.removeClass('opened')
        // } else {
        //     parent.addClass('opened')
        // }
    })

    $('#logout-link').on('click', function (e) {
        e.preventDefault()
        localStorage.removeItem('user')
        window.location = projectFolder + '/index.html'
    })
})