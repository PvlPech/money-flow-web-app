import { createApp } from "vue";
import App from './App.vue';
import MyButton from "@/components/ui/MyButton.vue";
import MyInput from "@/components/ui/MyInput.vue";
import MyDialog from "@/components/ui/MyDialog.vue";
import MySelect from "@/components/ui/MySelect.vue";

const app = createApp(App);
app.component("my-button", MyButton);
app.component("my-input", MyInput);
app.component("my-dialog", MyDialog);
app.component("my-select", MySelect);
app.mount('#app');
