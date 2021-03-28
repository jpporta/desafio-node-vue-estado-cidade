<template>
  <div class="home">
    <div
      class="container d-flex flex-column justify-content-center align-items-center"
    >
      <h1 class="display-1 w-auto">Controle de Cidades</h1>
      <hr class="w-100" />
      <p>
        Aplicação feita com Vue.js consumindo um backend feito em Node.js com
        objetivo de concluir o desafio técnico da Zoox
      </p>
      <hr class="w-100" />
      <div class="w-75">
        <div class="row">
          <div class="col">
            <h4>Desenvolvedor:</h4>
          </div>
          <div class="col">
            <h5>João Pedro Pin Porta</h5>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <h4>Contatos:</h4>
          </div>
        </div>
        <div class="row">
          <div class="col pl-4">
            <h5>Email:</h5>
          </div>
          <div class="col">
            <h5>
              <a href="mailto:jpedro.porta@gmail.com">jpedro.porta@gmail.com</a>
            </h5>
          </div>
        </div>
        <div class="row">
          <div class="col pl-4">
            <h5>Celular:</h5>
          </div>
          <div class="col">
            <h5>
              <a href="tel:5519994073911">+55 (19) 99407-3911</a>
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>
