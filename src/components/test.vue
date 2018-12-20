<template>
    <div class="back">
      <ul>
        <!--<li v-for="user in users">
            {{user}}
        </li>-->
        <!--传值-->
        <!--<li v-for="person in persons"
            v-on:click="person.show = !person.show">
          <p>{{person.name}}</p>
          <p v-show="person.show">{{person.position}}</p>
        </li>-->
        <button v-on:click="changTag" value="事件传值">事件传值</button>
      </ul>

    </div>
</template>

<script>
    export default {
      name: "back",
      props:["persons"],
      data(){
        return{
          users:["a","b","c"]

        }
      },
      methods:{
        changTag:function () {
          this.$emit("changMe","子向父=>我是被传递的内容")
        }
      }

    }
</script>

<style scoped>

</style>
