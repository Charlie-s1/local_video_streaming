window.addEventListener('load', init);

function init() {
  document.querySelector("#film").addEventListener('click',main);
  document.querySelector("#tv").addEventListener('click',main);
  document.querySelector("#cat").addEventListener('change',main);
}

async function getFiles(dir){
  let files = await fetch(dir);
  let list = await files.json();
  return list;
}

async function main(e){

  if(e.target.id=="film"){
    film.classList = "select";
    tv.classList.remove("select");
  }else if(e.target.id=="tv"){
    tv.classList = "select";
    film.classList.remove("select");
  }
  
  let url = window.location + "list/?folder=";
  let urlAddition = "";
  const select = document.querySelector(".select").textContent;
  const cat = document.querySelector("#cat").value;
  let level = 0;

  if (e.target.classList == "select"){
    urlAddition = e.target.textContent;
  }else{
    if (e.target.id == "cat"){
      urlAddition = `${select}/${cat}`;
      level = 1;
    }
    else{
      urlAddition = `${select}/${cat}/${e.target.value}`;
      level = 2;
    }
  }
  url += urlAddition;
  const children = await getFiles(url);
  let films = [];
  let cats = [];
  
  
  for (child of children){
    if (child.split('.').pop() != "mkv" && child.split('.').pop() != "mp4"){
      cats.push(child);
    }else{
      films.push(child);
    }
  } 
  showVideo(films,"files/" + urlAddition);
  
  if(cats != ""){
    if (level==0){
      showCatagories(cats);
    }else{
      showCatagories(cats,true);
    }
  }else if(level<2){
    if(document.querySelector("#cat2")){
      document.querySelector("#cat2").remove();
    }
  } 
}

function showVideo(videos,url){
  console.log(url);
  
  const lib = document.querySelector("#library");
  lib.innerHTML = "";
  for (child of videos){
    const div = document.createElement("div");
      div.classList = "videoCon";
      const link = document.createElement("a");
      link.classList = "videoLink";
      link.href = `${url}/${child}`;
      const title = document.createElement("p");
      title.textContent = child.slice(0,-4);

      lib.appendChild(div);
      div.appendChild(link);
      div.appendChild(title);
  }
}

function showCatagories(cats,catTwo){
  const folders = document.querySelector("#folders");
  
  if (catTwo){
    if(!document.querySelector("#cat2")){
      const drop = document.createElement("select");
      drop.addEventListener("change",main);
      drop.id = "cat2";
      drop.classList = "catagory";
      for (child of cats){
        const option = document.createElement("option");
        option.textContent = child;
        option.value = child;
        folders.appendChild(drop)
        drop.appendChild(option);
      }
    } else{
      document.querySelector("#cat2").innerHTML = "";
      for (child of cats){
        const option = document.createElement("option");
        option.textContent = child;
        option.value = child;
        document.querySelector("#cat2").appendChild(option);
      }
    }
  }else{
    const cat = document.querySelector("#cat")
    cat.innerHTML = ""
    if(document.querySelector("#cat2")){
      document.querySelector("#cat2").remove();
    }
    for(child of cats){
      const option = document.createElement("option");
      option.textContent = child;
      option.value = child;
      cat.appendChild(option);
    }
    
    }
}