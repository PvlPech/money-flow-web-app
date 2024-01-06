import { createApp } from "vue";
import App from './App.vue';
import MyButton from "@/components/ui/MyButton.vue";

const app = createApp(App);
app.component("my-button", MyButton);
app.mount('#app');
