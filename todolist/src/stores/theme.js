import {defineStore} from "pinia";


export const useTheme = defineStore("theme", {
    state: () => {
        const theme ="light"
        return {
            theme
        }
    },
    actions: {
        darkTheme() {
            this.theme = "dark";
            window.localStorage.setItem("theme", JSON.stringify(this.theme));
        },
        lightTheme() {
            this.theme = "light";
            window.localStorage.setItem("theme", JSON.stringify(this.theme));
        }
    }

})