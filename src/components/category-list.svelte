<script>
  import { each } from "dom7";
  import { Page, Link } from "framework7-svelte";

  let titleCategory = [
    {
      text: "Biography",
      link: "/biography", // URL untuk biography
    },
    {
      text: "Fantasy",
      link: "/fantasy", // URL untuk fantasy
    },
    {
      text: "History",
      link: "/history", // URL untuk history
    },
    {
      text: "Humor",
      link: "/humor", // URL untuk humor
    },
    {
      text: "Fiction",
      link: "/fiction", // URL untuk fiction
    },
    {
      text: "Islamic",
      link: "/islamic", // URL untuk islamic
    },
    {
      text: "Autobiography",
      link: "/autobiography", // URL untuk autobiography
    },
  ];
</script>

<div class="mt-10 -mb-8">
  <div class="mt-10 -mb-8 flex overflow-x-scroll space-x-4 scroll-container">
    {#each titleCategory as cat}
      <a href={cat.link} class="slide-link link">
        <div class="slide-content font-semibold p-4 border">
          <span>{cat.text}</span>
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
    .scroll-container {
    overflow-x: scroll;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
  }

  .scroll-container::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  .slide-content {
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slide-content {
    color: black;
  }

  .slide-link:hover .slide-content {
    background-color: #5c6bc0;
    color: white;
    transition: background-color 0.3s ease;
  }
</style>
