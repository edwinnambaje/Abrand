console.log(JSON.parse(localStorage.getItem('queries'))); 

    const data = JSON.parse(localStorage.getItem('queries'));
    console.log(data);

    let tbody= document.querySelector('tbody')
    for(let i=0;i<data.length;i++){
    let d1 = document.createElement("td")
    let d2 = document.createElement("td")
    let d3 = document.createElement("td")
    d1.innerText = data[i].name;
    d2.innerText = data[i].Email;
    d3.innerText = data[i].message;

    let  row = document.createElement("tr")
    row.appendChild(d1)
    row.appendChild(d2)
    row.appendChild(d3)
    tbody.appendChild(row)
    let deleteicon=document.createElement('i')
    deleteicon.setAttribute('class','ri-delete-bin-line delete')
    row.appendChild(deleteicon)
    deleteicon.addEventListener('click', ()=>{
        let dltid= deleteicon.closest('tr').firstElementChild.innerText
        //    console.log(dltid);
        let filteredBlogs = data.filter(a =>{
        return a.name !== dltid
        })
        localStorage.setItem('queries', JSON.stringify(filteredBlogs))
        location.reload()
    });
   }

