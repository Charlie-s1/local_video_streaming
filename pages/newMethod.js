window.addEventListener('load', init);

function init() {
  document.querySelector("#film").addEventListener('click',showCat);
  document.querySelector("#tv").addEventListener('click',showCat);
  document.querySelector("#cat").addEventListener('change',showVideo);
}
async function getFiles(dir){
  let files = await fetch(dir);
  let list = await files.json();
  return list;
}

async function showCat(e){
  const children = await getFiles(window.location + "list/?folder=pages/files/" + e.target.textContent)
  const sec = document.querySelector("#list");
  const nav = document.querySelector("nav");
  const cat = document.querySelector("#cat")
  const lib = document.querySelector("#library");
  lib.innerHTML = "";
  
  const film = document.querySelector("#film");
  const tv = document.querySelector("#tv");
  cat.innerHTML = "<option>Select...</option>";

  if(e.target.id=="film"){
    film.classList = "select";
    tv.classList.remove("select");
  }else{
    tv.classList = "select";
    film.classList.remove("select");
  }


  for (child of children){
    
    const select = document.querySelector(".select").textContent
    if (child.split('.').pop() != "mkv" && child.split('.').pop() != "mp4"){
      const option = document.createElement("option");
      option.textContent = child;
      option.value = child;
      cat.appendChild(option);
    }else{
      const div = document.createElement("div");
      div.classList = "videoCon";
      const link = document.createElement("a");
      link.classList = "videoLink";
      link.href = `${window.location}files/${select}/${child}`;
      const title = document.createElement("p");
      title.textContent = child.slice(0,-4);

      lib.appendChild(div);
      div.appendChild(link);
      div.appendChild(title);
    }
  }
  //showVideo(cat);
}
async function showVideo(e){
  
  const children = await getFiles(`${window.location}list/?folder=pages/files/${select}/${e.target.value}`);
  console.log(children);
  for (child of children){

    if (child.split('.').pop() == "mkv" || child.split('.').pop() == "mp4"){
      const vid = document.createElement("vido");
      vid.src = `${window.location}list/?folder=pages/files/${select}/${e.target.value}/${child}`;
      console.log(vid);
    }
  }
}