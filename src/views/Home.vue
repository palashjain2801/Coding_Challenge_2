<template>
  <div>
    <nav class="jumbotron bg-primary text-white">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Wikipedia Search API</h1>
          <h2 class="subtitle">Start Searching Knowledge Today!</h2>
        </div>
      </div>
    </nav>

    <section class="section" id="wiki">
      <div class="container">
        <div class="row">
          <div class="col-md-4 mt-2">
            <textarea
              class="form-control"
              v-model="text"
              id=""
              
            ></textarea>
          </div>
          <div
            class="col-md-4 mt-2 d-flex align-items-stretch justify-content-stretch"
          >
            <div class="card d-block w-100 p-2">
              <vue-markdown-it
                :typographer="true"
                :highlight="true"
                :breaks="true"
                :html="true"
                :source="text"
              ></vue-markdown-it
              >{{}}
            </div>
          </div>
          <div
            class="col-md-4 mt-2 d-flex align-items-stretch justify-content-stretch,"
          >
            <div class="card d-block w-100 p-2">
              {{ content }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script >
import { defineComponent } from "vue";
import VueMarkdownIt from "vue3-markdown-it";
import "highlight.js/styles/monokai.css";

export default defineComponent({
  name: "Home",

  data() {
    return {
      text: "# hello",
      selectedWord: "",
      content: "",
      err: "",
    };
  },
  methods: {
    fetchData() {
      // I prefer to use fetch
      // you can use use axios as an alternative
      this.content = "";
      fetch(
        "https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&exintro&explaintext&redirects=1&titles=" +
          this.selectedWord,
        {
          method: "get",
          headers: {
            "content-type": "application/json",
          },
        }
      )
        .then((res) => {
          // a non-200 response code
          if (!res.ok) {
            // console.log(res)
            this.err = "Error occured please try again";
          }

          return res.json();
        })
        .then((json) => {
          this.err = "";

          let pages = json.query.pages;
          for (var key in pages) {
            this.content = pages[key].extract;
          }
          if (this.content == undefined) {
            this.content = "NOTHING FOUND";
          }
        })
        .catch((err) => {
          // error.value = err;

          // In case a custom JSON error response was provided
          if (err.json) {
            this.err = "Error occured please try again";
          }
        });
    },
  },
  components: { VueMarkdownIt },
  created() {
    document.onmouseup = document.onkeyup = document.onselectionchange = () => {
      console.log("select");
      if (window.getSelection().toString().length > 0) {
        this.selectedWord = window.getSelection().toString();
        this.fetchData();
      }
    };
  },
});
</script>

<style>
html,
body {
  height: 100%;
}
* {
  text-align: left;
}
#wiki {
  min-height: 60vh;
}
.mt-5 {
  margin-top: 20px;
}
textarea,
.card{
  min-height: 150px;
}
</style>
