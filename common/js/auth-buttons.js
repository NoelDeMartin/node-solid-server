(({ auth }) => {
    auth.trackSession(session => !session || (location.href = '/private'));

    document
        .getElementById('auth')
        .addEventListener(
            'click',
            () => auth.login(`${location.protocol}//${location.host}`),
        );
})(solid);
