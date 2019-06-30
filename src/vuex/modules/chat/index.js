"use strict";

export default {
    namespaced: true,
    state: {
        massJson: [],
    },
    mutations: {
        setTopics(state, topics) {
            state.massJson = topics;
        },
    },
    getters: {
        getTopics: state => {
            return _ => {
                return state.massJson;
            }
        }
    },
    actions: {
        async init(context) {
            console.log(work);
            let data_body = { subject: "topics" };
            let data_json = JSON.stringify(data_body);
            let result = [];

            await fetch("https://host.j-soft.online/api/", {
                method: "POST",
                body: data_json,
                headers: { "content-type": "application/json" }
            })
                .then(response => {
                    if (response.status !== 200) {
                        result = Promise.reject();
                    }
                    result = response.text();
                })
                .then(i => console.log(i))
                .catch(() => console.log("ошибка"));

            console.log(result);
            context.commit('setTopics', result);
        }
    },
};
