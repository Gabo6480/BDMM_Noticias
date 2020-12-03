const eventHandler = e=>{
    e.preventDefault();

    //TODO redirigir a link de seccion

};

const createSection = function(seccion){

    let div = document.createElement('div');
    div.classList.add('section');
    let h5 = document.createElement('h5');
    h5.innerText = seccion.Nombre;
    div.append(h5);
    
    div.addEventListener("click",eventHandler);
    div.onmouseover = () =>div.style.backgroundColor = "#"+seccion.Color;
    div.onmouseleave = () =>div.style.backgroundColor = "rgba(0,0,0,0)";

    div.onclick = e=>{
        location.href = `http://localhost:8081/BDMM_Noticias/index.html?id=${seccion.ID}`;
    }

    return div;
}

export {createSection}