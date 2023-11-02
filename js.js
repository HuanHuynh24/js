var myarr = [0, 9, 10, 2, 12]

// array map --> trả về một mảng mới
arrnew = myarr.map(function (e) {
    return e * 10;
})
arrnew.forEach(element => {
    console.log(element);
});
// array reduce --> trả về một giá trị tích luỹ trong hàm callback
const sum = 0;
const tong = myarr.reduce(function (e, sum) { //Anonymous Functions
    return e + sum;
}, sum)

const tong1 = myarr.reduce((e, sum) => e + sum, sum)

console.log(tong1);
//  array include
const timkiem = myarr.includes(99, 0) // kiểm tra xem include(<pần tử tìm kiếm>,<vị trí bắt đầu>), pần tử tìm kiếm có trong mảng không trả về true hoặc false
console.log(timkiem)

// array filler -> trả về một mảng mới đúng theo điều kiện trong hàm callback

const arr = myarr.filter(e => e > 8) // trả về mảng arr thoả mãn phần thử lớn 8
arr.forEach(e => console.log(e)) // duyệt các phần tử trong mảng 

// array every -> kiểm tra các phần tử trong mảng có thoả mãn điều kiện trong hàm callback không, 1 phần tử không thoả mãn trả về giá trị false

let kiemtra = myarr.every(e => e > -1)
console.log(kiemtra)

// array some methor -> ngược với every methor thì some methor kiểm tra các phần tử trong mảng chỉ cần 1 pần tử thoả mãn thì trả về giá trị true

kiemtra = myarr.some(e => e > 13)
console.log(kiemtra)

const users = [
    {
        id: 1,
        name: 'huan',
        age: 18
    },
    {
        id: 2,
        name: 'kha',
        age: 19
    },
    {
        id: 3,
        name: 'quyen',
        age: 20
    }
]

const conments = [
    {
        id: 1,
        user_id: 1,
        conment: "xin chào"
    },
    {
        id: 2,
        user_id: 2,
        conment: "tạm biệt"
    },
    {
        id: 3,
        user_id: 2,
        conment: "cảm ơn"
    },
    {
        id: 3,
        user_id: 3,
        conment: "cảm ơn"
    }
]
function getUser(user_id) {
    return new Promise(function (resoleve, reject) {
        var result = users.filter(function (user) {
            return user_id.includes(user.id)
        })
        setTimeout(function () {
            resoleve(result)
        }, 1000)
    })
}
function getConment() {
    return new Promise(function (resoleve, reject) {
        setTimeout(function () {
            resoleve(conments);
        }, 1000)
    })
}
getConment()
    .then(function (conment) {
        var arr = conment.map(e => e.user_id)
        return getUser(arr)
            .then(function (user) {
                return {
                    user: user,
                    comment: conment
                }
            })
    })
    .then(function (data) {
        //  console.log(data)
        let list = document.getElementById('list-comment')
        let html = '';
        data.comment.forEach(function (comment) {
            let user = data.user.find(function (user) {
                return user.id === comment.user_id
            })
            html += `<li>${user.name}:${comment.conment}</li>`
        })
        list.innerHTML = html;
    })

// JSON
let jsonfake = 'https://jsonplaceholder.typicode.com/posts'
fetch(jsonfake)
    .then(function (response) {
        return response.json()
    })
    .then(function (posts) {
        var html = posts.map(function (e) {
            return `<section>
            <h1 class="style">${e.id}:${e.title}</h1>
            <p>${e.body}</p>
        </section>`
        })
        let htmls = html.join('');
        // console.log(htmls)
        document.querySelector('.post').innerHTML = htmls
    })

let db = 'http://localhost:3000/user'

function start() {

    document.addEventListener("DOMContentLoaded", function () {
        getUser(renderUser);
        handleCreateForm();
    });
}

start()

// function
function getUser(callback) {
    fetch(db)
        .then(function (response) {
            return response.json()
        })
        .then(callback)
}
function renderUser(user) {
    var Users = document.querySelector('.listuser')

    var listuser = user.map(function (e) {
        return `
            <section class="item-${e.id}"">
                <p>+ Name: ${e.Name}</p>
                <p>+ Comment: ${e.Comment}</p>
                <span><button onclick="handleDelete(${e.id})">Xoá</button> <button onclick="handleEdit(${e.id})">Chỉnh sửa</button></span>
                
            </section>
        `
    })
    let list = listuser.join('')
    Users.innerHTML = list
}
// tạo thông tin
function handleCreateForm() {
    let creatbtn = document.querySelector('#Create')
    creatbtn.onclick = function () {
        let nameInput = document.querySelector('input[name="Name"]');
        let commentInput = document.querySelector('input[name="Comment"]');
        let name = nameInput.value;
        let comment = commentInput.value;
        var data = {
            Name: name,
            Comment: comment
        }
        postUser(data, function () {
            getUser(renderUser);
            nameInput.value = "";
            commentInput.value = "";
        })

    }

}
function postUser(data, callback) {
    option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    fetch(db, option)
        .then(function (response) {
            return response.json()
        })
        .then(callback)
}
// delete

function handleDelete(index) {
    option = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }

    }
    fetch(db + '/' + index, option)
        // .then(function(response){
        //    return response.json()
        // })
        .then(function () {
            // var index ; // Ví dụ, index có giá trị 1
            var selector = '.item-' + index;
            document.querySelector(selector).remove();
        })
}
function handleEdit(index) {
    fetch(db)
        .then(function (response) {
            return response.json();
        })
        .then(function(list){
            let nameInput = document.querySelector('input[name="Name"]');
            let commentInput = document.querySelector('input[name="Comment"]');
            let user = list.find(e => e.id == index)
            nameInput.value=user.Name;
            commentInput.value=user.Comment
            handleCreateForm()
        }
        )
}
