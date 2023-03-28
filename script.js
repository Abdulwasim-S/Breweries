var inp=document.createElement("div");
inp.setAttribute("class","inputField")
inp.innerHTML=`<input class="form-control" type="text" id="searchbar" placeholder="Search..."><i class="fa fa-magnifying-glass"style="color:gray;"></i>`;
document.body.append(inp);
var container=document.createElement("div");
container.classList.add("row","m-3");
document.body.setAttribute("class","text-center")
var searchBy="";
function keyupfun(){
    container.innerHTML="";
    searchBy=document.getElementById("searchbar").value;
    async function brewery(){
        var brewery_info= await fetch("https://api.openbrewerydb.org/v1/breweries?per_page=250");
        return brewery_info;
    }
    
    var res=brewery();
    res.then((data)=>data.json())
    .then((data1)=>foo(data1))
    .catch((error)=>console.log(error));
    
    function foo(data1){
        
        for(var i=0;i<data1.length;i++){
            var matchings=`${data1[i].brewery_type},${data1[i].name},${data1[i].address_1},${data1[i].city},${data1[i].state_province},${data1[i].country}`;
            var result=matchings.toLowerCase().indexOf(searchBy.toLowerCase());
            if(result!=-1){
                container.innerHTML +=
            `
            <div class="box col-lg-4 col-md-6 col-sm-12  text-center" style="padding-bottom:2rem;">
                <div class="card" style="width: 20rem;"><br>
                    <h5 class="card-title">${data1[i].name}</h5>
                    <div class="card-body">
                    <p class="card-text">Brewery type : ${data1[i].brewery_type}</p>
                    <p class="card-text">Address : ${data1[i].address_1}</p>
                    <p class="card-text">City : ${data1[i].city}</p>
                    <p class="card-text">State : ${data1[i].state_province}</p>
                    <p class="card-text">Country : ${data1[i].country}</p>
                    <p class="card-text">Phone no : ${data1[i].phone}</p>
                    <a class="btn" href="${data1[i].website_url}" target="_blank" class="card-text">Visit site</a>
                    </div>
                </div>
            </div>
            `
            }
        }
        document.body.append(container);
    }
}
keyupfun();
document.getElementById("searchbar").addEventListener('keyup',keyupfun);