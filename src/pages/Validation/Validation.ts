const validationCheck = () => {
    if (localStorage.getItem('token')) {
        if (
            +JSON.parse(localStorage.getItem('token') || '')?.expire <
            Date.now()
        ) {
            alert('세션이 만료되었습니다');
            localStorage.removeItem('token');
            localStorage.removeItem('nickname');
            window.location.replace('/');
            return false;
        } else {
            return true;
        }
    }
};

export { validationCheck };
