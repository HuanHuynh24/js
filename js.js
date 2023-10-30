var myarr  = [0, 9, 10, 2, 12]

// array map --> trả về một mảng mới
arrnew = myarr.map(function(e){
    return e*10;
})
arrnew.forEach(element => {
    console.log(element);
});
// array reduce --> trả về một giá trị tích luỹ trong hàm callback
const sum=0;
const tong  = myarr.reduce(function(e, sum){ //Anonymous Functions
    return e+sum;
},sum)

const tong1 = myarr.reduce((e, sum)=>e+sum,sum)

console.log(tong1);
//  array include
const timkiem = myarr.includes(99, 0) // kiểm tra xem include(<pần tử tìm kiếm>,<vị trí bắt đầu>), pần tử tìm kiếm có trong mảng không trả về true hoặc false
console.log(timkiem)

// array filler -> trả về một mảng mới đúng theo điều kiện trong hàm callback

const arr = myarr.filter(e=>e>8) // trả về mảng arr thoả mãn phần thử lớn 8
arr.forEach(e=>console.log(e)) // duyệt các phần tử trong mảng 

// array every -> kiểm tra các phần tử trong mảng có thoả mãn điều kiện trong hàm callback không, 1 phần tử không thoả mãn trả về giá trị false

let kiemtra = myarr.every(e=>e>-1)
console.log(kiemtra)

// array some methor -> ngược với every methor thì some methor kiểm tra các phần tử trong mảng chỉ cần 1 pần tử thoả mãn thì trả về giá trị true

 kiemtra = myarr.some(e=>e>13)
 console.log(kiemtra)

 const users = [
    {
        id: 1,
        name: 'huan',
        age:18
    },
    {
        id: 2,
        name: 'kha',
        age:19
    },
    {
        id: 3,
        name: 'quyen',
        age:20
    }
 ]

 const conments = [
    {
        id:1,
        user_id:1,
        conment:"xin chào"
    },
    {
        id:2,
        user_id:2,
        conment:"tạm biệt"
    },
    {
        id:3,
        user_id:2,
        conment:"cảm ơn"
    },
    {
        id:3,
        user_id:3,
        conment:"cảm ơn"
    }
 ]
function getUser(user_id){
    return new Promise(function(resoleve, reject){
        var result  = users.filter(function(user){
            return user_id.includes(user.id)
        })
        setTimeout(function(){
            resoleve(result)
        },1000)
    })
}
 function getConment(){
    return new Promise(function(resoleve, reject){
        setTimeout(function(){
            resoleve(conments);
        },1000)
    })
 }
 getConment()
    .then(function(conment){
       var arr = conment.map(e=>e.user_id)
       return  getUser(arr)
        .then(function(user){
           return {
                user: user,
                conment: conment
           }
       })
    })
    .then(function(data){
        console.log(data)
    })
