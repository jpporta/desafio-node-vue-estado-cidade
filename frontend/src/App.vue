<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link to="/">
        <a class="navbar-brand" href="#">Controle de Cidades</a>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/cidades">
              <a class="nav-link" href="#">Cidades</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/estados">
              <a class="nav-link" href="#">Estados</a>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <hr />
    <router-view />
  </div>
</template>

<style>
body {
  background-color: #eee;
}
#app {
  margin: 10px;
  background-color: #fff;
  border-radius: 5px;
  -webkit-box-shadow: 0px 0px 73px 21px rgba(0, 0, 0, 0.08);
  -moz-box-shadow: 0px 0px 73px 21px rgba(0, 0, 0, 0.08);
  box-shadow: 0px 0px 73px 21px rgba(0, 0, 0, 0.08);
  padding: 10px;
}
</style>
