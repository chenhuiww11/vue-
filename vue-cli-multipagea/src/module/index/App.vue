<template>
  <div id="app">
    <img src="./images/logo.png">
     <hello v-for='item in artList' :art-list='item'></hello>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import Hello from 'components/Hello/Hello'

  export default {
    name: 'app',
    components: {
      Hello
    },
    data(){
    	return{
    		artList:[] ,
    	}
    },
    created(){
    	this.artList = [
            {name : 'ziksang1' , startTime : '1小时前' , content:'aaaaaaaaa',good : 1},
            {name : 'ziksang2' , startTime : '2小时前' , content:'bbbbbbbbb',good : 2},
            {name : 'ziksang3' , startTime : '3小时前' , content:'ccccccccc',good : 3},
            {name : 'ziksang4' , startTime : '4小时前' , content:'ddddddddd',good : 4}
        ];
    },
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
