class common {
    static randomiseUser = (user) => {
        const names = [
            null,
            ['Маша', 'Алена', 'Ирина', 'Марина', 'Люда', 'Таня'],
            ['Кирилл', 'Максим', 'Григорий', 'Федор', 'Петя', 'Василий']
        ];

        user.sex = this.randomNumber(1, 2);
        user.id = Date.now() + '';
        user.first_name = this.randomFromArray( names[user.sex] );
    }

    static randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
    static randomFromArray = (array) => {
        return array[ this.randomNumber(0, array.length - 1) ];
    }

}
export default common;
