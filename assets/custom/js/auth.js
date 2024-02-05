$(function () {

    function setLoading(action = true) {
        if (action) {
            $('#login-form .btn-primary, #reg-form .btn-primary').prop('disabled', true)
            $('#login-form .loading, #reg-form .loading').show()
        } else {
            $('#login-form .btn-primary, #reg-form .btn-primary').prop('disabled', false)
            $('#login-form .loading, #reg-form .loading').hide()
        }
    }

    $('#reg-form').submit(function (e) {
        e.preventDefault()
        const email = $('#email').val()
        const name = $('#name').val()
        const surname = $('#surname').val()
        const phone = $('#phone').val()
        const password = $('#password').val()

        if (!email) {
            showError('E-mail yazılmadı')
        } else if (!name) {
            showError('Ad yazılmadı')
        } else if (name.length < 3) {
            showError('Ad 3 simvoldan kiçik olmamalıdır')
        } else if (name.length > 15) {
            showError('Ad 15 simvoldan böyük olmamalıdır')
        } else if (!surname) {
            showError('Soyad yazılmadı')
        } else if (surname.length < 3) {
            showError('Soyad 3 simvoldan kiçik olmamalıdır')
        } else if (surname.length > 15) {
            showError('Soyad 15 simvoldan böyük olmamalıdır')
        } else if (!password) {
            showError('Şifrə yazılmadı')
        } else if (password.length < 5) {
            showError('Şifrə 5 simvoldan kiçik olmamalıdır')
        } else if (password.length > 20) {
            showError('Şifrə 20 simvoldan böyük olmamalıdır')
        } else if (phone.length != 12) {
            showError('Telefon nömrənizi düzgün formatda yazın. Nömrə uzunluğu 12 simvol olmalıdır')
        } else {
            setLoading(true)
            customAxios.post('/users', {
                email: email,
                name: name,
                surname: surname,
                password: password,
                phone: phone,
                created_at: new Date()
            })
                .then(res => {
                    showSuccess('Uğurla qeydiyyatdan keçdiniz')
                    console.log('res', res)
                    redirecTo('panel.html')
                })
                .catch(err => {
                    showError('Xəta')
                    console.log('err', err)
                })
                .finally(() => setLoading(false))
        }
    })

    $('#login-form').submit(async function (e) {
        e.preventDefault()
        const email = $('#email').val()
        const password = $('#password').val()

        let users = []

        if (!email) {
            showError('E-mail yazılmadı')
        } else if (!password) {
            showError('Şifrə yazılmadı')
        } else {
            setLoading(true)
            await customAxios.get('/users')
                .then(res => {
                    users = res.data
                })
                .catch(err => {
                    console.log('err', err)
                    showError('İstifadəçi listi çəkilmədi')
                })
                .finally(() => setLoading(false))

            const user = users.find(user => user.email == email && user.password == password)

            if (user) {
                localStorage.setItem('user', JSON.stringify(user))
                showSuccess('Uğurla giriş etdiniz')
                if (user.is_admin) {
                    redirecTo('admin/panel.html')
                } else {
                    redirecTo('user/panel.html')
                }
            } else {
                showError('E-mail və ya şifrə yanlışdır')
            }
        }
    })

    $('#password_type_toggle').on('click', function () {
        const passwordInputType = $('#password').attr('type')
        if (passwordInputType == 'password') {
            $('#password').attr('type', 'text')
        } else {
            $('#password').attr('type', 'password')
        }
    })

    function setDate() {
        const date = new Date()
        let hours = date.getHours().toString()
        let minutes = date.getMinutes().toString()
        const day = date.getDate()
        let weekDay = date.getDay()
        const month = date.getMonth()
        const year = date.getFullYear()

        if (weekDay == 0) {
            weekDay = 7
        }

        if (minutes.length < 2) {
            minutes = '0' + minutes
        }

        if (hours.length < 2) {
            hours = '0' + hours
        }

        const weekDayTranslations = [
            'Bazar ertəsi',
            'Çərşənbə axşamı',
            'Çərşənbə',
            'Cümə axşamı',
            'Cümə',
            'Şənbə',
            'Bazar'
        ]
        const monthTranslations = [
            'Yanvar',
            'Fevral',
            'Mart',
            'Aprel',
            'May',
            'İyun',
            'İyul',
            'Avqust',
            'Sentyabr',
            'Oktyabr',
            'Noyabr',
            'Dekabr'
        ]

        const weekDayTranslation = weekDayTranslations[weekDay - 1]
        const monthTranslation = monthTranslations[month]

        $('#clock').html(`${hours}:${minutes}`)
        $('#date').html(`${weekDayTranslation}, ${monthTranslation} ${day}, ${year}`)
    }

    setDate()
    setInterval(() => setDate(), 10000)

})
