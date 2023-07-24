
//question for form1
const questionlist=[
    {
        question: "Choose the dimensions of plot",
        row: "choose number of rows",
        column:"choose number of column",
    }
    
];
//question for form 2
const questioncell=[
    {
    question: "choose Cell number",
    row:  "What do you want here",}
];

const question=document.querySelector('.question');
const row=document.querySelector(".row");
const column=document.querySelector(".column");
const submit=document.getElementById("submit");
const submit1=document.getElementById("submit1");


const question1=document.querySelector('.question1');
const row1=document.querySelector(".row1");
const column1=document.querySelector(".column1");
const plot=document.querySelector(".plot");

const loadquestion=(questionlist)=>{
    console.log(questionlist[0]);
    question.innerText=questionlist[0].question;
    row.innerText=questionlist[0].row;
    column.innerText=questionlist[0].column;
}

var totals=0;
var totalcolumns=0;
//give number of rows
const getrow=()=>{
var rows=document.getElementById("row").value;
console.log(rows);
console.log("rows");
return rows;
}
//give number of columns
const getcol=()=>{
    var cols=document.getElementById("column").value;
    console.log("columns");
    totalcolumns=cols;
return cols;

}
loadquestion(questionlist);


//addeventlistener added to get dimensions of the plot
submit.addEventListener("click",function run(e){
    e.preventDefault();
    console.log("clicked");
    const totalrow=getrow();
    const totalcol=getcol();
    if(!totalrow || !totalcol)
    {alert("enter row and column");
    console.log("getrow", totalrow);
    document.getElementById("row").value="";
    document.getElementById("column").value="";
}
    else{
    
    totals=totalrow*totalcol;
    document.getElementById("row").value="";
    document.getElementById("column").value="";
    document.getElementById("plot").style.display="grid";
    setplot(totalrow, totalcol);
    document.getElementById("form").style.display="none";
    document.getElementById("form1").style.display="block";
    changequestion();
}});

const setplot=(row, column)=>{
var m=row;
var n=column;
const gridContainer = document.getElementById("plot");
gridContainer.style.gridTemplateRows = `repeat(${m}, 1fr)`;
gridContainer.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
console.log("its okay");
for (let i = 1; i <= row * column; i++) {
const cell = document.createElement("div");
cell.classList.add("gridcell");
console.log("why"+i);
cell.id=i;
cell.style.padding="10px";
cell.innerHTML=i;
gridContainer.appendChild(cell);
cell.style.backgroundColor="#e0e1dd";
}
}

const changequestion=()=>{
    row1.innerText=questioncell[0].question;
    column1.innerText=questioncell[0].row;
question1.style.display="none";}

const restaurant=[];
const gym=[];
const hospital=[];
const house=[];

//added eventlistener to assign plot as house, gym, hospital, restaurant
submit1.addEventListener("click",function run(e){
 e.preventDefault();
console.log("clicked");
var infra=document.getElementById("column1").value;
var plotnumber= document.getElementById("row1").value;
if(!plotnumber)
   {
    alert("Enter plot number");
   }
else if(house.includes(plotnumber))
   alert("this is already a house");
else{
if(infra=="Gym" && !gym.includes(plotnumber))
    {gym.push(plotnumber);
var hh=document.createElement("div");
hh.innerText="G";
hh.style.textAlign="center";
hh.style.display="grid";
document.getElementById(plotnumber).appendChild(hh);
console.log("gym",gym);  }
else if(infra=="House")
{if( gym.includes(plotnumber) || restaurant.includes(plotnumber) || hospital.includes(plotnumber))
   alert("plot cant be assigned as house");
   else{
    house.push(plotnumber);
    var hh=document.createElement("div");
    hh.innerText="HOUSE";
    hh.style.textAlign="center";
    document.getElementById(plotnumber).appendChild(hh);
console.log("house",house);
                }}
else if(infra=="Restaurant" &&  !restaurant.includes(plotnumber))
{ restaurant.push(plotnumber);
var gg=document.createElement("div");
gg.innerText="R";
gg.style.color="#24272c";
gg.style.display="grid";
gg.style.textAlign="center";
document.getElementById(plotnumber).appendChild(gg);
console.log("res",restaurant);
                }
else if(infra=="Hospital" && !hospital.includes(plotnumber)){
hospital.push(plotnumber);
var hh=document.createElement("div");
hh.innerText="H";
hh.style.textAlign="center";
 hh.style.display="grid";
document.getElementById(plotnumber).appendChild(hh);
                }}});


//gives besthouse when button is clicked
gethouse.addEventListener("click",function run(e){
    e.preventDefault();
    console.log("clicked");
    document.getElementById("row1").value="";
    if(house.length==0)
    alert("There are no House");
    else
    {
        getbesthouse();
    }});


//gives nearest gym to a input house
const getnearestgym=(housex,housey)=>{
var mindisgym=1000000000;
var temp={
index:-1,
dis:1000000000,
  }
for(let i=0;i<gym.length;i++)
{
        var gymx=Math.floor((gym[i]-1)/(totalcolumns));
        var gymy=Math.floor((gym[i]-1)%totalcolumns);
        console.log("gymx", housex," ", housey, " ",gymx, " ",gymy);
     
        var dis=Math.abs(gymx-housex)+Math.abs(gymy-housey);
        if((dis<mindisgym))
        { mindisgym=Math.min(mindisgym, dis);
            temp.index=gym[i];
            temp.dis=mindisgym;}}
    return temp;
}

//gives nearest hospital to a input house
const getnearesthospital=(housex,housey)=>{
 var mindishospital=1000000000;
var temp={
        index:-1,
        dis:1000000000,
      }
for(let i=0;i<hospital.length;i++)
    {
        var hospitalx=Math.floor((hospital[i]-1)/(totalcolumns));
        var hospitaly=Math.floor((hospital[i]-1)%totalcolumns);
        var dis=Math.abs(hospitalx-housex)+Math.abs(hospitaly-housey);
        if(dis<mindishospital)
        {
    mindishospital=Math.min(mindishospital, dis);
    temp.index=hospital[i];
    temp.dis=mindishospital;}
    }
    return temp;}

//gives nearest restaurant to the input house
const getnearestrestaurant=(housex,housey)=>{
    var mindisrestaurant=1000000000;
    var temp={
        index:-1,
        dis:1000000000,
      }

    for(let i=0;i<restaurant.length;i++)
    { var restaurantx=Math.floor((restaurant[i]-1)/(totalcolumns));
        var restauranty=Math.floor((restaurant[i]-1)%totalcolumns);
        var dis=Math.abs(restaurantx-housex)+Math.abs(restauranty-housey);
        if(dis<mindisrestaurant)
        {temp.index=restaurant[i];
           
    mindisrestaurant=Math.min(mindisrestaurant, dis);
    temp.dis=mindisrestaurant;
temp.index=restaurant[i];}
    }
    return temp;
}


//gives best house based on the calculated score of each house
const getbesthouse=()=>{
    document.getElementById("form1").style.display="none";
    if(house.length==0)
    {
        alert("there are no house in plot");    
    }
    else{
    var besthouse=-1;
    var total=totals;
    var mindis=10000000000;
    var score=[];
    score.length=house.length;
    for(let i=0;i<house.length;i++)
    {
        var housex=Math.floor((house[i]-1)/(totalcolumns));
        var housey=Math.floor((house[i]-1)%totalcolumns);
    var temp=10000000000;
    console.log(house[i], "house[i]");
        var ng=getnearestgym(housex,housey);
        var nh=getnearesthospital(housex,housey);
        var nr=getnearestrestaurant(housex,housey);
        console.log(ng);
        console.log(nh);
        console.log(nr);
        var nhi=nh.index;
        var nhd=nh.dis;
        var ngi=ng.index;
        var ngd=ng.dis;
        var nri=nr.index;
        var nrd=nr.dis;

if(gym.includes(ngi) && hospital.includes(ngi) && restaurant.includes(ngi)       )
temp=Math.min(temp,ngd);
 if(gym.includes(nhi) && hospital.includes(nhi) && restaurant.includes(nhi))
temp=Math.min(temp, nhd);
 if(gym.includes(nri) && hospital.includes(nri) && restaurant.includes(nri))
temp=Math.min(temp, nrd);
 if( gym.includes(ngi) && hospital.includes(ngi) )
 {
  temp=Math.min(temp, ngd+nrd);
 }
 if(gym.includes(ngi) && restaurant.includes(ngi))
 {
    temp=Math.min(temp, ngd+nhd);
 }
 if( hospital.includes(nhi) && gym.includes(nhi) )
 {
    temp=Math.min(temp, nrd+nhd);
 }
 else if(hospital.includes(nhi) && restaurant.includes(nhi))
 {
    temp=Math.min(temp, ngd+nhd);
 }
 if( restaurant.includes(nri) && gym.includes(nri) )
 { temp=Math.min(temp, ngd+nhd);

 }
 else if(restaurant.includes(nri) && hospital.includes(nri))
 {
    temp=Math.min(temp, ngd+nrd);
}

 temp=Math.min(temp, nhd+ngd+nrd);
score[i]=temp;   }
 var bscore=1000000000000, bhouse=-1;
for(var j=0;j<score.length;j++)
 {console.log("sss", score[j]);
        if(score[j]<bscore)
        {bscore=score[j];
            bhouse=house[j];
        }
    }
    console.log(bhouse);
    document.getElementById(bhouse).style.backgroundColor="red";
    document.querySelector(".result").display="block";
    document.querySelector(".result").innerHTML="BEST HOUSE IS "+ bhouse;

return bhouse;
}}













