const BASE_URL = `http://localhost:1337`;


async function carregarDados(colecao) {
   const resposta = await fetch(`${BASE_URL}${colecao}`);
   const dados = resposta.json();
   return dados;
}

async function buscarMedicamentoCat(chave, valor) {
   const medref = await carregarDados(`/categorias?${chave}=${valor}`)
   return medref;
}

async function buscarMedicamentoId(chave, valor) {
   const medid = await carregarDados(`/medicamentos?${chave}=${valor}`)
   return medid;
}


async function buscarMedicamentoEspecifico(chave, valor) {
   const medicamentosLab = await carregarDados(`/medicamentos?${chave}=${valor}`);
   return medicamentosLab;
}

async function buscarMedicamento() {

   const medicamentos = await carregarDados(`/medicamentos`),
      containermed = document.querySelector(".container-medicamentos");

   for (const medicamento of medicamentos) {
      const { nome, laboratorio, pmc, codBarras, imgMedicamento } = medicamento
      console.log(nome);
      console.log(imgMedicamento[0].url);
      containermed.innerHTML += `

       <article class="medicamento">
            <img src="${BASE_URL}${imgMedicamento[0].url}" alt="" class="img-med" />
            <span class="med-nome">PMC:${pmc}</span> 
       </article>
       
       `
   }

}

async function buscarMedicamentoReferencia() {
   const medref = await buscarMedicamentoCat(`NomeCategoria`, `Referencia`);
   containermedref = document.querySelector('.container-medicamentos-referencia');
   //console.log(containermedref);
   for (const medreferencia of medref){
         medicamentos = (medreferencia.medicamentos)
      for (const medicamentosref of medicamentos) {
         const { imgMedicamento, pmc, id } = medicamentosref;
         console.log(imgMedicamento[0].url);
         console.log(pmc);
         containermedref.innerHTML += `
         <article class="medicamento">
         <a href="./medicamento.html?${id}">
            <img src="${BASE_URL}${imgMedicamento[0].url}" alt="" class="img-med" />
         </a>
         <span class="med-nome">PMC:${pmc}</span> 
    </article>
         `
      }
   }
}

async function buscarMedicamentoSimilar() {
   const medsim = await buscarMedicamentoCat(`NomeCategoria`, `Similar`);
   containermedsim = document.querySelector('.container-medicamentos-similar');
   //console.log(containermedref);
   for (const medsimilar of medsim)
         medicamentos = (medsimilar.medicamentos)
      for (const medicamentossim of medicamentos) {
         const { imgMedicamento, pmc, id } = medicamentossim;
         console.log(imgMedicamento[0].url);
         console.log(pmc);

         containermedsim.innerHTML +=`
         <article class="medicamento">
         <a href="./medicamento.html?${id}">
            <img src="${BASE_URL}${imgMedicamento[0].url}" alt="" class="img-med" />
         </a>
         <span class="med-nome">PMC:${pmc}</span> 
    </article>
         `
      }
}

async function buscarMedicamentoGenerico() {
   const medgen = await buscarMedicamentoCat(`NomeCategoria`, `Generico`);
   containermedgen = document.querySelector('.container-medicamentos-generico');
   //console.log(containermedref);
   for (const medgenerico of medgen)
         medicamentos = (medgenerico.medicamentos)
      for (const medicamentosgen of medicamentos) {
         const { imgMedicamento, pmc, id } = medicamentosgen;
         console.log(imgMedicamento[0].url);
         console.log(pmc);

         containermedgen.innerHTML +=`
         <article class="medicamento">
         <a href="./medicamento.html?${id}">
            <img src="${BASE_URL}${imgMedicamento[0].url}" alt="" class="img-med" />
         </a>
         <span class="med-nome">PMC:${pmc}</span> 
         </article>
         
         `
      }
}

async function buscarCategorias() {
   const categorias = await carregarDados(`/categorias`);
   return categorias;
}

async function buscarMedicamentoPorCategoria(categoria) {
   const categorias = await carregarDados(`/categorias?NomeCategoria=${categoria}`);
   return categorias[0].medicamentos;
}



async function buscarMedicamentoPorID() {
   var x= location.href;
   const resultado= x.substring(68);
   const medicamentos = await buscarMedicamentoId(`id`, resultado);
   containermed = document.querySelector(".container-medicamentos-id");

for (const medicamento of medicamentos) {
   const { nome, laboratorio, pmc, codBarras, imgMedicamento, classificacao, linkBula} = medicamento
   console.log(nome);
   console.log(imgMedicamento[0].url);
   containermed.innerHTML += `

    <article class="medicamento-grande">
         <img id="img-med-grande" src="${BASE_URL}${imgMedicamento[0].url}" alt="" class="img-med" />
         <span class="med-nome-grande">${nome}</span> 
         <span class="med-nome-grande">Laboratório:${laboratorio}</span>
         <span class="med-nome-grande" >PMC:${pmc}</span>
         <span class="med-nome-grande">Cod Barras: ${codBarras}</span>
         <span class="med-nome-grande">Classificação: ${classificacao}</span>
    </article>
    
    <article class="medicamento-grande-link">
         <span class="">Link Bula: <a href="${linkBula}">${linkBula}</a></span>
    </article>
    
    `
}

   
}

buscarMedicamentoReferencia();
buscarMedicamentoSimilar();
buscarMedicamentoGenerico();
buscarMedicamento();
buscarMedicamentoPorID();

//buscarCategorias();
//buscarMedicamentoPorCategoria(`Referencia`);