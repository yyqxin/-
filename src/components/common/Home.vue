<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-menu></v-menu>
        <div class="content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vMenu from './menu.vue';
    export default {
        components:{
            vHead
            ,vMenu
        }
    }
</script>
