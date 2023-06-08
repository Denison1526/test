const SERVER_URL = 'http://localhost:3000'

async function serverAddStudents(obj) {
    let response = await fetch(SERVER_URL + '/api/students', {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(obj),
    })

    let data = await response.json()

    return data
}

async function serverGetStudents() {
    let response = await fetch(SERVER_URL + '/api/students', {
        method: "GET",
        headers: { 'Content-type': 'application/json' },
    })

    let data = await response.json()

    return data
}

async function serverDeleteStudent(id) {
    let response = await fetch(`${SERVER_URL}/api/students/${id}`, {
        method: "DELETE",
        headers: { 'Content-type': 'application/json' },
    })

    let data = await response.json()

    return true
}

let serverData = await serverGetStudents()


// let listData = [{
//     lastname: 'Галицкий',    
//     name: 'Игорь',
//     surename: 'Петрович',
//     BirthDay: new Date(2001, 11, 01),
//     StartYear: 2019,
//     Facultet: 'Экономика'
// },
// {
//     lastname: 'Астапов',
//     name: 'Илья',
//     surename: 'Андреевич',
//     BirthDay: new Date(2000, 01, 18),
//     StartYear: 2018,
//     Facultet: 'Туризм'
// },
// {
//     lastname: 'Ахмедова',
//     name: 'Яна',
//     surename: 'Ильинична',
//     BirthDay: new Date(2004, 09, 11),
//     StartYear: 2021,
//     Facultet: 'Экономика'
// },
// {
//     lastname: 'Орлов',
//     name: 'Аирилл',
//     surename: 'Олегович',
//     BirthDay: new Date(1990, 02, 06),
//     StartYear: 2008,
//     Facultet: 'Айти'
// },
// {
//     lastname: 'Ахмедова',
//     name: 'Анна',
//     surename: 'Андреевна',
//     BirthDay: new Date(1997, 03, 11),
//     StartYear: 2014,
//     Facultet: 'Туризм'
// },]

let listData = []

if (serverData) {
    listData = serverData
}

const $app = document.getElementById('app'), // Находим div в HTML
    $addForm = document.getElementById('add-form'), // Находим форму
    $table = document.createElement('table'), // Cоздаем таблицу
    $tableHead = document.createElement('thead'), // Создаем заголовки для таблицы
    $tableBody = document.createElement('tbody'), // Создаем тело таблицы

    $tableHeadTr = document.createElement('tr'), // Создаем ряд в таблице
    $tableHeadThFIO = document.createElement('th'), // Создаем ячейку ФИО
    $tableHeadThBirthYear = document.createElement('th'),// Создаем ячейку Дата рождения
    $tableHeadThFacultet = document.createElement('th'),// Создаем ячейку Факультет
    $tableHeadThStart = document.createElement('th'),// Создаем ячейку Начало обучения
    $tableHeadThBtn = document.createElement('th');

let sortColumnFLag = "fio",
    sortDirFlag = true,
    $errorName = document.createElement('div'),
    $errorSurname = document.createElement('div'),
    $errorLastname = document.createElement('div'),
    $errorBirthday = document.createElement('div'),
    $errorStart = document.createElement('div'),
    $errorFacultet = document.createElement('div');
$errorName.classList.add('invisible', 'text-danger'),
    $errorSurname.classList.add('invisible', 'text-danger'),
    $errorLastname.classList.add('invisible', 'text-danger'),
    $errorBirthday.classList.add('invisible', 'text-danger'),
    $errorStart.classList.add('invisible', 'text-danger'),
    $errorFacultet.classList.add('invisible', 'text-danger');


const $nameInp = document.getElementById('add-form__name-inp'), // Находим все поля инпуты
    $surenameInp = document.getElementById('add-form__surename-inp'),
    $lastnameInp = document.getElementById('add-form__lastname-inp'),
    $birthDayInp = document.getElementById('add-form__birthday-inp'),
    $startInp = document.getElementById('add-form__start-inp'),



    $fioSortBtn = document.createElement('button'), // Создаем кнопку для сортировки
    $facultetSortBtn = document.createElement('button'),
    $birthDaySortBtn = document.createElement('button'),
    $startSortBtn = document.createElement('button'),
    $facultetInp = document.getElementById('add-form__facultet-inp'),

    $filterForm = document.getElementById('filter-form'),
    $fioFilterInp = document.getElementById('filter-form__fio-inp'),
    $startFilterInp = document.getElementById('filter-form__start-inp'),
    $finishFilterInp = document.getElementById('filter-form__finish-inp'),
    $facultetFilterInp = document.getElementById('filter-form__facultet-inp');




$table.classList.add('table') // Добавляем класс table таблице.Стили из бустрапа

$tableHeadThFIO.textContent = 'ФИО'   // Добавляем текст в ячейки
$tableHeadThBirthYear.textContent = 'Год рождения'
$tableHeadThFacultet.textContent = 'Факультет'
$tableHeadThStart.textContent = 'Год начала обучения'

$tableHeadTr.append($tableHeadThFIO) // Добавляем в таблицу ячейку с именем
$tableHeadTr.append($tableHeadThBirthYear)
$tableHeadTr.append($tableHeadThFacultet)
$tableHeadTr.append($tableHeadThStart)
$tableHeadTr.append($tableHeadThBtn)

$addForm.append($errorName),
    $addForm.append($errorSurname),
    $addForm.append($errorLastname),
    $addForm.append($errorBirthday),
    $addForm.append($errorStart),
    $addForm.append($errorFacultet),
    $tableHead.append($tableHeadTr) // Добавляем ряд
$table.append($tableHead) // Добавляем Хэд в таблицу
$table.append($tableBody) // Добавляем боди в таблицу
$app.append($table) // Добавляем таблицу в app



function createUserTr(oneUser) { // Функция создания TR

    let finishDate = +oneUser.Start + 4;




    const $userTr = document.createElement('tr'), // Создаем ряд в таблице
        $userFIO = document.createElement('th'), // Создаем ячейку ФИО
        $userBirthYear = document.createElement('th'),// Создаем ячейку Дата рождения
        $userFacultet = document.createElement('th'),// Создаем ячейку Факультет
        $userStart = document.createElement('th'),// Создаем ячейку Начало обучения
        $userButton = document.createElement('button');

    $userButton.classList.add("btn", "btn-danger")
    $userButton.textContent = 'Удалить'



    $userFIO.textContent = oneUser.fio   // Добавляем информацию из массива в ячейки
    $userBirthYear.textContent = returnDate(oneUser)
    $userFacultet.textContent = oneUser.Facultet
    $userStart.textContent = oneUser.Start + "-" + finishDate + " " + "(" + (today.getFullYear() - oneUser.Start) + " " + "курс)";

    if (finishDate == today.getFullYear()) {
        if (8 < today.getMonth()) {
            $userStart.textContent = oneUser.Start + "-" + finishDate + " " + "(Закончил)";
        }
    }

    if (finishDate < today.getFullYear()) {
        $userStart.textContent = oneUser.Start + "-" + finishDate + " " + "(Закончил)";
    }



    $userTr.append($userFIO) // Добавляем в таблицу ячейку с именем
    $userTr.append($userBirthYear)
    $userTr.append($userFacultet)
    $userTr.append($userStart)
    $userTr.append($userButton)

    $tableHeadThFIO.append($fioSortBtn) // Добавляем кнопку в таблицу, рядом с ФИО
    $tableHeadThFacultet.append($facultetSortBtn)
    $tableHeadThBirthYear.append($birthDaySortBtn)
    $tableHeadThStart.append($startSortBtn)
    $fioSortBtn.setAttribute('id', 'sort__fio') // Задаем ID
    $fioSortBtn.setAttribute('class', 'sort__btn btn-reset')
    $facultetSortBtn.setAttribute('id', 'sort__facultet')
    $facultetSortBtn.setAttribute('class', 'sort__btn btn-reset')
    $birthDaySortBtn.setAttribute('id', 'sort__birthday'),
        $birthDaySortBtn.setAttribute('class', 'sort__btn btn-reset'),
        $startSortBtn.setAttribute('id', 'sort__start')
    $startSortBtn.setAttribute('class', 'sort__btn btn-reset')

    $userButton.addEventListener('click', async function () {
        await serverDeleteStudent(oneUser.id)
        $userTr.remove();
    })


    return $userTr
}




let today = new Date;
document.getElementById("add-form__birthday-inp").setAttribute("max", today);

function ages(oneUser) {
    let howOld = today.getFullYear() - new Date(oneUser.BirthDay).getFullYear();
    return howOld

}

function returnDate(oneUser) {
    const yyyy = new Date(oneUser.BirthDay).getFullYear();
    let mm = new Date(oneUser.BirthDay).getMonth() + 1;
    let dd = new Date(oneUser.BirthDay).getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return dd + '.' + mm + '.' + yyyy + ' (' + ages(oneUser) + ' лет)';
}




// Фильтрация
function filter(arr, prop, value) {
    return arr.filter(function (oneUser) {
        if (String(oneUser[prop]).includes(value.trim())) return true
    });
}

// Рендер Перенос массива в HTML

function render(arrData) { // Функция добавленя нового пользователя
    $tableBody.innerHTML = '';
    //Подготовка
    let copyListData = [...arrData] // Создаем копию массива, чтобы ничего не изменить в основном массиве

    for (const oneUser of copyListData) {
        oneUser.fio = oneUser.name + ' ' + oneUser.surename + ' ' + oneUser.lastname // Делаем фамелию, имя, отчество в одну переменную
    }

    // Сортировка


    copyListData = copyListData.sort(function (a, b) {
        let sort = a[sortColumnFLag] < b[sortColumnFLag]

        if (sortDirFlag == false) sort = a[sortColumnFLag] > b[sortColumnFLag]
        if (sort) return -1 // По алфавиту
    })


    // Фильтрация
    if ($fioFilterInp.value.trim() !== "") {
        copyListData = filter(copyListData, 'fio', $fioFilterInp.value)
    }

    if ($facultetFilterInp.value.trim() !== "") {
        copyListData = filter(copyListData, 'Facultet', $facultetFilterInp.value)

    }

    if ($startFilterInp.value.trim() !== "") {
        copyListData = filter(copyListData, 'StartYear', $startFilterInp.value)
    }

    if ($startFilterInp.value.trim() !== "") {
        copyListData = filter(copyListData, 'StartYear', $startFilterInp.value)
    }

    if ($finishFilterInp.value.trim() !== "") {
        copyListData = arrData.filter(obj => $finishFilterInp.value === String(parseInt(obj.Start) + 4));
    }









    //Отрисовка

    for (const oneUser of copyListData) { // Цикл проходит каждого пользователя в массиве
        const $newTr = createUserTr(oneUser)

        $tableBody.append($newTr) // Добавляем колонку в таблицу
    }
}
render(listData)

// Добавление
$addForm.addEventListener('submit', async function (event) { // Добавляем событие форме.Когда мы нажимаем добавить запускается функция
    event.preventDefault()                              // Отключаем отправку формы
    const nameInpError = document.getElementById('nameInp-error'),
        surenameInpError = document.getElementById('surenameInp-error'),
        lastnameInpError = document.getElementById('lastnameInp-error'),
        birthdayInpError = document.getElementById('birthdayInp-error'),
        startInpError = document.getElementById('startInp-error'),
        facultetInpError = document.getElementById('facultetInp-error');

    if ($nameInp.value.trim() == "" && $surenameInp.value.trim() == "" && $lastnameInp.value.trim() == "" && $birthDayInp.value.trim() == "" && $startInp.value.trim() == "" && $facultetInp.value.trim() == "") {
        $errorName.classList.remove('invisible')
        nameInpError.textContent = 'Введите Имя'
        $errorSurname.classList.remove('invisible')
        surenameInpError.textContent = 'Введите Отчество'
        $errorLastname.classList.remove('invisible')
        lastnameInpError.textContent = 'Введите Фамилию'
        $errorBirthday.classList.remove('invisible')
        birthdayInpError.textContent = 'Введите дату рождения'
        $errorStart.classList.remove('invisible')
        startInpError.textContent = 'Дата начала обучения не введена!'
        $errorStart.classList.remove('invisible')
        startInpError.textContent = 'Дата начала обучения не введена!'
        $errorFacultet.classList.remove('invisible')
        facultetInpError.textContent = 'Факультет не введен!'
    }

    if ($nameInp.value.trim() == "") { // Валидация. trim - удаляет пробелы


        $errorName.classList.remove('invisible')
        nameInpError.textContent = 'Введите Имя'
        return

    }

    else {
        $errorName.classList.add('invisible')
        nameInpError.textContent = ''
    }

    if ($surenameInp.value.trim() == "") { // Валидация. trim - удаляет пробелы
        $errorSurname.classList.remove('invisible')
        surenameInpError.textContent = 'Введите Отчество'
        return
    }

    else {
        $errorName.classList.add('invisible')
        surenameInpError.textContent = ''
    }

    if ($lastnameInp.value.trim() == "") { // Валидация. trim - удаляет пробелы
        $errorLastname.classList.remove('invisible')
        lastnameInpError.textContent = 'Введите Фамилию'
        return
    }

    else {
        $errorName.classList.add('invisible')
        lastnameInpError.textContent = ''
    }

    if ($birthDayInp.value == "") { // Валидация. trim - удаляет пробелы
        $errorBirthday.classList.remove('invisible')
        birthdayInpError.textContent = 'Введите дату рождения'
        return
    }

    else {
        $errorName.classList.add('invisible')
        birthdayInpError.textContent = ''
    }

    const year = parseInt($startInp.value);

    if (year < 2000) {
        $errorStart.classList.remove('invisible')
        startInpError.textContent = 'Дата начала обучения не может быть раньше 2000 года'
        return
    }

    else {
        $errorName.classList.add('invisible')
        startInpError.textContent = ''
    }

    if ($startInp.value.trim() == "") { // Валидация. trim - удаляет пробелы
        $errorStart.classList.remove('invisible')
        startInpError.textContent = 'Дата начала обучения не введена!'
        return
    }

    else {
        $errorName.classList.add('invisible')
        startInpError.textContent = ''
    }



    if ($facultetInp.value.trim() == "") { // Валидация. trim - удаляет пробелы
        $errorFacultet.classList.remove('invisible')
        facultetInpError.textContent = 'Факультет не введен!'
        return
    }

    else {
        $errorName.classList.add('invisible')
        facultetInpError.textContent = ''
    }



    $errorName.classList.add('invisible')
    $errorSurname.classList.add('invisible')
    $errorLastname.classList.add('invisible')
    $errorBirthday.classList.add('invisible')
    $errorStart.classList.add('invisible')
    $errorFacultet.classList.add('invisible')

    let newStudentObj = {
        name: document.getElementById('add-form__name-inp').value,
        lastname: document.getElementById('add-form__lastname-inp').value,
        surename: document.getElementById('add-form__surename-inp').value,
        BirthDay: document.getElementById('add-form__birthday-inp').value,
        Facultet: document.getElementById('add-form__facultet-inp').value,
        Start: document.getElementById('add-form__start-inp').value,
    }

    let serverDataObj = await serverAddStudents(newStudentObj)

    serverDataObj.BirthDay = new Date(serverDataObj.BirthDay)



    listData.push({ // Добавляем в массив значения введенные в инпуты
        name: $nameInp.value.trim(),
        lastname: $lastnameInp.value.trim(),
        surename: $surenameInp.value.trim(),
        BirthDay: $birthDayInp.value,
        Start: $startInp.value.trim(),
        Facultet: $facultetInp.value.trim(),
    })
    render(listData)


})


// клики сортировки 




$fioSortBtn.addEventListener('click', function () {
    $fioSortBtn.style.transform = 'rotate(180deg)'
    sortColumnFLag = "fio"
    sortDirFlag = !sortDirFlag
    render(listData)
})



$facultetSortBtn.addEventListener('click', function () {
    $facultetSortBtn.style.transform = 'rotate(180deg)'
    sortColumnFLag = "Facultet"
    sortDirFlag = !sortDirFlag
    render(listData)
})

$birthDaySortBtn.addEventListener('click', function () {
    $birthDaySortBtn.style.transform = 'rotate(180deg)'
    sortColumnFLag = "BirthDay"
    sortDirFlag = !sortDirFlag
    render(listData)
})


$startSortBtn.addEventListener('click', function () {
    $startSortBtn.style.transform = 'rotate(180deg)'
    sortColumnFLag = "Start"
    sortDirFlag = !sortDirFlag
    render(listData)
})

// Фильтр\

$filterForm.addEventListener('submit', function (event) {
    event.preventDefault()

})

$fioFilterInp.addEventListener('input', function () {
    render(listData)

})


$facultetFilterInp.addEventListener('input', function () {
    render(listData)

})

$startFilterInp.addEventListener('input', function () {
    render(listData)

})

$finishFilterInp.addEventListener('input', function () {
    render(listData)

})






