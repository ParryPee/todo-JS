document.addEventListener("DOMContentLoaded", function() {
    main();
  });
function main(){
    if(localStorage.getItem("listID") != null){
        let list = localStorage.getItem("listID")
        list = load_json(JSON.parse(list))
        for (let i = 0; i < list.length; i++) {
            addTask(list[i][0],list[i][1])
            
        }
    }
}

function test(){
    console.log("this is working so far!")
}
function createTask(){
    var name = document.getElementById("newtaskname").value
    var deadline = document.getElementById("newtaskdeadline").value
    let list = localStorage.getItem("listID")
    list = JSON.parse(list)
    list[name] = deadline
    localStorage.setItem("listID", JSON.stringify(list))
    location.reload()
}
function load_json(list_json){
    var result = []
    for(var i in list_json){
        result.push([i,list_json[i]])
    }
    return result
}
function addTask(name, deadline){
    table = document.getElementById("tablebody")
    var dl = deadline.split("-")
    var dl = new Date(dl[1] + "/" + dl[2] + "/" + dl[0])
    var date_now = Date.now()
    const time_diff = Math.abs(dl - date_now)
    const days = Math.floor(time_diff / (1000 * 60 * 60 *24))
    var htmlbody = `<tr>
                        <td>${name}</td>
                        <td>${deadline}</td>
                        <td>${days} days</td>
                        <td><button onclick=removeTask("${name.replace(" ","-")}")>Completed</button></td>
                    </tr>`
    table.insertAdjacentHTML("beforeend", htmlbody)
}
function removeTask(name){
    name = name.replace("-", " ")
    let list = localStorage.getItem("listID")
    list = JSON.parse(list)
    delete list[name]
    localStorage.setItem("listID", JSON.stringify(list))
    location.reload()
}