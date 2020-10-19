const eventHandler = e=>{
    e.preventDefault();

    //TODO redirigir a link de seccion

};

const createSection = function(seccion){

    let div = document.createElement('div');
    div.classList.add('section');
    let h5 = document.createElement('h5');
    h5.innerText = seccion.nombre;
    div.append(h5);
    
    div.addEventListener("click",eventHandler);
    div.onmouseover = () =>div.style.backgroundColor = seccion.color;
    div.onmouseleave = () =>div.style.backgroundColor = "rgba(0,0,0,0)";

    return div;
}

export {createSection}